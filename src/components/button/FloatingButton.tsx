import React from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import SVG from '../SVG';
import { theme } from '../../styles/theme';
import stylesheet from '../../styles/stylesheet';
export interface FloatingButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  iconName?: any; // string 대신 IconNames
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress, style,iconName = 'Add' }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[stylesheet.floatingBtn, style]}>
      <SVG name={iconName} width={24} height={24} fill={theme.colors.white} />
    </TouchableOpacity>
  );
};


export default FloatingButton;
