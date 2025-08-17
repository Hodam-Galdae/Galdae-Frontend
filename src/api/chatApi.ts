import axiosInstance from './axiosInstance';

export interface ChatroomResponse {
  chatroomId: string;
  departPlace: string;
  arrivePlace: string;
  departDate: string;
  maxMemberCount: number;
  currentMemberCount: number;
  gender: string;
  isRoomManager: boolean;
  notReadCount: number;
}

export interface ChatResponse {
  chatId: number;
  chatContent: string;
  chatType: string;
  sender: string;
  time: string;
  memberImage?: string;
}

export interface MemberResponse {
  memberId: string;
  memberName: string;
  memberImage: string;
}

export interface PaymentResponse {
  id: number;
  totalCost: number;
  personalCost: number;
  depositor: string;
  accountNumber: string;
  bankType: string;
  requestTime: string;
  members: PaymentUserReponse[];
}

export interface PaymentUserReponse {
  id: string;
  name: string;
  image: string;
}

export interface ImageResponse {
  url: string;
}

// ✅ 채팅 가져오기
export const getChats = async (chatroomId: string): Promise<ChatResponse[]> => {
  const response = await axiosInstance.get<ChatResponse[]>(
    '/chat/' + chatroomId,
  );
  return response.data;
};

// ✅ 활성 채팅방 가져오기
export const getActiveChatroom = async (): Promise<ChatroomResponse[]> => {
  const response = await axiosInstance.get<ChatroomResponse[]>('/chat/active');
  return response.data;
};

// ✅ 비활성 채팅방 가져오기
export const getInActiveChatroom = async (): Promise<ChatroomResponse[]> => {
  const response = await axiosInstance.get<ChatroomResponse[]>(
    '/chat/inactive',
  );
  return response.data;
};

// 채팅방 참여여
export const joinChatroom = async (
  postId: string,
): Promise<ChatroomResponse> => {
  const response = await axiosInstance.get<ChatroomResponse>(
    `/chat/${postId}/join`,
  );
  return response.data;
};

// ✅ 채팅방 인원 가져오기
export const getMembers = async (
  chatroomId: string,
): Promise<MemberResponse[]> => {
  const response = await axiosInstance.get<MemberResponse[]>(
    '/chat/' + chatroomId + '/member',
  );
  return response.data;
};

// ✅ 채팅방 나가기
export const exitChatroom = async (chatroomId: string): Promise<void> => {
  await axiosInstance.delete('/chat/' + chatroomId);
};

export const sendImage = async (image: FormData): Promise<string> => {
  const response = await axiosInstance.post('/chat/image', image, {
    transformRequest: () => {
      return image;
    },
  });
  return response.data.url;
};

// 정산 내역 가져오기
export const getPayment = async (
  chatroomId: string,
): Promise<PaymentResponse> => {
  const response = await axiosInstance.get<PaymentResponse>(
    `/chat/${chatroomId}/payment`,
  );
  return response.data;
};

// 정산 내역 유저 가져오기
export const getPaymentUser = async (
  chatroomId: string,
): Promise<PaymentUserReponse[]> => {
  const response = await axiosInstance.get<PaymentUserReponse[]>(
    `/chat/${chatroomId}/payment/user`,
  );
  return response.data;
};
