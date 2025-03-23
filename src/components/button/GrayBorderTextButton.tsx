import React,{useState} from 'react';
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
  // 버튼 선택 상태 (true: 선택됨, false: 선택되지 않음)
  const [selected, setSelected] = useState<boolean>(false);

  // 버튼 클릭 시 토글 처리 및 부모의 onPress 호출
  const handlePress = () => {
    setSelected(!selected);
    if (onPress) {
      onPress();
    }
  };
  // 선택 상태에 따라 색상 변경
  const enabledColors = selected
  ? {
      backgroundColor: theme.colors.white, // 선택된 상태: 배경색 채움
      textColor: theme.colors.brandColor,         // 텍스트 색상 흰색
      borderColor: theme.colors.brandColor,
    }
  : {
      backgroundColor: theme.colors.white,        // 미선택 상태: 배경 투명
      textColor: theme.colors.gray0,
      borderColor: theme.colors.gray0,
    };
  return (
    <BasicButton
      text={text}
      onPress={handlePress}
      disabled={disabled}
      loading={loading}
      // 기본적으로 배경은 투명, 텍스트와 테두리 색상은 테마의 gray0를 사용 (활성 상태)
      enabledColors={enabledColors}
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
