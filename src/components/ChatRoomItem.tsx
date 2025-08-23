import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from '../styles/ChatRoomItem.style';
import BasicText from './BasicText';
import SVG from './SVG';
// import moment from 'moment';

interface Props {
  id: string,
  time: string,
  from: string,
  to: string,
  currentPerson: number,
  maxPerson: number,
  message: number,
  onPress: (id: string) => void,
  isActive?: boolean,
}

const ChatRoomItem = (props: Props) => {
  // const formatDepartureTime = (departureTime: string): string => {
  //   return moment.utc(departureTime).format('YYYY년 MM월 DD일 (ddd) HH : mm');
  // };
  return (
    <TouchableOpacity onPress={() => props.onPress(props.id)}>
      <View style={[
        styles.container,

      ]}>
        <View style={styles.iconLocationWrapper}>
          <SVG name={props.isActive ? 'TaxiIcon' : 'TaxiIconInactive'} style={styles.taxiIcon} width={42} height={42} /> {/** 추후에는 ott, 배달, 택시 타입에 따른 아이콘 적용해야 함 */}

          <View style={styles.chatInfoWrapper}>

            <View style={styles.locationWrapper}>
              {/* <SVG name="LocationBlack" style={styles.locationIcon}/> */}
              <View style={styles.locationStartWrapper}>
                <BasicText
                  text={props.from}
                  style={[
                    styles.locationText,
                    !props.isActive && styles.inactiveText,
                  ]}
                  // numberOfLines={1}
                  // ellipsizeMode="tail"
                />
                <BasicText
                  style={[styles.locationSubText, !props.isActive && styles.inactiveText2]}
                  text={'임시 출발지'}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                />
              </View>

              <SVG name="RightArrow" style={styles.arrowIcon} />

              <View style={styles.locationEndWrapper}>
                <BasicText
                  text={props.to}
                  style={[
                    styles.locationText,
                    !props.isActive && styles.inactiveText,
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                />
                <BasicText
                  style={styles.locationSubText}
                  text={'임시 도착지'}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                />
              </View>
            </View>

            <View style={styles.chatWrapper}>
              <BasicText style={[styles.lastChat, !props.isActive && styles.inactiveLastChatText]} text={'테스트용 마지막 채팅 길게 해보기(프론트)'} numberOfLines={1} ellipsizeMode="tail" /> {/** 추후에는 채팅 내용 적용해야 함 */}

            </View>


          </View>
        </View>

        <View style={styles.personWrapper}>
          <BasicText style={styles.personText} text={'00분전'} /> {/** 추후에는 시간 적용해야 함 */}
          <View style={styles.message}>
            <BasicText style={styles.messageText} text={props.message.toString()} />
          </View>
        </View>
      </View>

    </TouchableOpacity>
  );
};

export default ChatRoomItem;
