/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
// NowGaldaeDetail.tsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import BasicText from '../../../components/BasicText';
import SVGButton from '../../../components/button/SVGButton';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Header from '../../../components/Header';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../../../styles/OTTDetail.style';
import SVG from '../../../components/SVG';
import { theme } from '../../../styles/theme';
import BasicButton from '../../../components/button/BasicButton';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { fetchSubscribeDetail } from '../../../modules/redux/slice/subScribeSlice';
import type { RootState } from '../../../modules/redux/RootReducer';
import { useAppDispatch } from '../../../modules/redux/store';
import moment from 'moment';
import { joinGroup } from '../../../api/groupApi';
import { GroupJoinResponse } from '../../../types/groupTypes';
import ParticipateModal from '../../../components/popup/ParticipateModal';
import AuthRequiredModal from '../../../components/popup/AuthRequiredModal';
import { SubscribeDetailResponse } from '../../../types/subScribeTypes';
import TextTag from '../../../components/tag/TextTag';

type RootStackParamListd = {
    CreateGaldae: undefined;
    NowGaldae: undefined;
    OTTDetail: { subscribeId: string; showAuthModal?: boolean };
    ChatRoom: { chatroomId: number };
    OTTNDivide: undefined;
    SignUp: { data: boolean };
    ContinueSignUp: undefined;
};

type OTTDetailScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamListd,
    'OTTDetail'
>;
type OTTDetailRouteProp = RouteProp<
    RootStackParamListd,
    'OTTDetail'
>;

