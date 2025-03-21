import React from 'react';
import { View, Image } from 'react-native';
import styles from '../styles/SettlementBox.style';
import BasicText from './BasicText';
import BasicButton from './button/BasicButton';
import SVG from './SVG';
import { useSelector } from 'react-redux';
import {RootState} from '../modules/redux/RootReducer';

type Settlement = {
    id: number,
    currentMemberCount: number,
    cost: number,
    sender?: string,
    senderImage?: string,
    time: Date,
    isShowProfile?: boolean,
    isShowTime?: boolean
    onPress: ()=>void
}

const ChatItem: React.FC<{settlement: Settlement}> = React.memo(({settlement}) => {
    const userInfo = useSelector((state: RootState) => state.user);

    return (
        <View style={styles.container}>
            {settlement.sender !== userInfo.nickname && settlement.isShowProfile ? (
                <View style={styles.userWrapper}>
                    {settlement.senderImage === undefined ? <SVG name="DefaultProfile" style={styles.userImage}/> : <Image source={{uri: settlement.senderImage}}/>}
                    <BasicText text={settlement.sender}/>
                </View>
            ) : null}
            <View style={[styles.boxWrapper, {justifyContent: settlement.sender === userInfo.nickname ? 'flex-end' : 'flex-start'}]}>
                {settlement.isShowTime && settlement.sender === userInfo.nickname ? (
                    <BasicText style={styles.timeText} text={settlement.time.getHours() + ':' + settlement.time.getMinutes()}/>
                ) : null}
                <View style={[styles.box, {alignSelf: settlement.sender === userInfo.nickname ? 'flex-end' : 'flex-start'}]}>
                    <View style={styles.backImage}>

                    </View>
                    <BasicText style={styles.text}>{'갈대 정산을 요청합니다.\n\n' + '정산 인원 : ' + settlement.currentMemberCount.toString() + '명\n' + '총 금액 : ' + settlement.cost.toString() + '원\n\n' + '정산 요청 금액 (1/N)\n1인 : ' + Math.ceil(settlement.cost / settlement.currentMemberCount) + '원\n\n' + '계좌 확인 후 송금해주세요.'}</BasicText>
                    <BasicButton text="정산 상세" buttonStyle={styles.button} textStyle={styles.buttonText} onPress={settlement.onPress}/>
                </View>
                {settlement.isShowTime && settlement.sender !== userInfo.nickname ? (
                    <BasicText style={styles.timeText} text={settlement.time.getHours() + ':' + settlement.time.getMinutes()}/>
                ) : null}
            </View>
        </View>
    );
});

export default ChatItem;
