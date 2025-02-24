import React, { useMemo } from 'react';
import {
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,

} from 'react-native';
//import {  } from '../utils/ScreenScaler';
import stylesheet from '../../styles/stylesheet';
import { theme } from '../../styles/theme';
import SVG from '../../components/SVG';
import BasicText from './../BasicText';
import * as svgIcons from '../../assets/svg'; // SVG 아이콘들이 export된 객체
import styles from '../../styles/BasicButton.style';

export interface ButtonColors {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

export type IconPosition = 'left' | 'right';

export interface SVGTextButtonProps {
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  SVGStyle?:StyleProp<ViewStyle>;
  style?:StyleProp<ViewStyle>;
  text: string;
  // 아이콘 이름은 '../assets/svg/index.ts'에서 export한 키(key)여야 합니다.
  iconName: keyof typeof svgIcons;
  // 아이콘이 텍스트의 어느 위치에 올지 결정 (기본값 'left')
  iconPosition?: IconPosition;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  enabledColors?: ButtonColors;   // 활성화 상태 색상
  disabledColors?: ButtonColors;  // 비활성화 상태 색상
  accessibilityLabel?: string;
}

const SVGTextButton: React.FC<SVGTextButtonProps> = React.memo(({
  buttonStyle,
  textStyle,
  style,
  SVGStyle,
  text,
  iconName,
  iconPosition = 'left',  // 기본값을 'left'로 지정
  onPress,
  disabled,
  loading,
  enabledColors = {
    backgroundColor: theme.colors.brandColor,
    textColor: theme.colors.white,
    borderColor: theme.colors.transparent,
  },
  disabledColors = {
    backgroundColor: theme.colors.gray0,
    textColor: theme.colors.gray1,
    borderColor: theme.colors.transparent,
  },
  accessibilityLabel,
}) => {
  const isDisabled = disabled || loading;

  // 활성/비활성 상태에 따라 색상 객체를 메모이제이션
  const colors = useMemo(() => {
    return isDisabled ? disabledColors : enabledColors;
  }, [isDisabled, disabledColors, enabledColors]);

  // 아이콘과 텍스트의 순서를 결정하는 함수
  const renderContent = () => {
    if (iconPosition === 'left') {
      return (
        <>
          <SVG
            name={iconName}
            // width={(24)}
            // height={(24)}
            fill={colors.textColor}
            style={SVGStyle}
          />
          <BasicText style={[styles.buttonText, { color: colors.textColor }, textStyle]}>
            {text}
          </BasicText>
        </>
      );
    } else {
      return (
        < >
          <BasicText style={[styles.buttonText, { color: colors.textColor }, textStyle]}>
            {text}
          </BasicText>
          <SVG
            name={iconName}
            // width={(24)}
            // height={(24)}
            fill={colors.textColor}
            style={SVGStyle}
          />
        </>
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={!isDisabled ? onPress : undefined}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel}
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
          <View style={[styles.contentContainer ,style]}>
            {renderContent()}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
});

export default SVGTextButton;
