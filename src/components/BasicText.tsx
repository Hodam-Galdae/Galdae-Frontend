import React, { useMemo } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

// 기본 폰트 이름 (Noto Sans CJK KR)
const fontName = 'NotoSansKR';

// 폰트 매핑: 각 폰트 굵기에 따른 폰트 패밀리 이름
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

export interface BasicTextProps extends TextProps {
  children?: React.ReactNode;
  text?: string;
  fontWeight?: string | number;
  fontSize?: number;
  color?: string;
}

const BasicText: React.FC<BasicTextProps> = ({
  children,
  text,
  fontWeight,
  fontSize,
  color,
  style,
  ...props
}) => {
  // 기본적으로 fontWeight가 없으면 '400'
  const weight: string = fontWeight
    ? typeof fontWeight === 'number'
      ? fontWeight.toString()
      : fontWeight
    : '400';

  // 폰트 매핑 객체를 통해 fontFamily 결정 (없으면 '400' 사용)
  const fontFamily = fontMapping[weight] || fontMapping['400'];

  // useMemo를 사용하여 computedStyle 계산: fontFamily, fontSize, color
  const computedStyle: TextStyle = useMemo(() => {
    return {
      fontFamily,
      ...(fontSize ? { fontSize } : {}),
      ...(color ? { color } : {}),
    };
  }, [fontFamily, fontSize, color]);

  return (
    <Text {...props} style={[style, computedStyle]}>
      {children ?? text}
    </Text>
  );
};

export default BasicText;
