import React from 'react';
import { Image, View } from 'react-native';
import styles from '../styles/Settlement.style';
import SVG from '../components/SVG';
import BasicText from '../components/BasicText';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import SVGButton from '../components/button/SVGButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PaymentSummary } from '../api/chatApi';
import { banks, BankOption } from '../constants/bankOptions';

type RootStackParamList = {
  Settlement: { data: PaymentSummary };
};

const Settlement: React.FC = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Settlement'>>();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'Settlement'>
    >();
  const data: PaymentSummary = params.data;
  console.log(`data
    
    
    
    
    `, data);
  return (
    <View style={styles.container}>
      <Header
        leftButton={
          <SVGButton onPress={() => navigation.goBack()} iconName="LeftArrow" />
        }
        title={
          <BasicText
            text="정산 상세"
            style={styles.headerText}
          />
        }
        style={styles.header}
      />
      <View style={styles.wrapper}>
        <View style={styles.account}>
          <SVG width={26} height={26} style={styles.accountIcon} name={
            banks.find((bank: BankOption) => bank.name === data.bankType)?.svg || 'Bank_KB'} />
          <BasicText style={styles.accountText}>
            {data.bankType + ' ' + data.accountNumber}
          </BasicText>
        </View>
        <BasicText style={styles.costTitle}>{data.totalCost.toLocaleString() + '원'}</BasicText>
        <BasicText style={styles.costSubTitle}>
          {'요청일 : ' + data.requestTime}
        </BasicText>

        <View style={styles.divider} />
        <BasicText style={styles.allCostText}>
          {'총 금액 ' + data.totalCost.toLocaleString() + '원'}
        </BasicText>
        {data.members.map(e => {
          return (
            <View key={e.id} style={styles.userContainer}>
              {
                e.image ? <Image source={{uri: e.image}} style={styles.userIcon} /> : <SVG name="DefaultProfile" style={styles.userIcon} />
              }
              <BasicText style={styles.userText} text={e.name} />
              <BasicText style={styles.userText}>
                {data.personalCost.toLocaleString() + '원'}
              </BasicText>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Settlement;
