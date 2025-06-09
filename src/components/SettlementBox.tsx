import React, {useEffect, useState} from 'react';
import { View, Image } from 'react-native';
import styles from '../styles/SettlementBox.style';
import BasicText from './BasicText';
import BasicButton from './button/BasicButton';
import SVG from './SVG';
import { useSelector } from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootState} from '../modules/redux/RootReducer';
import { getPayment, PaymentResponse } from '../api/chatApi';
import moment from 'moment';

type RootStackParamList = {
  Settlement: {data: PaymentResponse};
};

type Settlement = {
    sender: string,
    senderImage: string | undefined,
    time: string,
    isShowProfile: boolean,
    isShowTime: boolean
    chatroomId: string
}

const SettlementBox: React.FC<{settlement: Settlement}> = React.memo(({settlement}) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Settlement'>>();
    const userInfo = useSelector((state: RootState) => state.user);
    const [paymentData, setPaymentData] = useState<PaymentResponse>({
        id: 0,
        totalCost: 0,
        personalCost: 0,
        depositor: '',
        accountNumber: '',
        bankType: '',
        requestTime: new Date().toISOString(),
        members: [
            {id: '',name: '', image: ''},
        ],
    });

    useEffect(() => {
        const getSettlement = async() => {
            const data = await getPayment(settlement.chatroomId);
            setPaymentData(data);
        };

        getSettlement();
    }, [settlement]);

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
                    <BasicText style={styles.timeText} text={moment.utc(settlement.time).hour() + ':' + moment.utc(settlement.time).minute()}/>
                ) : null}
                <View style={[styles.box, {alignSelf: settlement.sender === userInfo.nickname ? 'flex-end' : 'flex-start'}]}>
                    <View style={styles.backImage}>

                    </View>
                    <BasicText style={styles.text}>{'갈대 정산을 요청합니다.\n\n' + '정산 인원 : ' + paymentData?.members.length + '명\n' + '총 금액 : ' + paymentData?.totalCost.toString() + '원\n\n' + '정산 요청 금액 (1/N)\n1인 : ' + paymentData?.personalCost.toString() + '원\n\n' + '계좌 확인 후 송금해주세요.'}</BasicText>
                    <BasicButton text="정산 상세" buttonStyle={styles.button} textStyle={styles.buttonText} onPress={()=>navigation.navigate('Settlement', { data: paymentData})}/>
                </View>
                {settlement.isShowTime && settlement.sender !== userInfo.nickname ? (
                    <BasicText style={styles.timeText} text={moment.utc(settlement.time).hour() + ':' + moment.utc(settlement.time).minute()}/>
                ) : null}
            </View>
        </View>
    );
});

export default SettlementBox;
