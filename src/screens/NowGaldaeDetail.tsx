/* eslint-disable react-native/no-inline-styles */
// NowGaldaeDetail.tsx
import React, {useEffect, useState} from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
//import { Modalize } from 'react-native-modalize';
import {WebView} from 'react-native-webview';
import BasicText from '../components/BasicText';
import SVGButton from '../components/button/SVGButton';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import Header from '../components/Header';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styles from '../styles/NowGaldaeDetail.style';
import SVG from '../components/SVG';
import {theme} from '../styles/theme';
import TextTag from '../components/tag/TextTag';
import BasicButton from '../components/button/BasicButton';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {fetchPostDetail} from '../modules/redux/slice/postDetailSlice';
import type {RootState} from '../modules/redux/RootReducer';
import {useAppDispatch} from '../modules/redux/store';
import moment from 'moment';
import {joinChatroom, ChatroomResponse} from '../api/chatApi';
import { TouchableOpacity } from 'react-native';
//import BigMapModal from '../components/popup/BigMapModal';

type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: undefined;
  NowGaldaeDetail: {postId: string};
  ChatRoom: { data : Readonly<ChatroomResponse> },
};

type NowGaldaeDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'NowGaldaeDetail'
>;
type NowGaldaeDetailRouteProp = RouteProp<
  RootStackParamList,
  'NowGaldaeDetail'
>;

