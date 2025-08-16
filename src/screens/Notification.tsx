import React,{useEffect} from 'react';
import {  ScrollView, View,ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import styles from '../styles/Notification.style';
import SVG from '../components/SVG';
import Header from '../components/Header';
import SVGButton from '../components/button/SVGButton';
import BasicText from '../components/BasicText';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BasicButton from '../components/button/BasicButton';
//redux
import { useAppDispatch } from '../modules/redux/store';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/redux/RootReducer';
import { fetchNotifications, checkNotificationThunk, Notification as NotificationType } from '../modules/redux/slice/notificationSlice';
type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
};

// 내비게이션 스택 타입 정의
type RootStackParamList = {
    CreateGaldae: undefined;
    NowGaldae: {
      departureLarge?:string,
      departureSmall?:string,
      destinationLarge?:string,
      destinationSmall?:string,
    };
    SetDestination:undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Notification: React.FC<HomeProps> = () => {
    const dispatch = useAppDispatch();
    const notifications = useSelector((state: RootState) => state.notiSlice.notifications);
    const loading = useSelector((state: RootState) => state.notiSlice.loading);
    // const notifications = [
    //     {
    //         id:0,
    //         content:'하재연님 갈대에 새로운 멤버가 추가되었습니다.',
    //         read:false,
    //     },
    //     {
    //         id:1,
    //         content:'갈대 2.0 업데이트 안내가 있습니다. ❤️‍🔥',
    //         read:true,
    //     },
    //     {
    //         id:2,
    //         content:'🔔 문의 사항 응답이 완료되었습니다.',
    //         read:false,
    //     },
    // ];
    // const lastNotifications = [
    //     {
    //         id:0,
    //         content:'갈대 2.0 업데이트 안내 예정일 안내 입니다.',
    //         read:false,
    //     },
    //     {
    //         id:1,
    //         content:'정산 계좌 변경 방법을 알려드립니다.',
    //         read:true,
    //     },
    //     {
    //         id:2,
    //         content:'닉네임 변경 횟수 제한 안내사항 전달드립니다.',
    //         read:false,
    //     },
    // ];
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () => navigation.goBack();
    useEffect(() => {
        dispatch(fetchNotifications());
      }, [dispatch]);

      const handleCheck = (notificationId: number) => {
        dispatch(checkNotificationThunk(notificationId));
      };
    return (
      <View style={styles.container}>
            <Header
            leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack}/>}
            title={<BasicText text="알림" style={styles.headerText}/>}
            />

            <ScrollView style={styles.content}>
                {
                    loading ? (
                        <ActivityIndicator size="large" color={theme.colors.Galdae} />
                    ) : notifications.length === 0 ? (
                      <View style={styles.noData}>
                <SVG name="information_line" />
                <BasicText text="알림이 없습니다." color={theme.colors.grayV1} />
              </View>
                    ) : (
                        <>
                        <BasicText text="오늘" style={styles.title}/>
                {
                    notifications.map((noti : NotificationType)=>(
                        <View key={noti.notificationId} style={styles.notiContainer}>
                            <BasicButton
                            text={noti.title}
                            buttonStyle={noti.isChecked ? styles.read : styles.notRead}
                            textStyle={styles.text}
                            onPress={() => {
                                if (!noti.isChecked) {
                                  handleCheck(noti.notificationId);
                                }
                              }}
                            />
                            {!noti.isChecked && <View style={styles.circle}/>}
                        </View>
                    ))
                }
                <BasicText text="최근 7일" style={styles.subTitle}/>
                {
                    notifications.map((noti : NotificationType) =>(
                        <View key={noti.notificationId} style={styles.notiContainer}>
                            <BasicButton
                            text={noti.title}
                            buttonStyle={noti.isChecked ? styles.read : styles.notRead}
                            textStyle={styles.text}
                            onPress={() => {
                                if (!noti.isChecked) {
                                  handleCheck(noti.notificationId);
                                }
                              }}
                            />
                            {!noti.isChecked && <View style={styles.circle}/>}
                        </View>
                    ))
                }</>
                    )
                }

            </ScrollView>
      </View>
    );
};

export default Notification;

