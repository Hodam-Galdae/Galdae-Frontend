import React, { useMemo } from 'react';
import {
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import stylesheet from '../../styles/stylesheet';
import { theme } from '../../styles/theme';
import SVG from '../../components/SVG';
import BasicText from './../BasicText';
import * as svgIcons from '../../assets/svg';
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
  SVGStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  text?: string; // text를 optional로 변경 (children 사용 시 대체)
  children?: React.ReactNode;
  iconName: keyof typeof svgIcons;
  iconPosition?: IconPosition;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  enabledColors?: ButtonColors;
  disabledColors?: ButtonColors;
  accessibilityLabel?: string;
}

const SVGTextButton: React.FC<SVGTextButtonProps> = React.memo(({
  buttonStyle,
  textStyle,
  style,
  SVGStyle,
  text,
  children,
  iconName,
  iconPosition = 'left',
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

  const colors = useMemo(() => isDisabled ? disabledColors : enabledColors, [isDisabled, disabledColors, enabledColors]);

  const renderContent = () => {
    // children이 있으면 우선 children을 렌더링하고, 없으면 text를 BasicText로 표시합니다.
    const contentNode = children ? children : <BasicText style={[styles.buttonText, { color: colors.textColor }, textStyle]}>{text}</BasicText>;
    if (iconPosition === 'left') {
      return (
        <>
          <SVG
            name={iconName}
            fill={colors.textColor}
            style={SVGStyle}
          />
          {contentNode}
        </>
      );
    } else {
      return (
        <>
          {contentNode}
          <SVG
            name={iconName}
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
          <View style={[styles.contentContainer, style]}>
            {renderContent()}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
});

export default SVGTextButton;
