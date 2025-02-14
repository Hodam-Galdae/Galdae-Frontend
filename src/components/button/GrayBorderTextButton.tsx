import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import BasicButton, { BasicButtonProps } from './BasicButton';
import { theme } from '../../styles/theme';
import stylesheet from '../../styles/stylesheet';

export interface SmallBorderTextButtonProps
  extends Omit<BasicButtonProps, 'text' | 'buttonStyle' | 'textStyle' | 'enabledColors' | 'disabledColors'> {
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const GrayBorderTextButton: React.FC<SmallBorderTextButtonProps> = ({
  text,
  onPress,
  disabled,
  loading,
  buttonStyle,
  textStyle,
  accessibilityLabel,
  ...restProps
}) => {
  return (
    <BasicButton
      text={text}
      onPress={onPress}
      disabled={disabled}
      loading={loading}
      // 기본적으로 배경은 투명, 텍스트와 테두리 색상은 테마의 gray0를 사용 (활성 상태)
      enabledColors={{
        backgroundColor: 'transparent',
        textColor: theme.colors.gray0,
        borderColor: theme.colors.gray0,
      }}
      // 비활성 상태의 기본 색상 (원하는 대로 수정 가능)
      disabledColors={{
        backgroundColor: 'transparent',
        textColor: theme.colors.gray1,
        borderColor: theme.colors.gray1,
      }}
      buttonStyle={[stylesheet.smallBorderTextBtn, buttonStyle]}
      textStyle={[stylesheet.smallBorderBtnText, textStyle]}
      accessibilityLabel={accessibilityLabel}
      {...restProps}
    />
  );
};

export default GrayBorderTextButton;
