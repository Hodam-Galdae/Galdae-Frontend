/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import moment from 'moment';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import styles from '../../../styles/NowGaldae.style';
import Header from '../../../components/Header';
import SVGButton from '../../../components/button/SVGButton';
import BasicText from '../../../components/BasicText';
import FilterButton from '../../../components/button/FilterButton';
import SVGTextButton from '../../../components/button/SVGTextButton';
import SVG from '../../../components/SVG';
import TaxiItem from './TexiItem';
import DeletePopup from '../../../components/popup/DeletePopup'; // DeletePopup import
import NowGaldaeSameGender from '../../../components/popup/NowGaldaeSameGender';
import { theme } from '../../../styles/theme';
import FloatingButton from '../../../components/button/FloatingButton';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FastGaldaeTimePopupRef } from '../../../components/popup/ArrayPopup'; //ArrayPopup,
import FilterPopup from '../../../components/popup/FilterPopup';
//api
import { searchTaxi, deleteTaxi } from '../../../api/taxiApi';
// type
import { TaxiListItem, TaxiListResponsePage, TaxiSearchParams, PagingQuery } from '../../../types/taxiType';
// redux
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../modules/redux/store';
// import { fetchMyCreatedGaldae } from '../../../modules/redux/slice/myCreatedGaldaeSlice';
// import { fetchMyGaldaeHistory } from '../../../modules/redux/slice/myGaldaeSlice';
// import { fetchHomeGaldaePosts } from '../../../modules/redux/slice/homeGaldaeSlice';
import { fetchTaxiList } from '../../../modules/redux/slice/taxiSlice';
import { RootState } from '../../../modules/redux/RootReducer';
import SelectTextButton from '../../../components/button/SelectTextButton';

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
  NowGaldaeDetail: { taxiId: string };
  SetDestination: undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TaxiNDivide: React.FC<HomeProps> = () => {
  // const reduxPosts = useSelector((state: RootState) => state.galdaeSlice.posts);
  // const reduxLoading = useSelector((state: RootState) => state.galdaeSlice.loading);
  const reduxPosts = useSelector((state: RootState) => state.taxiSlice.list);
  const reduxLoading = useSelector((state: RootState) => state.taxiSlice.loadingList);
  const userGenderType = useSelector((state: RootState) => state.myInfoSlice.userInfo?.gender);
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  // 출/도착지 검색 결과를 저장할 로컬 상태 (검색이 없으면 null)
  const [searchResults, setSearchResults] = useState<TaxiListResponsePage | null>(null);
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
    selectedGender: 'SAME_GENDER' | 'DONT_CARE' | null; // null: 필터 미적용, 0: 성별 무관 필터 적용 (즉, 'DONT_CARE'만 필터링)
    selectedTimeDiscuss: number | null; // null: 필터 미적용, 0: 시간협의가능, 1: 시간협의불가 (여기서는 0 사용)
    passengerNumber: number;
  }>({
    // selectedDate: null,
    // selectedAmPm: '오전',
    // selectedHour: 0,
    // selectedMinute: 0,
    formattedDepartureTime: '', // 빈 문자열로 초기화하여 필터 조건 미적용
    selectedGender: null,
    selectedTimeDiscuss: null,
    passengerNumber: 0,
  });
  // FlatList의 스크롤 위치를 관리하기 위한 ref와 state 추가
  const flatListRef = useRef<FlatList>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  // 팝업 ref
  // const arrayPopupRef = useRef<FastGaldaeTimePopupRef>(null);
  const filterRef = useRef<FastGaldaeTimePopupRef>(null);
  // 정렬 상태: 'latest' (최신순, 내림차순) 또는 'soon' (시간 임박순, 오름차순)
  const [sortOrder, setSortOrder] = useState<'latest' | 'departure_time'>('latest');
  const [arrayPopupVisible, setArrayPopupVisible] = useState(false);
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

  const didFetchRef = useRef(false);
