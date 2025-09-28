import React, { useMemo, useRef, useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import moment from 'moment';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import styles from '../styles/NowGaldae.style';
import Header from '../components/Header';
import SVGButton from '../components/button/SVGButton';
import BasicText from '../components/BasicText';

import SVG from '../components/SVG';
import TaxiItem from './category/taxi/TexiItem';
import DeletePopup from '../components/popup/DeletePopup'; // DeletePopup import
import NowGaldaeSameGender from '../components/popup/NowGaldaeSameGender';
import { theme } from '../styles/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

//api
import { searchPosts, deletePost } from '../api/postApi';
// type
import { GetPostsRequest } from '../types/postTypes';
import { GaldaeItemType, GaldaeApiResponse } from '../types/getTypes';
// redux
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../modules/redux/store';
import { fetchGaldaePosts } from '../modules/redux/slice/galdaeSlice';
import { fetchMyCreatedGaldae } from '../modules/redux/slice/myCreatedGaldaeSlice';
import { fetchMyGaldaeHistory } from '../modules/redux/slice/myGaldaeSlice';
import { fetchHomeGaldaePosts } from '../modules/redux/slice/homeGaldaeSlice';
import { RootState } from '../modules/redux/RootReducer';

type HomeProps = {
  navigation: any;
};

type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: {
    departureLargeName: string,
    departureLargeId: number,
    departureSmallName: string,
    departureSmallId: number,
    destinationLargeName: string,
    destinationLargeId: number,
    destinationSmallName: string,
    destinationSmallId: number,
  };
  NowGaldaeDetail: { postId: string };
  SetDestination: undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const NowGaldae: React.FC<HomeProps> = () => {
  const reduxPosts = useSelector((state: RootState) => state.galdaeSlice.posts);
  const reduxLoading = useSelector((state: RootState) => state.galdaeSlice.loading);
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
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
    selectedGender: 'SAME' | 'DONT_CARE' | null; // null: 필터 미적용, 0: 성별 무관 필터 적용 (즉, 'DONT_CARE'만 필터링)
    selectedTimeDiscuss: number | null; // null: 필터 미적용, 0: 시간협의가능, 1: 시간협의불가 (여기서는 0 사용)
    passengerNumber: number;
  }>({

    formattedDepartureTime: '', // 빈 문자열로 초기화하여 필터 조건 미적용
    selectedGender: null,
    selectedTimeDiscuss: null,
    passengerNumber: 0,
  });
  // FlatList의 스크롤 위치를 관리하기 위한 ref와 state 추가
  const flatListRef = useRef<FlatList>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  // 정렬 상태: 'latest' (최신순, 내림차순) 또는 'soon' (시간 임박순, 오름차순)
  const [sortOrder, setSortOrder] = useState<'latest' | 'departureTime'>('latest');
  const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
  const goBack = () => navigation.goBack();
  const route = useRoute<RouteProp<RootStackParamList, 'NowGaldae'>>();
  //삭제팝업
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const [sameGenderPopupVisible, setSameGenderPopupVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  // 전달받은 검색 조건
  const {
    departureLargeName,
    departureSmallName,
    destinationLargeName,
    destinationSmallName,
    departureLargeId,
    departureSmallId,
    destinationLargeId,
    destinationSmallId,
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
        !destinationSmallName ||
        departureLargeName === '출발지 선택' ||
        departureSmallName === '출발지 선택' ||
        destinationLargeName === '도착지 선택' ||
        destinationSmallName === '도착지 선택'
      ) {
        // 검색 조건이 없으면 searchResults를 초기화하고 로딩 상태 해제
        setSearchResults(null);
        setIsLoadingMore(false);
        return;
      }
      const params = {
        pageNumber: 0,
        pageSize: 20,
        direction: sortOrder === 'latest' ? 'DESC' : 'ASC',
        properties: sortOrder === 'latest' ? ['create_at'] : ['departure_time'],
        majorDepartment: departureLargeId,      // 출발지 대분류 ID
        subDepartment: departureSmallId,        // 출발지 소분류 ID
        majorArrival: destinationLargeId,       // 도착지 대분류 ID
        subArrival: destinationSmallId,         // 도착지 소분류 ID
      };
      try {
        const data: GaldaeApiResponse = await searchPosts(params);
        setSearchResults(data);
        setIsLast(data.last);
      } catch (error) {
        //console.error('검색 실패:', error);
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
        direction: sortOrder === 'latest' ? 'DESC' : 'ASC',
        properties: sortOrder === 'latest' ? ['create_at'] : ['departure_time'],
      };
      dispatch(fetchGaldaePosts(params));
    }
  }, [dispatch, departureLargeName, destinationLargeName, sortOrder]);


  /**
   * 전부 초기화하는 로직
   */
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
      selectedGender: null,
      selectedTimeDiscuss: null,
      passengerNumber: 0,
    });
    //정렬도 최신순으로 초기화
    setSortOrder('latest');
    const params: GetPostsRequest = {
      pageNumber: 0,
      pageSize: 20,
      direction: sortOrder === 'latest' ? 'DESC' : 'ASC',
      properties: sortOrder === 'latest' ? ['create_at'] : ['departure_time'],
    };
    dispatch(fetchGaldaePosts(params));
  };
  const onRefresh = async () => {
    setRefreshing(true);
    // 필터 초기화 및 전체 데이터 리셋
    handleCancelSearch();
    // 필요한 경우 추가 데이터 호출 로직을 넣어줍니다.
    setRefreshing(false);
  };
  const handleDeletePost = async () => {
    if (!selectedPostId) { return; }
    try {
      await deletePost(selectedPostId);

      // ✅ 검색모드일 경우 로컬 상태에서 삭제
      if (searchResults) {
        setSearchResults(prev => ({
          ...prev!,
          content: prev!.content.filter(item => item.postId !== selectedPostId),
        }));
      } else {
        // ✅ 검색이 아닐 경우: redux 리스트 리패치
        const params: GetPostsRequest = {
          pageNumber: 0,
          pageSize: 20,
          direction: sortOrder === 'latest' ? 'DESC' : 'ASC',
          properties: sortOrder === 'latest' ? ['create_at'] : ['departure_time'],
        };
        dispatch(fetchGaldaePosts(params));
        dispatch(fetchMyGaldaeHistory());
        dispatch(fetchMyCreatedGaldae());
        dispatch(fetchHomeGaldaePosts());
        setPageNumber(0); // 페이지도 초기화
      }

      //Alert.alert('삭제 완료', '선택한 갈대가 삭제되었습니다.');
      setDeletePopupVisible(false);
      setSelectedPostId(null);
    } catch (error) {
      Alert.alert('삭제 실패', '글 삭제에 실패했습니다. 다시 시도해주세요.');
      //console.error(error);
    }
  };

  // 포스트 삭제를 위한 핸들러 (본인 글인 경우에만 활성화)
  const handleLongPress = (post: GaldaeItemType) => {
    // 예시로 본인 글 여부는 post.isMine 속성으로 확인
    if (post) { //.isMine
      setSelectedPostId(post.postId);
      setDeletePopupVisible(true);
    }
  };
  // 표시할 데이터: searchResults가 있으면 searchResults.content, 없으면 reduxPosts 사용
  const displayedPosts: GaldaeItemType[] = searchResults ? searchResults.content : reduxPosts;
  const finalFilteredData = useMemo(() => {
    let filtered = displayedPosts;

    if (filterOptions.formattedDepartureTime) {
      filtered = filtered.filter(item => {
        const apiTime = moment.utc(item.departureTime).format('YYYY-MM-DDTHH:mm:ss[Z]');
        const filterTime = moment.utc(filterOptions.formattedDepartureTime).format('YYYY-MM-DDTHH:mm:ss[Z]');
        return apiTime === filterTime;
      });
    }

    if (filterOptions.selectedTimeDiscuss !== null) {
      filtered = filtered.filter(item =>
        item.arrangeTime === (filterOptions.selectedTimeDiscuss === 0 ? 'POSSIBLE' : 'IMPOSSIBLE')
      );
    }

    if (filterOptions.selectedGender !== null) {
      filtered = filtered.filter(item =>
        item.passengerGenderType === (filterOptions.selectedGender === 'SAME' ? 'SAME' : 'DONT_CARE')
      );
    }

    if (filterOptions.passengerNumber > 0) {
      filtered = filtered.filter(item =>
        item.totalPassengerCount === filterOptions.passengerNumber
      );
    }

    return filtered;
  }, [displayedPosts, filterOptions]);

  const loadMoreData = async () => {
    if (isLoadingMore) { return; }
    if (isLast) { return; }
    setIsLoadingMore(true);
    // 검색 조건이 있는 경우 (searchResults 모드)
    if (searchResults) {
      const nextPage = pageNumber + 1;
      const params = {
        pageNumber: nextPage,
        pageSize: 20,
        direction: sortOrder === 'latest' ? 'DESC' : 'ASC',
        properties: sortOrder === 'latest' ? ['create_at'] : ['departure_time'],
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
          if (!prev) { return data; }
          return {
            ...prev,
            content: [...prev.content, ...data.content], // ✅ 기존 content + 새 content
            last: data.last,
          };
        });
        setPageNumber(nextPage);
        setIsLast(data.last);
      } catch (error) {
        //console.error('추가 검색 실패:', error);
      }

    } else {

      const nextPage = pageNumber + 1;
      const params: GetPostsRequest = {
        pageNumber: nextPage,
        pageSize: 20,
        direction: sortOrder === 'latest' ? 'DESC' : 'ASC',
        properties: sortOrder === 'latest' ? ['create_at'] : ['departure_time'],
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
        title={<BasicText text="실시간 N빵 리스트" style={styles.headerText} />}
      />
      <View style={styles.galdaeList}>

        {reduxLoading || isLoadingMore ? (
          <View style={styles.noData}>
            <ActivityIndicator size="large" color={theme.colors.Galdae} />
          </View>
        ) : finalFilteredData.length === 0 ? (
          <View style={styles.noData}>
            <SVG name="information_line" />
            <BasicText text="해당 경로의 N빵이 없습니다" color={theme.colors.grayV1} />
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            onScroll={(event) => {
              setScrollOffset(event.nativeEvent.contentOffset.y);
            }}
            onContentSizeChange={() => {
              if (pageNumber > 0 && flatListRef.current) {
                flatListRef.current.scrollToOffset({ offset: scrollOffset, animated: false });
              }
            }}
            scrollEventThrottle={16}
            //style={styles.scroll}
            contentContainerStyle={styles.nowGaldaeList}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            extraData={finalFilteredData.length}
            data={finalFilteredData}
            keyExtractor={(item) => item.postId}
            onEndReached={loadMoreData}
            //initialNumToRender={10}
            //removeClippedSubviews={true} // 렌더링 최적화
            onEndReachedThreshold={0.5} // 화면의 50% 정도 남았을 때 다음 페이지를 불러옴
            renderItem={({ item }) => (
              <TaxiItem
                item={item}
                onPress={!item.isSameGender && item.passengerGenderType === 'SAME' ? () => setSameGenderPopupVisible(true) : () => navigation.navigate('NowGaldaeDetail', { postId: item.postId })}
                onLongPress={() => handleLongPress(item)}
              />
            )}
          />
        )}
      </View>

      <DeletePopup
        visible={deletePopupVisible}
        onCancel={() => {
          setDeletePopupVisible(false);
          setSelectedPostId(null);
        }}
        onConfirm={handleDeletePost}
        title="선택하신 갈대를"
        message="삭제하시겠습니까?"
        buttonText="삭제하기"
      />
      <NowGaldaeSameGender
        visible={sameGenderPopupVisible}
        onConfirm={() => { setSameGenderPopupVisible(false); }}
      />
    </View>
  );
};

export default NowGaldae;
