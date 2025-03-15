import axiosInstance from './axiosInstance';

export interface User {
    id: number;
    name: string;
    email: string;
  }


// 전체 사용자 목록 가져오기
export const getUsers = async (): Promise<User[]> => {
    const response = await axiosInstance.get<User[]>('/users');
    return response.data;
  };
