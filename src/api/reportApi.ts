import axiosInstance from './axiosInstance';


export interface ReportResponse {
  id: string;
}

export interface ReportPayload {
  reportRequestDto: {
    reported: string;
    reportContent: string;
  };
  image?: string; // 이미지 URI
}

export const createReport = async (payload: ReportPayload): Promise<ReportResponse> => {
  const formData = new FormData();

  // reportRequestDto를 JSON Blob으로 추가
  // React Native에서 JSON 파트는 name과 type을 명시해야 함
  const jsonPart = {
    string: JSON.stringify(payload.reportRequestDto),
    type: 'application/json',
    name: 'reportRequestDto.json', // 파일명 추가
  };

  formData.append('reportRequestDto', jsonPart as any);

  // 이미지가 있는 경우 추가
  if (payload.image) {
    const fileName = payload.image.split('/').pop() || 'report.jpg';
    const fileType = fileName.endsWith('.png') ? 'image/png' : 'image/jpeg';

    const imageFile = {
      uri: payload.image,
      name: fileName,
      type: fileType,
    };

    formData.append('image', imageFile as any);
  }

  console.log('📤 [신고 API] FormData 전송');
  console.log('📋 [신고 API] reportRequestDto:', payload.reportRequestDto);
  console.log('🖼️ [신고 API] image:', payload.image ? '있음' : '없음');

  const res = await axiosInstance.post<ReportResponse>('/report', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
