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
 * 문의하기 API
 * POST /question
 * @param tag 태그
 * @param title 제목
 * @param content 내용
 * @param questionImage (선택) 이미지 URL 문자열
 */
export const createQuestion = async (
  tag: string,
  title: string,
  content: string,
  questionImage?: string
) => {
  console.log('🚀 [문의하기 요청] POST /question');
  console.log('📌 요청 데이터:', { tag, title, content, questionImage });

  try {
    const response = await axiosInstance.post('/question', {
      questionCreateRequest: {
        tag,
        title,
        content,
      },
      questionImage: questionImage ?? null,
    });
    console.log('✅ [문의하기 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [문의하기 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};
