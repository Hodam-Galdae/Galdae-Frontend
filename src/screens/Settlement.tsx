import React from 'react';
import {View} from 'react-native';
import styles from '../styles/Settlement.style';
import SVG from '../components/SVG';
import BasicText from '../components/BasicText';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Header from '../components/Header';
import SVGButton from '../components/button/SVGButton';
import {theme} from '../styles/theme';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { PaymentResponse } from '../api/chatApi';
import { banks, BankOption } from '../constants/bankOptions';
import moment from 'moment';

type RootStackParamList = {
  Settlement: {data: PaymentResponse};
};

const Settlement: React.FC = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'Settlement'>>();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'Settlement'>
    >();
  const data: PaymentResponse = params.data;
  return (
    <View style={styles.container}>
      <Header
        leftButton={
          <SVGButton onPress={() => navigation.goBack()} iconName="LeftArrow" />
        }
        title={
          <BasicText
            text="정산 상세"
            style={{
              fontSize: theme.fontSize.size22,
              color: theme.colors.blackV0,
              fontWeight: '700',
            }}
          />
        }
      />
      <View style={styles.wrapper}>
        <View style={styles.account}>
          <SVG width={26} height={26} style={styles.accountIcon} name={
                                         banks.find((bank: BankOption) => bank.name === data.bankType)?.svg || 'Bank_KB'}/>
          <BasicText style={styles.accountText}>
            {data.bankType + ' ' + data.accountNumber}
          </BasicText>
        </View>
        <BasicText style={styles.costTitle}>{data.totalCost + '원'}</BasicText>
        <BasicText style={styles.costSubTitle}>
          {'요청일 : ' + moment.utc(data.requestTime).format('YYYY년 MM월 DD일 (ddd) HH : mm')}
        </BasicText>
        {/* <TouchableOpacity>
          <View style={styles.galleryBtn}>
            <SVG
              style={styles.galleryIcon}
              width={12}
              height={12}
              name="GalleryBlack"
            />
            <BasicText style={styles.galleryText} text="사진 등록" />
          </View>
        </TouchableOpacity> */}
        <View style={styles.divider} />
        <BasicText style={styles.allCostText}>
          {'총 금액 ' + data.totalCost}
        </BasicText>
        {data.members.map(e => {
          return (
            <View key={e.id} style={styles.userContainer}>
              <SVG name="DefaultProfile" style={styles.userIcon} />
              <BasicText style={styles.userText} text={e.name} />
              <BasicText style={styles.userText}>
                {data.personalCost + '원'}
              </BasicText>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Settlement;
