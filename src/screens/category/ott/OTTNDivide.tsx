/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import moment from 'moment';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import styles from '../../../styles/OTTNDivide.style';
import Header from '../../../components/Header';
import SVGButton from '../../../components/button/SVGButton';
import BasicText from '../../../components/BasicText';
// import FilterButton from '../../../components/button/FilterButton';
import SVGTextButton from '../../../components/button/SVGTextButton';
import SVG from '../../../components/SVG';
import OTTItem from './OTTItem';
import DeletePopup from '../../../components/popup/DeletePopup'; // DeletePopup import
import NowGaldaeSameGender from '../../../components/popup/NowGaldaeSameGender';
import { theme } from '../../../styles/theme';
import FloatingButton from '../../../components/button/FloatingButton';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FastGaldaeTimePopupRef } from '../../../components/popup/ArrayPopup'; //ArrayPopup,

import { SubscribeListItem } from '../../../types/subScribeTypes';
// redux
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../modules/redux/store';
import { RootState } from '../../../modules/redux/RootReducer';
import SelectTextButton from '../../../components/button/SelectTextButton';
import { fetchSubscribeList, fetchSubscribeTypeService, fetchSubscribeSearch } from '../../../modules/redux/slice/subScribeSlice';


type HomeProps = {
    navigation: any;
};

type RootStackParamList = {
    CreateGaldae: undefined;
    OTTNDivide: {
        searchKeyword: string,
    };
    OTTSearch: undefined;
    OTTDetail: { subscribeId: string };
    CreateOTT: undefined;
};

type OTTNDivideScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const OTTNDivide: React.FC<HomeProps> = () => {
    const reduxPosts = useSelector((state: RootState) => state.subscribeSlice.listPage);
    const reduxLoading = useSelector((state: RootState) => state.subscribeSlice.listLoading);
    const reduxSearchResults = useSelector((state: RootState) => state.subscribeSlice.searchPage);
    const dispatch = useAppDispatch();
    const [refreshing, setRefreshing] = useState(false);
    // 출/도착지 검색 결과를 저장할 로컬 상태 (검색이 없으면 null)

    const [pageNumber, setPageNumber] = useState(0);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    // 상태값 추가: hasMore (불러올 데이터가 있는지 여부)
    const [isLast, setIsLast] = useState(false);
    const [filterOptions, setFilterOptions] = useState<{

        selectedCategory: string | null; // 카테고리 선택 상태 추가
    }>({

        selectedCategory: null, // 카테고리 초기값
    });

    // 카테고리 옵션 배열 정의
    const categoryOptions = useSelector((state: RootState) => state.subscribeSlice.typeService);

    // 카테고리 선택 핸들러
    const handleCategoryPress = (categoryId: string) => {
        setFilterOptions(prev => ({
            ...prev,
            selectedCategory: prev.selectedCategory === categoryId ? null : categoryId,
        }));
    };
    // FlatList의 스크롤 위치를 관리하기 위한 ref와 state 추가
    const flatListRef = useRef<FlatList>(null);
    const [scrollOffset, setScrollOffset] = useState(0);
    // 팝업 ref
    // const arrayPopupRef = useRef<FastGaldaeTimePopupRef>(null);
    const filterRef = useRef<FastGaldaeTimePopupRef>(null);
    // 정렬 상태: 'latest' (최신순, 내림차순) 또는 'soon' (시간 임박순, 오름차순)
    const [sortOrder, setSortOrder] = useState<'latest' | 'departureTime'>('latest');
    const [arrayPopupVisible, setArrayPopupVisible] = useState(false);
    const navigation = useNavigation<OTTNDivideScreenNavigationProp>();
    const goBack = () => navigation.goBack();
    const route = useRoute<RouteProp<RootStackParamList, 'OTTNDivide'>>();
    const [sameGenderPopupVisible, setSameGenderPopupVisible] = useState(false);

    // 전달받은 검색 조건
    const {
        searchKeyword,
    } = route.params || {};
    useEffect(() => {
        dispatch(fetchSubscribeList());
        dispatch(fetchSubscribeTypeService());
    }, []);
    //검색 조건이 있을 경우 API 호출하여 결과 저장
    useEffect(() => {
        const fetchSearchResults = async () => {
            setPageNumber(0);
            setIsLoadingMore(true);
            if (
                !searchKeyword
            ) {
                // 검색 조건이 없으면 searchResults를 초기화하고 로딩 상태 해제

                setIsLoadingMore(false);
                return;
            }
            const params = {
                pageNumber: 0,
                pageSize: 20,
                direction: sortOrder === 'latest' ? 'DESC' : 'ASC',
                properties: sortOrder === 'latest' ? ['create_at'] : ['departure_time'],
                searchKeyword: searchKeyword,
            };
            try {
               // const data: GaldaeApiResponse = await searchPosts(params);
                // setSearchResults(data);
                // setIsLast(data.last);
                const data = await dispatch(fetchSubscribeSearch(params));

            } catch (error) {
                //console.error('검색 실패:', error);
            }
            setIsLoadingMore(false);
        };
        fetchSearchResults();
    }, [
        sortOrder,
        searchKeyword,
    ]);

    // redux posts는 검색 조건이 없을 때 불러옴
    useEffect(() => {
        if (!searchKeyword) {
            setPageNumber(0);
            const params = {
                pageNumber: 0,
                pageSize: 20,
                direction: sortOrder === 'latest' ? 'DESC' : 'ASC',
                properties: sortOrder === 'latest' ? ['create_at'] : ['departure_time'],
            };
            dispatch(fetchSubscribeList(params));
            dispatch(fetchSubscribeSearch({
                pageNumber: 0,
                searchKeyword: searchKeyword!,
            }));
        }
    }, [dispatch, searchKeyword, sortOrder]);



    /**
     * 전부 초기화하는 로직
     */
    const handleCancelSearch = () => {
        // 네비게이션 파라미터 초기화
        navigation.setParams({
            searchKeyword: undefined,
        });
        // 검색 결과 초기화

        // 필터 옵션 초기값으로 재설정
        setFilterOptions({
            selectedCategory: null, // 카테고리 초기값
        });
        //정렬도 최신순으로 초기화
        setSortOrder('latest');
        const params = {
            pageNumber: 0,
            pageSize: 20,
            direction: sortOrder === 'latest' ? 'DESC' : 'ASC',
            properties: sortOrder === 'latest' ? ['create_at'] : ['departure_time'],
        };
        dispatch(fetchSubscribeList(params));
        dispatch(fetchSubscribeSearch({
            pageNumber: 0,
            searchKeyword: searchKeyword!,
        }));
    };
    const onRefresh = async () => {
        setRefreshing(true);
        // 필터 초기화 및 전체 데이터 리셋
        dispatch(fetchSubscribeSearch({
            pageNumber: 0,
            searchKeyword: searchKeyword!,
        }));
        handleCancelSearch();
        // 필요한 경우 추가 데이터 호출 로직을 넣어줍니다.
        setRefreshing(false);
    };

    const filteredPosts = React.useMemo(() => {
        const all = searchKeyword ? reduxSearchResults?.content ?? [] : reduxPosts?.content ?? [];
        if (!filterOptions.selectedCategory) {return all;}
        // subscribeType 기준 필터링 (서버 아이템에 subscribeType 필드가 있다고 가정)
        return all?.filter(item => item.subscribeType === filterOptions.selectedCategory);
      }, [searchKeyword, reduxSearchResults?.content, reduxPosts?.content, filterOptions.selectedCategory]);


    const handleNavigateOTTDetail = (subscribeId: string) => {
        console.log('🚀 OTT 상세 정보 불러오기:', subscribeId);
        navigation.navigate('OTTDetail', { subscribeId: subscribeId });
    };

    return (
        <View style={styles.main}>
            <Header

                leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack} />}
                title={<BasicText text="구독료 N빵" style={styles.headerText} />}
            />
            <View style={styles.galdaeList}>
                {searchKeyword ? (
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
                            {/* <SVG name="location_line_gray2" /> */}
                            <BasicText text={searchKeyword} color={theme.colors.blackV3} style={styles.searchPos} />
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
                        onPress={() => navigation.navigate('OTTSearch')}
                    />
                )}

                <View style={styles.btns}>
                    <View style={styles.filters}>
                        {categoryOptions.map((option) => (
                            <SelectTextButton
                                key={option.subscribeType}
                                text={option.subscribeType}
                                selected={filterOptions.selectedCategory === option.subscribeType}
                                unselectedColors={{
                                    backgroundColor: theme.colors.white,
                                    textColor: theme.colors.blackV3,
                                    borderColor: theme.colors.blackV3,
                                }}
                                selectedColors={{
                                    backgroundColor: theme.colors.Galdae,
                                    textColor: theme.colors.white,
                                    borderColor: theme.colors.Galdae,
                                }}
                                onPress={() => handleCategoryPress(option.subscribeType)}
                            />
                        ))}
                    </View>
                </View>

                {reduxLoading || isLoadingMore ? (
                    <View style={styles.noData}>
                        <ActivityIndicator size="large" color={theme.colors.Galdae} />
                    </View>
                ) : filteredPosts?.length === 0 ? (
                    <View style={styles.noData}>
                        <SVG name="information_line" />
                        <BasicText text="OTT 목록이 존재하지 않습니다." color={theme.colors.grayV1} />
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
                        extraData={filteredPosts?.length}
                        data={filteredPosts}
                        keyExtractor={(item) => item.subscribeId}
                        //onEndReached={loadMoreData}
                        //initialNumToRender={10}
                        //removeClippedSubviews={true} // 렌더링 최적화
                        onEndReachedThreshold={0.5} // 화면의 50% 정도 남았을 때 다음 페이지를 불러옴
                        renderItem={({ item }) => (
                            <OTTItem
                                item={item}
                                onPress={() => handleNavigateOTTDetail(item.subscribeId)}
                                searchKeyword={searchKeyword}
                            />
                        )}
                    />
                )}
            </View>
            <FloatingButton onPress={() => navigation.navigate('CreateOTT')} />

            <NowGaldaeSameGender
                visible={sameGenderPopupVisible}
                onConfirm={() => { setSameGenderPopupVisible(false); }}
            />
        </View>
    );
};

export default OTTNDivide;
