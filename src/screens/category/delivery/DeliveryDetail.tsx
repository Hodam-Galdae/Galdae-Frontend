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
import { fetchPostDetail } from '../../../modules/redux/slice/postDetailSlice';
import type { RootState } from '../../../modules/redux/RootReducer';
import { useAppDispatch } from '../../../modules/redux/store';
import moment from 'moment';
import { joinChatroom, ChatroomResponse } from '../../../api/chatApi';
import ParticipateModal from '../../../components/popup/ParticipateModal';
import TextTag from '../../../components/tag/TextTag';

type RootStackParamList = {
    CreateGaldae: undefined;
    NowGaldae: undefined;
    DeliveryDetail: { postId: string };
    ChatRoom: { data: Readonly<ChatroomResponse> },
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
    const { postId } = route.params; // 전달받은 postId
    const { postDetail, loading, error } = useSelector(
        (state: RootState) => state.postDetailSlice,
    );
    const dispatch = useAppDispatch();
    const [isParticipating, setIsParticipating] = useState(false);
    // 컴포넌트 마운트 시 Redux를 통해 상세 정보를 불러옴
    useEffect(() => {
        dispatch(fetchPostDetail(postId));
    }, [dispatch, postId]);

    const goBack = () => navigation.goBack();

    const handleParticipateGaldae = async () => {
        setIsParticipating(true);
    };
    const handleNavigateChatRoom = async () => {
        const tagetRoom = await joinChatroom(postId);
        navigation.replace('ChatRoom', { data: Object.freeze(tagetRoom) });
    };
    const formatDepartureTime = (departureTime: string): string => {
        return moment.utc(departureTime).format('YYYY년 MM월 DD일 (ddd) HH : mm');
    };
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={theme.colors.Galdae} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ padding: 16 }}>
                <BasicText text={`오류 발생: ${error}`} />
            </View>
        );
    }

    if (!postDetail) {
        return (
            <View style={{ padding: 16 }}>
                <BasicText text="상세 정보가 없습니다" />
            </View>
        );
    }
    const isFull = postDetail.passengerCount >= postDetail.totalPassengerCount;

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
                            text={postDetail.departure.subPlace}
                            style={styles.headerText}
                        />
                        <SVG name="arrow_right_line" width={22} height={22} />
                        <BasicText
                            text={postDetail.arrival.subPlace}
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
                                text={postDetail.departure.majorPlace}
                                fontSize={theme.fontSize.size16}
                                fontWeight={'500'}
                                color={theme.colors.blackV0}
                                style={styles.deliveryTextPopUpcontent}
                            />
                            <BasicText
                                text={postDetail.departure.subPlace}
                                fontSize={theme.fontSize.size16}
                                fontWeight={'500'}
                                color={theme.colors.blackV0}
                                style={styles.deliveryTextPopUpcontent}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            />
                        </View>
                        <SVG name="arrow_forward" style={styles.arrowForward} />
                        <View style={styles.deliveryFromContainer}>
                            <BasicText
                                text={postDetail.arrival.majorPlace}
                                fontSize={theme.fontSize.size16}
                                fontWeight={'500'}
                                color={theme.colors.blackV0}
                                style={styles.deliveryTextPopUpcontent}
                            />
                            <BasicText
                                text={postDetail.arrival.subPlace}
                                fontSize={theme.fontSize.size16}
                                fontWeight={'500'}
                                color={theme.colors.blackV0}
                                style={styles.deliveryTextPopUpcontent}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            />
                        </View>
                    </View>
                </View>
                <BasicText
                    text={'그룹 정보'}
                    style={styles.galdaeOwner}
                />
                <View key={postDetail.departureTime} style={styles.borderedListBox}>
                    <View style={styles.borderedListBoxContainer}>
                        {/**postDetail.userInfo?.name || */}
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
                                text={`${postDetail.userInfo?.nickname}` || '작성자'}
                                style={styles.writeUserName}
                            />
                            <View style={styles.fromContainer}>
                                <BasicText
                                    text={postDetail.departure.majorPlace}
                                    style={styles.writeUserName}
                                />
                                <BasicText
                                    text={postDetail.departure.subPlace}
                                    style={styles.writeUserName}
                                />
                            </View>

                            <View style={styles.fromContainer}>
                                <BasicText
                                    text={postDetail.arrival.majorPlace}
                                    style={styles.writeUserName}
                                />
                                <BasicText
                                    text={postDetail.arrival.subPlace}
                                    style={styles.writeUserName}
                                />
                            </View>
                            <BasicText
                                text={formatDepartureTime(postDetail.departureTime)}
                                style={styles.writeUserName}
                            />
                            <BasicText
                                text={`${postDetail.passengerCount}/${postDetail.totalPassengerCount}`}
                                style={styles.writeUserName}
                            />


                        </View>

                    </View>
                    <View style={styles.tagsContainer}>

                        <View style={styles.tags}>
                            {postDetail.arrangeTime === 'POSSIBLE' ? (
                                <TextTag text="시간협의가능"
                                    viewStyle={styles.timePossible}
                                    textStyle={styles.timePossibleText}
                                />
                            ) : postDetail.arrangeTime === 'IMPOSSIBLE' ? (
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
                            {postDetail.passengerGenderType === 'SAME' ? (
                                <TextTag text="동성만"
                                    viewStyle={styles.timePossible}
                                    textStyle={styles.timePossibleText}
                                />
                            ) : postDetail.passengerGenderType === 'DONT_CARE' ? (
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
                    <BasicText text={postDetail.userInfo?.nickname} style={styles.messageText} />
                </View>


            </ScrollView>
            <View style={styles.participateContainer}>
                {postDetail.isParticipated ? (
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
                    onCancel={() => setIsParticipating(false)}
                    onConfirm={handleNavigateChatRoom}
                    fromMajor={postDetail.departure.majorPlace}
                    fromSub={postDetail.departure.subPlace}
                    toMajor={postDetail.arrival.majorPlace}
                    toSub={postDetail.arrival.subPlace}
                />
            )}
        </View>
    );
};

export default DeliveryDetail;
