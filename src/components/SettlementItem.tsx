import React from 'react';
import { View } from 'react-native';
import BasicText from './BasicText';
import SVG from './SVG';
import styles from '../styles/SettlementItem.style';
import moment from 'moment';
// SettlementItem.tsx
export interface Settlement {
  id: number;
  departureTime: string;
  departure: string;
  arrival: string;
  totalCost: number;
  personalCost: number;
  depositor: string;
  accountNumber: string;
  bankType: string | null;
}
interface SettlementItemProps {
  item: Settlement;
}

const SettlementItem: React.FC<SettlementItemProps> = ({ item }) => {
  const date = moment.utc(item.departureTime);
  const formattedDate = date.format('M월 D일');
 // console.log(`item: `, item);
  return (
    <View key={item.id}>
      {/* 날짜 표시 */}
      <View style={styles.dateContainer}>
        <BasicText text={formattedDate} style={styles.dateText} />
      </View>

      {/* 정산 정보 영역 */}
      <View style={styles.settleContainer}>
        {/* 출발지 ~ 도착지 */}
        <View style={styles.locationContainer}>
          <SVG name="location_line" />
          <BasicText text={item.departure} style={styles.position} />
          <SVG name="arrow_right_line" />
          <BasicText text={item.arrival} style={styles.position} />
        </View>

        {/* 금액, 은행/계좌 */}
        <View style={styles.bankContainer}>
          <BasicText
            text={`${item.personalCost.toLocaleString()}원`}
            style={styles.settleText}
          />
          {item.bankType && item.accountNumber ? (
            <BasicText
              text={`${item.bankType} ${item.accountNumber}`}
              style={styles.accountText}
            />
          ) : (
            <BasicText text="정산 정보 없음" style={styles.accountText} />
          )}
        </View>
      </View>
    </View>
  );
};

export default SettlementItem;