// Home.tsx 테스트
import React, {useState, useRef} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
//import stylesheet from '../styles/stylesheet';
import styles from '../styles/Home.style';
import BasicButton from '../components/button/BasicButton';
import BasicText from '../components/BasicText';
import SVGTextButton from '../components/button/SVGTextButton';
import {theme} from '../styles/theme';
import SVGButton from '../components/button/SVGButton';
//import FilterButton from '../components/button/FilterButton';
//import GrayBorderTextButton from '../components/button/GrayBorderTextButton';
import SVG from '../components/SVG';
import TextTag from '../components/tag/TextTag';
//import Search from '../components/Search';
import FloatingButton from '../components/button/FloatingButton';
import GaldaeItem from '../components/GaldaeItem';
//import DeletePopup from '../components/popup/DeletePopup';
import CreateGaldaePopup from '../components/popup/CreateGaldaePopup';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import ToastPopup from '../components/popup/ToastPopup';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

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
//import SelectSVGTextButton from '../components/button/SelectSVGTextButton';
//import SelectTextButton from '../components/button/SelectTextButton';

type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
};

const Home: React.FC<HomeProps> = () => {
  const newGaldaeList = [
    {time: '방금전', dest: '충주 터미널', depart: '정문'},
    {time: '1일전', dest: '충주역', depart: '학교'},
    {time: '2일전', dest: '시청', depart: '정문'},
    {time: '3일전', dest: '마트', depart: '학교'},
    {time: '4일전', dest: '공원', depart: '후문'},
    {time: '5일전', dest: '카페', depart: '도서관'},
    {time: '6일전', dest: '병원', depart: '정문'},
    {time: '7일전', dest: '은행', depart: '학교'},
    {time: '8일전', dest: '백화점', depart: '후문'},
    {time: '9일전', dest: '기차역', depart: '정문'},
    {time: '10일전', dest: '공항', depart: '터미널'},
    {time: '11일전', dest: '도서관', depart: '후문'},
    {time: '12일전', dest: '박물관', depart: '정문'},
    {time: '13일전', dest: '호텔', depart: '학교'},
    {time: '14일전', dest: '극장', depart: '정문'},
  ];
  const dummyGaldaeData = [
    {
      id: 1,
      owner: '하재연님의 갈대',
      from: {main: '정문', sub: '학교'},
      users: 2,
      capacity: 4,
      destination: {main: '던킨도너츠', sub: '충주 터미널'},
      time: '2025년 00월 00일 (0) 00 : 00',
      timeAgreement: true,
      tags: ['성별무관'],
    },
    {
      id: 2,
      owner: '김철수의 갈대',
      from: {main: '후문', sub: '대학'},
      users: 1,
      capacity: 3,
      destination: {main: '스타벅스', sub: '시내'},
      time: '2025년 01월 01일 (목) 10 : 30',
      timeAgreement: false,
      tags: ['남자만'],
    },
    {
      id: 3,
      owner: '이영희의 갈대',
      from: {main: '정문', sub: '회사'},
      users: 1,
      capacity: 2,
      destination: {main: '공원', sub: '주변'},
      time: '2025년 02월 02일 (일) 14 : 00',
      timeAgreement: true,
      tags: ['성별무관'],
    },
  ];
  const [loading, setLoading] = useState<boolean>(false);
  //const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [generateLoading, setgenerateLoading] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  //const [destination, setDestination] = useState<string>('');
  //const [deletePopupVisible, setDeletePopupVisible] = useState<boolean>(false);
  const [createGaldaePopupVisible, setCreateGaldaePopupVisible] =
    useState<boolean>(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  // const [fastGaldaePopupVisible, setFastGaldaePopupVisible] = useState<boolean>(false);
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

  const handlePress = () => {
    setLoading(true);
    // 버튼 클릭 시 원하는 로직을 수행하고, 완료 후 로딩 상태를 false로 전환합니다.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // const handleGeneratePress = () => {
  //   setgenerateLoading(true);
  //   // 버튼 클릭 시 원하는 로직을 수행하고, 완료 후 로딩 상태를 false로 전환합니다.
  //   setTimeout(() => {
  //     setgenerateLoading(false);
  //   }, 2000);
  // };
  // 예를 들어, 갈대 생성 완료 시 토스트 팝업을 띄우고 3초 후에 사라지도록 함.

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

  // const handleFilterPress = ()=>{

  // };

  // const handlePressTimeFilterBtn = () =>{

  // };

  // const handlePressGenderFilterBtn = () =>{

  // };
  const toggleFastGaldaeStartPopup = () => {
    //setFastGaldaePopupVisible((prev) => !prev);
    fastGaldaeStartPopupRef.current?.open();
  };

  const toggleFastGaldaeEndPopup = () => {
    //setFastGaldaePopupVisible((prev) => !prev);
    fastGaldaeEndPopupRef.current?.open();
  };

  const toggleFastGaldaeTimePopup = () => {
    //setFastGaldaePopupVisible((prev) => !prev);
    fastGaldaeTimePopupRef.current?.open();
  };
  // DeletePopup 관련 핸들러
  //const openDeletePopup = () => setDeletePopupVisible(true);
  //const closeDeletePopup = () => setDeletePopupVisible(false);
  // const handleDeleteConfirm = () => {
  //   // 삭제 로직 실행
  //   console.log('삭제 confirmed');
  //   closeDeletePopup();
  // };

  const openCreateGaldaePopup = () => {
    setgenerateLoading(true);
    // 버튼 클릭 시 원하는 로직을 수행하고, 완료 후 로딩 상태를 false로 전환합니다.
    setTimeout(() => {
      setgenerateLoading(false);
      setCreateGaldaePopupVisible(true);
    }, 2000);
  };
  const closeCreateGaldaePopup = () => {
    setCreateGaldaePopupVisible(false);
  };

  const handleCreateCaledaeConfirm = () => {
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
          <View style={styles.madeGaldaeContainer}>
            <BasicText text="생성한 갈대" style={styles.madeGaldae} />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}>
              {newGaldaeList.map((list, index) => (
                <View key={index} style={styles.newGaldaeList}>
                  <BasicText
                    text={list.time}
                    style={styles.newGaldaeTimeText}
                  />
                  <BasicText
                    text={`${list.depart}`}
                    style={styles.newGaldaeDepartText}
                  />
                  <SVG
                    name="arrow_down_fill"
                    style={styles.newGaldaeArrowIcon}
                  />
                  <BasicText
                    text={`${list.dest}`}
                    style={styles.newGaldaeDestText}
                  />
                </View>
              ))}
            </ScrollView>
          </View>

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

      {/* <DeletePopup
          visible={deletePopupVisible}
          onCancel={closeDeletePopup}
          onConfirm={() => {
            console.log('삭제 confirmed');
            closeDeletePopup();
            handleDeleteConfirm();
          }}
          title="선택하신 갈대를"
          message="삭제하시겠습니까?"
        /> */}

      <CreateGaldaePopup
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
