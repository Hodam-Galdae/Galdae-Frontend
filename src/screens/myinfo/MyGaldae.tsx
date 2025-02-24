import React,{} from 'react';
import {  View,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/Payment.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import { theme } from '../../styles/theme';
import SVGTextButton from '../../components/button/SVGTextButton';
import TextTag from '../../components/tag/TextTag';
import BasicButton from '../../components/button/BasicButton';
import SVG from '../../components/SVG';
import GaldaeItem from '../../components/GaldaeItem';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)

};

// 내비게이션 스택 타입 정의
type RootStackParamList = {
    CreateGaldae: undefined;
    NowGaldae: {
      departureLarge?:string,
      departureSmall?:string,
      destinationLarge?:string,
      destinationSmall?:string,
    };
    NowGaldaeDetail: { item: any };
    SetDestination:undefined;
    MyGaldaeHistory:any;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const MyGaldae: React.FC<HomeProps> = () => {
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
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () => navigation.goBack();

    const item = {
        id: 1,
        owner: '하재연님의 갈대',
        from: { main: '학교', sub: '정문' },
        users: 2,
        capacity: 4,
        destination: { main: '학교', sub: '정문' },
        time: '2025년 00월 00일 (0) 00 : 00',
        timeAgreement: true,
        tags: ['성별무관'],
        timestamp: 1735689600000, // 예시 타임스탬프 (밀리초 단위)
    };
    const handleMorePress = () =>{
        navigation.navigate('MyGaldaeHistory');
    };
    const handleSearchGaldae = () => {
        navigation.navigate('CreateGaldae');
      };
    return (
      <View style={styles.container}>
            <Header
            leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack}/>}
            title={<BasicText text="내 갈대 기록" style={styles.headerText}/>}
            />

            <View style={styles.content}>

                <View style={styles.nowGaldaeTitle}>
                    <BasicText text="3개의 경로" style={styles.nowGaldae}/>
                    <SVGTextButton
                    iconName="More"
                    text="더보기"
                    textStyle={styles.more}
                    iconPosition="right"
                    onPress={handleMorePress}
                    enabledColors={{
                      backgroundColor: 'transparent',
                      textColor: theme.colors.gray1,
                      borderColor: 'transparent',
                    }}
                    />
                </View>

                {item ? (
                  //item이 존재하는 경우
                  <GaldaeItem
                    key={item.id}
                    item={item}
                    onPress={() => navigation.navigate('NowGaldaeDetail', { item })}
                  />
                ) : (
                  // item이 없을 경우
                  <View style={styles.borderBox}>
                    <BasicText
                      text="새로운 갈대를 생성해보세요."
                      style={styles.noGaldaeText} // 필요하다면 스타일 정의
                    />
                  </View>
                )}

                <BasicText text="자주가는 경로" style={styles.freqText}/>
                <ScrollView style={styles.searchList}>
                {dummySearchHistory.map((history) => (
                  <View key={history.id} style={styles.searchListBox}>
                    <View style={styles.startContain}>
                      <TextTag
                        text={history.start.label}
                        viewStyle={styles.start}
                        enabledColors={{
                          backgroundColor: theme.colors.white,
                          textColor: theme.colors.brandColor,
                          borderColor: theme.colors.brandColor,
                        }}
                      />
                      <BasicText text={history.start.main} style={styles.mainPosName} />
                      <BasicText text={history.start.sub} style={styles.subPosName} />
                    </View>

                    <SVG name="arrow_right_line" width={22} height={22} style={styles.arrowRight} />

                    <View style={styles.startContain}>
                      <TextTag
                        text={history.end.label}
                        viewStyle={styles.start}
                        enabledColors={{
                          backgroundColor: theme.colors.white,
                          textColor: theme.colors.brandColor,
                          borderColor: theme.colors.brandColor,
                        }}
                      />
                      <BasicText text={history.end.main} style={styles.mainPosName} />
                      <BasicText text={history.end.sub} style={styles.subPosName} />
                    </View>
                  </View>
                ))}
                </ScrollView>

                <BasicButton
                    text="갈대 생성하기"
                    buttonStyle={styles.generateButton}
                    textStyle={styles.generateText}
                    onPress={handleSearchGaldae}
                />
            </View>
      </View>
    );
};

export default MyGaldae;

