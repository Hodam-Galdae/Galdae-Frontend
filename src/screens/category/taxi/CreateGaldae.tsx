/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
// CreateGaldae.tsx
import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import { TouchableOpacity, View, ScrollView, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../styles/CreateGaldae.style';
import BasicText from '../../../components/BasicText';
import PositionBox from '../../../components/PostionBox';
import SVGButton from '../../../components/button/SVGButton';
import { theme } from '../../../styles/theme';
import BasicButton from '../../../components/button/BasicButton';
import Header from '../../../components/Header';
import SelectTextButton from '../../../components/button/SelectTextButton';
import FastGaldaeStartPopup, { FastGaldaeStartPopupRef } from '../../../components/popup/FastGaldaeStartPopup';
import FastGaldaeEndPopup, { FastGaldaeEndPopupRef } from '../../../components/popup/FastGaldaeEndPopup';
import FastGaldaeTimePopup, { FastGaldaeTimePopupRef } from '../../../components/popup/FastGaldaeTimePopup';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '../../../modules/redux/store';


// import { fetchMyGaldaeHistory } from '../../../modules/redux/slice/myGaldaeSlice';
// import { fetchHomeGaldaePosts } from '../../../modules/redux/slice/homeGaldaeSlice';
// import { fetchMyCreatedGaldae } from '../../../modules/redux/slice/myCreatedGaldaeSlice';
// import { fetchGaldaePosts } from '../../../modules/redux/slice/galdaeSlice';
// import { fetchFrequentRoutes } from '../../../modules/redux/slice/frequentRouteSlice';
// API
//import { createPost } from '../../../api/postApi'; // ✅ 갈대 생성 API 추가
import { createTaxi } from '../../../modules/redux/slice/taxiSlice';
//type
// import { GetPostsRequest } from '../../../types/postTypes';
// ✅ 갈대 생성 요청 타입

import { Portal } from '@gorhom/portal';
import ParticipateModal from '../../../components/popup/ParticipateModal';
import { PagingQuery, TaxiCreateRequest } from '../../../types/taxiType';

// import { GroupJoinResponse } from '../../../types/groupTypes';
import { ChatroomSummary, fetchMyChatrooms } from '../../../api/chatApi';
// import { useFocusEffect } from '@react-navigation/native';
// import { useCallback } from 'react';

// 내비게이션 스택 타입 정의
type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: undefined;
  NowGaldaeDetail: { postId: string };
  TaxiNDivide: undefined;
  ChatRoom: { chatroomId: number };
};

const CreateGaldae: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const goBack = () => navigation.goBack();
  const [selectedGender, setSelectedGender] = useState<number>(0);
  const [selectedTimeDiscuss, setSelectedTimeDiscuss] = useState<number>(0);
  const [passengerNumber, setPassengerNumber] = useState<number>(2);
  // const [selectedChannel, setSelectedChannel] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [departureDate, setDepartureDate] = useState<string | null>(null); // "YYYY-MM-DD" 형식
  const [departureAmPm, setDepartureAmPm] = useState<'오전' | '오후'>('오전');
  // 출발지 상태 (이름과 ID)
  const [departureLargeName, setDepartureLargeName] = useState<'출발지 선택' | string>('출발지 선택');
  const [departureLargeId, setDepartureLargeId] = useState<number | null>(null);
  const [departureSmallName, setDepartureSmallName] = useState<'출발지 선택' | string>('-');
  const [departureSmallId, setDepartureSmallId] = useState<number | null>(null);
  // 도착지 상태 (이름과 ID)
  const [destinationLargeName, setDestinationLargeName] = useState<'도착지 선택' | string>('도착지 선택');
  const [destinationLargeId, setDestinationLargeId] = useState<number | null>(null);
  const [destinationSmallName, setDestinationSmallName] = useState<'도착지 선택' | string>('-');
  const [destinationSmallId, setDestinationSmallId] = useState<number | null>(null);
  const [departureHour, setDepartureHour] = useState<number | null>(null);
  const [departureMinute, setDepartureMinute] = useState<number | null>(null);
  const [messageLength, setMessageLength] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const dispatch = useAppDispatch();
  const fastGaldaeStartPopupRef = useRef<FastGaldaeStartPopupRef>(null);
  const fastGaldaeEndPopupRef = useRef<FastGaldaeEndPopupRef>(null);
  const fastGaldaeTimePopupRef = useRef<FastGaldaeTimePopupRef>(null);
  const [participating, setParticipating] = useState<boolean>(false);
  const [chatroomId, setChatroomId] = useState<number | null>(null);
  const [activeChatRoomData, setActiveChatRoomData] = useState<ChatroomSummary[]>([]);
  const passengerNumberHandler = (type: string) => {
    if (type === 'PLUS' && passengerNumber < 4) {
      setPassengerNumber(passengerNumber + 1);
    } else if (type === 'MINUS' && passengerNumber > 2) {
      setPassengerNumber(passengerNumber - 1);
    }
  };

