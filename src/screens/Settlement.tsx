import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from '../styles/Settlement.style';
import SVG from '../components/SVG';
import BasicText from '../components/BasicText';
import { RouteProp, useRoute } from '@react-navigation/native';


type RootStackParamList = {
    Settlement: {data : Readonly<SettlementType>},
};

type Member = {
    image: string,
    name: string,
}

type SettlementType = {
    accountNumber: String,
    accountBank: String,
    cost: number,
    time: Date;
    members: Member[];
};

const Settlement: React.FC = () => {
    const {params} = useRoute<RouteProp<RootStackParamList, 'Settlement'>>();
    const data = params.data;

    return (
        <View style={styles.container}>
        <View style={styles.account}>
            <SVG name="Bank" width={26} height={26} style={styles.accountIcon}/>
            <BasicText style={styles.accountText}>{data.accountBank + ' ' + data.accountNumber}</BasicText>
        </View>
        <BasicText style={styles.costTitle}>{data.cost + '원'}</BasicText>
        <BasicText style={styles.costSubTitle}>{'요청일 : ' + data.time}</BasicText>
        <TouchableOpacity>
            <View style={styles.galleryBtn}>
                <SVG style={styles.galleryIcon} width={12} height={12} name="GalleryBlack"/>
                <BasicText style={styles.galleryText} text="사진 등록"/>
            </View>
        </TouchableOpacity>
        <View style={styles.divider}/>
        <BasicText style={styles.allCostText}>{'총 금액 ' + '7500원'}</BasicText>
        <View style={styles.userContainer}>
            <SVG name="DefaultProfile" style={styles.userIcon}/>
            <BasicText style={styles.userText} text="철수"/>
            <BasicText style={styles.userText}>{'2500' + '원'}</BasicText>
        </View>
        </View>
    );
};

export default Settlement;
