import React from 'react';
import styles from '../styles/Loading.style';
import { View } from 'react-native';
import GradientSpinner from './CircleProgress';

const Loading = () => {
  return (
    <View style={styles.container}>
        <GradientSpinner/>
    </View>
  );
};

export default Loading;