useEffect(() => {
  // 참여중인 갈대와 완료된 갈대를 모두 가져오기
  const fetchAllChatRooms = async () => {
    try {
      const [activeData] = await Promise.all([
        fetchMyChatrooms(),
      ]);
      console.log('activeData',activeData);
      setActiveChatRoomData(activeData);
    } catch (error) {
      console.error('채팅방 데이터 가져오기 실패:', error);
    }
  };

  fetchAllChatRooms();
}, []);
  // ✅ 갈대 생성 API 호출 함수
  const handleCreateGaldaeConfirm = async () => {
    if (departureLargeName === '출발지 선택' || departureSmallName === '출발지 선택' || destinationLargeName === '도착지 선택' || destinationSmallName === '도착지 선택') {
      Alert.alert('출발지 또는 도착지를 제대로 선택해주세요!');
      return;
    }
    if (departureLargeId === null || departureSmallId === null || destinationLargeId === null || destinationSmallId === null) {
      Alert.alert('출발지 또는 도착지를 다시 선택해주세요!');
      return;
    }
    if (formatDepartureDateTime() === '출발 시간 선택') {
      Alert.alert('출발 시간을 선택해주세요!');
      return;
    }


    // 출발 일시를 Asia/Seoul 타임존의 ISO 8601 형식으로 변환
    const formattedDepartureTime = getFormattedDepartureTime();
    // 출발 시간을 moment 객체로 변환하여 현재 시간과 비교
    const departureMoment = moment(formattedDepartureTime.replace(/Z$/, ''));
    //console.log(` departureMoment:
    // ${departureMoment}`);
    if (departureMoment.isBefore(moment())) {
      Alert.alert('알림', '현재 시간보다 이후의 시간을 선택해주세요!');
      return;
    }
    setLoading(true);
    const postData: TaxiCreateRequest = {
      majorDepartureId: departureLargeId,
      subDepartureId: departureSmallId,
      majorArrivalId: destinationLargeId,
      subArrivalId: destinationSmallId,
      departureTime: formattedDepartureTime,
      shareGenderType: selectedGender === 1 ? 'SAME_GENDER' : 'DONT_CARE',
      arrangeTime: selectedTimeDiscuss === 0 ? 'POSSIBLE' : 'IMPOSSIBLE',
      totalPersonCount: passengerNumber,
      content: message,
    };

    // console.log('🚀 서버로 보낼 갈대 생성 데이터:', postData);

    try {
      const response = await dispatch(createTaxi(postData)).unwrap(); // 서버에서 postId 반환
      // console.log('✅ 생성된 갈대 postId:', response.postId);
      // dispatch(fetchMyGaldaeHistory());
      // dispatch(fetchMyCreatedGaldae());
      // dispatch(fetchHomeGaldaePosts());
      // dispatch(fetchFrequentRoutes());
      const params: PagingQuery = {
        pageNumber: 0,
        pageSize: 20,
        direction: 'DESC',
        property: 'create_at',
      };
      //dispatch(fetchGaldaePosts(params));

      if (response.taxiId) {
        setChatroomId(response.chatroomId);
        setParticipating(true);
      }
    } catch (rejectedMsg: any) {
      console.error('❌ 갈대 생성 실패:', rejectedMsg);

      Alert.alert('오류', String(rejectedMsg.message));
    } finally {
      setLoading(false);
    }
  };
  const toggleFastGaldaeStartPopup = () => {
    fastGaldaeStartPopupRef.current?.open();
  };

  const toggleFastGaldaeEndPopup = () => {
    fastGaldaeEndPopupRef.current?.open();
  };

  const toggleFastGaldaeTimePopup = () => {
    fastGaldaeTimePopupRef.current?.open();
  };

  const handleTimePopupConfirm = (
    selectedDate: string,
    amPm: '오전' | '오후',
    hour: number,
    minute: number
  ) => {
    setDepartureDate(selectedDate);
    setDepartureAmPm(amPm);
    setDepartureHour(amPm === '오후' && hour < 12 ? hour + 12 : amPm === '오전' && hour === 12 ? 0 : hour);
    setDepartureMinute(minute);
  };

  // 출발일시 문자열 포맷 함수
  const formatDepartureDateTime = () => {
    if (!departureDate) {
      // const now = moment();
      // const formattedDate = now.format('YYYY년 M월 D일 (ddd)');
      // const hour = now.hour();
      // const minute = now.minute();
      // const amPm = hour < 12 ? '오전' : '오후';
      // let hour12 = hour % 12;
      // if (hour12 === 0) {
      //   hour12 = 12;
      // }
      // const formattedTime = `${amPm} ${hour12} : ${minute < 10 ? '0' + minute : minute}`;
      return '출발 시간 선택';
    }
    const dateObj = moment(departureDate, 'YYYY-MM-DD');
    const formattedDate = dateObj.format('YYYY년 M월 D일 (ddd)');
    const formattedTime = `${departureHour === 0 ? '00' : departureHour} : ${departureMinute !== null && departureMinute < 10 ? '0' + departureMinute : departureMinute}`;
    return `${formattedDate} ${formattedTime}`;
  };
  const getFormattedDepartureTime = (): string => {
    if (!departureDate) {
      return '출발 시간 선택';
    }

    // 12시간 -> 24시간 변환
    let hour24 = departureHour;
    if (departureAmPm === '오후' && departureHour !== null && departureHour < 12) {
      hour24! += 12;
    } else if (departureAmPm === '오전' && departureHour === 12) {
      hour24 = 0;
    }

    // 선택한 날짜와 시간 정보를 Asia/Seoul 타임존의 moment 객체로 생성
    const selectedMoment = moment.utc(departureDate).set({
      hour: hour24!,
      minute: departureMinute!,
      second: 0,
      millisecond: 0,
    });
    return selectedMoment.toISOString(); // UTC 기준 ISO 문자열 반환
  };
  const handleSwitch = () => {
    setDepartureLargeName(destinationLargeName);
    setDepartureSmallName(destinationSmallName);
    setDepartureSmallId(destinationSmallId);
    setDepartureLargeId(destinationLargeId);

    setDestinationLargeId(departureLargeId);
    setDestinationSmallId(departureSmallId);
    setDestinationLargeName(departureLargeName);
    setDestinationSmallName(departureSmallName);
  };
  const isFormValid =
    departureLargeId !== null &&
    departureSmallId !== null &&
    destinationLargeId !== null &&
    destinationSmallId !== null &&
    departureHour !== null &&
    departureMinute !== null &&
    message !== '' &&
    departureDate !== null;

  // 폼 유효성 검사 콘솔 로깅
  console.log('=== 폼 유효성 검사 ===');
  console.log('departureLargeId:', departureLargeId);
  console.log('departureSmallId:', departureSmallId);
  console.log('destinationLargeId:', destinationLargeId);
  console.log('destinationSmallId:', destinationSmallId);
  console.log('departureHour:', departureHour);
  console.log('departureMinute:', departureMinute);
  console.log('message:', message);
  console.log('departureDate:', departureDate);
  console.log('isFormValid:', isFormValid);
  console.log('==================');
  const handleNavigateChatRoom = async (id: number) => {

    navigation.replace('ChatRoom', { chatroomId: id});

  };
  return (
    <View>
      <Header
        style={styles.header}
        leftButton={<SVGButton iconName="arrow_left_line2" onPress={goBack} />}
        title={<BasicText text="택시비 N빵 생성" style={styles.mainTitle} />}
      />
      <ScrollView>
        <View style={styles.container}>
          <BasicText style={styles.title} text="목적지 설정" />
          <View style={styles.positionBox}>
            <PositionBox
              title={departureLargeName}
              subTitle={departureSmallName}
              isOrigin={true}
              onPress={toggleFastGaldaeStartPopup}
            />
            <SVGButton
              iconName="Switch"
              buttonStyle={styles.switchBtn}
              SVGStyle={styles.switchIcon}
              onPress={handleSwitch}
            />
            <PositionBox
              title={destinationLargeName}
              subTitle={destinationSmallName}
              isOrigin={false}
              onPress={toggleFastGaldaeEndPopup}
            />
          </View>

          <BasicText style={styles.title} text="출발 일시" />
          <TouchableOpacity onPress={toggleFastGaldaeTimePopup}>
            <View style={styles.timeBox}>
              <BasicText text={formatDepartureDateTime()} style={styles.timeText} />
            </View>
          </TouchableOpacity>

          <BasicText style={styles.title} text="추가 정보 설정" />
          <BasicText style={styles.subTitle} text="동승자 성별을 선택해주세요." />
          <View style={styles.buttonWrapper}>
            <SelectTextButton
              text="성별무관"
              selected={selectedGender === 0}
              buttonStyle={styles.selectBtn}
              textStyle={styles.selectText}
              onPress={() => setSelectedGender(0)}
              unselectedColors={{
                backgroundColor: theme.colors.grayV3,
                textColor: theme.colors.grayV0,
              }}
            />
            <SelectTextButton
              text="동성만"
              selected={selectedGender === 1}
              buttonStyle={styles.selectBtn}
              textStyle={styles.selectText}
              onPress={() => setSelectedGender(1)}
              unselectedColors={{
                backgroundColor: theme.colors.grayV3,
                textColor: theme.colors.grayV0,
              }}
            />
          </View>
          <BasicText style={styles.subTitle} text="시간 협의 가능 여부를 선택해주세요." />
          <View style={styles.buttonWrapper}>
            <SelectTextButton
              text="가능"
              selected={selectedTimeDiscuss === 0}
              buttonStyle={styles.selectBtn}
              textStyle={styles.selectText}
              onPress={() => setSelectedTimeDiscuss(0)}
              unselectedColors={{
                backgroundColor: theme.colors.grayV3,
                textColor: theme.colors.grayV0,
              }}
            />
            <SelectTextButton
              text="불가능"
              selected={selectedTimeDiscuss === 1}
              buttonStyle={styles.selectBtn}
              textStyle={styles.selectText}
              onPress={() => setSelectedTimeDiscuss(1)}
              unselectedColors={{
                backgroundColor: theme.colors.grayV3,
                textColor: theme.colors.grayV0,
              }}
            />
          </View>
          <BasicText text="*최대 인원" style={styles.warnText} />
          <View style={styles.personWrapper}>
            <View style={styles.personBox}>
              <BasicText text="탑승인원" style={styles.personText} />
              <BasicText text="(본인포함)" style={styles.personSubText} />
            </View>
            <View style={styles.personBox}>
              <SVGButton
                onPress={() => passengerNumberHandler('MINUS')}
                iconName="Minus"
                buttonStyle={styles.plusBtn}
                SVGStyle={styles.plusIcon}
              />
              <BasicText text={passengerNumber.toString()} style={styles.numberText} />
              <SVGButton
                onPress={() => passengerNumberHandler('PLUS')}
                iconName="Plus"
                buttonStyle={styles.plusBtn}
                SVGStyle={styles.plusIcon}
              />
            </View>
          </View>
          {/* <TouchableOpacity onPress={() => setSelectedChannel(!selectedChannel)}>
            <View style={selectedChannel ? { ...styles.oftenBox, borderColor: theme.colors.Galdae } : styles.oftenBox}>
              <SVG name={selectedChannel ? 'CheckSelected' : 'Check'} width={18} height={18} style={styles.checkBtn} />
              <BasicText text="자주가는 경로로 등록하기" style={selectedChannel ? { ...styles.checkText, color: theme.colors.blackV0 } : styles.checkText} />
            </View>
          </TouchableOpacity> */}
          <View style={styles.messageWrapper}>
            <BasicText style={styles.personText} text="빵장의 한마디" />
            <BasicText text={`(${messageLength}/200)`} style={styles.personSubText} />
          </View>
          <TextInput
            style={styles.messageInput}
            value={message}
            onChangeText={setMessage}
            onChange={(e) => setMessageLength(e.nativeEvent.text.length)}
            maxLength={200}
            multiline={true}
            placeholder={`동승자에게 전달하고 싶은 정보를 알려주세요! \n ex) 짐 정보, 우천 시 장소 변경 등`}
            placeholderTextColor={theme.colors.blackV3}
          />
          <BasicButton
            text="생성하기"
            buttonStyle={styles.generateButton}
            textStyle={styles.generateText}
            loading={loading}
            disabled={!isFormValid} // 🔒 조건 미충족 시 비활성화
            onPress={handleCreateGaldaeConfirm}
            disabledColors={{
              backgroundColor: theme.colors.grayV2,
              textColor: theme.colors.grayV0,
            }}
          />
        </View>
      </ScrollView>

      <Portal>
        <FastGaldaeStartPopup
          ref={fastGaldaeStartPopupRef}
          onConfirm={(largeName, largeId, smallName, smallId) => {
            setDepartureLargeName(largeName);
            setDepartureLargeId(largeId);
            setDepartureSmallName(smallName);
            setDepartureSmallId(smallId);
          }}
          selectedStartPlaceId={destinationSmallId} // ✅ 출발지에서 선택한 소분류 ID 전달
        //onClose={() => console.log('팝업 닫힘')}
        />
      </Portal>

      <Portal>
        <FastGaldaeEndPopup
          ref={fastGaldaeEndPopupRef}
          onConfirm={(largeName, largeId, smallName, smallId) => {
            setDestinationLargeName(largeName);
            setDestinationLargeId(largeId);
            setDestinationSmallName(smallName);
            setDestinationSmallId(smallId);
          }}
          selectedStartPlaceId={departureSmallId} // ✅ 출발지에서 선택한 소분류 ID 전달
        //onClose={() => console.log('팝업 닫힘')}
        />
      </Portal>

      <Portal>
        <FastGaldaeTimePopup
          ref={fastGaldaeTimePopupRef}
          onConfirm={handleTimePopupConfirm}
        //onClose={() => console.log('팝업 닫힘')}
        />
      </Portal>
      {participating && (
        <ParticipateModal
          title="생성 완료"
          visible={participating}
          onCancel={() => { navigation.navigate('TaxiNDivide'); setParticipating(false); }}
          onConfirm={() => handleNavigateChatRoom(chatroomId || 0)}
          fromMajor={departureLargeName}
          fromSub={departureSmallName}
          toMajor={destinationLargeName}
          toSub={destinationSmallName}
        />
      )}
    </View>
  );
};

export default CreateGaldae;
