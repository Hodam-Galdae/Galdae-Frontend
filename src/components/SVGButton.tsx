import React, { useMemo } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle, ActivityIndicator } from 'react-native';
import stylesheet from '../styles/stylesheet';
import { theme } from '../styles/theme';
import styles from '../styles/BasicButton.style';
import { moderateScale } from '../utils/ScreenScaler';
import SVG from '../components/SVG';
import * as svgIcons from '../assets/svg';


export interface ButtonColors {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

export interface SVGButtonProps {
  buttonStyle?: StyleProp<ViewStyle>;
  SVGStyle?:StyleProp<ViewStyle>;
  // iconName는 ../assets/svg/index.ts 에서 export하는 아이콘 이름이어야 합니다.
  iconName: keyof typeof svgIcons;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  enabledColors?: ButtonColors;   // 버튼 활성화 시 색상 객체
  disabledColors?: ButtonColors;  // 버튼 비활성화 시 색상 객체
  accessibilityLabel?: string;
}
/**
 * SVG만으로 구성된 버튼
 */
const SVGButton: React.FC<SVGButtonProps> = React.memo(({
  buttonStyle,
  SVGStyle,
  iconName,
  onPress,
  disabled,
  loading,
  enabledColors = {
    backgroundColor: theme.colors.disabledBorder,
    textColor: theme.colors.enabledText,
    borderColor: theme.colors.disabledBorder,
  },
  disabledColors = {
    backgroundColor: theme.colors.disabledBorder,
    textColor: theme.colors.disabledText,
    borderColor: theme.colors.disabledBorder,
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
          <SVG
            name={iconName}
            width={moderateScale(50)}
            height={moderateScale(50)}
            fill={colors.textColor}
            style={SVGStyle}
          />
        )}
      </View>
    </TouchableOpacity>
  );
});

export default SVGButton;
