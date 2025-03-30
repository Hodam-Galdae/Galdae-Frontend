import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import BasicText from '../components/BasicText';
import SVG from '../components/SVG';
import { theme } from '../styles/theme';
import styles from '../styles/GaldaeItem.style';
import moment from 'moment';
// MyPostHistory 타입 사용 (출발/도착지가 객체 형태)
import { MyPostHistory } from '../types/getTypes';

interface MyGaldaeItemProps {
  item: MyPostHistory;
  onPress?: () => void;
  onLongPress?: () => void;
}

const MyGaldaeItem: React.FC<MyGaldaeItemProps> = ({ item, onPress, onLongPress }) => {
  // ISO 8601 형식의 출발일시를 포맷팅 (예: "2025년 03월 20일 (목) 01 : 00")
  const formatDepartureTime = (departureTime: string): string => {
    return moment.utc(departureTime).format('YYYY년 MM월 DD일 (ddd) HH : mm');
  };

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} delayLongPress={100}>
      <View style={styles.borderedListBox}>
        {/* 출발지 정보 */}
        <View style={styles.fromContainer}>
          <SVG name="Car" />
          <BasicText text={item.departure.subPlace} style={styles.fromMainLocation} />
          <BasicText text={item.departure.majorPlace} style={styles.fromSubLocation} />
        </View>

        {/* 탑승 인원 정보 */}
        <View style={styles.toContainer}>
          <View style={styles.fromToLine}>
            <SVG name="FromToLine" />
          </View>
          {Array(item.passengerCount)
            .fill(null)
            .map((_, idx) => (
              <SVG key={`user-${idx}`} name="User" />
            ))}
          {Array(item.totalPassengerCount - item.passengerCount)
            .fill(null)
            .map((_, idx) => (
              <SVG key={`disabled-${idx}`} name="DisabledUser" />
            ))}
          <BasicText
            text={`(${item.passengerCount}/${item.totalPassengerCount})`}
            fontWeight={500}
            fontSize={theme.fontSize.size16}
            color={theme.colors.gray1}
          />
        </View>

        {/* 도착지 정보 */}
        <View style={styles.toContainer}>
          <SVG name="Location" />
          <BasicText text={item.arrival.subPlace} style={styles.fromMainLocation} />
          <BasicText text={item.arrival.majorPlace} style={styles.fromSubLocation} />
        </View>

        {/* 시간 정보 */}
        <View style={styles.timeContainer}>
          <SVG name="Clock" />
          <View>
            <BasicText
              text={item.arrangeTime === 'POSSIBLE' ? '시간 협의가능' : '시간 협의불가'}
              style={styles.fromMainLocation}
              color={theme.colors.gray2}
              fontSize={theme.fontSize.size10}
            />
            <BasicText
              text={formatDepartureTime(item.departureTime)}
              style={styles.fromSubLocation}
              color={theme.colors.black}
              fontSize={theme.fontSize.size14}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyGaldaeItem;
