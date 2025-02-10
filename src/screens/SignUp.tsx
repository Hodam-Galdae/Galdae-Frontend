// SignUp.tsx 테스트
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SignUp: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입 화면</Text>
      <Text style={styles.subtitle}>환영합니다! 여기는 회원가입입니다.</Text>
    </View>
  );
};

export default SignUp;

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
