// SearchHeader.tsx - 검색 화면 전용 헤더
import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import styles from '../styles/SearchHeader.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import SVGButton from './button/SVGButton';
import InputText from './BasicInput';

export interface SearchHeaderProps {
  onBackPress: () => void;
  placeholder?: string;
  placeholderColor?: string;
  searchValue: string;
  onSearchChange: (text: string) => void;
  onIconPress: () => void;
  onSubmit?: () => void;
  iconName: 'Search' | 'Cancel';
  style?: StyleProp<ViewStyle>;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  onBackPress,
  placeholder = '검색어를 입력하세요.',
  placeholderColor = '#D2D6DE',
  searchValue,
  onSearchChange,
  onIconPress,
  onSubmit,
  iconName,
  style,
}) => {
  return (
    <SafeAreaView style={[styles.headerContainer, style]}>
      <View style={styles.backButton}>
        <SVGButton iconName="arrow_left_line" onPress={onBackPress} />
      </View>

      <View style={styles.searchInputContainer}>
        <InputText
          text={placeholder}
          textColor={placeholderColor}
          value={searchValue}
          onChangeText={onSearchChange}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
          style={styles.searchInput}
        />
        <SVGButton
          iconName={iconName}
          onPress={onIconPress}
          buttonStyle={styles.searchIconInside}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchHeader;
