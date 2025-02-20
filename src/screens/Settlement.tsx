import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from '../styles/Settlement.style';
import SVG from '../components/SVG';
import BasicText from '../components/BasicText';

const Settlement: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.account}>
        <SVG name="Bank" width={26} height={26} style={styles.accountIcon}/>
        <BasicText style={styles.accountText} text="KB 국민은행 000-0000-0000-00"/>
      </View>
      <BasicText style={styles.costTitle}>{10000 + '원'}</BasicText>
      <BasicText style={styles.costSubTitle}>{'요청일 : ' + '2025년 00월 00일 (0) 00:00'}</BasicText>
      <TouchableOpacity>
        <View style={styles.galleryBtn}>
            <SVG style={styles.galleryIcon} width={12} height={12} name="GalleryBlack"/>
            <BasicText style={styles.galleryText} text="사진 등록"/>
        </View>
      </TouchableOpacity>
      <View style={styles.divider}/>
      <BasicText style={styles.allCostText}>{'총 금액 ' + '7500원'}</BasicText>
      <View style={styles.userContainer}>
        <SVG name="DefaultProfile" style={styles.userIcon}/>
        <BasicText style={styles.userText} text="철수"/>
        <BasicText style={styles.userText}>{'2500' + '원'}</BasicText>
      </View>
    </View>
  );
};

export default Settlement;
