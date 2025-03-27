import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from '../styles/ChatRoomItem.style';
import BasicText from './BasicText';
import SVG from './SVG';

interface Props {
    id: string,
    time: Date,
    from: string,
    to: string,
    currentPerson: number,
    maxPerson: number,
    message: number,
    onPress: (id: string) => void,
}

const ChatRoomItem = (props : Props) => {
  return (
    <TouchableOpacity onPress={() => props.onPress(props.id)}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <BasicText text={props.time.getFullYear() + '년 ' + props.time.getMonth() + '월 ' + props.time.getDate() + '일 ' + props.time.getHours() + ':' + props.time.getMinutes()} style={styles.timeText}/>
          {props.message === 0 ? null :
            <View style={styles.message}>
              <BasicText style={styles.messageText} text={props.message.toString()}/>
            </View>
          }
        </View>
        <View style={styles.locationWrapper}>
          <SVG name="LocationBlack" style={styles.locationIcon}/>
          <BasicText text={props.from} style={styles.locationText}/>
          <SVG name="RightArrow" style={styles.arrowIcon}/>
          <BasicText text={props.to} style={styles.locationText}/>
        </View>
        <View style={styles.personWrapper}>
          {[...Array(props.currentPerson)].map((e, i: number) => {
              return <SVG key={i} style={styles.personIcon} name="UserFill"/>;
          })}
          {[...Array(props.maxPerson - props.currentPerson)].map((e, i: number) => {
              return <SVG key={i} style={styles.personIcon} name="UserFillLight"/>;
          })}
          <BasicText style={styles.personText} text={'( ' + props.currentPerson + ' / ' + props.maxPerson + ' )'}/>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRoomItem;
