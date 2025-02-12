import React, { useMemo } from 'react';
import { StyleProp, View, ViewStyle, TextStyle } from 'react-native';
import stylesheet from '../styles/stylesheet';
import { theme } from '../styles/theme';
import BasicText from './BasicText';
import styles from '../styles/TextTag.style';
import SVG from '../components/SVG';
import * as svgIcons from '../assets/svg';
//import { moderateScale } from '../utils/ScreenScaler';

export interface DisplayColors {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

export interface BasicDisplayProps {
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text?: string;
  // 표시용 색상 객체, 기본값은 기본 글꼴 색상으로 설정
  enabledColors?: DisplayColors;
  // SVG 아이콘 관련 prop:
  // iconName: '../assets/svg/index.ts'에서 export한 키(key) (예: "SomeIcon")
  // iconPosition: 'left' | 'right' (기본값은 'left'로, SVG가 텍스트 왼쪽에 배치됨)
  // iconStyle: 추가 아이콘 스타일
  iconName?: keyof typeof svgIcons;
  iconPosition?: 'left' | 'right';
  iconStyle?: StyleProp<ViewStyle>;
}

const SVGTextTag: React.FC<BasicDisplayProps> = ({
  viewStyle,
  textStyle,
  text,
  enabledColors = {
    backgroundColor: theme.colors.white,
    textColor: theme.colors.brandColor,
    borderColor: theme.colors.brandColor,
  },
  iconName,
  iconPosition = 'left',
  iconStyle,
}) => {
  // enabledColors 값을 메모이제이션 (여기서는 인터랙션이 없으므로 그대로 사용)
  const colors = useMemo(() => enabledColors, [enabledColors]);

  return (
    <View
      style={[
        stylesheet.rowAndCentered,
        stylesheet.smallBorderTextBtn,
        { backgroundColor: colors.backgroundColor, borderColor: colors.borderColor },
        styles.container,
        viewStyle,
      ]}
    >
      {/* iconName이 있고 iconPosition이 'left'이면 먼저 SVG 아이콘 렌더링 */}
      {iconName && iconPosition === 'left' && (
        <SVG
          name={iconName}
          style={iconStyle}
        //   width={moderateScale(18)}
        //   height={moderateScale(18)}
          fill={colors.textColor}
        />
      )}
      <BasicText style={[styles.text, stylesheet.smallBorderBtnText, { color: colors.textColor }, textStyle]}>
        {text}
      </BasicText>
      {/* iconName이 있고 iconPosition이 'right'이면 텍스트 이후에 SVG 아이콘 렌더링 */}
      {iconName && iconPosition === 'right' && (
        <SVG
          name={iconName}
          style={iconStyle}
        //   width={moderateScale(18)}
        //   height={moderateScale(18)}
          fill={colors.textColor}
        />
      )}
    </View>
  );
};

export default SVGTextTag;
