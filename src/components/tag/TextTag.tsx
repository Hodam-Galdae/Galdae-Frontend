import React, { useMemo } from 'react';
import { StyleProp, View, ViewStyle, TextStyle } from 'react-native';
import stylesheet from '../../styles/stylesheet';
import { theme } from '../../styles/theme';
import BasicText from './../BasicText';
import styles from '../../styles/TextTag.style';
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
}

const TextTag: React.FC<BasicDisplayProps> = ({
  viewStyle,
  textStyle,
  text,
  enabledColors = {
    backgroundColor: theme.colors.white,
    textColor: theme.colors.brandColor,
    borderColor: theme.colors.brandColor,
  },
}) => {
  // enabledColors 값을 메모이제이션 (여기서는 인터랙션이 없으므로 그대로 사용)
  const colors = useMemo(() => enabledColors, [enabledColors]);

  return (
    <View
      style={[
        stylesheet.rowAndCentered,stylesheet.smallBorderTextTag,
        { backgroundColor: colors.backgroundColor, borderColor: colors.borderColor },
        styles.container,
        viewStyle,
      ]}
    >
      <BasicText style={[styles.text, stylesheet.smallBorderBtnText,{ color: colors.textColor }, textStyle]}>
        {text}
      </BasicText>
    </View>
  );
};



export default TextTag;
