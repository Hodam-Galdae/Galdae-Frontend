import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import BasicText from '../../../components/BasicText';
import SVG from '../../../components/SVG';
import TextTag from '../../../components/tag/TextTag';
import moment from 'moment';
import { theme } from '../../../styles/theme';
import styles from '../../../styles/GaldaeItem.style';
// Type
import { TaxiListItem } from '../../../types/taxiType';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules/redux/RootReducer';

interface GaldaeItemProps {
  item: TaxiListItem;
  onPress: () => void;
}

const TaxiItem: React.FC<GaldaeItemProps> = ({ item, onPress }) => {
  const userGenderType = useSelector((state: RootState) => state.myInfoSlice.userInfo?.gender);
  const formatDepartureTime = (departureTime: string): string => {
    return moment.utc(departureTime).format('YYYY년 MM월 DD일 (ddd) HH : mm');
  };

  return (
    <TouchableOpacity onPress={onPress} >
      <View style={item.passengerGenderType === 'SAME_GENDER' && userGenderType === item.passengerGenderType ? styles.borderedListBoxComplete : styles.borderedListBox}>
        <View>

          <View style={styles.fromToContainer}>
            {/* 출발지 정보 */}
            <View style={styles.fromContainer}>
              {/* <SVG name={!item.isSameGender && item.passengerGenderType === 'SAME_GENDER' ? 'Car1' : 'Car'} /> */}
              <BasicText text={item.departure.subPlace} style={item.passengerGenderType === 'SAME_GENDER' && userGenderType === item.passengerGenderType ? styles.fromMainLocationCom : styles.fromMainLocation} />            </View>
            {/** */}
            <SVG name={item.passengerGenderType === 'SAME_GENDER' && userGenderType === item.passengerGenderType ? 'arrow_forward' : 'arrow_forward'} />
            {/* 도착지 정보 */}
            <View style={styles.toContainer}>
              {/* <SVG name={!item.isSameGender && item.passengerGenderType === 'SAME_GENDER' ? 'Location1' : 'Location'} /> */}
              <BasicText text={item.arrival.subPlace} style={item.passengerGenderType === 'SAME_GENDER' && userGenderType === item.passengerGenderType ? styles.fromMainLocationCom : styles.fromMainLocation} />

            </View>
            {/** */}
          </View>

          <View style={styles.departureTimeContainer}>
            <BasicText text="출발 시간" style={item.passengerGenderType === 'SAME_GENDER' && userGenderType === item.passengerGenderType ? styles.departureTimeTitleCom : styles.departureTimeTitle} />
            <BasicText
              text={formatDepartureTime(item.departureTime)}
              style={item.passengerGenderType === 'SAME_GENDER' && userGenderType === item.passengerGenderType ? styles.departureTimeCom : styles.departureTime}

            />
          </View>

          <View style={styles.passengerTimeContainer}>
            {/* 승객 수 아이콘 */}
            <View style={styles.passengerContainer}>
              <View style={styles.fromToLine}>
                <SVG name={item.passengerGenderType === 'SAME_GENDER' && userGenderType === item.passengerGenderType ? 'person_icon' : 'person_icon'} />
              </View>
              <BasicText
                text={`(${item.joinedPersonCount}/${item.totalGroupPersonCount})`}
                fontSize={theme.fontSize.size14}
                color={item.passengerGenderType === 'SAME_GENDER' && userGenderType === item.passengerGenderType ? theme.colors.blackV3 : theme.colors.blackV3}
              />

            </View>

            <TextTag
              text={item.arrangeTime === 'POSSIBLE' ? '시간협의가능' : '시간협의불가'}
              viewStyle={item.arrangeTime === 'POSSIBLE' ? styles.timePossible : styles.timeNotPossible}
              textStyle={item.arrangeTime === 'POSSIBLE' ? styles.timePossibleText : styles.timeNotPossibleText}

            />

            {item.passengerGenderType && (
              <View style={styles.tags}>
                {item.passengerGenderType === 'SAME_GENDER' && userGenderType === item.passengerGenderType ? (
                  <TextTag text="동성만"
                    enabledColors={
                      {
                        backgroundColor: theme.colors.Galdae3,
                        textColor: theme.colors.blue,
                        borderColor: theme.colors.Galdae3,
                      }
                    }
                    viewStyle={item.passengerGenderType === 'SAME_GENDER' && userGenderType === item.passengerGenderType ? styles.timePossible : styles.timePossible}
                    textStyle={item.passengerGenderType === 'SAME_GENDER' && userGenderType === item.passengerGenderType ? styles.timePossibleText : styles.timePossibleText}
                  />
                ) : item.passengerGenderType === 'SAME_GENDER' ? (
                  <TextTag text="동성만" viewStyle={item.passengerGenderType === 'SAME_GENDER' && userGenderType === item.passengerGenderType ? styles.sameGenderPossible : styles.sameGenderPossible}
                    textStyle={item.passengerGenderType === 'SAME_GENDER' && userGenderType === item.passengerGenderType ? styles.sameGenderPossibleText : styles.sameGenderPossibleText} />
                ) : item.passengerGenderType === 'DONT_CARE' ? (
                  <TextTag text="성별무관" viewStyle={item.passengerGenderType === 'DONT_CARE' && userGenderType === item.passengerGenderType ? styles.timePossible : styles.timePossible}
                    textStyle={item.passengerGenderType === 'DONT_CARE' && userGenderType === item.passengerGenderType ? styles.timePossibleText : styles.timePossibleText} />
                ) : (
                  <TextTag text="상관없음" viewStyle={item.passengerGenderType === 'DONT_CARE' && userGenderType === item.passengerGenderType ? styles.timePossible : styles.timePossible}
                    textStyle={item.passengerGenderType === 'DONT_CARE' && userGenderType === item.passengerGenderType  ? styles.timePossibleText : styles.timePossibleText} />
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

export default TaxiItem;
