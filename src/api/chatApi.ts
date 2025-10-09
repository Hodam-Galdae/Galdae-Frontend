// src/api/chatApi.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from './axiosInstance';

// ====== Types ======
export type GroupType = 'TAXI' | 'ORDER' |'SUBSCRIBE';

export interface ChatroomSummary {
  chatroomId: number;
  titleLeft: string | null;
  titleRight: string | null;
  lastChatDate: string;         // ISO
  lastChat: string;
  notReadCount: number;
  isActive: boolean;
  groupType: GroupType;
}

export interface ChatroomInfo {
  titleLeft: string;
  titleRight: string;
  alertContent: string;
}

export interface ChatMember {
  memberId: string;     // UUID
  memberName: string;
  memberImage: string | null;
}

export type ChatType = 'MESSAGE' | 'IMAGE' | 'ENTER' | 'EXIT' | 'MONEY';

export interface ChatItem {
  chatId: number;
  chatContent: string;
  chatType: ChatType;
  sender: string;
  memberImage: string | null;
  time: string;         // ISO
}

// 정산 조회
export interface PaymentMember {
  id: string;           // UUID
  name: string;
  image: string | null;
}

export interface PaymentSummary {
  id: number;
  totalCost: number;
  personalCost: number;
  depositor: string;
  accountNumber: string;
  bankType: string;     // 예: "KB", "신한" 등
  requestTime: string;  // ISO
  members: PaymentMember[];
}

// 서버 에러 포맷(스웨거 예시)
export interface ServerError {
  isSuccess: false;
  timeStamp: string;    // ISO
  errorCode: string;    // 예: "M005"
  message: string;      // 예: "계좌 정보를 찾을 수 없습니다."
}

// ====== Helpers ======
const getData = <T>(p: Promise<{ data: T }>) => p.then(r => r.data);

// ====== API ======

/**
 * 내가 참여중인 채팅방 목록
 * @returns
 */
export const fetchMyChatrooms = () =>
  getData<ChatroomSummary[]>(
    axiosInstance.get('/chatroom'),
  );

/**
 * 채팅방 정보
 * @param chatroomId 채팅방 ID
 * @returns 채팅방 정보
 */
export const fetchChatroomInfo = (chatroomId: number | string) =>
  getData<ChatroomInfo>(
    axiosInstance.get(`/chatroom/${chatroomId}`),
  );

/**
 * 채팅방 멤버
 * @param chatroomId 채팅방 ID
 * @returns 채팅방 멤버
 */
export const fetchChatMembers = (chatroomId: number | string) =>
  getData<ChatMember[]>(
    axiosInstance.get(`/chatroom/${chatroomId}/member`),
  );

/**
 * 특정 채팅방의 채팅 목록
 * @param chatroomId 채팅방 ID
 * @returns 채팅 목록
 */
export const fetchChats = (chatroomId: number | string) =>
  getData<ChatItem[]>(
    axiosInstance.get(`/chatroom/${chatroomId}/chat`),
  );

/**
 * 채팅방 나가기
 * @param chatroomId 채팅방 ID
 * @returns 채팅방 나가기
 */
export const leaveChatroom = (chatroomId: number | string) =>
  getData<void>(
    axiosInstance.delete(`/chatroom/${chatroomId}`),
  );

/**
 * 정산 생성 (생성 후 WebSocket으로 paymentId 메시지가 브로드캐스트됨)
 * @param chatroomId 채팅방 ID
 * @param totalCost 정산 금액
 * @returns 정산 생성
 */
export const createPayment = async (chatroomId: number | string, totalCost: number) => {
  try {
    // 스웨거는 body: { totalCost }
    return await getData<void>(
      axiosInstance.post(`/chatroom/${chatroomId}/payment`, { totalCost }),
    );
  } catch (e: any) {
    // 백엔드 표준 에러 포맷을 그대로 surface
    const errData: ServerError | undefined = e?.response?.data;
    if (errData?.message) {
      throw new Error(errData.message);
    }
    throw e;
  }
};

/**
 * 정산 조회
 * @param chatroomId 채팅방 ID
 * @returns 정산 조회
 */
export const fetchPayment = (chatroomId: number | string) =>
  getData<PaymentSummary>(
    axiosInstance.get(`/chatroom/${chatroomId}/payment`),
  );

  /**
 * 이미지 전송
 * @param chatroomId 채팅방 ID
 * @param payload 이미지 전송 데이터
 * @returns 이미지 전송
 */
// 스웨거는 JSON { imageSendCommand: { sender, senderImage }, image } 이므로 그대로 구현.
// (만약 파일 업로드로 바뀌면 multipart/form-data 버전도 아래 주석 참조)
export interface SendImagePayload {
  imageSendCommand: { sender: string; senderImage?: string | null };
  image: string; // base64 (data:... 제거한 순수 base64)
}

export interface SendImageResponse { url: string } // 서버 응답 형태에 맞추세요

export const sendChatImage = (chatroomId: number | string, payload: SendImagePayload) =>
  getData<SendImageResponse>(
    axiosInstance.post(`/chatroom/${chatroomId}/chat/image`, payload),
  );

// --- multipart 예시(백엔드가 바꾸면 이 버전으로 교체) ---
// export const sendChatImageMultipart = (chatroomId: number | string, file: {
//   uri: string;        // react-native-image-picker 등에서 받은 로컬 파일 uri
//   name: string;       // 파일명
//   type: string;       // mime
// }, sender: { name: string; image?: string | null }) => {
//   const form = new FormData();
//   form.append('image', { uri: file.uri, name: file.name, type: file.type } as any);
//   form.append('sender', JSON.stringify(sender));
//   return getData<void>(
//     axiosInstance.post(`/chatroom/${chatroomId}/chat/image`, form, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     }),
//   );
// };

// ====== WebSocket (STOMP) 헬퍼 ======
// 백엔드가 /chatroom/ws 를 노출. STOMP 사용 시:
export type StompClient = import('@stomp/stompjs').Client;
export type IMessage = import('@stomp/stompjs').IMessage;

/**
 * WebSocket 연결 도우미
 * @param baseWsURL   예: ws://52.78.169.186/chatroom/ws 또는 wss://your-domain/chatroom/ws
 * @param onConnect   연결시 콜백
 * @param onMessage   구독 메시지 콜백
 * @param topics      구독 토픽 배열 (예: [`/topic/chat/${chatroomId}`, `/topic/payment/${chatroomId}`])
 */
export async function connectChatStomp(
  baseWsURL: string,
  onConnect: () => void,
  onMessage: (msg: IMessage) => void,
  topics: string[],
): Promise<StompClient> {
  const { Client } = await import('@stomp/stompjs');

  const client = new Client({
    brokerURL: baseWsURL,           // ex) 'wss://example.com/chatroom/ws'
    reconnectDelay: 2000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
    // 필요시 Authorization 헤더 추가(쿠키/세션이 아니라 Bearer면)
    // connectHeaders: { Authorization: `Bearer ${yourAccessToken}` },
    onConnect: _frame => {
      topics.forEach(t => client.subscribe(t, onMessage));
      onConnect?.();
    },
    // 디버깅 원하면:
    // debug: (str) => console.log('[STOMP]', str),
  });

  client.activate();
  return client;
}
