/* eslint-disable quotes */
import React, { useMemo } from "react";
import {
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";

import stylesheet from "../../styles/stylesheet";
import { theme } from "../../styles/theme";
import styles from '../../styles/BasicButton.style';
import BasicText from "../BasicText";

export interface ButtonColors {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

export interface BasicButtonProps {
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  enabledColors?: ButtonColors;   // 버튼 활성화 시 색상 객체
  disabledColors?: ButtonColors;  // 버튼 비활성화 시 색상 객체
  accessibilityLabel?: string;
}
/**
 * 기본 버튼 스타일
 */
const BasicButton: React.FC<BasicButtonProps> = React.memo(({ //리렌더링 방지
  buttonStyle,
  textStyle,
  text,
  onPress,
  disabled,
  loading,
  enabledColors = {
    backgroundColor: theme.colors.Galdae,
    textColor: theme.colors.white,
    borderColor: theme.colors.transparent,
  },
  disabledColors = {
    backgroundColor: theme.colors.grayV0,
    textColor:  theme.colors.grayV1,
    borderColor: theme.colors.transparent,
  },
  //시각 장애인이나 다른 보조 기술(예: 스크린 리더)을 사용하는 사용자가 앱을 더 쉽게 이용할 수 있도록 버튼이나 다른 UI 요소에 설명을 제공하는 역할
  accessibilityLabel,
}) => {
  const isDisabled = disabled || loading;

  // useMemo를 사용하여 색상 값을 메모이제이션
  const colors = useMemo(() => {
    return isDisabled ? disabledColors : enabledColors;
  }, [isDisabled, disabledColors, enabledColors]);

  return (
    <TouchableOpacity
      onPress={!isDisabled ? onPress : undefined}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel || text}
      accessible
    >
      <View
        style={[
          stylesheet.rowAndCentered,
          { backgroundColor: colors.backgroundColor, borderColor: colors.borderColor },
          styles.buttonContainer,
          buttonStyle,
        ]}
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.textColor} />
        ) : (
          <BasicText
            style={[
            styles.buttonText,
              { color: colors.textColor },
              textStyle,
            ]}
            text={text || ''}
          />
        )}
      </View>
    </TouchableOpacity>
  );
});


export default BasicButton;
