import axiosInstance from './axiosInstance';
import RNFS from 'react-native-fs';
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
 * 문의하기 API (RNFS로 JSON 파일 생성해서 전송)
 * POST /question
 */
export const createQuestion = async (
  tag: string,
  title: string,
  content: string,
  imageUri?: string
) => {
  const formData = new FormData();

  // 1. JSON 파일 생성
  const jsonData = { tag, title, content };
  const fileName = `question_${Date.now()}.json`;
  const filePath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
  await RNFS.writeFile(filePath, JSON.stringify(jsonData), 'utf8');

  // 2. JSON 파일 FormData에 추가
  formData.append('questionCreateRequest', {
    uri: `file://${filePath}`,
    type: 'application/json',
    name: fileName,
  } as any);

  // 3. 이미지 추가
  if (imageUri && imageUri.startsWith('file://')) {
    formData.append('questionImage', {
      uri: imageUri,
      type: 'image/png',
      name: 'question.png',
    } as any);
  }

  // 4. 디버깅용 로그
  const unsafeFormData = formData as any;
  for (const part of unsafeFormData._parts) {
    console.log('📦 formData:', part[0], part[1]);
  }

  // 5. 요청
  try {
    const response = await axiosInstance.post('/question', formData);
    console.log('✅ [문의하기 성공]', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [문의하기 실패]', error.response?.data || error);
    throw error;
  }
};
