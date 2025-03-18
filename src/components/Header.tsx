// CustomHeader.tsx
import React from 'react';
import {View} from 'react-native';
import SVG from '../components/SVG';
//import {  } from '../utils/ScreenScaler';
import styles from '../styles/Header.style';
import {SafeAreaView} from 'react-native-safe-area-context';
//import SVGButton from '../components/button/SVGButton';

export interface HeaderProps {
  leftButton?: React.ReactNode;
  title?: React.ReactNode;
  rightButton?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({leftButton, title, rightButton}) => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.backContainer}>{leftButton}</View>
      <View style={styles.logoContainer}>
        {title ? title : <SVG name="GaldaeLogo" width={81} height={32} />}
      </View>
      <View style={styles.notificationContainer}>{rightButton}</View>
    </SafeAreaView>
  );
};

export default Header;
