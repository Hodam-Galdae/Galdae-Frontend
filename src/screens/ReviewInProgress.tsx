import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from '../styles/ReviewInProgress.style';
import BasicText from '../components/BasicText';
import CircleProgress from '../components/CircleProgress';
import {Svg, Path, Defs, RadialGradient, Stop, Circle} from 'react-native-svg';

const ReviewInProgress: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', top: -300}}>
        <Svg height="542" width="542">
          <Defs>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%">
              <Stop
                offset="0%"
                stopColor="rgba(218, 255, 205, 0.60)"
                stopOpacity="1"
              />
              <Stop
                offset="100%"
                stopColor="rgba(255, 255, 255, 0.60)"
                stopOpacity="1"
              />
            </RadialGradient>
          </Defs>
          <Circle cx="271" cy="271" r="271" fill="url(#grad)" />
        </Svg>
      </View>
      <BasicText text="학생증 인증 심사중이에요." style={styles.title} />
      <CircleProgress />
      <View style={styles.alertWrapper}>
        <View style={styles.ballon}>
          <BasicText style={styles.ballonText}>
            {'최대 72시간 내\n관리자 검토 후 이용이 가능해요.'}
          </BasicText>
        </View>
        <View style={styles.triWrapper}>
          <Svg style={styles.tri} width={50} height={50} viewBox="0 0 100 100">
            <Path d="M 20,10 L 60,10 L 40,40 Z" fill="#66D760" />
          </Svg>
        </View>
        <TouchableOpacity>
          <BasicText
            text="오류가 발생 하거나 문의 사항이 있으신가요?"
            style={styles.alert}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReviewInProgress;
