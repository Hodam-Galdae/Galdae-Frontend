// SettlementItem.tsx
import React from 'react';
import { View } from 'react-native';
import BasicText from '../components/BasicText';
import SVG from '../components/SVG';
import styles from '../styles/SettlementItem.style'; // 예: Payment용 스타일

// 결제/정산 항목 데이터 구조
export interface Settlement {
  id: number;
  month: number;
  date: number;
  departure: string;
  destination: string;
  settlement: number;
  bank: string;
  account: string;
}

interface SettlementItemProps {
  item: Settlement;
}

const SettlementItem: React.FC<SettlementItemProps> = ({ item }) => {
  return (
    <View key={item.id}>
      {/* 날짜 표시 */}
      <View style={styles.dateContainer}>
        <BasicText
          text={`${item.month}월 ${item.date}일`}
          style={styles.dateText}
        />
      </View>

      {/* 정산 정보 영역 */}
      <View style={styles.settleContainer}>
        {/* 출발지 ~ 도착지 */}
        <View style={styles.locationContainer}>
          <SVG name="location_line" />
          <BasicText text={item.departure} style={styles.position} />
          <SVG name="arrow_right_line" />
          <BasicText text={item.destination} style={styles.position} />
        </View>

        {/* 금액, 은행/계좌 */}
        <View style={styles.bankContainer}>
          <BasicText
            text={`${item.settlement}원`}
            style={styles.settleText}
          />
          <BasicText
            text={`${item.bank} ${item.account}`}
            style={styles.accountText}
          />
        </View>
      </View>
    </View>
  );
};

export default SettlementItem;
