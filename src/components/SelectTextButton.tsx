import React, { useState } from 'react';
import BasicButton, { BasicButtonProps } from '../components/BasicButton';
import { theme } from '../styles/theme';
import stylesheet from '../styles/stylesheet';

export interface SelectableButtonProps extends BasicButtonProps {
  // 이 컴포넌트에서는 text, onPress, disabled, loading 등 기본 버튼 prop들을 그대로 사용합니다.
  // 필요한 경우, 추가적인 prop들을 확장할 수 있습니다.
}

const SelectTextButton: React.FC<SelectableButtonProps> = ({
  buttonStyle,
  textStyle,
  text,
  onPress,
  disabled,
  loading,
  accessibilityLabel,
  ...restProps
}) => {
  const [selected, setSelected] = useState<boolean>(false);

  const handlePress = () => {
    // 버튼을 누를 때마다 선택 상태를 토글
    setSelected(!selected);
    if (onPress) {
      onPress();
    }
  };

  // 선택 상태에 따른 색상 결정 (여기서 선택 시: 배경색은 brandColor, 텍스트 색상은 white)
  const defaultEnabledColors = selected
    ? {
        backgroundColor: theme.colors.brandColor,
        textColor: theme.colors.white,
        borderColor: 'transparent',
      }
    : {
        backgroundColor: theme.colors.lightGray,
        textColor: theme.colors.gray1,
        borderColor: 'transparent',
      };

  return (
    <BasicButton
      text={text}
      onPress={handlePress}
      disabled={disabled}
      loading={loading}
      enabledColors={defaultEnabledColors}
      // 기본 스타일과 전달받은 스타일을 병합하여 적용
      buttonStyle={[stylesheet.smallBorderTextBtn, buttonStyle]}
      textStyle={[stylesheet.smallBorderBtnText, textStyle]}
      accessibilityLabel={accessibilityLabel}
      {...restProps}
    />
  );
};

export default SelectTextButton;
