import React, {useState,useRef} from 'react';
import {  View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/SetDestination.style';
import BasicText from '../components/BasicText';
import PositionBox from '../components/PostionBox';
import SVGButton from '../components/button/SVGButton';
import BasicButton from '../components/button/BasicButton';
import Header from '../components/Header';
import SVG from '../components/SVG';
import FastGaldaeStartPopup, { FastGaldaeStartPopupRef } from '../components/popup/FastGaldaeStartPopup';
import FastGaldaeEndPopup, { FastGaldaeEndPopupRef } from '../components/popup/FastGaldaeEndPopup';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TextTag from '../components/tag/TextTag';
import { theme } from '../styles/theme';
// 내비게이션 스택 타입 정의
type RootStackParamList = {
  NowGaldae: {
    departureLarge:string,
    departureSmall:string,
    destinationLarge:string,
    destinationSmall:string,
  };
};


const SetDestination: React.FC = () => {
    const dummySearchHistory = [
        {
          id: 1,
          date: '3일전',
          start: { label: '출발지', main: '학교', sub: '중원도서관' },
          end: { label: '도착지', main: '충주 터미널', sub: '하이마트앞' },
        },
        {
          id: 2,
          date: '5일전',
          start: { label: '출발지', main: '역', sub: '서울역' },
          end: { label: '도착지', main: '백화점', sub: '롯데백화점' },
        },
        {
          id: 3,
          date: '일주일전',
          start: { label: '출발지', main: '카페', sub: '강남카페' },
          end: { label: '도착지', main: '공원', sub: '한강공원' },
        },
        {
          id: 4,
          date: '2일전',
          start: { label: '출발지', main: '집', sub: '우리집' },
          end: { label: '도착지', main: '마트', sub: '이마트' },
        },
        {
          id: 5,
          date: '오늘',
          start: { label: '출발지', main: '학교', sub: '도서관' },
          end: { label: '도착지', main: '카페', sub: '스타벅스' },
        },
        {
          id: 6,
          date: '어제',
          start: { label: '출발지', main: '역', sub: '부산역' },
          end: { label: '도착지', main: '공원', sub: '부산시민공원' },
        },
        {
          id: 7,
          date: '4일전',
          start: { label: '출발지', main: '회사', sub: '사옥' },
          end: { label: '도착지', main: '호텔', sub: '그랜드호텔' },
        },
        {
          id: 8,
          date: '6일전',
          start: { label: '출발지', main: '학교', sub: '정문' },
          end: { label: '도착지', main: '도서관', sub: '중앙도서관' },
        },
        {
          id: 9,
          date: '8일전',
          start: { label: '출발지', main: '카페', sub: '이디야' },
          end: { label: '도착지', main: '백화점', sub: '현대백화점' },
        },
        {
          id: 10,
          date: '9일전',
          start: { label: '출발지', main: '홈', sub: '내집' },
          end: { label: '도착지', main: '시장', sub: '재래시장' },
        },
        {
          id: 11,
          date: '2주전',
          start: { label: '출발지', main: '공항', sub: '김포공항' },
          end: { label: '도착지', main: '호텔', sub: '인터컨티넨탈' },
        },
        {
          id: 12,
          date: '3주전',
          start: { label: '출발지', main: '역', sub: '부산역' },
          end: { label: '도착지', main: '센터', sub: '코엑스' },
        },
        {
          id: 13,
          date: '한달전',
          start: { label: '출발지', main: '학교', sub: '대학' },
          end: { label: '도착지', main: '공원', sub: '서울숲' },
        },
        {
          id: 14,
          date: '2달전',
          start: { label: '출발지', main: '병원', sub: '서울병원' },
          end: { label: '도착지', main: '약국', sub: 'CU약국' },
        },
        {
          id: 15,
          date: '3달전',
          start: { label: '출발지', main: '오피스', sub: '작업실' },
          end: { label: '도착지', main: '식당', sub: '한식당' },
        },
        {
          id: 16,
          date: '4달전',
          start: { label: '출발지', main: '노원', sub: '서울' },
          end: { label: '도착지', main: '강남', sub: '서울' },
        },
        {
          id: 17,
          date: '5달전',
          start: { label: '출발지', main: '부산', sub: '부산역' },
          end: { label: '도착지', main: '울산', sub: '울산역' },
        },
        {
          id: 18,
          date: '6달전',
          start: { label: '출발지', main: '대구', sub: '대구역' },
          end: { label: '도착지', main: '광주', sub: '광주역' },
        },
        {
          id: 19,
          date: '7달전',
          start: { label: '출발지', main: '청주', sub: '청주역' },
          end: { label: '도착지', main: '전주', sub: '전주역' },
        },
        {
          id: 20,
          date: '8달전',
          start: { label: '출발지', main: '인천', sub: '인천공항' },
          end: { label: '도착지', main: '서울', sub: '종로' },
        },
      ];

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const goBack = () => navigation.goBack();
  const [loading, setLoading] = useState<boolean>(false);
  const [departureLarge, setDepartureLarge] = useState<string>('학교');
  const [departureSmall, setDepartureSmall] = useState<string>('중원도서관');
  const [destinationLarge, setDestinationLarge] = useState<string>('학교');
  const [destinationSmall, setDestinationSmall] = useState<string>('중원도서관');
  const fastGaldaeStartPopupRef = useRef<FastGaldaeStartPopupRef>(null);
  const fastGaldaeEndPopupRef = useRef<FastGaldaeEndPopupRef>(null);
  const toggleFastGaldaeStartPopup = () =>{
    fastGaldaeStartPopupRef.current?.open();
  };

  const toggleFastGaldaeEndPopup = () =>{
    fastGaldaeEndPopupRef.current?.open();
  };



  const handleSearchGaldae = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('NowGaldae', {
        departureLarge,
        departureSmall,
        destinationLarge,
        destinationSmall,
      });
    }, 200);
  };

  return (

    <View style={styles.mainContainer}>
      <Header
      leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack}/>}
      title={<BasicText text="목적지 설정" style={styles.mainTitle}/>}
      />

        <View style={styles.container}>

          <View style={styles.positionBox}>
            <PositionBox title={departureLarge} subTitle={departureSmall} isOrigin={true} onPress={toggleFastGaldaeStartPopup}/>
            <SVGButton
              iconName="Switch"
              buttonStyle={styles.switchBtn}
              SVGStyle={styles.switchIcon}
            />
            <PositionBox title={destinationLarge} subTitle={destinationSmall} isOrigin={false} onPress={toggleFastGaldaeEndPopup}/>
          </View>

          <BasicText style={styles.title} text="최근 검색 기록"/>

          <ScrollView style={styles.searchList}>
            {dummySearchHistory.map((item) => (
              <View key={item.id} style={styles.searchListBox}>
                <BasicText
                  text={item.date}
                  style={styles.searchDate}
                  color={theme.colors.gray1}
                  fontSize={theme.fontSize.size12}
                />
                <View style={styles.startContain}>
                  <TextTag
                    text={item.start.label}
                    viewStyle={styles.start}
                    enabledColors={{
                      backgroundColor: theme.colors.white,
                      textColor: theme.colors.gray0,
                      borderColor: theme.colors.gray0,
                    }}
                  />
                  <BasicText text={item.start.main} style={styles.mainPosName} />
                  <BasicText text={item.start.sub} style={styles.subPosName} />
                </View>

                <SVG name="arrow_right_line" width={22} height={22} style={styles.arrowRight} />

                <View style={styles.startContain}>
                  <TextTag
                    text={item.end.label}
                    viewStyle={styles.start}
                    enabledColors={{
                      backgroundColor: theme.colors.white,
                      textColor: theme.colors.gray0,
                      borderColor: theme.colors.gray0,
                    }}
                  />
                  <BasicText text={item.end.main} style={styles.mainPosName} />
                  <BasicText text={item.end.sub} style={styles.subPosName} />
                </View>
              </View>
            ))}
          </ScrollView>

          <BasicButton
            text="검색하기"
            buttonStyle={styles.generateButton}
            textStyle={styles.generateText}
            loading={loading}
            onPress={handleSearchGaldae}
          />
        </View>


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


    </View>
  );
};

export default SetDestination;
