import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatRommUserList: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>유저 리스트트</Text>
      <Text style={styles.subtitle}>환영합니다! 여기는 유저리스트트.</Text>
    </View>
  );
};

export default ChatRommUserList;

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
