import React, { useMemo } from 'react';
import { Text, Platform, TextStyle, TextProps, StyleSheet } from 'react-native';

// 기본 폰트 이름 (Noto Sans CJK KR)
const fontName = 'NotoSansKR';

// iOS와 Android에서 공용으로 사용할 폰트 매핑 객체
const fontMapping: { [key: string]: string } = {
  '100': `${fontName}-Thin`,
  '200': `${fontName}-ExtraLight`,
  '300': `${fontName}-Light`,
  '400': `${fontName}-Regular`,
  '500': `${fontName}-Medium`,
  '600': `${fontName}-SemiBold`,
  '700': `${fontName}-Bold`,
  '800': `${fontName}-ExtraBold`,
  '900': `${fontName}-Black`,
};

interface RNTextProps extends TextProps {
  children?: React.ReactNode;
  text?: string;
}

const BasicText: React.FC<RNTextProps> = ({ text, children, style, ...props }) => {
  // 전달된 스타일을 평탄화하여 사용
  const flatStyle: TextStyle | undefined = StyleSheet.flatten(style);

  // flatStyle.fontWeight의 타입은 string | number | undefined 이므로, 기본값 '400'을 할당하고,
  // 값이 있을 경우 문자열로 변환합니다.
  let weight: string = '400';
  if (flatStyle && flatStyle.fontWeight !== undefined) {
    weight =
      typeof flatStyle.fontWeight === 'number'
        ? flatStyle.fontWeight.toString()
        : flatStyle.fontWeight;
  }

  // useMemo를 사용하여 플랫폼별 폰트 스타일 계산 (폰트 굵기가 변경될 때만 재계산)
  const platformStyle = useMemo(() => {
    return Platform.select({
      // iOS와 Android 모두 동일하게 적용 (필요하다면 각 플랫폼에 맞게 분리 가능)
      ios: { fontFamily: fontMapping[weight] || fontMapping['400'] },
      android: { fontFamily: fontMapping[weight] || fontMapping['400'] },
    }) as TextStyle;
  }, [weight]);

  return (
    <Text {...props} style={[style, platformStyle]}>
      {children ?? text}
    </Text>
  );
};

export default BasicText;
