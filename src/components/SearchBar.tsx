import React from 'react';
import {View} from 'react-native';
import BasicInput from './BasicInput';
import SVG from './SVG';
import styles from '../styles/SearchBar.style';

type SearchBarProps = {
  text: string;
  textColor: string;
};

const SearchBar = ({text, textColor}: SearchBarProps) => {
  return (
    <View style={styles.searchContainer}>
      <BasicInput
        text={text}
        style={styles.searchInput}
        textColor={textColor}
      />
      <SVG name="Search" style={styles.searchIcon} />
    </View>
  );
};

export default SearchBar;
