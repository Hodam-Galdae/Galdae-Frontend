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
      <View style={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.borderedListBoxComplete : styles.borderedListBox}>
        <View>

          <View style={styles.fromToContainer}>
            {/* 출발지 정보 */}
            <View style={styles.fromContainer}>
              {/* <SVG name={!item.isSameGender && item.passengerGenderType === 'SAME' ? 'Car1' : 'Car'} /> */}
              <BasicText text={item.departure.subPlace} style={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.fromMainLocationCom : styles.fromMainLocation} />
              <BasicText text={'안녕하세요저'} style={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.fromSubLocationCom : styles.fromSubLocation} numberOfLines={1} ellipsizeMode="tail" />
            </View>
            {/**item.departure.majorPlace */}
            <SVG name={!item.isSameGender && item.passengerGenderType === 'SAME' ? 'arrow_forward' : 'arrow_forward'} />
            {/* 도착지 정보 */}
            <View style={styles.toContainer}>
              {/* <SVG name={!item.isSameGender && item.passengerGenderType === 'SAME' ? 'Location1' : 'Location'} /> */}
              <BasicText text={item.arrival.subPlace} style={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.fromMainLocationCom : styles.fromMainLocation} />
              <BasicText text={'안녕하세요저는'} style={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.fromSubLocationCom : styles.fromSubLocation} numberOfLines={1} ellipsizeMode="tail" />
            </View>
            {/**item.arrival.majorPlace */}
          </View>

          <View style={styles.departureTimeContainer}>
            <BasicText text="출발 시간" style={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.departureTimeTitleCom : styles.departureTimeTitle } />
            <BasicText
              text={formatDepartureTime(item.departureTime)}
              style={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.departureTimeCom : styles.departureTime}

            />
          </View>

          <View style={styles.passengerTimeContainer}>
            {/* 승객 수 아이콘 */}
            <View style={styles.passengerContainer}>
              <View style={styles.fromToLine}>
                <SVG name={!item.isSameGender && item.passengerGenderType === 'SAME' ? 'person_icon' : 'person_icon'} />
              </View>
              <BasicText
                text={`(${item.passengerCount}/${item.totalPassengerCount})`}
                fontSize={theme.fontSize.size14}
                color={!item.isSameGender && item.passengerGenderType === 'SAME' ? theme.colors.blackV3 : theme.colors.blackV3}
              />

            </View>

            <TextTag
              text={item.arrangeTime === 'POSSIBLE' ? '시간협의가능' : '시간협의불가'}
              viewStyle={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.timePossible : styles.timePossible}
              textStyle={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.timePossibleText : styles.timePossibleText}

            />

            {item.passengerGenderType && (
              <View style={styles.tags}>
                {!item.isSameGender && item.passengerGenderType === 'SAME' ? (
                  <TextTag text="동성만"
                    enabledColors={
                      {
                        backgroundColor: theme.colors.grayV2,
                        textColor: theme.colors.grayV1,
                        borderColor: theme.colors.grayV1,
                      }
                    }
                    viewStyle={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.timePossible : styles.timePossible}
              textStyle={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.timePossibleText : styles.timePossibleText}
                  />
                ) : item.passengerGenderType === 'SAME' ? (
                  <TextTag text="동성만" viewStyle={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.timePossible : styles.timePossible}
                  textStyle={!item.isSameGender && item.passengerGenderType === 'SAME' ? styles.timePossibleText : styles.timePossibleText}/>
                ) : item.passengerGenderType === 'DONT_CARE' ? (
                  <TextTag text="성별무관" viewStyle={!item.isSameGender && item.passengerGenderType === 'DONT_CARE' ? styles.timePossible : styles.timePossible}
                  textStyle={!item.isSameGender && item.passengerGenderType === 'DONT_CARE' ? styles.timePossibleText : styles.timePossibleText}/>
                ) : (
                  <TextTag text="상관없음" viewStyle={!item.isSameGender && item.passengerGenderType === 'DONT_CARE' ? styles.timePossible : styles.timePossible}
                  textStyle={!item.isSameGender && item.passengerGenderType === 'DONT_CARE' ? styles.timePossibleText : styles.timePossibleText}/>
                )}
              </View>
            )}
          </View>


        </View>

        <View style={styles.typeContainer}>
          <TextTag
            text={'택시'}
            viewStyle={styles.typePossible}
            textStyle={styles.typePossibleText}
          />
        </View>

      </View>
    </TouchableOpacity>
  );
};

export default GaldaeItem;