const NowGaldaeDetail: React.FC = () => {
  const navigation = useNavigation<NowGaldaeDetailScreenNavigationProp>();
  //const mapModalRef = useRef<Modalize>(null);
  const route = useRoute<NowGaldaeDetailRouteProp>();
  const {postId} = route.params; // 전달받은 postId
  //const [mapBig,setMapBig] = useState<boolean>(false);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const {postDetail, loading, error} = useSelector(
    (state: RootState) => state.postDetailSlice,
  );
  const dispatch = useAppDispatch();

  // 컴포넌트 마운트 시 Redux를 통해 상세 정보를 불러옴
  useEffect(() => {
    dispatch(fetchPostDetail(postId));
  }, [dispatch, postId]);

  const goBack = () => navigation.goBack();

  const handleParticipateGaldae = async() => {
    const tagetRoom = await joinChatroom(postId);
    navigation.replace('ChatRoom', { data: Object.freeze(tagetRoom)});
    // 참여 로직 처리
  };
  const formatDepartureTime = (departureTime: string): string => {
    return moment.utc(departureTime).format('YYYY년 MM월 DD일 (ddd) HH : mm');
  };
  // const toBigMap = () =>{
  //   setMapBig(true);
  //   mapModalRef.current?.open();
  // };
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={theme.colors.brandColor} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{padding: 16}}>
        <BasicText text={`오류 발생: ${error}`} />
      </View>
    );
  }

  if (!postDetail) {
    return (
      <View style={{padding: 16}}>
        <BasicText text="상세 정보가 없습니다" />
      </View>
    );
  }
  const isFull = postDetail.passengerCount >= postDetail.totalPassengerCount;
  // 지도 URL은 departure와 arrival의 좌표를 사용
  const mapUrl = `https://galdae-kakao-map.vercel.app/?startLat=${postDetail.departure.latitude}&startLng=${postDetail.departure.longtitude}&endLat=${postDetail.arrival.latitude}&endLng=${postDetail.arrival.longtitude}`;
  //const mapUrl = 'https://galdae-kakao-map.vercel.app/?startLat=37.5665&startLng=126.9780&endLat=37.4979&endLng=127.0276'; //테스트용
  // console.log(`mapUrl: ${mapUrl}`);
  return (
    <View style={styles.main}>
      <Header
        leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack} />}
        title={
          <View style={styles.headerTitle}>
            <SVG name="location_line" width={22} height={22} />
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
        {/* <View style={styles.advertiseBox}>
          <BasicText text="advertiseBox" />
        </View> */}

        <View key={postDetail.departureTime} style={styles.borderedListBox}>
          {/**postDetail.userInfo?.name || */}
          <BasicText
            text={`${postDetail.userInfo?.nickname}님의 갈대` || '작성자'}
            style={styles.galdaeOwner}
          />
          <View style={styles.fromContainer}>
            <SVG name="Car" />
            <BasicText
              text={postDetail.departure.subPlace}
              style={styles.fromMainLocation}
            />
            <BasicText
              text={postDetail.departure.majorPlace}
              style={styles.fromSubLocation}
            />
          </View>
          <View style={styles.toContainer}>
            <View style={styles.fromToLine}>
              <SVG name="FromToLine" />
            </View>
            {Array(postDetail.passengerCount)
              .fill(null)
              .map((_, idx) => (
                <SVG
                  key={`user-${postDetail.departureTime}-${idx}`}
                  name="User"
                />
              ))}
            {Array(postDetail.totalPassengerCount - postDetail.passengerCount)
              .fill(null)
              .map((_, idx) => (
                <SVG
                  key={`disabled-${postDetail.departureTime}-${idx}`}
                  name="DisabledUser"
                />
              ))}
            <BasicText
              text={`(${postDetail.passengerCount}/${postDetail.totalPassengerCount})`}
              fontWeight={500}
              fontSize={theme.fontSize.size16}
              color={theme.colors.gray1}
            />
          </View>
          <View style={styles.toContainer}>
            <SVG name="Location" />
            <BasicText
              text={postDetail.arrival.subPlace}
              style={styles.fromMainLocation}
            />
            <BasicText
              text={postDetail.arrival.majorPlace}
              style={styles.fromSubLocation}
            />
          </View>
          <View style={styles.timeContainer}>
            <SVG name="Clock" />
            <View>
              <BasicText
                text={
                  postDetail.arrangeTime === 'POSSIBLE'
                    ? '시간 협의가능'
                    : '시간 협의불가'
                }
                style={styles.fromMainLocation}
                color={theme.colors.gray2}
                fontSize={theme.fontSize.size10}
              />
              <BasicText
                text={formatDepartureTime(postDetail.departureTime)}
                style={styles.fromSubLocation}
                color={theme.colors.black}
                fontSize={theme.fontSize.size14}
              />
            </View>
          </View>
          <View style={styles.tags}>
            {postDetail.passengerGenderType === 'SAME' ? (
              <TextTag text="동성만" />
            ) : postDetail.passengerGenderType === 'DONT_CARE' ? (
              <TextTag text="성별무관" />
            ) : (
              <TextTag text="상관없음" />
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.map} >
          <View style={styles.map}>
            <WebView
              source={{uri: mapUrl}}
              style={styles.map}
              onLoadStart={() => setIsMapLoading(true)}
              onLoadEnd={() => setIsMapLoading(false)}
              pointerEvents="box-none"
            />
            {isMapLoading && (
              <View style={[styles.map, { position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.6)' }]}>
                <ActivityIndicator size="large" color={theme.colors.brandColor} />
              </View>
            )}
          </View>
          {/* <SVGButton
            iconName="ToBigPic"
            onPress={toBigMap}
            buttonStyle={styles.toBigPicIcon}
          /> */}
        </TouchableOpacity>

        <BasicText text="유저정보" style={styles.userInfo} />

        <View style={styles.userInfoBox}>
          <View style={styles.userInfos}>
            <View style={styles.profile}>
              {
                postDetail.userInfo.profileImage ? (
                <Image
                  source={{ uri: postDetail.userInfo.profileImage }}
                  style={styles.profileImg}
                  resizeMode="cover"
                />
                ) : (
                <SVG name="profileImg" style={styles.profileImg} />
                )
              }

            </View>
            <View style={styles.userInfoText}>
              <BasicText
                text={postDetail.userInfo.university}
                style={styles.universityText}
              />
              <BasicText
                text={postDetail.userInfo.nickname}
                style={styles.nameText}
              />
            </View>
          </View>
          {postDetail.userInfo.isAuthenticated && (
            <SVG name="Badge" style={styles.badge} />
          )}
        </View>

        <View style={styles.participateContainer}>
        {postDetail.isParticipated ? (
    <BasicButton
      text="이미 참여한 갈대입니다."
      buttonStyle={styles.participateBtn}
      textStyle={styles.participateText}
      loading={false}
      disabled={true}
      disabledColors={{
        backgroundColor: theme.colors.lightGray,
        textColor: theme.colors.black,
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
        backgroundColor: theme.colors.lightGray,
        textColor: theme.colors.black,
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
      </ScrollView>

      {/* { mapBig && (
          <BigMapModal
            ref={mapModalRef}
            mapUrl={mapUrl}
          />
        )} */}
    </View>
  );
};

export default NowGaldaeDetail;
