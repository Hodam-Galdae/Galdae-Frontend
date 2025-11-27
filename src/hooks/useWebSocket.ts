import { useEffect, useRef, useState, useCallback } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { WEB_SOCKET_URL, SUB_ENDPOINT, PUB_ENDPOINT, CHAT_COUNT_ENDPOINT } from '../api/axiosInstance';

interface UseWebSocketProps {
    chatroomId: string;
    token: string;
    onMessageReceived: (data: any) => void;
    onUnreadCountReceived: (data: any) => void;
    enabled?: boolean; // 앱이 포그라운드/백그라운드 상태에 따라 연결 제어
}

export const useWebSocket = ({
    chatroomId,
    token,
    onMessageReceived,
    onUnreadCountReceived,
    enabled = true, // 기본값은 true (항상 연결)
}: UseWebSocketProps) => {
    const client = useRef<Client>();
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // 콜백 함수들을 ref로 저장하여 안정적인 참조 유지
    const onMessageReceivedRef = useRef(onMessageReceived);
    const onUnreadCountReceivedRef = useRef(onUnreadCountReceived);
    // 구독 객체들을 저장하여 cleanup 시 해제
    const subscriptionsRef = useRef<any[]>([]);

    // ref 업데이트
    useEffect(() => {
        onMessageReceivedRef.current = onMessageReceived;
        onUnreadCountReceivedRef.current = onUnreadCountReceived;
    }, [onMessageReceived, onUnreadCountReceived]);

    useEffect(() => {
        // enabled가 false면 연결하지 않음 (백그라운드 상태 등)
        if (!enabled) {
            console.log('⚠️ WebSocket이 비활성화 상태입니다 (enabled=false)');
            setIsLoading(false);
            setIsConnected(false);
            return;
        }

        // token이 없으면 연결하지 않음
        if (!token || token === 'Bearer ' || token === 'Bearer null' || token === 'Bearer undefined') {
            console.log('⚠️ 유효한 토큰이 없어 WebSocket 연결을 건너뜁니다');
            setIsLoading(false);
            return;
        }

        console.log(`🔌 웹소켓 연결 시도 시작
            chatroomId: ${chatroomId}
            token: ${token ? '존재함' : '없음'}
            WEB_SOCKET_URL: ${WEB_SOCKET_URL}
            SUB_ENDPOINT: ${SUB_ENDPOINT}
            PUB_ENDPOINT: ${PUB_ENDPOINT}
            CHAT_COUNT_ENDPOINT: ${CHAT_COUNT_ENDPOINT}
        `);

        // 연결 타임아웃 설정 (10초)
        const connectionTimeout = setTimeout(() => {
            if (!client.current?.connected) {
                console.error('❌ 웹소켓 연결 타임아웃 (10초 초과)');
                setIsLoading(false);
                setIsConnected(false);
            }
        }, 10000);

        client.current = new Client({
            webSocketFactory: () => {
                console.log('🔧 WebSocket 인스턴스 생성');
                const socket = new WebSocket(WEB_SOCKET_URL);

                // WebSocket 레벨 이벤트 핸들러
                socket.onopen = () => {
                    console.log('✅ WebSocket 연결 성공 (native level)');
                };

                socket.onerror = (error) => {
                    console.error('❌ WebSocket 에러 (native level):', error);
                };

                socket.onclose = (event) => {
                    console.log(`🔌 WebSocket 닫힘 (native level) - code: ${event.code}, reason: ${event.reason}`);
                };

                return socket;
            },
            connectHeaders: {
                Authorization: token,
                chatroomId: chatroomId,
            },
            brokerURL: WEB_SOCKET_URL,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            forceBinaryWSFrames: true,
            appendMissingNULLonIncoming: true,
            debug: (msg) => {
                console.log('🐛 STOMP Debug:', msg);
            },
        });

        client.current.onConnect = (frame) => {
            clearTimeout(connectionTimeout);
            setIsLoading(false);
            setIsConnected(true);
            console.log('✅ 웹소켓 연결 성공 (STOMP level)', frame);

            // WebSocket이 완전히 준비될 때까지 약간 지연
            setTimeout(() => {
                if (!client.current?.connected) {
                    console.error('❌ 구독 시도 시 연결이 끊어짐');
                    return;
                }

                try {
                    // 채팅 메시지 구독
                    const chatSubscription = client.current!.subscribe(
                        SUB_ENDPOINT + '/' + chatroomId,
                        (message: IMessage) => {
                            try {
                                const receiveData = JSON.parse(message.body);
                                console.log(`📨 받은 메세지
                                    chatroomId: ${chatroomId}
                                    receiveData:`, receiveData);
                                onMessageReceivedRef.current(receiveData);
                            } catch (error) {
                                console.error('❌ 메시지 파싱 에러:', error);
                            }
                        },
                        {
                            Authorization: token,
                            chatroomId: chatroomId,
                        }
                    );
                    subscriptionsRef.current.push(chatSubscription);
                    console.log('✅ 채팅 메시지 구독 완료:', SUB_ENDPOINT + '/' + chatroomId);

                    // 안 읽은 사람 수 구독
                    const countSubscription = client.current!.subscribe(
                        CHAT_COUNT_ENDPOINT + '/' + chatroomId,
                        (msg: IMessage) => {
                            try {
                                console.log(`🔢 안 읽은 사람 수 수신
                                    chatroomId: ${chatroomId}
                                    msg:`, msg.body);
                                const unreadData = JSON.parse(msg.body);
                                onUnreadCountReceivedRef.current(unreadData);
                            } catch (error) {
                                console.error('❌ 안읽음 수 파싱 에러:', error);
                            }
                        },
                    );
                    subscriptionsRef.current.push(countSubscription);
                    console.log('✅ 안읽음 수 구독 완료:', CHAT_COUNT_ENDPOINT + '/' + chatroomId);
                } catch (error) {
                    console.error('❌ 구독 설정 중 에러:', error);
                }
            }, 100); // 100ms 지연으로 WebSocket이 완전히 준비되도록 함
        };

        client.current.onStompError = (frame) => {
            clearTimeout(connectionTimeout);
            setIsLoading(false);
            setIsConnected(false);
            console.error('❌ STOMP 에러 발생:', {
                command: frame.command,
                headers: frame.headers,
                body: frame.body,
            });
        };

        client.current.onWebSocketError = (event) => {
            console.error('❌ WebSocket 에러:', event);
        };

        client.current.onDisconnect = (frame) => {
            clearTimeout(connectionTimeout);
            setIsLoading(false);
            setIsConnected(false);
            console.log('🔌 웹소켓 연결 해제:', frame);
        };

        client.current.onWebSocketClose = (event) => {
            console.log(`🔌 WebSocket 닫힘 - code: ${event.code}, reason: ${event.reason}, wasClean: ${event.wasClean}`);
        };

        try {
            client.current.activate();
            console.log('🚀 STOMP 클라이언트 활성화 완료');
        } catch (error) {
            clearTimeout(connectionTimeout);
            console.error('❌ STOMP 클라이언트 활성화 실패:', error);
            setIsLoading(false);
            setIsConnected(false);
        }

        return () => {
            console.log('🔌 웹소켓 연결 정리 시작...');
            clearTimeout(connectionTimeout);

            // 모든 구독 해제
            subscriptionsRef.current.forEach(subscription => {
                try {
                    subscription.unsubscribe();
                    console.log('✅ 구독 해제 완료');
                } catch (error) {
                    console.error('❌ 구독 해제 실패:', error);
                }
            });
            subscriptionsRef.current = [];

            // STOMP 클라이언트 비활성화
            if (client.current?.connected) {
                console.log('🔌 STOMP 클라이언트 비활성화 중...');
                client.current?.deactivate();
            }
        };
    }, [chatroomId, token, enabled]); // enabled 변경 시에도 재연결

    const sendMessage = useCallback((message: string, type: string, sender: string, senderImage: string) => {
        if (client.current?.connected) {
            client.current.publish({
                destination: PUB_ENDPOINT + '/' + chatroomId,
                headers: { Authorization: token },
                body: JSON.stringify({
                    type,
                    sender,
                    message,
                    senderImage,
                }),
            });
            console.log(`
                메세지 전송
                chatroomId: ${chatroomId}
                token: ${token}
                message: ${message}
                type: ${type}
                sender: ${sender}
                senderImage: ${senderImage}
            `);
        }
    }, [chatroomId, token]);

    return {
        isConnected,
        isLoading,
        sendMessage,
    };
};
