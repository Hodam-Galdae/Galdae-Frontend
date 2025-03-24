import axiosInstance from './axiosInstance';

/**
 * 내 문의 목록 조회 API
 * GET /question/my-list
 */
export const getMyQuestions = async () => {
  console.log('🚀 [내 문의 목록 조회 요청] GET /question/my-list');

  try {
    const response = await axiosInstance.get('/question/my-list');
    console.log('✅ [내 문의 목록 조회 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [내 문의 목록 조회 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};

/**
 * FAQ 조회 API
 * GET /question/list?tag=xxx
 * @param tag FAQ 태그
 */
export const getFaqList = async (tag: string) => {
  console.log('🚀 [FAQ 조회 요청] GET /question/list');
  console.log('📌 요청 파라미터:', tag);

  try {
    const response = await axiosInstance.get('/question/list', {
      params: { tag },
    });
    console.log('✅ [FAQ 조회 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [FAQ 조회 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};

/**
 * 문의하기 API (이미지 포함 FormData 방식)
 * POST /question
 * @param tag 태그
 * @param title 제목
 * @param content 내용
 * @param imageUri 이미지 경로 (file:///...)
 */
export const createQuestion = async (
    tag: string,
    title: string,
    content: string,
    imageUri?: string
  ) => {
    const formData = new FormData();

    // 👉 그냥 문자열로 append (Blob ❌)
    formData.append(
      'questionCreateRequest',
      JSON.stringify({ tag, title, content }) as any
    );

    // 이미지 파일 append
    if (imageUri && imageUri.startsWith('file://')) {
      formData.append('questionImage', {
        uri: imageUri,
        type: 'image/png',
        name: 'question.png',
      } as any);
    }
    const unsafeFormData = formData as any;

for (const part of unsafeFormData._parts) {
  console.log('📦 formData:', part[0], part[1]);
}
    try {
      const response = await axiosInstance.post('/question', formData);
      console.log('✅ [문의하기 성공]', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ [문의하기 실패]', error.response?.data || error);
      throw error;
    }
  };
