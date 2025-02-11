import React, { useMemo } from 'react';
import {
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,

} from 'react-native';
import { moderateScale } from '../utils/ScreenScaler';
import stylesheet from '../styles/stylesheet';
import { theme } from '../styles/theme';
import SVG from '../components/SVG';
import BasicText from './BasicText';
import * as svgIcons from '../assets/svg'; // SVG 아이콘들이 export된 객체
import styles from '../styles/BasicButton.style';

export interface ButtonColors {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

export interface SVGTextButtonProps {
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text: string;
  // 아이콘 이름은 '../assets/svg/index.ts'에서 export한 키(key)여야 합니다.
  iconName: keyof typeof svgIcons;
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
  text,
  iconName,
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
          <View style={styles.contentContainer}>
            {/* SVG 아이콘 */}
            <SVG
              name={iconName}
              width={moderateScale(24)}
              height={moderateScale(24)}
              fill={colors.textColor}
            />
            {/* 텍스트 */}
            <BasicText style={[styles.buttonText, { color: colors.textColor }, textStyle]}>
              {text}
            </BasicText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
});



export default SVGTextButton;
