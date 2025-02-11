// Login.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 네비게이션 파라미터 타입 정의
type RootStackParamList = {
  Onboarding: undefined;
  CreateGaldae: undefined;
  Login: undefined;
  SignUp: undefined;
  MainTab: undefined; // 메인 탭 네비게이터 화면
};

// 로그인 화면에 사용할 네비게이션 타입 지정 (Login 스크린의 네비게이션 객체)
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = () => {
  // useNavigation에 LoginScreenNavigationProp 제네릭을 적용합니다.
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleGoToMainTab = () => {
    // 로그인 로직 수행 후 메인 탭 네비게이터로 이동 (replace 메서드 사용 가능)
    navigation.navigate('MainTab');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인 화면</Text>
      <Text style={styles.subtitle}>환영합니다! 여기는 로그인입니다.</Text>
      <Button title="로그인" onPress={handleGoToMainTab} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
  },
});
