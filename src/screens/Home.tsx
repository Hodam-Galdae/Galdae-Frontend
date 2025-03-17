// Home.tsx 테스트
import React, {useState, useRef,useEffect} from 'react';
import {ScrollView, View, TouchableOpacity,ActivityIndicator} from 'react-native';
import { CreatePostRequest } from '../types/postTypes'; // API 요청 타입 가져오기
import styles from '../styles/Home.style';
import BasicButton from '../components/button/BasicButton';
import BasicText from '../components/BasicText';
import SVGTextButton from '../components/button/SVGTextButton';
import {theme} from '../styles/theme';
import SVGButton from '../components/button/SVGButton';
import SVG from '../components/SVG';
import TextTag from '../components/tag/TextTag';
import FloatingButton from '../components/button/FloatingButton';
import GaldaeItem from '../components/GaldaeItem';
import CreateGaldaePopup from '../components/popup/CreateGaldaePopup';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment-timezone';
import ToastPopup from '../components/popup/ToastPopup';

//type
import {MyCreatedPost} from '../types/getTypes';

//API
import { createPost } from '../api/postApi'; // 갈대 생성 API 불러오기
import {getMyCreatedPosts} from '../api/membersApi';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
//import { useSelector } from 'react-redux';
//import { RootState } from '../modules/redux/RootReducer'; // store.ts에서 RootState 가져오기

type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: undefined;
  NowGaldaeDetail: {item: any};
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
import FastGaldaeStartPopup, {
  FastGaldaeStartPopupRef,
} from '../components/popup/FastGaldaeStartPopup';
import FastGaldaeEndPopup, {
  FastGaldaeEndPopupRef,
} from '../components/popup/FastGaldaeEndPopup';
import FastGaldaeTimePopup, {
  FastGaldaeTimePopupRef,
} from '../components/popup/FastGaldaeTimePopup';

type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
};

