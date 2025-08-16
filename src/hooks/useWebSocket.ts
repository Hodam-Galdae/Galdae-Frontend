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
        console.log(`
            웹소켓 연결
            chatroomId: ${chatroomId}
            token: ${token}
            WEB_SOCKET_URL: ${WEB_SOCKET_URL}
            SUB_ENDPOINT: ${SUB_ENDPOINT}
            PUB_ENDPOINT: ${PUB_ENDPOINT}
            CHAT_COUNT_ENDPOINT: ${CHAT_COUNT_ENDPOINT}
        `);
        const socket = new WebSocket(WEB_SOCKET_URL);
        client.current = new Client({
            // connectHeaders: {
            //     Authorization: token,
            //     chatroomId: chatroomId,
            // },
            webSocketFactory: () => socket,
            reconnectDelay: 3000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            forceBinaryWSFrames: true,
            appendMissingNULLonIncoming: true,
        });

        client.current.onConnect = () => {
            setIsLoading(false);
            setIsConnected(true);

            // 채팅 메시지 구독
            client.current!.subscribe(
                SUB_ENDPOINT + '/' + chatroomId,
                (message: IMessage) => {
                    const receiveData = JSON.parse(message.body);
                    console.log(`
                        받은 메세지
                        chatroomId: ${chatroomId}
                        token: ${token}
                        receiveData: ${receiveData}
                        `,receiveData);
                    onMessageReceivedRef.current(receiveData);
                },
                {
                    Authorization: token,
                    chatroomId: chatroomId,
                }
            );

            // ── 안 읽은 사람 수
            client.current!.subscribe(
                CHAT_COUNT_ENDPOINT + '/' + chatroomId,
                (msg: IMessage) => {
                    console.log(`
                        안 읽은 사람 수
                        chatroomId: ${chatroomId}
                        token: ${token}
                        msg: ${msg.body}
                        `,msg);
                    const unreadData = JSON.parse(msg.body);
                    onUnreadCountReceivedRef.current(unreadData);
                },
            );
        };

        client.current.onStompError = function () {
            setIsLoading(true);
            setIsConnected(false);
            // 에러 처리 로직
        };

        client.current.onDisconnect = () => {
            setIsLoading(true);
            setIsConnected(false);
        };

        client.current.activate();

        return () => {
            client.current?.deactivate();
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