const OTTDetail: React.FC = () => {
    const navigation = useNavigation<OTTDetailScreenNavigationProp>();
    const route = useRoute<OTTDetailRouteProp>();
    const { subscribeId, showAuthModal } = route.params; // 전달받은 postId

    const { detail, detailLoading, detailError } = useSelector(
        (state: RootState) => state.subscribeSlice,
    );

    const dispatch = useAppDispatch();
    const [isParticipating, setIsParticipating] = useState(false);
    const [authRequiredModalVisible, setAuthRequiredModalVisible] = useState(false);
    const [tagetRoom, setTagetRoom] = useState<any>(null);

    // 컴포넌트 마운트 시 Redux를 통해 상세 정보를 불러옴
    useEffect(() => {
        dispatch(fetchSubscribeDetail(subscribeId));  // OTT 상세 정보 조회
        console.log('🚀 OTT 상세 정보 불러오기:', subscribeId);
    }, [dispatch, subscribeId]);

    // 인증 모달 표시
    useEffect(() => {
        if (showAuthModal) {
            setTimeout(() => {
                setAuthRequiredModalVisible(true);
            }, 300);
        }
    }, [showAuthModal]);

    const goBack = () => navigation.goBack();

    const handleParticipateGaldae = async () => {
        setIsParticipating(true);
        const joinedRoom = await joinGroup(subscribeId);
        setTagetRoom(joinedRoom);
        //navigation.replace('ChatRoom', { data: Object.freeze(tagetRoom) });
        // 참여 로직 처리
    };
    const handleNavigateChatRoom = async () => {

        if (tagetRoom) {
            navigation.replace('ChatRoom', { chatroomId: tagetRoom.chatroomId });
        }
        setIsParticipating(false);
    };

    const handleAuthRequiredConfirm = () => {
        setAuthRequiredModalVisible(false);
        navigation.navigate('ContinueSignUp');
    };

    const handleAuthRequiredCancel = () => {
        setAuthRequiredModalVisible(false);
        navigation.goBack();
    };

    // if (loading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <ActivityIndicator size="large" color={theme.colors.Galdae} />
    //         </View>
    //     );
    // }

    // if (error) {
    //     return (
    //         <View style={{ padding: 16 }}>
    //             <BasicText text={`오류 발생: ${error}`} />
    //         </View>
    //     );
    // }

    if (!detail) {
        return (
            <View style={{ padding: 16 }}>
                <BasicText text="상세 정보가 없습니다" />
            </View>
        );
    }
    const isFull = detail.joinedPersonCount >= detail.totalPersonCount;

console.log(`OTT 상세 정보: ${detail}`,detail);
    // console.log(`mapUrl: ${mapUrl}`);
    return (
        <View style={styles.main}>
            <Header
                style={styles.header}
                leftButton={<SVGButton iconName="arrow_left_line2" onPress={goBack} />}
                title={
                    <View style={styles.headerTitle}>
                        <BasicText
                            text={detail.subscribeType}
                            style={styles.headerText}
                        />
                    </View>
                }
            />
            <ScrollView style={styles.content}>
                {/* <View style={styles.advertiseBox}>
          <BasicText text="advertiseBox" />
        </View> */}

                <BasicText
                    text={'그룹 정보'}
                    style={styles.galdaeOwner}
                />
                <View key={detail.subscribeType} style={styles.borderedListBox}>

                    <View style={styles.menuContainer}>
                        <BasicText
                            text={'빵장'}
                            style={styles.menuText}
                        />
                        <BasicText
                            text={'구독 서비스'}
                            style={styles.menuText}
                        />
                        <BasicText
                            text={'1인 가격'}
                            style={styles.menuText}
                        />
                        <BasicText
                            text={'인원'}
                            style={styles.menuText}
                        />
                        <View style={styles.tags}>
                            <TextTag text={detail.subscribeType}
                                viewStyle={styles.timePossible}
                                textStyle={styles.timePossibleText}
                            />
                        </View>
                    </View>

                    <View style={styles.menuContainer}>
                        <BasicText
                            text={`${detail.userInfo?.nickname || '작성자'}`}
                            style={styles.writeUserName}
                        />
                        <View style={styles.fromContainer}>
                            <BasicText
                                text={detail.subscribeType}
                                style={styles.writeUserName}
                            />
                        </View>

                        <View style={styles.fromContainer}>
                            <BasicText
                                text={detail.onePersonFee.toLocaleString() + '원'}
                                style={styles.writeUserName}
                            />
                        </View>

                        <BasicText
                            text={`${detail.joinedPersonCount}/${detail.totalPersonCount}`}
                            style={styles.writeUserName}
                        />

                    </View>
                </View>



                <BasicText text="빵장의 한마디" style={styles.galdaeOwner} />

                <View style={styles.userInfoBox}>
                    <BasicText text={detail.content || ''} style={styles.messageText} />
                </View>


            </ScrollView>
            <View style={styles.participateContainer}>
                {detail.isParticipatedGroup || detail.isWriter ? (
                    <BasicButton
                        text="이미 참여한 N빵"
                        buttonStyle={styles.participateBtn}
                        textStyle={styles.participateText}
                        loading={false}
                        disabled={true}
                        enabledColors={{
                            backgroundColor: theme.colors.grayV2,
                            textColor: theme.colors.grayV0,
                        }}
                        disabledColors={{
                            backgroundColor: theme.colors.grayV2,
                            textColor: theme.colors.grayV0,
                        }}
                    />
                ) : isFull ? (
                    <BasicButton
                        text="참여불가"
                        buttonStyle={styles.participateBtn}
                        textStyle={styles.participateText}
                        loading={false}
                        disabled={true}
                        disabledColors={{
                            backgroundColor: theme.colors.grayV3,
                            textColor: theme.colors.blackV0,
                        }}
                    />
                ) : (
                    <BasicButton
                        text="참여하기"
                        buttonStyle={styles.participateBtn}
                        textStyle={styles.participateText}
                        loading={false}
                        onPress={handleParticipateGaldae}
                    />
                )}
            </View>
            {/* { mapBig && (
          <BigMapModal
            ref={mapModalRef}
            mapUrl={mapUrl}
          />
        )} */}
            {isParticipating && (
                <ParticipateModal
                    visible={isParticipating}
                    subTitle={detail.subscribeType}
                    onCancel={() => { setIsParticipating(false); navigation.navigate('OTTNDivide'); }}
                    onConfirm={handleNavigateChatRoom}
                />
            )}

            <AuthRequiredModal
                visible={authRequiredModalVisible}
                onConfirm={handleAuthRequiredConfirm}
                onCancel={handleAuthRequiredCancel}
            />
        </View>
    );
};

export default OTTDetail;
