// MyInfo.tsx 테스트
import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles/SetUserInfo.style';
import BasicText from '../components/BasicText';
import SVG from '../components/SVG';
import SVGButton from '../components/button/SVGButton';

const SetUserInfo: React.FC = () => {
  return (
    <View style={styles.container}>
      <BasicText text="유저 정보 입력" style={styles.title} />
      <View style={styles.profileContainer}>
        <View style={styles.profileWrapper}>
          <SVG
            style={styles.profile}
            name="DefaultProfile"
            width={68}
            height={68}
          />
          <SVGButton
            iconName="Filter"
            SVGStyle={{width: 28, height: 28}}
            buttonStyle={styles.camera}
          />
        </View>
      </View>
    </View>
  );
};

export default SetUserInfo;
