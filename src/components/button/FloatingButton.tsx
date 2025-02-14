import React from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import SVG from '../../components/SVG';
import { moderateScale } from '../../utils/ScreenScaler';
import { theme } from '../../styles/theme';
import stylesheet from '../../styles/stylesheet';
export interface FloatingButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  iconName?: string; // 기본 아이콘 이름을 "Add"로 사용. 외부에서 다른 이름 전달 가능.
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[stylesheet.floatingBtn, style]}>
      <SVG name="Add" width={moderateScale(24)} height={moderateScale(24)} fill={theme.colors.white} />
    </TouchableOpacity>
  );
};


export default FloatingButton;