// 🔧 추가: 검색 모드 여부 헬퍼 (이름 대신 ID 기준)
const isSearchMode = useMemo(() => (
  departureSmallId != null && destinationSmallId != null
), [departureSmallId, destinationSmallId]);
  // 출/도착지 검색 조건이 있을 경우 searchPosts API 호출하여 결과 저장
  // 🔧 검색 결과 Fetch useEffect
useEffect(() => {
  const fetchSearchResults = async () => {
    setPageNumber(0);
    setIsLoadingMore(true);

    if (!isSearchMode) {               // ✨ ID 기준으로 판단
      setSearchResults(null);
      setIsLoadingMore(false);
      return;
    }

    const params: TaxiSearchParams = { // ✨ API 스펙에 맞게 최소 파라미터만
      pageNumber: 0,
      pageSize: 20,
      subDepartureId: departureSmallId!,  // ✨ 필수
      subArrivalId: destinationSmallId!,  // ✨ 필수
    };

    try {
      const data = await searchTaxi(params); // ✨ 바뀐 파라미터로 호출
      setSearchResults(data);
      setIsLast(data.last);
    } catch (error) {
      // 필요시 Alert/로그
    } finally {
      setIsLoadingMore(false);
    }
  };

  fetchSearchResults();
}, [
  // ✨ 의존성: 검색 ID 기준
  isSearchMode,
  departureSmallId,
  destinationSmallId,
  // 정렬은 클라에서 처리할 거라면 여기에 안 넣어도 됨
]);

  // redux posts는 검색 조건이 없을 때 불러옴
// 목록 로딩 useEffect 쪽
useEffect(() => {
  if (departureLargeName || destinationLargeName) {return;} // 검색 모드가 아니면만 실행
 // if (didFetchRef.current) {return;} // ← 이미 한 번 실행됐으면 막기
 // didFetchRef.current = true;

  setPageNumber(0);
  const params: PagingQuery = {
    pageNumber: 0,
    pageSize: 20,
    direction: sortOrder === 'latest' ? 'DESC' : 'ASC',
    property: sortOrder === 'latest' ? 'create_at' : 'departure_time',
  };
  dispatch(fetchTaxiList(params));
}, [dispatch, departureLargeName, destinationLargeName, sortOrder]);

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
      selectedGender: prev.selectedGender === null ? 'DONT_CARE' : null,
    }));
  };
  // const handlePressSameGenderFilterBtn = () => {
  //   setFilterOptions(prev => ({
  //     ...prev,
  //     selectedGender: prev.selectedGender === 'DONT_CARE' ? 'SAME' : 'SAME',
  //   }));
  // };
  const toggleArrayPopup = () => {
    // arrayPopupRef.current?.open();
    setArrayPopupVisible(!arrayPopupVisible);

  };

  // FilterPopup의 onConfirm 콜백에서 선택된 필터 조건을 업데이트
  const handleFilterPopupConfirm = (
    // selectedDate: string,
    // selectedAmPm: '오전' | '오후',
    // selectedHour: number,
    // selectedMinute: number,
    formattedDepartureTime: string,
    selectedGender: 'SAME_GENDER' | 'DONT_CARE',
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
    //console.log('선택된 필터 옵션:', filterOptionsObj);
    setFilterOptions(filterOptionsObj);
  };
  const handleFilterReset = () => {
    handleCancelSearch();
    filterRef.current?.close();
  };
  /**
   * 전부 초기화하는 로직
   */
  // 🔧 전체 초기화
