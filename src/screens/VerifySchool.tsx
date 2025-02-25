// MyInfo.tsx 테스트
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const VerifySchool: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 정보 화면</Text>
      <Text style={styles.subtitle}>환영합니다! 여기는 내 정보입니다.</Text>
    </View>
  );
};

export default VerifySchool;

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
