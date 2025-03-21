// CreateGaldae.tsx
import React, { useState, useRef } from 'react';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/CreateGaldae.style';
import BasicText from '../components/BasicText';
import PositionBox from '../components/PostionBox';
import SVGButton from '../components/button/SVGButton';
import { theme } from '../styles/theme';
import BasicButton from '../components/button/BasicButton';
import SVG from '../components/SVG';
import Header from '../components/Header';
import SelectTextButton from '../components/button/SelectTextButton';
import FastGaldaeStartPopup, { FastGaldaeStartPopupRef } from '../components/popup/FastGaldaeStartPopup';
import FastGaldaeEndPopup, { FastGaldaeEndPopupRef } from '../components/popup/FastGaldaeEndPopup';
import FastGaldaeTimePopup, { FastGaldaeTimePopupRef } from '../components/popup/FastGaldaeTimePopup';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// API
import { createPost } from '../api/postApi'; // ✅ 갈대 생성 API 추가

// ✅ 갈대 생성 요청 타입
import { CreatePostRequest } from '../types/postTypes';

// 내비게이션 스택 타입 정의
type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: undefined;
  NowGaldaeDetail: { postId: string };
};

const CreateGaldae: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const goBack = () => navigation.goBack();
  const [selectedGender, setSelectedGender] = useState<number>(0);
  const [selectedTimeDiscuss, setSelectedTimeDiscuss] = useState<number>(0);
  const [passengerNumber, setPassengerNumber] = useState<number>(2);
  const [selectedChannel, setSelectedChannel] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [departureDate, setDepartureDate] = useState<string | null>(null); // "YYYY-MM-DD" 형식
  const [departureAmPm, setDepartureAmPm] = useState<'오전' | '오후'>('오전');
  // 출발지 상태 (이름과 ID)
  const [departureLargeName, setDepartureLargeName] = useState<string>('출발지 선택');
  const [departureLargeId, setDepartureLargeId] = useState<number>(0);
  const [departureSmallName, setDepartureSmallName] = useState<string>('출발지 선택');
  const [departureSmallId, setDepartureSmallId] = useState<number>(0);
  // 도착지 상태 (이름과 ID)
  const [destinationLargeName, setDestinationLargeName] = useState<string>('도착지 선택');
  const [destinationLargeId, setDestinationLargeId] = useState<number>(0);
  const [destinationSmallName, setDestinationSmallName] = useState<string>('도착지 선택');
  const [destinationSmallId, setDestinationSmallId] = useState<number>(0);
  const [departureHour, setDepartureHour] = useState<number>(0);
  const [departureMinute, setDepartureMinute] = useState<number>(0);

  const fastGaldaeStartPopupRef = useRef<FastGaldaeStartPopupRef>(null);
  const fastGaldaeEndPopupRef = useRef<FastGaldaeEndPopupRef>(null);
  const fastGaldaeTimePopupRef = useRef<FastGaldaeTimePopupRef>(null);

  const passengerNumberHandler = (type: string) => {
    if (type === 'PLUS' && passengerNumber < 4) {
      setPassengerNumber(passengerNumber + 1);
    } else if (type === 'MINUS' && passengerNumber > 1) {
      setPassengerNumber(passengerNumber - 1);
    }
  };

  // ✅ 갈대 생성 API 호출 함수
  const handleCreateGaldaeConfirm = async () => {
    setLoading(true);

    // 출발 일시를 Asia/Seoul 타임존의 ISO 8601 형식으로 변환
    const formattedDepartureTime = moment()
      .tz('Asia/Seoul')
      .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    const postData: CreatePostRequest = {
      majorDepartureId: departureLargeId,
      subDepartureId: departureSmallId,
      majorArrivalId: destinationLargeId,
      subArrivalId: destinationSmallId,
      departureTime: formattedDepartureTime,
      passengerType: selectedGender === 1 ? 'SAME' : 'DONT_CARE',
      arrangeTime: selectedTimeDiscuss === 0 ? 'POSSIBLE' : 'IMPOSSIBLE',
      passengerCount: passengerNumber,
      isFavoriteRoute: selectedChannel,
    };

    console.log('🚀 서버로 보낼 갈대 생성 데이터:', postData);

    try {
      const response = await createPost(postData); // 서버에서 postId 반환
      console.log('✅ 생성된 갈대 postId:', response.postId);

      if (response.postId) {
        // 상세 페이지로 이동하면서 postId 전달
        navigation.replace('NowGaldaeDetail', { postId: response.postId });
      }
    } catch (error) {
      console.error('❌ 갈대 생성 실패:', error);
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
    setDepartureHour(hour);
    setDepartureMinute(minute);
  };

  // 출발일시 문자열 포맷 함수
  const formatDepartureDateTime = () => {
    if (!departureDate) {
      const now = moment();
      const formattedDate = now.format('YYYY년 M월 D일 (ddd)');
      const hour = now.hour();
      const minute = now.minute();
      const amPm = hour < 12 ? '오전' : '오후';
      let hour12 = hour % 12;
      if (hour12 === 0) {
        hour12 = 12;
      }
      const formattedTime = `${amPm} ${hour12} : ${minute < 10 ? '0' + minute : minute}`;
      return `출발일시: ${formattedDate} ${formattedTime}`;
    }
    const dateObj = moment(departureDate, 'YYYY-MM-DD');
    const formattedDate = dateObj.format('YYYY년 M월 D일 (ddd)');
    const formattedTime = `${departureAmPm} ${departureHour} : ${departureMinute < 10 ? '0' + departureMinute : departureMinute}`;
    return `출발일시: ${formattedDate} ${formattedTime}`;
  };

  return (
    <View>
      <Header
        leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack} />}
        title={<BasicText text="갈대 생성하기" style={styles.mainTitle} />}
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
            />
            <SelectTextButton
              text="동성만"
              selected={selectedGender === 1}
              buttonStyle={styles.selectBtn}
              textStyle={styles.selectText}
              onPress={() => setSelectedGender(1)}
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
            />
            <SelectTextButton
              text="불가능"
              selected={selectedTimeDiscuss === 1}
              buttonStyle={styles.selectBtn}
              textStyle={styles.selectText}
              onPress={() => setSelectedTimeDiscuss(1)}
            />
          </View>
          <BasicText text="*최대 4명" style={styles.warnText} />
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
          <TouchableOpacity onPress={() => setSelectedChannel(!selectedChannel)}>
            <View style={selectedChannel ? { ...styles.oftenBox, borderColor: theme.colors.brandColor } : styles.oftenBox}>
              <SVG name={selectedChannel ? 'CheckSelected' : 'Check'} width={18} height={18} style={styles.checkBtn} />
              <BasicText text="자주가는 경로로 등록하기" style={selectedChannel ? { ...styles.checkText, color: theme.colors.black } : styles.checkText} />
            </View>
          </TouchableOpacity>
          <BasicButton
            text="생성하기"
            buttonStyle={styles.generateButton}
            textStyle={styles.generateText}
            loading={loading}
            onPress={handleCreateGaldaeConfirm}
          />
        </View>
      </ScrollView>

      <FastGaldaeStartPopup
        ref={fastGaldaeStartPopupRef}
        onConfirm={(largeName, largeId, smallName, smallId) => {
          setDepartureLargeName(largeName);
          setDepartureLargeId(largeId);
          setDepartureSmallName(smallName);
          setDepartureSmallId(smallId);
        }}
        onClose={() => console.log('팝업 닫힘')}
      />

      <FastGaldaeEndPopup
        ref={fastGaldaeEndPopupRef}
        onConfirm={(largeName, largeId, smallName, smallId) => {
          setDestinationLargeName(largeName);
          setDestinationLargeId(largeId);
          setDestinationSmallName(smallName);
          setDestinationSmallId(smallId);
        }}
        onClose={() => console.log('팝업 닫힘')}
      />

      <FastGaldaeTimePopup
        ref={fastGaldaeTimePopupRef}
        onConfirm={handleTimePopupConfirm}
        onClose={() => console.log('팝업 닫힘')}
      />
    </View>
  );
};

export default CreateGaldae;
