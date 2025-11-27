/**
 * 대학교 이름에서 괄호 안의 내용을 제거하여 짧은 버전을 반환합니다.
 * 예: "건국대학교(글로캠)" -> "건국대학교"
 * 예: "가천대학교" -> "가천대학교"
 */
export const getShortUniversityName = (fullName: string): string => {
  if (!fullName) {
    return fullName;
  }

  // 괄호와 그 안의 내용을 제거하고, 앞뒤 공백 제거
  return fullName.replace(/\(.*?\)/g, '').trim();
};

/**
 * 대학교 이름을 더 짧게 줄입니다.
 * "대학교"를 "대"로 변경하고 모든 공백 제거
 * 예: "건국대학교" -> "건국대"
 * 예: " 가천 대학교 " -> "가천대"
 */
export const getShorterUniversityName = (fullName: string): string => {
  if (!fullName) {
    return fullName;
  }

  // 1. 괄호 제거
  const withoutParenthesis = getShortUniversityName(fullName);

  // 2. "대학교"를 "대"로 변경
  const shortened = withoutParenthesis.replace(/대학교/g, '대');

  // 3. 모든 공백 제거 (앞뒤뿐만 아니라 중간 공백도)
  return shortened.replace(/\s+/g, '');
};
