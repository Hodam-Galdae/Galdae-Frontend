import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
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
import ArrayPopup, { FastGaldaeTimePopupRef } from '../components/popup/ArrayPopup';
import FilterPopup from '../components/popup/FilterPopup';


// api
//import { getPosts } from '../api/postApi'; // 실시간 갈대 조회 API

// type
import { GetPostsRequest } from '../types/postTypes';
import { GaldaeItemType } from '../types/getTypes';

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
    departureLarge?: string;
    departureSmall?: string;
    destinationLarge?: string;
    destinationSmall?: string;
  };
  NowGaldaeDetail: { item: GaldaeItemType };
  SetDestination: undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const NowGaldae: React.FC<HomeProps> = () => {
   const { posts, loading } = useSelector((state: RootState) => state.galdaeSlice);
   const dispatch = useAppDispatch();

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

  // 팝업 ref
  const arrayPopupRef = useRef<FastGaldaeTimePopupRef>(null);
  const filterRef = useRef<FastGaldaeTimePopupRef>(null);

  // dummy 데이터 (새 인터페이스에 맞게 수정)
  // const dummyGaldaeData: GaldaeItemType[] = [
  //   {
  //     postId: "post-1",
  //     departure: { majorPlace: "학교", subPlace: "정문" },
  //     arrival: { majorPlace: "강남역", subPlace: "출구 1번" },
  //     departureTime: "2025-03-20T01:00:53.984Z",
  //     passengerGenderType: "SAME",
  //     arrangeTime: "POSSIBLE",
  //     totalPassengerCount: 4,
  //     passengerCount: 2,
  //     createdAt: "2025-03-19T16:00:54.088457Z",
  //     userNickName: "하재연"
  //   },
  //   {
  //     postId: "post-2",
  //     departure: { majorPlace: "후문", subPlace: "대학" },
  //     arrival: { majorPlace: "스타벅스", subPlace: "시내" },
  //     departureTime: "2025-01-01T10:30:00.000Z",
  //     passengerGenderType: "DONT_CARE",
  //     arrangeTime: "IMPOSSIBLE",
  //     totalPassengerCount: 3,
  //     passengerCount: 1,
  //     createdAt: "2025-01-01T09:00:00.000Z",
  //     userNickName: "김철수"
  //   },
  //   // ... 추가 dummy 데이터
  // ];

  // 정렬 상태: 'latest' (최신순, 내림차순) 또는 'soon' (시간 임박순, 오름차순)
  const [sortOrder, setSortOrder] = useState<'latest' | 'soon'>('latest');

  const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
  const goBack = () => navigation.goBack();
  const route = useRoute<RouteProp<RootStackParamList, 'NowGaldae'>>();
  // 전달받은 검색 조건
  const { departureLarge, departureSmall, destinationLarge, destinationSmall } = route.params || {};

  useEffect(() => {
    const params: GetPostsRequest = {
      pageNumber: 0,
      pageSize: 10,
      direction: sortOrder === 'latest' ? 'DESC' : 'ASC',
      properties: ['departureTime'],
    };
    dispatch(fetchGaldaePosts(params));
  }, [dispatch, sortOrder]);

  const handleFilterPress = () => {
    filterRef.current?.open();
  };

  const handlePressTimeFilterBtn = () => {
    // 시간 필터 버튼 동작
  };

  const handlePressGenderFilterBtn = () => {
    // 성별 필터 버튼 동작
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

  // 출발지/도착지 조건에 따른 필터링
  const baseFilteredData =
    departureLarge && destinationLarge && departureSmall && destinationSmall
      ? posts.filter(
          (item) =>
            item.departure.majorPlace.includes(departureLarge) &&
            item.departure.subPlace.includes(departureSmall) &&
            item.arrival.majorPlace.includes(destinationLarge) &&
            item.arrival.subPlace.includes(destinationSmall)
        )
      : posts;

  // 추가 필터: 날짜/시간, 성별, 시간협의, 탑승인원 등
  let finalFilteredData = baseFilteredData;
  if (filterOptions.selectedDate) {
    let filterTimestamp =
      new Date(filterOptions.selectedDate).getTime() +
      (filterOptions.selectedHour * 3600 + filterOptions.selectedMinute * 60) * 1000;
    if (filterOptions.selectedAmPm === '오후' && filterOptions.selectedHour < 12) {
      filterTimestamp += 12 * 3600 * 1000;
    }
    finalFilteredData = finalFilteredData.filter(
      (item) => Math.abs(new Date(item.departureTime).getTime() - filterTimestamp) <= 3600000
    );
  }
  if (filterOptions.selectedGender !== 0) {
    if (filterOptions.selectedGender === 1) {
      finalFilteredData = finalFilteredData.filter((item) =>
        item.passengerGenderType === 'DONT_CARE' ? true : item.passengerGenderType === 'SAME'
      );
    } else if (filterOptions.selectedGender === 2) {
      finalFilteredData = finalFilteredData.filter((item) =>
        item.passengerGenderType === 'DONT_CARE' ? true : item.passengerGenderType === 'SAME'
      );
    }
  }
  finalFilteredData = finalFilteredData.filter(
    (item) => item.arrangeTime === (filterOptions.selectedTimeDiscuss === 0 ? 'POSSIBLE' : 'IMPOSSIBLE')
  );
  if (filterOptions.passengerNumber > 0) {
    finalFilteredData = finalFilteredData.filter(
      (item) => item.totalPassengerCount - item.passengerCount >= filterOptions.passengerNumber
    );
  }

  // 정렬: sortOrder 'latest'는 최신순(내림차순), 'soon'은 시간 임박순(오름차순)
  const sortedData = [...finalFilteredData].sort((a, b) => {
    const timeA = new Date(a.departureTime).getTime();
    const timeB = new Date(b.departureTime).getTime();
    return sortOrder === 'latest' ? timeB - timeA : timeA - timeB;
  });

  return (
    <View style={styles.main}>
      <Header
        leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack} />}
        title={<BasicText text="실시간 갈대" style={styles.headerText} />}
      />
      <View style={styles.galdaeList}>
        {departureLarge && destinationLarge && departureSmall && destinationSmall ? (
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
              <SVG name="location_line_gray2" />
              <BasicText text={departureSmall} color={theme.colors.gray2} style={styles.searchPos} />
              <SVG name="arrow_right_line_gray2" />
              <BasicText text={destinationSmall} color={theme.colors.gray2} style={styles.searchPos} />
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

        {loading ? (
          <View>
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
            keyExtractor={(item) => item.postId}
            renderItem={({ item }) => (
              <GaldaeItem
                key={item.postId}
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
      <FilterPopup
        ref={filterRef}
        onConfirm={handleFilterPopupConfirm}
        onClose={() => console.log('팝업 닫힘')}
      />
    </View>
  );
};

export default NowGaldae;