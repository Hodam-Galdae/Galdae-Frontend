import { useEffect, useRef, useState, useCallback } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { WEB_SOCKET_URL, SUB_ENDPOINT, PUB_ENDPOINT, CHAT_COUNT_ENDPOINT } from '../api/axiosInstance';

interface UseWebSocketProps {
    chatroomId: string;
    token: string;
    onMessageReceived: (data: any) => void;
    onUnreadCountReceived: (data: any) => void;
}

export const useWebSocket = ({
    chatroomId,
    token,
    onMessageReceived,
    onUnreadCountReceived,
}: UseWebSocketProps) => {
    const client = useRef<Client>();
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // 콜백 함수들을 ref로 저장하여 안정적인 참조 유지
    const onMessageReceivedRef = useRef(onMessageReceived);
    const onUnreadCountReceivedRef = useRef(onUnreadCountReceived);

    // ref 업데이트
    useEffect(() => {
        onMessageReceivedRef.current = onMessageReceived;
        onUnreadCountReceivedRef.current = onUnreadCountReceived;
    }, [onMessageReceived, onUnreadCountReceived]);

    useEffect(() => {
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
            brokerURL: 'ws://52.78.169.186:8081/ws',
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

            try {
                // 채팅 메시지 구독
                client.current!.subscribe(
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
                console.log('✅ 채팅 메시지 구독 완료:', SUB_ENDPOINT + '/' + chatroomId);

                // 안 읽은 사람 수 구독
                client.current!.subscribe(
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
                console.log('✅ 안읽음 수 구독 완료:', CHAT_COUNT_ENDPOINT + '/' + chatroomId);
            } catch (error) {
                console.error('❌ 구독 설정 중 에러:', error);
            }
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
            clearTimeout(connectionTimeout);
            if (client.current?.connected) {
                console.log('🔌 웹소켓 연결 정리 중...');
                client.current?.deactivate();
            }
        };
    }, [chatroomId, token]); // 콜백 함수들을 의존성 배열에서 제거

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
