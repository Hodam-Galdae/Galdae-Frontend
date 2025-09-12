import React from 'react';
import { View, StyleSheet } from 'react-native';
import SVG from '../components/SVG';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 네비게이션 타입 정의
type RootStackParamList = {
  MainTab: undefined;
  SignupSuccess: undefined;
};

type SignupSuccessScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
/**
 * React page that renders your SVG full-bleed and responsive.
 * - Drop this file into a React app (Vite/CRA/Next client component) and use <SvgPage />
 * - The SVG scales with the container while preserving its aspect ratio.
 */
export default function SvgPage() {
    const navigation = useNavigation<SignupSuccessScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      // mainTab으로 이동
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTab' as never }], // 네비게이션 이름 확인해서 맞춰주세요
      });
    }, 3000); // 3초

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 해제
  }, [navigation]);
  return (
    <View style={styles.root}>
    <SVG
      name="SignupSuccess"
      // SVG가 react-native-svg의 <Svg>를 래핑한다면 아래 prop들을 전달 가능
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice" // cover
      style={StyleSheet.absoluteFillObject}
    />
  </View>
  );
}
const styles = StyleSheet.create({
    root: {
      flex: 1,
      // 배경색 필요하면
      // backgroundColor: '#fff',
    },
  });
