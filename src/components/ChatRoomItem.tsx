// Chat.tsx 테스트
import React from 'react';
import { View } from 'react-native';
import styles from '../styles/ChatRoomItem.style';
import BasicText from './BasicText';
import SVG from './SVG';

interface Props {
    time: string,
    from: string,
    to: string,
    currentPerson: number,
    maxPerson: number,
    message: number
}

const ChatRoomItem = (props : Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <BasicText text={props.time} style={styles.timeText}/>
        <View style={styles.message}>
            <BasicText style={styles.messageText} text={props.message.toString()}/>
        </View>
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
  );
};

export default ChatRoomItem;
