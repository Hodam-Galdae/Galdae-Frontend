import axiosInstance from './axiosInstance';

export interface ReportResponse {
    id: string;
}

export const createReport = async (form: any): Promise<ReportResponse> => {
    const response = await axiosInstance.post<ReportResponse>('/report', form);
    return response.data;
};
