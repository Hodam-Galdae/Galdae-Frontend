// Chat.tsx 테스트
import React from 'react';
import { View } from 'react-native';
import styles from '../styles/CreateGaldae.style';
import BasicText from '../components/BasicText';
import PositionBox from '../components/PositionBox';
const CreateGaldae: React.FC = () => {
  return (
    <View style={styles.container}>
      <BasicText style={styles.title} text="목적지 설정"/>
      <PositionBox title='학교' subTitle='중원도서관' isOrigin={true}/>
    </View>
  );
};

export default CreateGaldae;