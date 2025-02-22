// Home.tsx 테스트
import React,{} from 'react';
import {  View ,ScrollView} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/NowGaldae.style';
import Header from '../components/Header';
import SVGButton from '../components/button/SVGButton';
import BasicText from '../components/BasicText';
import FilterButton from '../components/button/FilterButton';
import GrayBorderTextButton from '../components/button/GrayBorderTextButton';
import SVGTextButton from '../components/button/SVGTextButton';
import SVG from '../components/SVG';
import GaldaeItem from '../components/GaldaeItem';
import { theme } from '../styles/theme';
import FloatingButton from '../components/button/FloatingButton';
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
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const NowGaldae: React.FC<HomeProps> = () => {

    const dummyGaldaeData = [
        {
          id: 1,
          owner: '하재연님의 갈대',
          from: { main: '학교', sub: '정문' },
          users: 2,
          capacity: 4,
          destination: { main: '학교', sub: '정문' },
          time: '2025년 00월 00일 (0) 00 : 00',
          timeAgreement: true,
          tags: ['성별무관'],
        },
        {
          id: 2,
          owner: '김철수의 갈대',
          from: { main: '후문', sub: '대학' },
          users: 1,
          capacity: 3,
          destination: { main: '스타벅스', sub: '시내' },
          time: '2025년 01월 01일 (목) 10 : 30',
          timeAgreement: false,
          tags: ['남자만'],
        },
        {
          id: 3,
          owner: '이영희의 갈대',
          from: { main: '정문', sub: '회사' },
          users: 1,
          capacity: 2,
          destination: { main: '공원', sub: '주변' },
          time: '2025년 02월 02일 (일) 14 : 00',
          timeAgreement: true,
          tags: ['성별무관'],
        },
        {
            id: 4,
            owner: '최희연의 갈대',
            from: { main: '호담', sub: '여기는어디야' },
            users: 1,
            capacity: 3,
            destination: { main: '가천대학교', sub: '무당이정거장' },
            time: '2025년 02월 13일 (일) 15 : 00',
            timeAgreement: true,
            tags: ['여자만'],
          },
          {
            id: 5,
            owner: '이서준의 갈대',
            from: { main: '호담', sub: '여기는어디야' },
            users: 1,
            capacity: 3,
            destination: { main: '가천대학교', sub: '무당이정거장' },
            time: '2025년 02월 13일 (일) 15 : 00',
            timeAgreement: true,
            tags: ['여자만'],
          },
      ];
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () => navigation.goBack();
    const route = useRoute<RouteProp<RootStackParamList, 'NowGaldae'>>();
    // 전달받은 검색 조건
    const { departureLarge, departureSmall,destinationLarge,destinationSmall } = route.params || {};
    const handleFilterPress = ()=>{

    };

    const handlePressTimeFilterBtn = () =>{

    };

    const handlePressGenderFilterBtn = () =>{

    };

     // 검색 조건이 전달되면, 조건에 맞게 데이터를 필터링합니다.
    const filteredData = departureLarge && destinationLarge && departureSmall && destinationSmall
    ? dummyGaldaeData.filter(
        item =>
          item.from.main.includes(departureLarge) && item.from.sub.includes(departureSmall) &&
          item.destination.main.includes(destinationLarge) && item.destination.sub.includes(destinationSmall)
      )
    : dummyGaldaeData;

  return (
    <View style={styles.main}>
        <Header
        leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack}/>}
        title={<BasicText text="실시간 갈대" style={styles.headerText}/>}
        />

        <View style={styles.galdaeList}>
          {
            departureLarge && destinationLarge && departureSmall && destinationSmall ? (
            <SVGTextButton
              text={departureLarge && destinationLarge ? `${departureSmall}  ${destinationSmall}` : '목적지를 설정해주세요'}
              iconName="Search"
              iconPosition="right"
              style={styles.search}
              buttonStyle={styles.searchBtn}
              textStyle={styles.searchText}
              SVGStyle={styles.searchSVG}
              enabledColors={
                {
                  backgroundColor:theme.colors.white,
                  textColor:theme.colors.gray2,
                }
              }
              onPress={()=>navigation.navigate('SetDestination')}
              />
            ) : (
              <SVGTextButton
                text={departureLarge && destinationLarge ? `${departureSmall}  ${destinationSmall}` : '목적지를 설정해주세요'}
                iconName="Search"
                iconPosition="right"
                style={styles.search}
                buttonStyle={styles.searchBtn}
                textStyle={styles.searchText}
                SVGStyle={styles.searchSVG}
                enabledColors={
                  {
                    backgroundColor:theme.colors.white,
                    textColor:theme.colors.gray2,
                  }
                }
                onPress={()=>navigation.navigate('SetDestination')}
                />
              )
          }

            <View style={styles.btns}>
              <View style={styles.filters}>
                <FilterButton onPress={handleFilterPress} />
                <GrayBorderTextButton
                  text="시간협의가능"
                  onPress={handlePressTimeFilterBtn}
                />
                <GrayBorderTextButton
                  text="성별무관"
                  onPress={handlePressGenderFilterBtn}
                />
              </View>
              <View style={styles.arrayBtn}>
                <SVGTextButton
                text="최신순"
                //onPress={arrayItems}
                iconName="transfer_2_line"
                iconPosition="right"
                enabledColors={
                  {
                    backgroundColor:theme.colors.white,
                    textColor:theme.colors.gray1,
                  }
                }
                />
              </View>
            </View>

              {filteredData.length === 0 ? (
                <View style={styles.noData}>
                  <SVG name="information_line" />
                  <BasicText text="해당 경로의 갈대가 없습니다." color={theme.colors.gray1}/>
                </View>
              ) : (
                <ScrollView style={styles.scroll}>
                <View style={styles.nowGaldaeList}>
                  {filteredData.map(item => (
                    <GaldaeItem
                      key={item.id}
                      item={item}
                      onPress={() => navigation.navigate('NowGaldaeDetail', { item })}
                    />
                  ))}
                </View>
                </ScrollView>
              )}


        </View>
        <FloatingButton onPress={() => navigation.navigate('CreateGaldae')} />
    </View>
  );
};

export default NowGaldae;