const handleCancelSearch = () => {
  navigation.setParams({
    departureLargeName: undefined,
    departureSmallName: undefined,
    destinationLargeName: undefined,
    destinationSmallName: undefined,
    departureLargeId: undefined,     // ✨
    departureSmallId: undefined,     // ✨
    destinationLargeId: undefined,   // ✨
    destinationSmallId: undefined,   // ✨
  });

  setSearchResults(null);
  setFilterOptions({
    formattedDepartureTime: '',
    selectedGender: null,
    selectedTimeDiscuss: null,
    passengerNumber: 0,
  });
  setSortOrder('latest');

  const params: PagingQuery = {
    pageNumber: 0,
    pageSize: 20,
    direction: 'DESC',
    property: 'create_at',
  };
  dispatch(fetchTaxiList(params));
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
      await deleteTaxi(selectedPostId);

      // ✅ 검색모드일 경우 로컬 상태에서 삭제
      if (searchResults) {
        setSearchResults(prev => ({
          ...prev!,
          content: prev!.content.filter((item:any) => item.taxiId !== selectedPostId),
        }));
      } else {
        // ✅ 검색이 아닐 경우: redux 리스트 리패치
        const params: PagingQuery = {
          pageNumber: 0,
          pageSize: 20,
          direction: sortOrder === 'latest' ? 'DESC' : 'ASC',
          property: sortOrder === 'latest' ? 'create_at' : 'departure_time',
        };
        dispatch(fetchTaxiList(params));
        // dispatch(fetchMyGaldaeHistory());
        // dispatch(fetchMyCreatedGaldae());
        // dispatch(fetchHomeGaldaePosts());
        setPageNumber(0); // 페이지도 초기화
      }

      //Alert.alert('삭제 완료', '선택한 갈대가 삭제되었습니다.');
      setDeletePopupVisible(false);
      setSelectedPostId(null);
    } catch (error: any) {
      // 서버에서 받은 에러 메시지 추출
      let errorMessage = '글 삭제에 실패했습니다. 다시 시도해주세요.';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('삭제 실패', errorMessage);
      //console.error(error);
    }
  };

  // 포스트 삭제를 위한 핸들러 (본인 글인 경우에만 활성화)
  const handleLongPress = (post: TaxiListItem) => {
    // 예시로 본인 글 여부는 post.isMine 속성으로 확인
    if (post) { //.isMine
      setSelectedPostId(post.taxiId);
      setDeletePopupVisible(true);
    }
  };
  // 표시할 데이터: searchResults가 있으면 searchResults.content, 없으면 reduxPosts 사용
  const displayedPosts = searchResults ? searchResults.content : reduxPosts;
  const finalFilteredData: TaxiListItem[] = useMemo(() => {
    let filtered = displayedPosts as TaxiListItem[];

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
        item.passengerGenderType === (filterOptions.selectedGender === 'SAME_GENDER' ? 'SAME_GENDER' : 'DONT_CARE')
      );
    }

    if (filterOptions.passengerNumber > 0) {
      filtered = filtered.filter(item =>
        item.totalGroupPersonCount === filterOptions.passengerNumber
      );
    }

    return filtered;
  }, [displayedPosts, filterOptions]);


  return (
    <View style={styles.main}>
      <Header

        leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack} />}
        title={<BasicText text="택시비 N빵" style={styles.headerText} />}
      />
      <View style={styles.galdaeList}>
        {isSearchMode ? (
          <SVGTextButton
            iconName="Cancel"
            iconPosition="right"
            style={styles.search}
            buttonStyle={styles.searchBtn}
            textStyle={styles.searchText}
            SVGStyle={styles.searchSVG}
            enabledColors={{
              backgroundColor: theme.colors.white,
              textColor: theme.colors.grayV2,
            }}
            onPress={handleCancelSearch}
          >
            <View style={styles.searchContent}>
              <SVG name="location_line_gray2" />
              <BasicText text={departureSmallName} color={theme.colors.blackV2} style={styles.searchPos} />
              <SVG name="arrow_right_line_gray2" />
              <BasicText text={destinationSmallName} color={theme.colors.blackV2} style={styles.searchPos} />
            </View>
          </SVGTextButton>
        ) : (
          <SVGTextButton
            text={'오늘은 누구와 절약 해볼까요?'}
            iconName="Search"
            iconPosition="right"
            style={styles.search}
            buttonStyle={styles.searchBtn}
            textStyle={styles.searchText}
            SVGStyle={styles.searchSVG}
            enabledColors={{
              backgroundColor: theme.colors.white,
              textColor: theme.colors.grayV2,
            }}
            onPress={() => navigation.navigate('SetDestination')}
          />
        )}

        <View style={styles.btns}>
          <View style={styles.filters}>
            {/* <FilterButton onPress={handleFilterPress} /> */}
            <SelectTextButton text="시간협의가능" selected={filterOptions.selectedTimeDiscuss !== null} unselectedColors={{
              backgroundColor: theme.colors.white,
              textColor: theme.colors.blackV3,
              borderColor: theme.colors.blackV3,
            }}
              selectedColors={{
                backgroundColor: theme.colors.Galdae,
                textColor: theme.colors.white,
                borderColor: theme.colors.Galdae,
              }}
              onPress={handlePressTimeFilterBtn} />

            <SelectTextButton text="성별무관" selected={filterOptions.selectedGender !== null} unselectedColors={{
              backgroundColor: theme.colors.white,
              textColor: theme.colors.blackV3,
              borderColor: theme.colors.blackV3,
            }}
              selectedColors={{
                backgroundColor: theme.colors.Galdae,
                textColor: theme.colors.white,
                borderColor: theme.colors.Galdae,
              }}
              onPress={handlePressGenderFilterBtn} />
            {/* <GrayBorderTextButton text="동성만" onPress={handlePressSameGenderFilterBtn} /> */}
          </View>
          <View style={styles.arrayBtn}>
            <SVGTextButton
              onPress={toggleArrayPopup}
              text={sortOrder === 'latest' ? '최신순' : '시간 임박순'}
              iconName="transfer_2_line"
              iconPosition="right"
              textStyle={styles.arrayBtnText}
              enabledColors={{
                backgroundColor: theme.colors.white,
                textColor: theme.colors.blackV2,
              }}
            />
            {
              arrayPopupVisible && (
                <View style={styles.arrayPanel}>
                  <BasicText text="최신순" onPress={() => setSortOrder('latest')} style={sortOrder === 'latest' ? styles.arrayPanelClickText : styles.arrayPanelText} />
                  <BasicText text="마감 임박순" onPress={() => setSortOrder('departure_time')} style={sortOrder === 'latest' ? styles.arrayPanelText : styles.arrayPanelClickText} />
                </View>
              )
            }
          </View>
        </View>

        {reduxLoading || isLoadingMore ? (
          <View style={styles.noData}>
            <ActivityIndicator size="large" color={theme.colors.Galdae} />
          </View>
        ) : finalFilteredData.length === 0 ? (
          <View style={styles.noData}>
            <SVG name="information_line" />
            <BasicText text="해당 경로의 택시 N빵이 없습니다" color={theme.colors.grayV1} />
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
            keyExtractor={(item) => item.taxiId}
           // onEndReached={loadMoreData}
            //initialNumToRender={10}
            //removeClippedSubviews={true} // 렌더링 최적화
            onEndReachedThreshold={0.5} // 화면의 50% 정도 남았을 때 다음 페이지를 불러옴
            renderItem={({ item }) => (
              <TaxiItem
                item={item}
                onPress={item.sameGenderYN ? () => navigation.navigate('NowGaldaeDetail', { taxiId: item.taxiId }) : () => setSameGenderPopupVisible(true)}
                //onLongPress={() => handleLongPress(item)}
              />
            )}
          />
        )}
      </View>
      <FloatingButton onPress={() => navigation.navigate('CreateGaldae')} />
      {/* <ArrayPopup
        ref={arrayPopupRef}
        onConfirm={(selectedSortOrder: 'latest' | 'departureTime') => {
          setSortOrder(selectedSortOrder);
        }}
      /> */}
      {/* <FilterPopup
        ref={filterRef}
        onConfirm={handleFilterPopupConfirm}
        handleFilterReset={handleFilterReset}
      /> */}
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

export default TaxiNDivide;
