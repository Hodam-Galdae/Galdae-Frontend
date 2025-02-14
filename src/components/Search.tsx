import React from 'react';
import { View, StyleProp, ViewStyle} from 'react-native';
import BasicInput from './BasicInput';
import SVGButton from '../components/button/SVGButton';
import styles from '../styles/Search.style';

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  onPressIcon?: () => void;
}

const Search: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = '목적지를 검색해주세요.',
  containerStyle,
  inputStyle,
  buttonStyle,
  iconStyle,
  onPressIcon,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <BasicInput
        text={placeholder}
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
      />
      <SVGButton
        iconName="Search"
        buttonStyle={[styles.button, buttonStyle]}
        SVGStyle={[styles.icon, iconStyle]}
        onPress={onPressIcon}
      />
    </View>
  );
};



export default Search;
