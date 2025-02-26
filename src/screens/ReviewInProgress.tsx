import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from '../styles/ReviewInProgress.style';
import LinearGradient from 'react-native-linear-gradient';
import BasicText from '../components/BasicText';
import CircleProgress from '../components/CircleProgress';
import Svg, { Path } from 'react-native-svg';


const ReviewInProgress: React.FC = () => {
  return (
    <View style={styles.container}>
        <LinearGradient
        colors={['#DAFFCD', 'rgba(218, 255, 205, 0.60)', 'transparent']}
        style={styles.gradient}
        />
        <BasicText text="학생증 인증 심사중이에요." style={styles.title}/>
        <CircleProgress/>
        <View style={styles.alertWrapper}>
            <View style={styles.ballon}>
                <BasicText style={styles.ballonText}>{'최대 72시간 내\n관리자 검토 후 이용이 가능해요.'}</BasicText>
            </View>
            <View style={styles.triWrapper}>
                <Svg style={styles.tri} width={50} height={50} viewBox="0 0 100 100">
                    <Path d="M 20,10 L 60,10 L 40,40 Z" fill="#66D760"/>
                </Svg>
            </View>
            <TouchableOpacity>
                <BasicText text="오류가 발생 하거나 문의 사항이 있으신가요?" style={styles.alert}/>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ReviewInProgress;
