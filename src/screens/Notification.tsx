import React,{useEffect} from 'react';
import {  ScrollView, View,ActivityIndicator, Platform, TouchableOpacity} from 'react-native';
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
import { fetchNotifications, checkNotificationThunk, checkAllNotificationsThunk, markAllAsCheckedOptimistic, rollbackNotifications, Notification as NotificationType } from '../modules/redux/slice/notificationSlice';
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

    // 오늘과 최근 7일 알림 필터링
    const todayNotifications = notifications.filter(noti => noti.daysBetween === 0);
    const recentNotifications = notifications.filter(noti => noti.daysBetween > 0 && noti.daysBetween <= 7);

    // 텍스트 내용에 따라 아이콘 결정
    const getIconName = (text: string) => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('정산')) {
            return 'Wallet';
        } else if (lowerText.includes('택시') || lowerText.includes('taxi')) {
            return 'Taxi';
        } else if (lowerText.includes('배달') || lowerText.includes('delivery')) {
            return 'Delivery';
        } else if (lowerText.includes('구독') || lowerText.includes('ott') || lowerText.includes('넷플릭스') || lowerText.includes('netflix')) {
            return 'Ott';
        }
        return 'Bell'; // 기본 아이콘
    };

    // 아이콘 크기 결정
    const getIconSize = (iconName: string) => {
        if (iconName === 'Wallet') {
            return { width: 22, height: 22 };
        } else if (iconName === 'Taxi' || iconName === 'Delivery' || iconName === 'Ott') {
            return { width: 22, height: 22 };
        }
        return { width: 24, height: 24 };
    };
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

      const handleMarkAllAsRead = async () => {
        // 읽지 않은 알림이 있는 경우에만 처리
        if (!hasUnreadNotifications) {
          return;
        }

        // 1. Optimistic Update: 즉시 UI 업데이트
        const previousNotifications = [...notifications]; // 롤백용 백업
        dispatch(markAllAsCheckedOptimistic());

        try {
          // 2. 백그라운드에서 API 호출
          await dispatch(checkAllNotificationsThunk()).unwrap();

          // 3. 성공 시 서버에서 최신 데이터 가져오기
          dispatch(fetchNotifications());
        } catch (error) {
          // 4. 실패 시 이전 상태로 롤백
          console.error('모든 알림 확인 실패:', error);
          dispatch(rollbackNotifications(previousNotifications));
        }
      };

      // 읽지 않은 알림이 있는지 확인
      const hasUnreadNotifications = notifications.some(noti => !noti.isChecked);

    return (
      <View style={styles.container}>
            <Header
            leftButton={<SVGButton iconName="arrow_left_line2" onPress={goBack}/>}
            leftStyle={styles.leftButtonContainer}
            title={<BasicText text="알림" style={styles.headerText}/>}
            rightButton={
              <TouchableOpacity onPress={handleMarkAllAsRead}>
                <BasicText
                  text="모두 읽음"
                  style={[
                    styles.markAllReadText,
                    hasUnreadNotifications && styles.markAllReadTextActive,
                  ]}
                />
              </TouchableOpacity>
            }
            rightStyle={styles.markAllReadContainer}
            style={styles.header}
            />

            <ScrollView
                style={styles.content}
                contentContainerStyle={{ paddingBottom: Platform.OS === 'android' ? 150 : 100 }} // eslint-disable-line react-native/no-inline-styles
            >
                {
                    loading ? (
                        <ActivityIndicator size="large" color={theme.colors.Galdae} />
                    ) : notifications.length === 0 ? (
                      <View style={styles.noData}>
                <SVG name="information_line" />
                <BasicText text="현재 알림이 비어있습니다." style={styles.noDataText} />
              </View>
                    ) : (
                        <>
                        {todayNotifications.length > 0 && (
                            <>
                        <BasicText text="오늘" style={styles.title}/>
                {
                    todayNotifications.map((noti : NotificationType)=>{
                        const iconName = getIconName(noti.title);
                        const iconSize = getIconSize(iconName);
                        return (
                        <View key={noti.notificationId} style={styles.notiContainer}>
                            <View style={styles.iconWrapper}>
                                <SVG
                                    name={iconName as any}
                                    width={iconSize.width}
                                    height={iconSize.height}
                                />
                            </View>
                            <BasicButton
                            text={noti.title}
                            buttonStyle={noti.isChecked ? styles.read : styles.notRead}
                            textStyle={noti.isChecked ? styles.readText : styles.text}
                            onPress={() => {
                                if (!noti.isChecked) {
                                  handleCheck(noti.notificationId);
                                }
                              }}
                            />
                            {!noti.isChecked && <View style={styles.circle}/>}
                        </View>
                    );})
                }
                </>
                        )}
                        {recentNotifications.length > 0 && (
                            <>
                <BasicText text="최근 7일" style={[styles.subTitle, todayNotifications.length === 0 && styles.firstTitle]}/>
                {
                    recentNotifications.map((noti : NotificationType) =>{
                        const iconName = getIconName(noti.title);
                        const iconSize = getIconSize(iconName);
                        return (
                        <View key={noti.notificationId} style={styles.notiContainer}>
                            <View style={styles.iconWrapper}>
                                <SVG
                                    name={iconName as any}
                                    width={iconSize.width}
                                    height={iconSize.height}
                                />
                            </View>
                            <BasicButton
                            text={noti.title}
                            buttonStyle={noti.isChecked ? styles.read : styles.notRead}
                            textStyle={noti.isChecked ? styles.readText : styles.text}
                            onPress={() => {
                                if (!noti.isChecked) {
                                  handleCheck(noti.notificationId);
                                }
                              }}
                            />
                            {!noti.isChecked && <View style={styles.circle}/>}
                        </View>
                    );})
                }
                </>
                        )}
                        </>
                    )
                }

            </ScrollView>
      </View>
    );
};

export default Notification;

