import axiosInstance from './axiosInstance';

export interface ChatroomResponse {
  chatroomId: string;
  departPlace: string;
  arrivePlace: string;
  departDate: Date;
  maxMemberCount: number;
  currentMemberCount: number;
  gender: string
}

export interface ChatResponse {
  chatId: number;
  chatContent: string;
  chatType: string;
  sender: string;
  time: Date;
  memberImage?: string;
}

export interface MemberResponse {
  memberId: string;
  memberName: string;
  memberImage: string;
}


// ✅ 채팅 가져오기
export const getChats = async (chatroomId: string): Promise<ChatResponse[]> => {
  const response = await axiosInstance.get<ChatResponse[]>('/chat/' + chatroomId);
  return response.data;
};

// ✅ 활성 채팅방 가져오기
export const getActiveChatroom = async (): Promise<ChatroomResponse[]> => {
  const response = await axiosInstance.get<ChatroomResponse[]>('/chat/active');
  return response.data;
};

// ✅ 비활성 채팅방 가져오기
export const getInActiveChatroom = async (): Promise<ChatroomResponse[]> => {
  const response = await axiosInstance.get<ChatroomResponse[]>('/chat/active');
  return response.data;
};

// ✅ 채팅방 인원 가져오기
export const getMembers = async (chatroomId: string): Promise<MemberResponse[]> => {
  const response = await axiosInstance.get<MemberResponse[]>('/chat/' + chatroomId + '/member');
  return response.data;
};

// ✅ 채팅방 나가기
export const exitChatroom = async (chatroomId: string): Promise<void> => {
  await axiosInstance.delete('/chat/' + chatroomId);
};
