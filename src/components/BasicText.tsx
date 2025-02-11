import React, { useMemo } from 'react';
import { Text, Platform, TextStyle, TextProps, StyleSheet } from 'react-native';
import styles from '../styles/BasicText.style';


const fontName = 'Inter_24pt';
const androidFontMap: { [key: string]: string } = {
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
  // 전달된 스타일을 평탄화
  const flatStyle: TextStyle | undefined = StyleSheet.flatten(style);

  // flatStyle.fontWeight의 타입은 string | number | undefined이므로,
  // 기본값 '400'을 할당하고, 값이 있을 경우 문자열로 변환합니다.
  let weight: string = '400';
  if (flatStyle && flatStyle.fontWeight !== undefined) {
    weight =
      typeof flatStyle.fontWeight === 'number'
        ? flatStyle.fontWeight.toString()
        : flatStyle.fontWeight;
  }

  // useMemo를 사용하여 플랫폼별 폰트 스타일을 계산
  const platformStyle = useMemo(() => {
    return Platform.select({
      ios: { fontWeight: weight, fontFamily: 'Inter_24pt-Regular' },
      android: { fontFamily: androidFontMap[weight] || androidFontMap['400'] },
    }) as TextStyle;
  }, [weight]);

  return (
    <Text {...props} style={[style, platformStyle , styles.text]}>
      {children ?? text}
    </Text>
  );
};

export default BasicText;
