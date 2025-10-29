// CustomHeader.tsx
import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
//import {  } from '../utils/ScreenScaler';
import styles from '../styles/Header.style';
import { SafeAreaView } from 'react-native';

export interface HeaderProps {
  leftButton?: React.ReactNode;
  title?: React.ReactNode;
  rightButton?: React.ReactNode;
  leftStyle?: StyleProp<ViewStyle>;
  rightStyle?: StyleProp<ViewStyle>;
  /** ✅ 검색화면 전용: title을 헤더 가로 전체로 깔아줌(좌우 버튼 위까지) */
  fullWidthTitle?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Header: React.FC<HeaderProps> = ({ title, rightButton, leftButton, leftStyle, rightStyle, fullWidthTitle, style }) => {
  return (
    <SafeAreaView style={[styles.headerContainer, style]}>
      <View style={[styles.backContainer, leftStyle]}>{leftButton}</View>

      <View
        style={[
          styles.logoContainer,
        ]}
      >
      {title}
      </View>

     {
      !fullWidthTitle && (
        <View style={[styles.notificationContainer, rightStyle]}>
          {rightButton}
        </View>
      )
     }
    </SafeAreaView>
  );
};

export default Header;
