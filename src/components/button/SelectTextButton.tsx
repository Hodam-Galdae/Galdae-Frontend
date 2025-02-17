import React, { useState } from 'react';
import BasicButton, { BasicButtonProps } from './BasicButton';
import { theme } from '../../styles/theme';
import stylesheet from '../../styles/stylesheet';

export interface SelectableButtonProps extends BasicButtonProps {
  selectedColors?: {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
  };
  unselectedColors?: {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
  };
}

const SelectTextButton: React.FC<SelectableButtonProps> = ({
  buttonStyle,
  textStyle,
  text,
  onPress,
  disabled,
  loading,
  accessibilityLabel,
  selectedColors,
  unselectedColors,
  ...restProps
}) => {
  const [selected, setSelected] = useState<boolean>(false);

  const handlePress = () => {
    setSelected(!selected);
    if (onPress) {
      onPress();
    }
  };

  // 기본 선택된 상태 색상 (선택된 경우)
  const defaultSelectedColors = {
    backgroundColor: theme.colors.brandColor,
    textColor: theme.colors.white,
    borderColor: 'transparent',
    ...selectedColors, // 전달된 값으로 덮어쓰기
  };

  // 기본 선택되지 않은 상태 색상
  const defaultUnselectedColors = {
    backgroundColor: theme.colors.lightGray,
    textColor: theme.colors.gray1,
    borderColor: 'transparent',
    ...unselectedColors, // 전달된 값으로 덮어쓰기
  };

  const enabledColors = selected ? defaultSelectedColors : defaultUnselectedColors;

  return (
    <BasicButton
      text={text}
      onPress={handlePress}
      disabled={disabled}
      loading={loading}
      enabledColors={enabledColors}
      buttonStyle={[stylesheet.smallBorderTextBtn, buttonStyle]}
      textStyle={[stylesheet.smallBorderBtnText, textStyle]}
      accessibilityLabel={accessibilityLabel}
      {...restProps}
    />
  );
};

export default SelectTextButton;
