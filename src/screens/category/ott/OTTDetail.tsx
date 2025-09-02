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
// import { useSelector } from 'react-redux';
// import { fetchPostDetail } from '../../../modules/redux/slice/postDetailSlice';
// import type { RootState } from '../../../modules/redux/RootReducer';
import { useAppDispatch } from '../../../modules/redux/store';
import moment from 'moment';
import { joinChatroom, ChatroomResponse } from '../../../api/chatApi';
import ParticipateModal from '../../../components/popup/ParticipateModal';
import { OTTItemType } from '../../../types/getTypes';
import TextTag from '../../../components/tag/TextTag';

type RootStackParamListd = {
    CreateGaldae: undefined;
    NowGaldae: undefined;
    OTTDetail: { postId: string };
    ChatRoom: { data: Readonly<ChatroomResponse> },
    OTTNDivide: undefined,
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
    const { postId } = route.params; // 전달받은 postId

    // const { postDetail, loading, error } = useSelector(
    //     (state: RootState) => state.postDetailSlice,
    // );
    const postDetail: OTTItemType = {
        postId: '1',
        postService: '넷플릭스',
        postType: 'OTT',
        totalPersonCount: 1,
        price: 10000,
        personCount: 1,
        createdAt: '2025-01-01',
        userNickName: 'test',
        isCompleted: false,
        isWriter: true,
        isParticipated: false,
    };
    const dispatch = useAppDispatch();
    const [isParticipating, setIsParticipating] = useState(false);
    // 컴포넌트 마운트 시 Redux를 통해 상세 정보를 불러옴
    useEffect(() => {
        // dispatch(fetchPostDetail(postId));  // OTT 상세 정보 조회
    }, [dispatch, postId]);

    const goBack = () => navigation.goBack();

    const handleParticipateGaldae = async () => {
        setIsParticipating(true);
        // const tagetRoom = await joinChatroom(postId);
        //navigation.replace('ChatRoom', { data: Object.freeze(tagetRoom) });
        // 참여 로직 처리
    };
    const handleNavigateChatRoom = async () => {
        const tagetRoom = await joinChatroom(postId);
        navigation.replace('ChatRoom', { data: Object.freeze(tagetRoom) });
    };
    const formatDepartureTime = (departureTime: string): string => {
        return moment.utc(departureTime).format('YYYY년 MM월 DD일 (ddd) HH : mm');
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

    if (!postDetail) {
        return (
            <View style={{ padding: 16 }}>
                <BasicText text="상세 정보가 없습니다" />
            </View>
        );
    }
    const isFull = postDetail.personCount >= postDetail.totalPersonCount;


    // console.log(`mapUrl: ${mapUrl}`);
    return (
        <View style={styles.main}>
            <Header
                style={styles.header}
                leftButton={<SVGButton iconName="arrow_left_line2" onPress={goBack} />}
                title={
                    <View style={styles.headerTitle}>
                        <BasicText
                            text={postDetail.postService}
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
                <View key={postDetail.postId} style={styles.borderedListBox}>

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
                            {postDetail.postType === 'OTT' ? (
                                <TextTag text="OTT"
                                    viewStyle={styles.timePossible}
                                    textStyle={styles.timePossibleText}
                                />
                            ) : postDetail.postType === 'TV' ? (
                                <TextTag text="방송"
                                    viewStyle={styles.timeNotPossible}
                                    textStyle={styles.timeNotPossibleText}
                                />
                            ) : postDetail.postType === 'MUSIC' ? (
                                <TextTag text="음악"
                                    viewStyle={styles.timePossible}
                                    textStyle={styles.timeNotPossibleText}
                                />
                            ) : postDetail.postType === 'PRODUCTIVITY' ? (
                                <TextTag text="생산성"
                                    viewStyle={styles.timePossible}
                                    textStyle={styles.timePossibleText}
                                />
                            ) : postDetail.postType === 'EDUCATION' ? (
                                <TextTag text="교육"
                                    viewStyle={styles.timePossible}
                                    textStyle={styles.timePossibleText}
                                />
                            ) : postDetail.postType === 'MEMBERSHIP' ? (
                                <TextTag text="멤버쉽"
                                    viewStyle={styles.timePossible}
                                    textStyle={styles.timePossibleText}
                                />
                            ) : (
                                <TextTag text="기타"
                                    viewStyle={styles.timePossible}
                                    textStyle={styles.timePossibleText}
                                />
                            )}
                        </View>
                    </View>

                    <View style={styles.menuContainer}>
                        <BasicText
                            text={`${postDetail.userNickName}` || '작성자'}
                            style={styles.writeUserName}
                        />
                        <View style={styles.fromContainer}>
                            <BasicText
                                text={postDetail.postService}
                                style={styles.writeUserName}
                            />
                        </View>

                        <View style={styles.fromContainer}>
                            <BasicText
                                text={postDetail.price.toLocaleString() + '원'}
                                style={styles.writeUserName}
                            />
                        </View>

                        <BasicText
                            text={`${postDetail.personCount}/${postDetail.totalPersonCount}`}
                            style={styles.writeUserName}
                        />

                    </View>
                </View>



                <BasicText text="빵장의 한마디" style={styles.galdaeOwner} />

                <View style={styles.userInfoBox}>
                    <BasicText text={postDetail.userNickName || ''} style={styles.messageText} />
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
                    subTitle={postDetail.postService}
                    onCancel={() => navigation.navigate('OTTNDivide')}
                    onConfirm={handleNavigateChatRoom}
                />
            )}
        </View>
    );
};

export default OTTDetail;
