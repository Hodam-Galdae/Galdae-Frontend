import React from 'react';
import {View} from 'react-native';
import SVG from './SVG';
import styles from '../styles/SearchBar.style';
import BasicButton from './button/BasicButton';

type SearchBarProps = {
  text: string;
  textColor: string;
  onPress: () => void;
};

const SearchBar = ({text, onPress}: SearchBarProps) => {
  return (
    <View style={styles.searchContainer}>
      <BasicButton
        text={text}
        textStyle={styles.searchInput}
        onPress={onPress}
      />
      <SVG name="Search" style={styles.searchIcon} />
    </View>
  );
};

export default SearchBar;
