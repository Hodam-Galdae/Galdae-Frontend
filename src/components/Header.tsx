// CustomHeader.tsx
import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
//import {  } from '../utils/ScreenScaler';
import styles from '../styles/Header.style';
import {SafeAreaView} from 'react-native-safe-area-context';
//import SVGButton from '../components/button/SVGButton';

export interface HeaderProps {
  leftButton?: React.ReactNode;
  title?: React.ReactNode;
  rightButton?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Header: React.FC<HeaderProps> = ({leftButton, title, rightButton, style}) => {
  return (
    <SafeAreaView style={[styles.headerContainer, style]}>
      <View style={styles.backContainer}>{leftButton}</View>
      <View style={styles.logoContainer}>
        {title && title }
      </View>
      <View style={styles.notificationContainer}>{rightButton}</View>
    </SafeAreaView>
  );
};

export default Header;
