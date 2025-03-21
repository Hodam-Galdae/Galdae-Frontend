import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList,ActivityIndicator } from 'react-native';
import moment from 'moment';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
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
import  ArrayPopup,{ FastGaldaeTimePopupRef } from '../components/popup/ArrayPopup'; //ArrayPopup,
import FilterPopup from '../components/popup/FilterPopup';
//api
import { searchPosts } from '../api/postApi';
// type
import { GetPostsRequest } from '../types/postTypes';
import { GaldaeItemType,GaldaeApiResponse } from '../types/getTypes';
// redux
import {  useSelector } from 'react-redux';
import { useAppDispatch } from '../modules/redux/store';
import { fetchGaldaePosts } from '../modules/redux/slice/galdaeSlice';
import { RootState } from '../modules/redux/RootReducer';

type HomeProps = {
  navigation: any;
};

type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: {
    departureLargeName:string,
    departureLargeId:number,
    departureSmallName:string,
    departureSmallId:number,
    destinationLargeName:string,
    destinationLargeId:number,
    destinationSmallName:string,
    destinationSmallId:number,
  };
  NowGaldaeDetail: { postId: string };
  SetDestination: undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const NowGaldae: React.FC<HomeProps> = () => {
  const reduxPosts = useSelector((state: RootState) => state.galdaeSlice.posts);
  const reduxLoading = useSelector((state: RootState) => state.galdaeSlice.loading);
  const dispatch = useAppDispatch();
  // 출/도착지 검색 결과를 저장할 로컬 상태 (검색이 없으면 null)
  const [searchResults, setSearchResults] = useState<GaldaeApiResponse | null>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // 상태값 추가: hasMore (불러올 데이터가 있는지 여부)
  const [isLast, setIsLast] = useState(false);
  const [filterOptions, setFilterOptions] = useState<{
    // selectedDate: string | null;
    // selectedAmPm: '오전' | '오후';
    // selectedHour: number;
    // selectedMinute: number;
    formattedDepartureTime: string,
    selectedGender: 'SAME' | 'DONT_CARE'; // null: 필터 미적용, 0: 성별 무관 필터 적용 (즉, 'DONT_CARE'만 필터링)
    selectedTimeDiscuss: number | null; // null: 필터 미적용, 0: 시간협의가능, 1: 시간협의불가 (여기서는 0 사용)
    passengerNumber: number;
  }>({
    // selectedDate: null,
    // selectedAmPm: '오전',
    // selectedHour: 0,
    // selectedMinute: 0,
    formattedDepartureTime: '', // 빈 문자열로 초기화하여 필터 조건 미적용
    selectedGender: 'DONT_CARE',
    selectedTimeDiscuss: null,
    passengerNumber: 0,
  });

  // 팝업 ref
  const arrayPopupRef = useRef<FastGaldaeTimePopupRef>(null);
  const filterRef = useRef<FastGaldaeTimePopupRef>(null);
  // 정렬 상태: 'latest' (최신순, 내림차순) 또는 'soon' (시간 임박순, 오름차순)
  const [sortOrder, setSortOrder] = useState<'latest' | 'departureTime'>('latest');

  const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
  const goBack = () => navigation.goBack();
  const route = useRoute<RouteProp<RootStackParamList, 'NowGaldae'>>();
  // 전달받은 검색 조건
  const {
    departureLargeName,
    departureSmallName,
    destinationLargeName,
    destinationSmallName ,
    departureLargeId,
    departureSmallId,
    destinationLargeId,
    destinationSmallId ,
  } = route.params || {};

   // 출/도착지 검색 조건이 있을 경우 searchPosts API 호출하여 결과 저장
   useEffect(() => {
    const fetchSearchResults = async () => {
      setPageNumber(0);
      setIsLoadingMore(true);
      if (
        !departureLargeName ||
        !departureSmallName ||
        !destinationLargeName ||
        !destinationSmallName
      ) {
        // 검색 조건이 없으면 searchResults를 초기화하고 로딩 상태 해제
        setSearchResults(null);
        setIsLoadingMore(false);
        return;
      }
      const params = {
        pageNumber: 0,
        pageSize: 20,
        direction: 'DESC',
        properties: sortOrder === 'latest' ? ['createAt'] : ['departureTime'],
        majorDepartment: departureLargeId,      // 출발지 대분류 ID
        subDepartment: departureSmallId,        // 출발지 소분류 ID
        majorArrival: destinationLargeId,       // 도착지 대분류 ID
        subArrival: destinationSmallId,         // 도착지 소분류 ID
      };
      try {
        const data:GaldaeApiResponse = await searchPosts(params);
        setSearchResults(data);
        setIsLast(data.last);
      } catch (error) {
        console.error('검색 실패:', error);
      }
      setIsLoadingMore(false);
    };
    fetchSearchResults();
  }, [
    sortOrder,
    departureLargeName,
    departureSmallName,
    destinationLargeName,
    destinationSmallName,
    departureLargeId,
    departureSmallId,
    destinationLargeId,
    destinationSmallId,
  ]);

  // redux posts는 검색 조건이 없을 때 불러옴
  useEffect(() => {
    if (!departureLargeName && !destinationLargeName) {
      setPageNumber(0);
      const params: GetPostsRequest = {
        pageNumber: 0,
        pageSize: 20,
        direction: 'DESC',
        properties: sortOrder === 'latest' ? ['createAt'] : ['departureTime'],
      };
      dispatch(fetchGaldaePosts(params));
    }
  }, [dispatch, departureLargeName, destinationLargeName,sortOrder]);

  const handleFilterPress = () => {
    filterRef.current?.open();
  };

  const handlePressTimeFilterBtn = () => {
    setFilterOptions(prev => ({
      ...prev,
      // 현재 필터가 미적용(null)이라면 0 (시간협의가능)을 적용, 이미 적용중이면 해제(null)
      selectedTimeDiscuss: prev.selectedTimeDiscuss === null ? 0 : null,
    }));
  };

  const handlePressGenderFilterBtn = () => {
    setFilterOptions(prev => ({
      ...prev,
      selectedGender: prev.selectedGender === 'SAME' ? 'DONT_CARE' :  'DONT_CARE',
    }));
  };
  // const handlePressSameGenderFilterBtn = () => {
  //   setFilterOptions(prev => ({
  //     ...prev,
  //     selectedGender: prev.selectedGender === 'DONT_CARE' ? 'SAME' : 'SAME',
  //   }));
  // };
  const openArrayPopup = () => {
    arrayPopupRef.current?.open();
  };

  // FilterPopup의 onConfirm 콜백에서 선택된 필터 조건을 업데이트
  const handleFilterPopupConfirm = (
    // selectedDate: string,
    // selectedAmPm: '오전' | '오후',
    // selectedHour: number,
    // selectedMinute: number,
    formattedDepartureTime:string,
    selectedGender: 'SAME' | 'DONT_CARE',
    selectedTimeDiscuss: number,
    passengerNumber: number
  ) => {
    const filterOptionsObj = {
      // selectedDate,
      // selectedAmPm,
      // selectedHour,
      // selectedMinute,
      formattedDepartureTime,
      selectedGender,
      selectedTimeDiscuss,
      passengerNumber,
    };
    console.log('선택된 필터 옵션:', filterOptionsObj);
    setFilterOptions(filterOptionsObj);
  };
  const handleCancelSearch = () => {
    // 네비게이션 파라미터 초기화
    navigation.setParams({
      departureLargeName: undefined,
      departureSmallName: undefined,
      destinationLargeName: undefined,
      destinationSmallName: undefined,
      departureLargeId: undefined,
      departureSmallId: undefined,
      destinationLargeId: undefined,
      destinationSmallId: undefined,
    });
    // 검색 결과 초기화
    setSearchResults(null);
    // 필터 옵션 초기값으로 재설정
    setFilterOptions({
      // selectedDate: null,
      // selectedAmPm: '오전',
      // selectedHour: 0,
      // selectedMinute: 0,
      formattedDepartureTime: '', // 빈 문자열로 초기화하여 필터 조건 미적용
      selectedGender: 'DONT_CARE',
      selectedTimeDiscuss: null,
      passengerNumber: 0,
    });
  };
  // 표시할 데이터: searchResults가 있으면 searchResults.content, 없으면 reduxPosts 사용
  const displayedPosts: GaldaeItemType[] = searchResults ? searchResults.content : reduxPosts;

  // 추가 필터 적용 (날짜, 시간협의, 성별, 탑승인원 등)
  let finalFilteredData = displayedPosts;
  console.log(`
    ====================================
    0️⃣현재 finalFilteredData 데이터: (필터적용전)

    `,finalFilteredData);
    if (filterOptions.formattedDepartureTime) {
      finalFilteredData = finalFilteredData.filter((item) => {
        const apiTime = moment.utc(item.departureTime).format('YYYY-MM-DDTHH:mm:ss[Z]');
        const filterTime = moment.utc(filterOptions.formattedDepartureTime).format('YYYY-MM-DDTHH:mm:ss[Z]');
        console.log(apiTime, filterTime);
        return apiTime === filterTime;
      });
    }

  console.log(`
    1️⃣현재 finalFilteredData 데이터:

    `,finalFilteredData);
  if (filterOptions.selectedTimeDiscuss !== null) {
    finalFilteredData = finalFilteredData.filter(
      (item) => item.arrangeTime === (filterOptions.selectedTimeDiscuss === 0 ? 'POSSIBLE' : 'IMPOSSIBLE')
    );
  }

  console.log(`
    2️⃣현재 finalFilteredData 데이터:

    `,finalFilteredData);

  if (filterOptions.selectedGender !== null) {
    finalFilteredData = finalFilteredData.filter(
      (item) =>
        item.passengerGenderType ===
        (filterOptions.selectedGender === 'SAME' ? 'SAME' : 'DONT_CARE')
    );
  }

  console.log(`
    3️⃣현재 finalFilteredData 데이터:

    `,finalFilteredData);

  if (filterOptions.passengerNumber > 0) {
    finalFilteredData = finalFilteredData.filter(
      (item) => item.totalPassengerCount === filterOptions.passengerNumber
    );
  }
  console.log(`
    4️⃣현재 finalFilteredData 데이터:
    ====================================
    `,finalFilteredData);

  const loadMoreData = async () => {
    if (isLoadingMore) {return;}
    if (isLast) {return;}
    setIsLoadingMore(true);
    // 검색 조건이 있는 경우 (searchResults 모드)
    if (searchResults) {
      const nextPage = pageNumber + 1;
      const params = {
        pageNumber: nextPage,
        pageSize: 20,
        direction: 'DESC',
        properties: sortOrder === 'latest' ? ['createAt'] : ['departureTime'],
        department: departureLargeName,
        arrival: destinationLargeName,
        majorDepartment: departureLargeId,
        subDepartment: departureSmallId,
        majorArrival: destinationLargeId,
        subArrival: destinationSmallId,
      };

      try {
        const data: GaldaeApiResponse = await searchPosts(params);

        setSearchResults(prev => {
          if (prev) {
            return {
              ...data,
              content: [...prev.content, ...data.content],
            };
          }
          return data;
        });
        setPageNumber(nextPage);
        setIsLast(data.last);
      } catch (error) {
        console.error('추가 검색 실패:', error);
      }

    } else {

      const nextPage = pageNumber + 1;
      const params: GetPostsRequest = {
        pageNumber: nextPage,
        pageSize: 20,
        direction: 'DESC',
        properties: sortOrder === 'latest' ? ['createAt'] : ['departureTime'],
      };

      const resultAction = await dispatch(fetchGaldaePosts(params));
      const response = resultAction.payload as GaldaeApiResponse;
      setIsLast(response.last);
      setPageNumber(nextPage);
    }
    setIsLoadingMore(false);
  };


  return (
    <View style={styles.main}>
      <Header
        leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack} />}
        title={<BasicText text="실시간 갈대" style={styles.headerText} />}
      />
      <View style={styles.galdaeList}>
        {departureLargeName && destinationLargeName && departureSmallName && destinationSmallName ? (
          <SVGTextButton
            iconName="Cancel"
            iconPosition="right"
            style={styles.search}
            buttonStyle={styles.searchBtn}
            textStyle={styles.searchText}
            SVGStyle={styles.searchSVG}
            enabledColors={{
              backgroundColor: theme.colors.white,
              textColor: theme.colors.gray2,
            }}
            onPress={handleCancelSearch}
          >
            <View style={styles.searchContent}>
              <SVG name="location_line_gray2" />
              <BasicText text={departureSmallName} color={theme.colors.gray2} style={styles.searchPos} />
              <SVG name="arrow_right_line_gray2" />
              <BasicText text={destinationSmallName} color={theme.colors.gray2} style={styles.searchPos} />
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
            enabledColors={{
              backgroundColor: theme.colors.white,
              textColor: theme.colors.gray2,
            }}
            onPress={() => navigation.navigate('SetDestination')}
          />
        )}

        <View style={styles.btns}>
          <View style={styles.filters}>
            <FilterButton onPress={handleFilterPress} />
            <GrayBorderTextButton text="시간협의가능" onPress={handlePressTimeFilterBtn} />
            <GrayBorderTextButton text="성별무관" onPress={handlePressGenderFilterBtn} />
            {/* <GrayBorderTextButton text="동성만" onPress={handlePressSameGenderFilterBtn} /> */}
          </View>
          <View style={styles.arrayBtn}>
            <SVGTextButton
              onPress={openArrayPopup}
              text={sortOrder === 'latest' ? '최신순' : '시간 임박순'}
              iconName="transfer_2_line"
              iconPosition="right"
              enabledColors={{
                backgroundColor: theme.colors.white,
                textColor: theme.colors.gray1,
              }}
            />
          </View>
        </View>

        {reduxLoading || isLoadingMore ? (
          <View style={styles.noData}>
             <ActivityIndicator size="large" color={theme.colors.brandColor} />
          </View>
        ) : finalFilteredData.length === 0 ? (
          <View style={styles.noData}>
            <SVG name="information_line" />
            <BasicText text="해당 경로의 갈대가 없습니다." color={theme.colors.gray1} />
          </View>
        ) : (
          <FlatList
            style={styles.scroll}
            contentContainerStyle={styles.nowGaldaeList}
            data={finalFilteredData}
            keyExtractor={(item) => item.postId}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5} // 화면의 50% 정도 남았을 때 다음 페이지를 불러옴
            renderItem={({ item }) => (
              <GaldaeItem
                key={item.postId}
                item={item}
                onPress={() => navigation.navigate('NowGaldaeDetail', {postId: item.postId})}
              />
            )}
          />
        )}
      </View>
      <FloatingButton onPress={() => navigation.navigate('CreateGaldae')} />
      <ArrayPopup
        ref={arrayPopupRef}
        onConfirm={(selectedSortOrder: 'latest' | 'departureTime') => {
          setSortOrder(selectedSortOrder);
        }}
        onClose={() => console.log('팝업 닫힘')}
      />
      <FilterPopup
        ref={filterRef}
        onConfirm={handleFilterPopupConfirm}
        onClose={() => console.log('팝업 닫힘')}
      />
    </View>
  );
};

export default NowGaldae;
