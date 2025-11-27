import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SVG from '../components/SVG';
import BasicText from '../components/BasicText';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../styles/theme';

// 네비게이션 타입 정의
type RootStackParamList = {
  MainTab: undefined;
  SignupSuccess: undefined;
  OnboardingGuide: undefined;
};

type SignupSuccessScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
/**
 * React page that renders your SVG full-bleed and responsive.
 * - Drop this file into a React app (Vite/CRA/Next client component) and use <SvgPage />
 * - The SVG scales with the container while preserving its aspect ratio.
 */
export default function SvgPage() {
    const navigation = useNavigation<SignupSuccessScreenNavigationProp>();
    const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // 카운트다운 인터벌
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // 1초마다

    // 3초 후 페이지 이동
    const timer = setTimeout(() => {
      // OnboardingGuide로 이동
      navigation.reset({
        index: 0,
        routes: [{ name: 'OnboardingGuide' as never }],
      });
    }, 3000); // 3초

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(timer);
    }; // 컴포넌트 언마운트 시 타이머 해제
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
      <View style={styles.countdownContainer}>
        <BasicText
          text={`${countdown}초 후 이동합니다`}
          style={styles.countdownText}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    root: {
      flex: 1,
      // 배경색 필요하면
      // backgroundColor: '#fff',
    },
    countdownContainer: {
      position: 'absolute',
      bottom: 60,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    countdownText: {
      fontSize: theme.fontSize.size16,
      fontWeight: '600',
      color: theme.colors.gray2,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
    },
  });
