/* eslint-disable react-native/no-inline-styles */
// DeliveryDetail.tsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import BasicText from '../../../components/BasicText';
import SVGButton from '../../../components/button/SVGButton';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Header from '../../../components/Header';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../../../styles/DeliveryDetail.style';
import SVG from '../../../components/SVG';
import { theme } from '../../../styles/theme';
import BasicButton from '../../../components/button/BasicButton';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { fetchOrderDetail } from '../../../modules/redux/slice/orderSlice';
import type { RootState } from '../../../modules/redux/RootReducer';
import { useAppDispatch } from '../../../modules/redux/store';

import ParticipateModal from '../../../components/popup/ParticipateModal';
import AuthRequiredModal from '../../../components/popup/AuthRequiredModal';
import { joinGroup } from '../../../api/groupApi';
import TextTag from '../../../components/tag/TextTag';
type RootStackParamList = {
    CreateGaldae: undefined;
    NowGaldae: undefined;
    DeliveryDetail: { orderId: string; showAuthModal?: boolean };
    ChatRoom: { chatroomId: number };
    DeliveryNDivide: undefined;
    SignUp: { data: boolean };
    ContinueSignUp: undefined;
};

type DeliveryDetailScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'DeliveryDetail'
>;
type DeliveryDetailRouteProp = RouteProp<
    RootStackParamList,
    'DeliveryDetail'
>;

const DeliveryDetail: React.FC = () => {
    const navigation = useNavigation<DeliveryDetailScreenNavigationProp>();
    const route = useRoute<DeliveryDetailRouteProp>();
    const { orderId, showAuthModal } = route.params; // 전달받은 postId
    const { detail, detailLoading, detailError } = useSelector(
        (state: RootState) => state.orderSlice,
    );
    const dispatch = useAppDispatch();
    const [isParticipating, setIsParticipating] = useState(false);
    const [authRequiredModalVisible, setAuthRequiredModalVisible] = useState(false);
    const [tagetRoom, setTagetRoom] = useState<any>(null);

    // 컴포넌트 마운트 시 Redux를 통해 상세 정보를 불러옴
    useEffect(() => {
        dispatch(fetchOrderDetail(orderId));
    }, [dispatch, orderId]);

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
        const joinedRoom = await joinGroup(orderId);
        setTagetRoom(joinedRoom);
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

    if (detailLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={theme.colors.Galdae} />
            </View>
        );
    }

    if (detailError) {
        return (
            <View style={{ padding: 16 }}>
                <BasicText text={`오류 발생: ${detailError}`} />
            </View>
        );
    }

    if (!detail) {
        return (
            <View style={{ padding: 16 }}>
                <BasicText text="상세 정보가 없습니다" />
            </View>
        );
    }

    // console.log(`mapUrl: ${mapUrl}`);
    return (
        <View style={styles.main}>
            <Header
                style={styles.header}
                leftButton={<SVGButton iconName="arrow_left_line2" onPress={goBack} />}
                title={
                    <View style={styles.headerTitle}>
                        {/* <SVG name="location_line" width={22} height={22} /> */}
                        <BasicText
                            text={detail.restaurantName}
                            style={styles.headerText}
                        />
                        <SVG name="arrow_right_line" width={22} height={22} />
                        <BasicText
                            text={detail.orderLocation}
                            style={styles.headerText}
                        />
                    </View>
                }
            />
            <ScrollView style={styles.content}>
                <View style={styles.deliveryInfoBox}>
                    <View style={styles.locationContainer}>
                        <View style={styles.deliveryFromContainer}>
                                <BasicText
                                    text={detail.restaurantName}
                                fontSize={theme.fontSize.size16}
                                fontWeight={'500'}
                                color={theme.colors.blackV0}
                                style={styles.deliveryTextPopUpcontent}
                            />
                        </View>
                        <SVG name="arrow_forward" style={styles.arrowForward} />
                        <View style={styles.deliveryFromContainer}>
                            <BasicText
                                text={detail.orderLocation}
                                fontSize={theme.fontSize.size16}
                                fontWeight={'500'}
                                color={theme.colors.blackV0}
                                style={styles.deliveryTextPopUpcontent}
                            />
                        </View>
                    </View>
                </View>
                <BasicText
                    text={'그룹 정보'}
                    style={styles.galdaeOwner}
                />
                <View style={styles.borderedListBox}>
                    <View style={styles.borderedListBoxContainer}>
                        {/**detail.userInfo?.name || */}
                        <View style={styles.menuContainer}>
                            <BasicText
                                text={'빵장'}
                                style={styles.menuText}
                            />
                            <BasicText
                                text={'식당'}
                                style={styles.menuText}
                            />
                            <BasicText
                                text={'배달지'}
                                style={styles.menuText}
                            />
                            <BasicText
                                text={'주문 시간'}
                                style={styles.menuText}
                            />
                            <BasicText
                                text={'인원'}
                                style={styles.menuText}
                            />


                        </View>

                        <View style={styles.menuContainer}>
                            <BasicText
                                text={`${detail.groupOwner}` || '작성자'}
                                style={styles.writeUserName}
                            />
                            <View style={styles.fromContainer}>
                                <BasicText
                                    text={detail.restaurantName}
                                    style={styles.writeUserName}
                                />
                            </View>

                            <View style={styles.fromContainer}>
                                <BasicText
                                    text={detail.orderLocation}
                                    style={styles.writeUserName}
                                />
                            </View>
                            <BasicText
                                text={detail.orderAt}
                                style={styles.writeUserName}
                            />
                            <BasicText
                                    text={`${detail.currentPerson}/${detail.maximumPerson}`}
                                    style={styles.writeUserName}
                            />


                        </View>

                    </View>
                    <View style={styles.tagsContainer}>

                        <View style={styles.tags}>
                            {detail.isTimeNegotiable === true ? (
                                <TextTag text="시간협의가능"
                                    viewStyle={styles.timePossible}
                                    textStyle={styles.timePossibleText}
                                />
                            ) : detail.isTimeNegotiable === false ? (
                                <TextTag text="시간협의불가"
                                    viewStyle={styles.timeNotPossible}
                                    textStyle={styles.timeNotPossibleText}
                                />
                            ) : (
                                <TextTag text="시간협의불가"
                                    viewStyle={styles.timeNotPossible}
                                    textStyle={styles.timeNotPossibleText}
                                />
                            )}
                        </View>
                        {/* <View style={styles.tags}>
                            {detail.passengerGenderType === 'SAME_GENDER' ? (
                                <TextTag text="동성만"
                                    viewStyle={styles.timePossible}
                                    textStyle={styles.timePossibleText}
                                />
                            ) : detail.passengerGenderType === 'DONT_CARE_GENDER' ? (
                                <TextTag text="성별무관"
                                    viewStyle={styles.timePossible}
                                    textStyle={styles.timePossibleText}
                                />
                            ) : (
                                <TextTag text="상관없음"
                                    viewStyle={styles.timePossible}
                                    textStyle={styles.timePossibleText}
                                />
                            )}
                        </View> */}
                    </View>
                </View>



                <BasicText text="빵장의 한마디" style={styles.galdaeOwner} />

                <View style={styles.userInfoBox}>
                    <BasicText text={detail.description} style={styles.messageText} />
                </View>


            </ScrollView>
            <View style={styles.participateContainer}>
                {!detail.canJoin ? (
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
                ) : detail.maximumPerson === detail.currentPerson ? (
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
                    onCancel={() => { setIsParticipating(false); navigation.navigate('DeliveryNDivide'); }}
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

export default DeliveryDetail;
