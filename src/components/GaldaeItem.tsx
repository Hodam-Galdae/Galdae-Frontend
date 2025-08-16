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
        <BasicText text={item.userNickName || '익명'} style={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.galdaeOwnerCom : styles.galdaeOwner} />

        {/* 출발지 정보 */}
        <View style={styles.fromContainer}>
          <SVG name={!item.isSameGender && item.passengerGenderType === 'SAME' ? 'Car1' : 'Car'} />
          <BasicText text={item.departure.subPlace} style={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.fromMainLocationCom : styles.fromMainLocation} />
          <BasicText text={item.departure.majorPlace} style={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.fromSubLocationCom : styles.fromSubLocation} />
        </View>

        {/* 승객 수 아이콘 */}
        <View style={styles.toContainer}>
          <View style={styles.fromToLine}>
            <SVG name={!item.isSameGender && item.passengerGenderType === 'SAME' ? 'FromToLine1' : 'FromToLine'} />
          </View>
          {Array(item.passengerCount)
            .fill(null)
            .map((_, idx) => (
              <SVG key={`user-${item.postId}-${idx}`} name={!item.isSameGender && item.passengerGenderType === 'SAME' ? 'User1' : 'User'} />
            ))}
          {Array(item.totalPassengerCount - item.passengerCount)
            .fill(null)
            .map((_, idx) => (
              <SVG key={`disabled-${item.postId}-${idx}`} name={!item.isSameGender && item.passengerGenderType === 'SAME' ? 'DisabledUser1' : 'DisabledUser' }/>
            ))}
          <BasicText
            text={`(${item.passengerCount}/${item.totalPassengerCount})`}
            fontWeight={500}
            fontSize={theme.fontSize.size16}
            color={!item.isSameGender && item.passengerGenderType === 'SAME' ? theme.colors.grayV0 : theme.colors.grayV1}
          />
        </View>

        {/* 도착지 정보 */}
        <View style={styles.toContainer}>
          <SVG name={!item.isSameGender && item.passengerGenderType === 'SAME' ? 'Location1' : 'Location'} />
          <BasicText text={item.arrival.subPlace} style={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.fromMainLocationCom : styles.fromMainLocation}  />
          <BasicText text={item.arrival.majorPlace} style={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.fromSubLocationCom : styles.fromSubLocation} />
        </View>

        {/* 시간 정보 */}
        <View style={styles.timeContainer}>
          <SVG name={!item.isSameGender && item.passengerGenderType === 'SAME' ? 'Clock1' : 'Clock' }/>
          <View>
            <BasicText
              text={item.arrangeTime === 'POSSIBLE' ? '시간 협의가능' : '시간 협의불가'}
              style={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.fromSubLocationCom : styles.fromMainLocation}
              color={theme.colors.grayV2}
              fontSize={theme.fontSize.size10}
            />
            <BasicText
              text={formatDepartureTime(item.departureTime)}
              style={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.departureTimeCom : styles.departureTime}

            />
          </View>
        </View>
            {item.passengerGenderType && (
              <View style={styles.tags}>
                {!item.isSameGender && item.passengerGenderType === 'SAME' ? (
                  <TextTag text="동성만"
                  enabledColors={
                    {
                      backgroundColor:theme.colors.grayV2,
                      textColor:theme.colors.grayV1,
                      borderColor:theme.colors.grayV1,
                    }
                  }
                  />
                ) : item.passengerGenderType === 'SAME' ? (
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
