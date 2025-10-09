import axiosInstance from './axiosInstance';


export interface ReportResponse {
  id: string;
}

export interface ReportPayload {
  reportRequestDto: {
    reported: string;
    reportContent: string;
  };
  image?: string; // URL or base64 등 서버가 기대하는 문자열
}

export const createReport = async (payload: ReportPayload): Promise<ReportResponse> => {
  const res = await axiosInstance.post<ReportResponse>('/report', payload);
  return res.data;
};
