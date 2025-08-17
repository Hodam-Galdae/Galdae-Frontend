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

const ChatRoomItem = (props : Props) => {
  // const formatDepartureTime = (departureTime: string): string => {
  //   return moment.utc(departureTime).format('YYYY년 MM월 DD일 (ddd) HH : mm');
  // };
  return (
    <TouchableOpacity onPress={() => props.onPress(props.id)}>
      <View style={[
        styles.container,

      ]}>
        <View style={styles.wrapper}>
          {/* <BasicText
            text={formatDepartureTime(props.time)}
            style={[
              styles.timeText,
              !props.isActive && styles.inactiveText,
            ]}
          /> */}
          {props.message === 0 ? null :
            <View style={styles.message}>
              <BasicText style={styles.messageText} text={props.message.toString()}/>
            </View>
          }
        </View>
        <View style={styles.locationWrapper}>
          {/* <SVG name="LocationBlack" style={styles.locationIcon}/> */}
          <BasicText
            text={props.from}
            style={[
              styles.locationText,
              !props.isActive && styles.inactiveText,
            ]}
          />
          <SVG name="RightArrow" style={styles.arrowIcon}/>
          <BasicText
            text={props.to}
            style={[
              styles.locationText,
              !props.isActive && styles.inactiveText,
            ]}
          />
        </View>
        <View style={styles.personWrapper}>
          {/* {[...Array(props.currentPerson)].map((e, i: number) => {
              return <SVG key={i} style={styles.personIcon} name="UserFill"/>;
          })}
          {[...Array(props.maxPerson - props.currentPerson)].map((e, i: number) => {
              return <SVG key={i} style={styles.personIcon} name="UserFillLight"/>;
          })}
          <BasicText
            style={[
              styles.personText,
              !props.isActive && styles.inactiveText,
            ]}
            text={'( ' + props.currentPerson + ' / ' + props.maxPerson + ' )'}
          /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRoomItem;