const Home: React.FC<HomeProps> = () => {

  const dummyGaldaeData = [
    {
      id: 1,
      owner: '하재연님의 갈대',
      from: { main: '학교', sub: '정문', lat: 37.5665, lng: 126.9780 }, // 서울 시청 근처
      users: 2,
      capacity: 4,
      destination: { main: '강남역', sub: '출구 1번', lat: 37.4980, lng: 127.0276 }, // 강남역
      time: '2025년 00월 00일 (0) 00 : 00',
      timeAgreement: true,
      tags: ['성별무관'],
      timestamp: 1735689600000,
    },
    {
      id: 2,
      owner: '김철수의 갈대',
      from: { main: '후문', sub: '대학', lat: 37.5796, lng: 126.9770 }, // 광화문 근처
      users: 1,
      capacity: 3,
      destination: { main: '스타벅스', sub: '시내', lat: 37.5650, lng: 126.9835 }, // 명동 스타벅스 근처
      time: '2025년 01월 01일 (목) 10 : 30',
      timeAgreement: false,
      tags: ['남자만'],
      timestamp: 1735689600001,
    },
    {
      id: 3,
      owner: '이영희의 갈대',
      from: { main: '정문', sub: '회사', lat: 37.5112, lng: 127.0124 }, // 압구정 근처
      users: 1,
      capacity: 2,
      destination: { main: '공원', sub: '주변', lat: 37.5281, lng: 127.0366 }, // 한강공원 근처
      time: '2025년 02월 02일 (일) 14 : 00',
      timeAgreement: true,
      tags: ['성별무관'],
      timestamp: 1735689600002,
    },
    {
      id: 4,
      owner: '최희연의 갈대',
      from: { main: '호담', sub: '여기는어디야', lat: 37.6500, lng: 127.0160 }, // 노원구 근처
      users: 1,
      capacity: 3,
      destination: { main: '가천대학교', sub: '무당이정거장', lat: 37.4504, lng: 127.1289 }, // 가천대 근처
      time: '2025년 02월 13일 (일) 15 : 00',
      timeAgreement: true,
      tags: ['여자만'],
      timestamp: 1735689600003,
    },
    {
      id: 5,
      owner: '이서준의 갈대',
      from: { main: '호담', sub: '여기는어디야', lat: 37.6530, lng: 127.0190 }, // 노원구 근처
      users: 1,
      capacity: 3,
      destination: { main: '가천대학교', sub: '무당이정거장', lat: 37.4492, lng: 127.1280 }, // 가천대 근처
      time: '2025년 02월 13일 (일) 15 : 00',
      timeAgreement: true,
      tags: ['여자만'],
      timestamp: 1735689600004,
    },
  ];
  const [loading, setLoading] = useState<boolean>(false);
  const [createGaldaeLoading, setCreateGaldaeLoading] = useState<boolean>(false);

  const [generateLoading, setgenerateLoading] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  const [createGaldaePopupVisible, setCreateGaldaePopupVisible] =
    useState<boolean>(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [departureDate, setDepartureDate] = useState<string | null>(null); // "YYYY-MM-DD" 형식
  const [departureAmPm, setDepartureAmPm] = useState<'오전' | '오후'>('오전');
  // 출발지 관련 상태
  const [departureLarge, setDepartureLarge] = useState<string>('학교');
  const [departureSmall, setDepartureSmall] = useState<string>('중원도서관');

  const [destinationLarge, setDestinationLarge] = useState<string>('학교');
  const [destinationSmall, setDestinationSmall] =
    useState<string>('중원도서관');

  const [departureHour, setDepartureHour] = useState<number>(0);
  const [departureMinute, setDepartureMinute] = useState<number>(0);
  const fastGaldaeStartPopupRef = useRef<FastGaldaeStartPopupRef>(null);
  const fastGaldaeEndPopupRef = useRef<FastGaldaeEndPopupRef>(null);
  const fastGaldaeTimePopupRef = useRef<FastGaldaeTimePopupRef>(null);
  const [myCreatedGaldaeList, setMyCreatedGaldaeList] = useState<MyCreatedPost[]>([]); // ✅ 내가 생성한 갈대 목록 상태 추가
  const [myCreatedGaldaeLoading, setMyCreatedGaldaeLoading] = useState<boolean>(true); // ✅ API 로딩 상태

  // ✅ 내가 생성한 갈대 불러오기
  useEffect(() => {
    const fetchMyCreatedGaldae = async () => {
      try {
        const response = await getMyCreatedPosts();
        setMyCreatedGaldaeList(response); // 응답 데이터 상태 저장
      } catch (error) {
        console.error('❌ 내가 생성한 갈대 목록 불러오기 실패:', error);
      } finally {
        setMyCreatedGaldaeLoading(false); // 로딩 완료
      }
    };

    fetchMyCreatedGaldae();
  }, []);

  const handlePress = () => {
    setLoading(true);
    // 버튼 클릭 시 원하는 로직을 수행하고, 완료 후 로딩 상태를 false로 전환합니다.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleCreateGaldaeConfirm = async () => {
    setCreateGaldaeLoading(true);

    // 🔹 출발일시를 ISO 8601 형식으로 변환
    const formattedDepartureTime = moment()
      .tz('Asia/Seoul') // 한국 시간 기준
      .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    // 🔹 API 요청 형식에 맞게 데이터 변환
    const generateGaldaeData: CreatePostRequest = {
      departure: departureSmall, // 출발지
      arrival: destinationSmall, // 도착지
      departureTime: formattedDepartureTime, // ISO 8601 형식 변환
      passengerType: 'MALE', // 🚀 '성인'을 'MALE'로 변환 (추후 선택 가능하도록 수정)
      arrangeTime: 'POSSIBLE', // 🚀 '5분'을 'POSSIBLE'로 변환 (필요시 수정 가능)
      passengerCount: 4, // 기본값 4 (추후 사용자 입력으로 변경 가능)
      isFavoriteRoute: false, // 기본값 false
    };

    console.log('🚀 서버로 보낼 갈대 생성 데이터:', generateGaldaeData); // 디버깅용 콘솔 로그

    try {
      await createPost(generateGaldaeData); // 🔹 `accessToken` 제거, 자동 추가됨

      setCreateGaldaePopupVisible(false);
      setToastVisible(true);
    } catch (error) {
      console.error('❌ 갈대 생성 실패:', error);
    } finally {
      setCreateGaldaeLoading(false);
    }
  };


  const handleMorePress = () => {
    navigation.navigate('NowGaldae');
  };
  const handleTimePopupConfirm = (
    selectedDate: string,
    amPm: '오전' | '오후',
    hour: number,
    minute: number,
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
      const formattedDate = now.format('YYYY년 M월 D일 (ddd)'); // 예: 2025년 11월 12일 (수)
      const hour = now.hour();
      const minute = now.minute();
      const amPm = hour < 12 ? '오전' : '오후';
      let hour12 = hour % 12;
      if (hour12 === 0) {
        hour12 = 12;
      }
      const formattedTime = `${amPm} ${hour12} : ${
        minute < 10 ? '0' + minute : minute
      }`;
      return `${formattedDate} ${formattedTime}`;
    }
    const dateObj = moment(departureDate, 'YYYY-MM-DD');
    // 예: "2025년 11월 12일 (수)"
    const formattedDate = dateObj.format('YYYY년 M월 D일 (ddd)');
    // 예: "오전 2 : 30" (분이 10 미만일 경우 앞에 0 추가)
    const formattedTime = `${departureAmPm} ${departureHour} : ${
      departureMinute < 10 ? '0' + departureMinute : departureMinute
    }`;
    return `${formattedDate} ${formattedTime}`;
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

  const openCreateGaldaePopup = () => {
    setgenerateLoading(true);
    setgenerateLoading(false);
    setCreateGaldaePopupVisible(true);
  };
  const closeCreateGaldaePopup = () => {
    setCreateGaldaePopupVisible(false);
  };

  const handleCreateCaledaeConfirm = () => {
    handleCreateGaldaeConfirm();
    closeCreateGaldaePopup();
    setToastVisible(true);
  };

  const handleSwitch = () => {
    setDepartureLarge(destinationLarge);
    setDepartureSmall(destinationSmall);
    setDestinationLarge(departureLarge);
    setDestinationSmall(departureSmall);
  };
  return (
    <View>
      <ScrollView>
        <BasicButton
          text="어플 공지사항/안내"
          onPress={handlePress}
          loading={loading}
          buttonStyle={styles.notiButton}
          textStyle={styles.notiText}
        />
        <ScrollView style={styles.container}>

          {myCreatedGaldaeList.length > 0 && (
            <View style={styles.madeGaldaeContainer}>
            <BasicText text="생성한 갈대" style={styles.madeGaldae} />
             {myCreatedGaldaeLoading ? (
              <ActivityIndicator size="large" color={theme.colors.brandColor} />
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
                {myCreatedGaldaeList.map((item, index) => (
                  <View key={index} style={styles.newGaldaeList}>
                    <BasicText text={moment(item.createdAt).fromNow()} style={styles.newGaldaeTimeText} />
                    <BasicText text={`${item.departure}`} style={styles.newGaldaeDepartText} />
                    <SVG name="arrow_down_fill" style={styles.newGaldaeArrowIcon} />
                    <BasicText text={`${item.arrival}`} style={styles.newGaldaeDestText} />
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
          )}


          <BasicText text="갈대 시작하기" style={styles.startGaldae} />
          <BasicText
            text="목적지 설정 후 동승자를 구하세요!"
            style={styles.startGaldaeEx}
          />

          <View style={styles.borderedBox}>
            <View style={styles.startAndEnd}>
              <TouchableOpacity
                style={styles.startContain}
                onPress={toggleFastGaldaeStartPopup}>
                <TextTag text="출발지" viewStyle={styles.start} />
                <BasicText text={departureLarge} style={styles.mainPosName} />
                <BasicText text={departureSmall} style={styles.subPosName} />
              </TouchableOpacity>

              <SVGButton
                iconName="Switch"
                buttonStyle={styles.switchBtn}
                SVGStyle={styles.switchIcon}
                onPress={handleSwitch}
              />

              <TouchableOpacity
                style={styles.startContain}
                onPress={toggleFastGaldaeEndPopup}>
                <TextTag text="도착지" viewStyle={styles.start} />
                <BasicText text={destinationLarge} style={styles.mainPosName} />
                <BasicText text={destinationSmall} style={styles.subPosName} />
              </TouchableOpacity>
            </View>

            <View style={styles.line} />

            <TouchableOpacity
              onPress={toggleFastGaldaeTimePopup}
              style={styles.startContainer}>
              <BasicText text="출발일시" style={styles.startTime} />
              <BasicText
                text={formatDepartureDateTime()}
                style={styles.startDateTime}
              />
            </TouchableOpacity>
          </View>

          <BasicButton
            text="생성하기"
            onPress={openCreateGaldaePopup}
            loading={generateLoading}
            buttonStyle={styles.generateButton}
            textStyle={styles.generateText}
          />

          <View style={styles.advertiseBox}>
            <BasicText text="advertiseBox" />
          </View>

          <View style={styles.nowGaldaeTitle}>
            <BasicText text="실시간 갈대" style={styles.nowGaldae} />
            <SVGTextButton
              iconName="More"
              text="더보기"
              iconPosition="right"
              onPress={handleMorePress}
              enabledColors={{
                backgroundColor: 'transparent',
                textColor: theme.colors.gray1,
                borderColor: 'transparent',
              }}
              //buttonStyle={styles.button}
              //textStyle={styles.text}
            />
          </View>

          <View style={styles.nowGaldaeList}>
            {dummyGaldaeData.map(item => (
              <GaldaeItem
                key={item.id}
                item={item}
                onPress={() => navigation.navigate('NowGaldaeDetail', {item})}
              />
            ))}
          </View>
        </ScrollView>
      </ScrollView>

      <FastGaldaeStartPopup
        ref={fastGaldaeStartPopupRef}
        onConfirm={(large, small) => {
          setDepartureLarge(large);
          setDepartureSmall(small);
        }}
        onClose={() => console.log('팝업 닫힘')}
      />

      <FastGaldaeEndPopup
        ref={fastGaldaeEndPopupRef}
        onConfirm={(large, small) => {
          setDestinationLarge(large);
          setDestinationSmall(small);
        }}
        onClose={() => console.log('팝업 닫힘')}
      />

      <FastGaldaeTimePopup
        ref={fastGaldaeTimePopupRef}
        onConfirm={handleTimePopupConfirm}
        onClose={() => console.log('팝업 닫힘')}
      />


      <CreateGaldaePopup
        loading={createGaldaeLoading}
        visible={createGaldaePopupVisible}
        onCancel={closeCreateGaldaePopup}
        onConfirm={handleCreateCaledaeConfirm}
        departureDateTime={formatDepartureDateTime()} // Home.tsx의 출발일시 포맷 함수 결과
        departureLocation={departureSmall} // 출발지 소분류 (예: "정문")
        destination={destinationSmall} // 도착지 소분류 (예: "던킨도너츠")
      />
      <FloatingButton onPress={() => navigation.navigate('CreateGaldae')} />
      <ToastPopup
        visible={toastVisible}
        text="갈대가 생성되었습니다!"
        onDismiss={() => setToastVisible(false)}
      />
    </View>
  );
};

export default Home;
