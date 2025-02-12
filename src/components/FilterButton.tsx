import React from 'react';
import SVGTextButton from './SVGTextButton';
import { theme } from '../styles/theme';
//import { moderateScale } from '../utils/ScreenScaler';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import styles from '../styles/FilterButton.style';
import * as svgIcons from '../assets/svg'; // SVG 아이콘들이 export된 객체
import stylesheet from '../styles/stylesheet';

export interface FilterButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  // 필요에 따라 추가적인 prop들을 확장할 수 있습니다.
  iconName?: keyof typeof svgIcons;
  /** 버튼 텍스트, 기본값은 '필터'입니다. */
  text?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  // 그 외 SVGTextButton의 prop들은 FilterButton 내부에서 고정합니다.
}
/**
 * 필터버튼, svg와 이름 수정 가능
 */
const FilterButton: React.FC<FilterButtonProps> = ({
  onPress,
  disabled,
  iconName = 'Filter', // 기본 아이콘 이름, 필요 시 override 가능
  text = '필터',
  loading,
  buttonStyle,
  textStyle,
}) => {
  return (
    <SVGTextButton
        iconName={iconName}
        text={text}
        onPress={onPress}
        disabled={disabled}
        loading={loading}
        enabledColors={{
          backgroundColor: 'transparent',
          textColor: theme.colors.black,
          borderColor: theme.colors.black,
        }}
        disabledColors={{
          backgroundColor: 'transparent',
          textColor: theme.colors.gray1,
          borderColor: theme.colors.gray1,
        }}
        buttonStyle={[stylesheet.smallBorderTextBtn, buttonStyle]}
        textStyle={[stylesheet.smallBorderBtnText, textStyle]}
        SVGStyle={styles.filterIcon}
        accessibilityLabel="필터 버튼"
    />
  );
};


export default FilterButton;
