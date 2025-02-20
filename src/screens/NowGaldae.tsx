// Home.tsx 테스트
import React,{useState} from 'react';
import {  View ,ScrollView,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/NowGaldae.style';
import Header from '../components/Header';
import SVGButton from '../components/button/SVGButton';
import BasicText from '../components/BasicText';
import Search from '../components/Search';
import FilterButton from '../components/button/FilterButton';
import GrayBorderTextButton from '../components/button/GrayBorderTextButton';
import SVG from '../components/SVG';
import { theme } from '../styles/theme';
import TextTag from '../components/tag/TextTag';
import FloatingButton from '../components/button/FloatingButton';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
};
// 내비게이션 스택 타입 정의
type RootStackParamList = {
    CreateGaldae: undefined;
    NowGaldae: undefined;
    NowGaldaeDetail: { item: any };
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const NowGaldae: React.FC<HomeProps> = () => {
    const dummyGaldaeData = [
        {
          id: 1,
          owner: '하재연님의 갈대',
          from: { main: '정문', sub: '학교' },
          users: 2,
          capacity: 4,
          destination: { main: '던킨도너츠', sub: '충주 터미널' },
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
    const [destination, setDestination] = useState<string>('');
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () => navigation.goBack();

    const handleFilterPress = ()=>{

    };

    const handlePressTimeFilterBtn = () =>{

    };

    const handlePressGenderFilterBtn = () =>{

    };
  return (
    <View style={styles.main}>
        <Header
        leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack}/>}
        title={<BasicText text="실시간 갈대" style={styles.headerText}/>}
        />

        <View style={styles.galdaeList}>
            <Search
            value={destination}
            onChangeText={setDestination}
            placeholder="목적지를 검색해주세요."
            onPressIcon={() => console.log('Search icon pressed')}
            />

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

            <ScrollView style={styles.scroll}>
                <View style={styles.nowGaldaeList}>
                  {dummyGaldaeData.map(item => (
                    <TouchableOpacity
                    key={item.id}
                    onPress={() => navigation.navigate('NowGaldaeDetail', { item })}
                  >
                    <View key={item.id} style={styles.borderedListBox}>
                      <BasicText text={item.owner} style={styles.galdaeOwner} />
                      <View style={styles.fromContainer}>
                        <SVG name="Car" />
                        <BasicText text={item.from.main} style={styles.fromMainLocation} />
                        <BasicText text={item.from.sub} style={styles.fromSubLocation} />
                      </View>
                      <View style={styles.toContainer}>
                        <View style={styles.fromToLine}>
                          <SVG name="FromToLine" />
                        </View>
                        {Array(item.users)
                          .fill(null)
                          .map((_, idx) => (
                            <SVG key={`user-${item.id}-${idx}`} name="User" />
                          ))}
                        {Array(item.capacity - item.users)
                          .fill(null)
                          .map((_, idx) => (
                            <SVG key={`disabled-${item.id}-${idx}`} name="DisabledUser" />
                          ))}
                        <BasicText
                          text={`(${item.users}/${item.capacity})`}
                          fontWeight={500}
                          fontSize={theme.fontSize.size16}
                          color={theme.colors.gray1}
                        />
                      </View>
                      <View style={styles.toContainer}>
                        <SVG name="Location" />
                        <BasicText text={item.destination.main} style={styles.fromMainLocation} />
                        <BasicText text={item.destination.sub} style={styles.fromSubLocation} />
                      </View>
                      <View style={styles.timeContainer}>
                        <SVG name="Clock" />
                        <View>
                          <BasicText
                            text={item.timeAgreement ? '시간 협의가능' : '시간 협의불가'}
                            style={styles.fromMainLocation}
                            color={theme.colors.gray2}
                            fontSize={theme.fontSize.size10}
                          />
                          <BasicText
                            text={item.time}
                            style={styles.fromSubLocation}
                            color={theme.colors.black}
                            fontSize={theme.fontSize.size14}
                          />
                        </View>
                      </View>
                      <View style={styles.tags}>
                        {item.tags.map((tag, index) =>
                           <TextTag key={index} text={tag} />
                        )}
                      </View>
                    </View>
                    </TouchableOpacity>
                  ))}
                </View>
            </ScrollView>

        </View>
        <FloatingButton onPress={() => navigation.navigate('CreateGaldae')} />
    </View>
  );
};

export default NowGaldae;

