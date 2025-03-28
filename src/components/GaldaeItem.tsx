import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import BasicText from '../components/BasicText';
import SVG from '../components/SVG';
import TextTag from '../components/tag/TextTag';
import moment from 'moment';
import { theme } from '../styles/theme';
import styles from '../styles/GaldaeItem.style';
// Type
import { GaldaeItemType } from '../types/getTypes';

interface GaldaeItemProps {
  item: GaldaeItemType;
  onPress: () => void;
  onLongPress?: () => void;
}

const GaldaeItem: React.FC<GaldaeItemProps> = ({ item, onPress, onLongPress }) => {
  const formatDepartureTime = (departureTime: string): string => {
    return moment.utc(departureTime).format('YYYY년 MM월 DD일 (ddd) HH : mm');
  };

  return (
    <TouchableOpacity onPress={onPress} onLongPress={item.isWriter ? onLongPress : undefined} delayLongPress={100}>
      <View style={ !item.isSameGender && item.passengerGenderType === 'SAME' ?   styles.borderedListBoxComplete : styles.borderedListBox}>
        {/* 사용자 닉네임 (null인 경우 익명 처리) */}
        <BasicText text={item.userNickName || '익명'} style={styles.galdaeOwner} />

        {/* 출발지 정보 */}
        <View style={styles.fromContainer}>
          <SVG name="Car" />
          <BasicText text={item.departure.majorPlace} style={styles.fromMainLocation} />
          <BasicText text={item.departure.subPlace} style={styles.fromSubLocation} />
        </View>

        {/* 승객 수 아이콘 */}
        <View style={styles.toContainer}>
          <View style={styles.fromToLine}>
            <SVG name="FromToLine" />
          </View>
          {Array(item.passengerCount)
            .fill(null)
            .map((_, idx) => (
              <SVG key={`user-${item.postId}-${idx}`} name="User" />
            ))}
          {Array(item.totalPassengerCount - item.passengerCount)
            .fill(null)
            .map((_, idx) => (
              <SVG key={`disabled-${item.postId}-${idx}`} name="DisabledUser" />
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
          <BasicText text={item.arrival.majorPlace} style={styles.fromMainLocation} />
          <BasicText text={item.arrival.subPlace} style={styles.fromSubLocation} />
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
            {item.passengerGenderType && (
              <View style={styles.tags}>
                {item.passengerGenderType === 'SAME' ? (
                  <TextTag text="동성만" />
                ) : item.passengerGenderType === 'DONT_CARE' ? (
                  <TextTag text="성별무관" />
                ) : (
                  <TextTag text="상관없음" />
                )}
              </View>
            )}

      </View>
    </TouchableOpacity>
  );
};

export default GaldaeItem;
