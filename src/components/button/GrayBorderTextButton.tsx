import React, { useState } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import BasicButton, { BasicButtonProps } from './BasicButton';
import { theme } from '../../styles/theme';
import stylesheet from '../../styles/stylesheet';

export interface SmallBorderTextButtonProps
  extends Omit<BasicButtonProps, 'text' | 'buttonStyle' | 'textStyle' | 'enabledColors' | 'disabledColors'> {
  text: string;
  isSelected?: boolean; // 외부에서 선택 여부를 전달할 수 있도록 추가
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
  isSelected,
  ...restProps
}) => {
  // 외부 isSelected prop이 제공되지 않으면 내부 상태를 사용
  const [internalSelected, setInternalSelected] = useState<boolean>(false);
  const selectedState = isSelected !== undefined ? isSelected : internalSelected;

  // 버튼 클릭 시 토글 처리 (외부 prop이 없을 경우에만) 및 부모 onPress 호출
  const handlePress = () => {
    if (isSelected === undefined) {
      setInternalSelected(!internalSelected);
    }
    if (onPress) {
      onPress();
    }
  };

  // 선택 상태에 따라 색상 변경
  const enabledColors = selectedState
    ? {
        backgroundColor: theme.colors.white,
        textColor: theme.colors.brandColor,
        borderColor: theme.colors.brandColor,
      }
    : {
        backgroundColor: theme.colors.white,
        textColor: theme.colors.gray0,
        borderColor: theme.colors.gray0,
      };
  return (
    <BasicButton
      text={text}
      onPress={handlePress}
      disabled={disabled}
      loading={loading}
      enabledColors={enabledColors}
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
