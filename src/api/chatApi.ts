// src/api/chatApi.ts

import axiosInstance from './axiosInstance';

// ====== Types ======
export type GroupType = 'TAXI' | 'ORDER' |'SUBSCRIBE';

export interface ChatroomSummary {
  chatroomId: number;
  titleLeft: string;              // 출발지 / 서비스명 / 음식점명
  titleRight: string | null;      // 도착지 (OTT는 null)
  lastChatDate: string;           // ISO 8601 format (ZonedDateTime)
  lastChat: string;               // 마지막 채팅 내용
  notReadCount: number;           // 안 읽은 메시지 수
  isActive: boolean;              // 활성/비활성 여부
  groupType: GroupType;           // 그룹 타입 (TAXI, ORDER, SUBSCRIBE)
}

export interface ChatroomInfo {
  titleLeft: string;
  titleRight: string | null;      // OTT의 경우 null
  alertContent: string;
  lastReadChatId: number;          // 현재 사용자가 마지막으로 읽은 메시지 ID
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
  time: string;         // ISO 8601 format (ZonedDateTime)
}

// 정산 조회
export interface PaymentMember {
  id: string;           // UUID
  name: string;
  image: string | null;
}

export interface PaymentSummary {
  id: number;
  chatroomId: number;
  totalCost: number;
  personalCost: number;
  depositor: string;
  accountNumber: string;
  bankType: string;     // 예: "KB", "신한" 등
  requestTime: string;  // ISO 8601 format
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
 * 내가 참여중인 채팅방 목록 (전체)
 * Backend가 active/inactive 구분 없이 단일 엔드포인트로 반환
 * @returns
 */
export const fetchMyChatrooms = () =>
  getData<ChatroomSummary[]>(
    axiosInstance.get('/chatroom'),
  );

/**
 * 채팅방 정보 (제목, 공지)
 * @param chatroomId 채팅방 ID
 * @returns 채팅방 정보 (titleLeft, titleRight, alertContent)
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
 * 특정 멤버에게 정산 알림 보내기
 * @param chatroomId 채팅방 ID
 * @param targetMemberId 알림을 받을 멤버 ID
 * @returns 정산 알림 전송
 */
export const sendPaymentNotification = (chatroomId: number | string, targetMemberId: string) =>
  axiosInstance.post(`/chatroom/${chatroomId}/payment/notify/${targetMemberId}`);

/**
 * 이미지 전송 (multipart/form-data)
 * @param chatroomId 채팅방 ID
 * @param file 이미지 파일 정보
 * @param imageSendCommand 발신자 정보
 * @returns 이미지 전송
 */
export interface ImageSendCommand {
  sender: string;
  senderImage?: string | null;
}

/**
 * 채팅 이미지 업로드 (범용 API 사용)
 * @param chatroomId 채팅방 ID
 * @param file 이미지 파일 정보
 * @param imageSendCommand 발신자 정보
 * @returns 이미지 업로드 완료
 */
export const sendChatImage = async (
  chatroomId: number | string,
  file: {
    uri: string;
    name: string;
    type: string;
  },
  imageSendCommand: ImageSendCommand
): Promise<void> => {
  try {
    console.log('📤 [채팅 이미지] 업로드 시작');

    // 1. 범용 이미지 업로드 함수 사용 (S3 직접 업로드)
    const { uploadImage } = await import('./fileApi');
    const publicUrl = await uploadImage('CHAT', file);

    console.log('✅ [채팅 이미지] S3 업로드 완료:', publicUrl);

    // 2. 백엔드에 채팅 메시지 생성 요청
    console.log('📤 [채팅 이미지] 채팅 메시지 생성 중...');
    await getData<void>(
      axiosInstance.post(`/chatroom/${chatroomId}/chat/image/complete`, {
        s3Url: publicUrl,
        sender: imageSendCommand.sender,
        senderImage: imageSendCommand.senderImage,
      })
    );

    console.log('✅ [채팅 이미지] 채팅 메시지 생성 완료');
  } catch (error) {
    console.error('❌ [채팅 이미지] 업로드 실패:', error);
    throw error;
  }
};

/**
 * 채팅 이미지 업로드 (레거시 - 백엔드 업로드 방식)
 * MultipartException 문제로 인해 사용 중단
 */
export const sendChatImageLegacy = async (
  chatroomId: number | string,
  file: {
    uri: string;
    name: string;
    type: string;
  },
  imageSendCommand: ImageSendCommand
) => {
  const RNFS = await import('react-native-fs');
  const form = new FormData();

  form.append('image', {
    uri: file.uri,
    type: file.type,
    name: file.name,
  } as any);

  const jsonFileName = 'imageSendCommand.json';
  const jsonFilePath = `${RNFS.default.TemporaryDirectoryPath}/${jsonFileName}`;
  await RNFS.default.writeFile(jsonFilePath, JSON.stringify(imageSendCommand), 'utf8');

  form.append('imageSendCommand', {
    uri: `file://${jsonFilePath}`,
    type: 'application/json',
    name: jsonFileName,
  } as any);

  return getData<void>(
    axiosInstance.post(`/chatroom/${chatroomId}/chat/image`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  );
};

// ====== WebSocket (STOMP) 헬퍼 ======
// 백엔드가 /ws 를 노출. STOMP 사용 시:
export type StompClient = import('@stomp/stompjs').Client;
export type IMessage = import('@stomp/stompjs').IMessage;

/**
 * WebSocket 연결 도우미
 * @param baseWsURL   예: ws://52.78.169.186/ws 또는 wss://your-domain/ws
 * @param onConnect   연결시 콜백
 * @param onMessage   구독 메시지 콜백
 * @param topics      구독 토픽 배열 (예: [`/topic/chatroom/${chatroomId}`, `/topic/chatCount/${chatroomId}`])
 */
export async function connectChatStomp(
  baseWsURL: string,
  onConnect: () => void,
  onMessage: (msg: IMessage) => void,
  topics: string[],
): Promise<StompClient> {
  const { Client } = await import('@stomp/stompjs');

  const client = new Client({
    brokerURL: baseWsURL,           // ex) 'wss://example.com/ws'
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
