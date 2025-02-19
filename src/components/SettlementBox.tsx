import React from 'react';
import { View, Image } from 'react-native';
import styles from '../styles/SettlementBox.style';
import BasicText from './BasicText';
import BasicButton from './button/BasicButton';
import SVG from './SVG';

type Settlement = {
    id: string,
    currentUser: number,
    cost: number,
    sender?: string,
    senderImage?: string,
    time: Date,
    isShowProfile?: boolean,
    isShowTime?: boolean
}

const ChatItem: React.FC<{settlement: Settlement}> = React.memo(({settlement}) => {
    const tempUser = 'donghyun';
    return (
        <View style={styles.container}>
            {settlement.sender !== tempUser && settlement.isShowProfile ? (
                <View style={styles.userWrapper}>
                    {settlement.senderImage === undefined ? <SVG name="DefaultProfile" style={styles.userImage}/> : <Image source={{uri: settlement.senderImage}}/>}
                    <BasicText text={settlement.sender}/>
                </View>
            ) : null}
            <View style={[styles.boxWrapper, {justifyContent: settlement.sender === tempUser ? 'flex-end' : 'flex-start'}]}>
                {settlement.isShowTime && settlement.sender === tempUser ? (
                    <BasicText style={styles.timeText} text={settlement.time.getHours() + ':' + settlement.time.getMinutes()}/>
                ) : null}
                <View style={[styles.box, {alignSelf: settlement.sender === tempUser ? 'flex-end' : 'flex-start'}]}>
                    <View style={styles.backImage}>

                    </View>
                    <BasicText style={styles.text}>{'갈대 정산을 요청합니다.\n\n' + '정산 인원 : ' + settlement.currentUser.toString() + '명\n' + '총 금액 : ' + settlement.cost.toString() + '원\n\n' + '정산 요청 금액 (1/N)\n1인 : ' + settlement.cost / settlement.currentUser + '원\n\n' + '계좌 확인 후 송금해주세요.'}</BasicText>
                    <BasicButton text="정산 상세" buttonStyle={styles.button} textStyle={styles.buttonText}/>
                </View>
                {settlement.isShowTime && settlement.sender !== tempUser ? (
                    <BasicText style={styles.timeText} text={settlement.time.getHours() + ':' + settlement.time.getMinutes()}/>
                ) : null}
            </View>
        </View>
    );
});

export default ChatItem;
