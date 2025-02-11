// Chat.tsx 테스트
import React from 'react';
import { View } from 'react-native';
import styles from '../styles/CreateGaldae.style';
import BasicText from '../components/BasicText';
const CreateGaldae: React.FC = () => {
  return (
    <View style={styles.container}>
      <BasicText style={styles.title} text="목적지 설정"/>
    </View>
  );
};

export default CreateGaldae;