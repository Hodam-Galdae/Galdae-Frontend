/* eslint-disable react-native/no-inline-styles */
// NowGaldaeDetail.tsx
import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';
//import { Modalize } from 'react-native-modalize';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import BasicText from '../components/BasicText';
import SVGButton from '../components/button/SVGButton';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Header from '../components/Header';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../styles/NowGaldaeDetail.style';
import SVG from '../components/SVG';
import { theme } from '../styles/theme';
import BasicButton from '../components/button/BasicButton';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { fetchPostDetail } from '../modules/redux/slice/postDetailSlice';
import type { RootState } from '../modules/redux/RootReducer';
import { useAppDispatch } from '../modules/redux/store';
import moment from 'moment';
import { joinChatroom, ChatroomResponse } from '../api/chatApi';
import { TouchableOpacity } from 'react-native';
import ParticipateModal from '../components/popup/ParticipateModal';
//import BigMapModal from '../components/popup/BigMapModal';

type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: undefined;
  NowGaldaeDetail: { postId: string };
  ChatRoom: { data: Readonly<ChatroomResponse> },
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
  const { postId } = route.params; // 전달받은 postId
  //const [mapBig,setMapBig] = useState<boolean>(false);
  // ✅ 웹뷰에서 받은 예상 시간/거리 정보를 보관
  const [eta, setEta] = useState<{
    minutes: number;
    distance: number;   // m
    duration: number;   // sec
    at: string;         // ISO timestamp (중복 수신 디듬돌)
  } | null>(null);

  // ✅ 중복 메시지 방지 (안드로이드에서 간혹 2번 들어오는 경우 대비)
  const lastMessageIdRef = useRef<string | null>(null);

  const [isMapLoading, setIsMapLoading] = useState(true);
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
  // const toBigMap = () =>{
  //   setMapBig(true);
  //   mapModalRef.current?.open();
  // };
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
  // 지도 URL은 departure와 arrival의 좌표를 사용
  const mapUrl = `https://galdae-kakao-map.vercel.app/?startLat=${postDetail.departure.latitude}&startLng=${postDetail.departure.longtitude}&endLat=${postDetail.arrival.latitude}&endLng=${postDetail.arrival.longtitude}`;
  //const mapUrl = 'https://galdae-kakao-map.vercel.app/?startLat=37.5665&startLng=126.9780&endLat=37.4979&endLng=127.0276'; //테스트용

  // ✅ WebView 메시지 수신 처리
  const handleWebViewMessage = (e: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(e.nativeEvent.data);

      // 타입 분기(필요 시 확장)
      if (data?.type === 'estimatedTime') {
        // 고유성 체크용 키(내용+시간) 구성
        const msgId = `${data.estimatedTime}-${data.distance}-${data.duration}-${data.timestamp ?? ''}`;
        if (lastMessageIdRef.current === msgId) {return;} // 같은 메시지 무시
        lastMessageIdRef.current = msgId;

        setEta({
          minutes: Number(data.estimatedTime),
          distance: Number(data.distance),
          duration: Number(data.duration),
          at: data.timestamp ?? new Date().toISOString(),
        });

        // ✅ Redux에 저장하고 싶다면(옵션):
        // dispatch(setEstimatedTime({ postId, ... 위 값들 }));
      }
    } catch (err) {
      // JSON이 아니거나 포맷이 다르면 무시
      console.warn('웹뷰 메시지 파싱 실패:', err, e.nativeEvent.data);
    }
  };

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
        {/* <View style={styles.advertiseBox}>
          <BasicText text="advertiseBox" />
        </View> */}
        <TouchableOpacity style={styles.map} >
          <View style={styles.map}>
            <WebView
              source={{ uri: mapUrl }}
              style={styles.map}
              onLoadStart={() => setIsMapLoading(true)}
              onLoadEnd={() => setIsMapLoading(false)}
              pointerEvents="box-none"
              onMessage={handleWebViewMessage}
            />
            {isMapLoading && (
              <View style={[styles.map, { position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.6)' }]}>
                <ActivityIndicator size="large" color={theme.colors.Galdae} />
              </View>
            )}
          </View>
          {/* <SVGButton
            iconName="ToBigPic"
            onPress={toBigMap}
            buttonStyle={styles.toBigPicIcon}
          /> */}
        </TouchableOpacity>

        <BasicText
          text={'그룹 정보'}
          style={styles.galdaeOwner}
        />
        <View key={postDetail.departureTime} style={styles.borderedListBox}>
          {/**postDetail.userInfo?.name || */}
          <View style={styles.menuContainer}>
            <BasicText
              text={'빵장'}
              style={styles.menuText}
            />
            <BasicText
              text={'출발지'}
              style={styles.menuText}
            />
            <BasicText
              text={'도착지'}
              style={styles.menuText}
            />
            <BasicText
              text={'출발 시간'}
              style={styles.menuText}
            />
            <BasicText
              text={'인원'}
              style={styles.menuText}
            />
            <BasicText
              text={'소요시간'}
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
            {/* <View style={styles.tags}>
              {postDetail.passengerGenderType === 'SAME' ? (
                <TextTag text="동성만" />
              ) : postDetail.passengerGenderType === 'DONT_CARE' ? (
                <TextTag text="성별무관" />
              ) : (
                <TextTag text="상관없음" />
              )}
            </View> */}
            {eta && (
              <BasicText
                text={`${eta.minutes}분 `}
                style={styles.writeUserName}
              />
            )}
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

export default NowGaldaeDetail;
