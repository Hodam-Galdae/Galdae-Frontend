import React,{useRef,useState,useEffect} from 'react';
import {  View } from 'react-native';
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
import ArrayPopup, { FastGaldaeTimePopupRef } from '../components/popup/ArrayPopup';
import FilterPopup from '../components/popup/FilterPopup';
import { FlatList } from 'react-native-gesture-handler';

//api
import { getPosts } from '../api/postApi'; // ✅ 실시간 갈대 조회 API 추가


//type
import { GetPostsRequest } from '../types/postTypes'; // API 요청 타입 가져오기
import {GaldaeItemType} from '../types/getTypes';

type HomeProps = {
  navigation: any;
};

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
  // ✅ API로 가져올 갈대 데이터
  const [galdaeList, setGaldaeList] = useState<GaldaeItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filterOptions, setFilterOptions] = useState<{
    selectedDate: string | null;
    selectedAmPm: '오전' | '오후';
    selectedHour: number;
    selectedMinute: number;
    selectedGender: number; // 0: 성별무관, 1: 여자, 2: 남자
    selectedTimeDiscuss: number; // 0: 가능, 1: 불가능
    passengerNumber: number;
  }>({
    selectedDate: null,
    selectedAmPm: '오전',
    selectedHour: 0,
    selectedMinute: 0,
    selectedGender: 0,
    selectedTimeDiscuss: 0,
    passengerNumber: 0,
  });
  // ArrayPopup ref를 사용하여 정렬 옵션 선택 팝업을 엽니다.
  const arrayPopupRef = useRef<FastGaldaeTimePopupRef>(null);
    const filterRef = useRef<FastGaldaeTimePopupRef>(null);
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

      // 정렬 상태: 'latest' (최신순, 내림차순) 또는 'soon' (시간 임박순, 오름차순)
    const [sortOrder, setSortOrder] = useState<'latest' | 'soon'>('latest');
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () => navigation.goBack();
    const route = useRoute<RouteProp<RootStackParamList, 'NowGaldae'>>();
    // 전달받은 검색 조건
    const { departureLarge, departureSmall,destinationLarge,destinationSmall } = route.params || {};
     // ✅ 실시간 갈대 목록 조회 API 호출
     useEffect(() => {
      const fetchGaldaeList = async () => {
        setLoading(true);
        setError(null);
    
        const params: GetPostsRequest = {
          pageNumber: 0,
          pageSize: 10,
          direction: sortOrder === 'latest' ? 'DESC' : 'ASC',
          properties: ['departureTime'], // 출발 시간 기준 정렬
        };
    
        try {
          const response = await getPosts(params);
          console.log('🚀 API 응답 데이터:', response);
    
    
    
          setGaldaeList(response.content);
        } catch (err) {
          setError('갈대 목록을 불러오는 데 실패했습니다.');
          console.error('❌ 갈대 조회 실패:', err);
        } finally {
          setLoading(false);
        }
      };
    
      fetchGaldaeList();
    }, [sortOrder]); // `sortOrder`가 변경될 때 다시 요청
    const handleFilterPress = ()=>{
      filterRef.current?.open();
    };

    const handlePressTimeFilterBtn = () =>{

    };

    const handlePressGenderFilterBtn = () =>{

    };


    const openArrayPopup = () => {
      arrayPopupRef.current?.open();
    };
   // FilterPopup의 onConfirm 콜백에서 선택된 필터 조건을 업데이트
  const handleFilterPopupConfirm = (
    selectedDate: string,
    selectedAmPm: '오전' | '오후',
    selectedHour: number,
    selectedMinute: number,
    selectedGender: number,
    selectedTimeDiscuss: number,
    passengerNumber: number
  ) => {
    setFilterOptions({
      selectedDate,
      selectedAmPm,
      selectedHour,
      selectedMinute,
      selectedGender,
      selectedTimeDiscuss,
      passengerNumber,
    });
  };
    // 우선 출발지/도착지 조건에 따른 필터링
    const baseFilteredData =
    departureLarge && destinationLarge && departureSmall && destinationSmall
      ? galdaeList.filter(
          (item) =>
            item.from.main.includes(departureLarge) &&
            item.from.sub.includes(departureSmall) &&
            item.destination.main.includes(destinationLarge) &&
            item.destination.sub.includes(destinationSmall)
        )
      : galdaeList;

  // 추가 필터(날짜/시간, 성별, 시간협의, 탑승인원) 적용
  let finalFilteredData = baseFilteredData;
  if (filterOptions.selectedDate) {
    // filterOptions.selectedDate를 기준으로 시간 필터링
    let filterTimestamp =
      new Date(filterOptions.selectedDate).getTime() +
      (filterOptions.selectedHour * 3600 + filterOptions.selectedMinute * 60) * 1000;
    // 오전/오후 보정: '오후'이면 12시간 추가 (단, selectedHour가 12 미만일 경우)
    if (filterOptions.selectedAmPm === '오후' && filterOptions.selectedHour < 12) {
      filterTimestamp += 12 * 3600 * 1000;
    }
    // 예시: 선택한 시간과 1시간 이내에 해당하는 항목만 통과
    finalFilteredData = finalFilteredData.filter(
      (item) => Math.abs(item.timestamp - filterTimestamp) <= 3600000
    );
  }
  // 성별 필터 (0: 성별무관, 1: 여자만, 2: 남자만)
  if (filterOptions.selectedGender !== 0) {
    if (filterOptions.selectedGender === 1) {
      finalFilteredData = finalFilteredData.filter((item) =>
        item.tags.includes('여자만')
      );
    } else if (filterOptions.selectedGender === 2) {
      finalFilteredData = finalFilteredData.filter((item) =>
        item.tags.includes('남자만')
      );
    }
  }
  // 시간 협의 필터 (0: 가능, 1: 불가능)
  finalFilteredData = finalFilteredData.filter(
    (item) => item.timeAgreement === (filterOptions.selectedTimeDiscuss === 0)
  );
  // 탑승 인원 필터: (본인을 제외한 여유 좌석이 passengerNumber 이상)
  if (filterOptions.passengerNumber > 0) {
    finalFilteredData = finalFilteredData.filter(
      (item) => item.capacity - item.users >= filterOptions.passengerNumber
    );
  }

  const sortedData = [...finalFilteredData].sort((a, b) => {
    if (sortOrder === 'latest') {
      return b.timestamp - a.timestamp;
    } else {
      return a.timestamp - b.timestamp;
    }
  });
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
              iconName="Cancel"
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
              onPress={() =>
                navigation.setParams({
                  departureLarge: undefined,
                  departureSmall: undefined,
                  destinationLarge: undefined,
                  destinationSmall: undefined,
                })
              }
              >
                <View style={styles.searchContent}>
                  <SVG name="location_line_gray2"/>
                  <BasicText text={departureSmall} color={theme.colors.gray2} style={styles.searchPos}/>
                  <SVG name="arrow_right_line_gray2"/>
                  <BasicText text={destinationSmall} color={theme.colors.gray2} style={styles.searchPos}/>
                </View>
              </SVGTextButton>
            ) : (
              <SVGTextButton
                text={'목적지를 설정해주세요'}
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
                onPress={openArrayPopup}
                text={sortOrder === 'latest' ? '최신순' : '시간 임박순'}
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

            {loading ? (
              <View >
                <BasicText text="데이터 불러오는 중..." />
              </View>
            ) : sortedData.length === 0 ? (
              <View style={styles.noData}>
                <SVG name="information_line" />
                <BasicText text="해당 경로의 갈대가 없습니다." color={theme.colors.gray1} />
              </View>
            ) : (
              <FlatList
                style={styles.scroll}
                contentContainerStyle={styles.nowGaldaeList}
                data={sortedData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <GaldaeItem
                    key={item.id}
                    item={item}
                    onPress={() => navigation.navigate('NowGaldaeDetail', { item })}
                  />
                )}
              />
            )}


        </View>
        <FloatingButton onPress={() => navigation.navigate('CreateGaldae')} />
        <ArrayPopup
        ref={arrayPopupRef}
        onConfirm={(selectedSortOrder: 'latest' | 'soon') => {
          setSortOrder(selectedSortOrder);
        }}
        onClose={() => console.log('팝업 닫힘')}
      />
      <FilterPopup ref={filterRef} onConfirm={handleFilterPopupConfirm} onClose={() => console.log('팝업 닫힘')}/>
    </View>
  );
};

export default NowGaldae;

