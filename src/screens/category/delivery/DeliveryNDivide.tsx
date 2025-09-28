/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl, Alert } from 'react-native';
//import moment from 'moment';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import styles from '../../../styles/NowGaldae.style';
import Header from '../../../components/Header';
import SVGButton from '../../../components/button/SVGButton';
import BasicText from '../../../components/BasicText';
import SVGTextButton from '../../../components/button/SVGTextButton';
import SVG from '../../../components/SVG';
import DeliveryItem from './DeliveryItem';
import NowGaldaeSameGender from '../../../components/popup/NowGaldaeSameGender';
import { theme } from '../../../styles/theme';
import FloatingButton from '../../../components/button/FloatingButton';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FastGaldaeTimePopupRef } from '../../../components/popup/ArrayPopup'; //ArrayPopup,
import ArrayPopup from '../../../components/popup/ArrayPopup';

// type
import { OrderListItem, OrderProperty } from '../../../types/orderTypes';
// redux
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../modules/redux/store';
import { RootState } from '../../../modules/redux/RootReducer';
import SelectTextButton from '../../../components/button/SelectTextButton';
import { fetchOrders, fetchOrdersBySearchKeyword } from '../../../modules/redux/slice/orderSlice';


type HomeProps = {
    navigation: any;
};

type RootStackParamList = {
    DeliveryNDivide: { searchKeyword: string };
    DeliveryDetail: { orderId: string };
    DeliverySearch: undefined;
    CreateDelivery: undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const DeliveryNDivide: React.FC<HomeProps> = () => {
    const reduxPosts = useSelector((state: RootState) => state.orderSlice.list);
    const reduxSearchPosts = useSelector((state: RootState) => state.orderSlice.searchList);
    const reduxLoading = useSelector((state: RootState) => state.orderSlice.searchLoading);
    const dispatch = useAppDispatch();
    const [refreshing, setRefreshing] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    // 상태값 추가: hasMore (불러올 데이터가 있는지 여부)
    const [isLast, setIsLast] = useState(false);
    const [filterOptions, setFilterOptions] = useState<{
        formattedDepartureTime: string,
        selectedGender: 'SAME_GENDER' | 'DONT_CARE' | null; // null: 필터 미적용, 0: 성별 무관 필터 적용 (즉, 'DONT_CARE'만 필터링)
        selectedTimeDiscuss: number | null; // null: 필터 미적용, 0: 시간협의가능, 1: 시간협의불가 (여기서는 0 사용)
        passengerNumber: number;
    }>({
        formattedDepartureTime: '', // 빈 문자열로 초기화하여 필터 조건 미적용
        selectedGender: 'DONT_CARE',
        selectedTimeDiscuss: null,
        passengerNumber: 0,
    });
    // FlatList의 스크롤 위치를 관리하기 위한 ref와 state 추가
    const flatListRef = useRef<FlatList>(null);
    const [scrollOffset, setScrollOffset] = useState(0);
    // 팝업 ref
    const arrayPopupRef = useRef<FastGaldaeTimePopupRef>(null);
    // 정렬 상태: 'latest' (최신순, 내림차순) 또는 'soon' (시간 임박순, 오름차순)
    const [sortOrder, setSortOrder] = useState<OrderProperty>('createAt');
    const [arrayPopupVisible, setArrayPopupVisible] = useState(false);
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () => navigation.goBack();
    //삭제팝업
    const [sameGenderPopupVisible, setSameGenderPopupVisible] = useState(false);
    const route = useRoute<RouteProp<RootStackParamList, 'DeliveryNDivide'>>();
    const { searchKeyword } = route.params || {};

    useEffect(() => {
        dispatch(fetchOrders());

    }, []);

    useEffect(() => {
        dispatch(fetchOrdersBySearchKeyword({ searchKeyword }));
    }, [searchKeyword]);

    const handlePressTimeFilterBtn = () => {
        setFilterOptions(prev => ({
            ...prev,
            // 현재 필터가 미적용(null)이라면 0 (시간협의가능)을 적용, 이미 적용중이면 해제(null)
            selectedTimeDiscuss: prev.selectedTimeDiscuss === null ? 0 : null,
        }));
    };

    const toggleArrayPopup = () => {
        // arrayPopupRef.current?.open();
        setArrayPopupVisible(!arrayPopupVisible);

    };

    /**
     * 전부 초기화하는 로직
     */
    const handleCancelSearch = () => {
        // 네비게이션 파라미터 초기화
        navigation.setParams({
            searchKeyword: '',
        });

        //정렬도 최신순으로 초기화
        setSortOrder('createAt');
        dispatch(fetchOrdersBySearchKeyword({ searchKeyword: '' }));
    };
    const onRefresh = async () => {
        setRefreshing(true);
        // 필터 초기화 및 전체 데이터 리셋
        handleCancelSearch();
        // 필요한 경우 추가 데이터 호출 로직을 넣어줍니다.
        setRefreshing(false);
    };

    // 표시할 데이터: searchResults가 있으면 searchResults.content, 없으면 reduxPosts 사용
    const displayedPosts: OrderListItem[] = searchKeyword ? reduxSearchPosts : reduxPosts; // searchKeyword가 있으면 reduxSearchPosts, 없으면 reduxPosts 사용
    console.log(displayedPosts);
    const finalFilteredData = useMemo(() => {
        let filtered = displayedPosts;

        if (filterOptions.selectedTimeDiscuss !== null) {
            filtered = filtered.filter(item =>
                item.isTimeNegotiable === (filterOptions.selectedTimeDiscuss === 0 ? true : false)

            );

        }


        return filtered;
    }, [displayedPosts, filterOptions.selectedTimeDiscuss]);


    const loadMoreData = async () => {
        if (isLoadingMore) { return; }
        if (isLast) { return; }
        setIsLoadingMore(true);

        setIsLoadingMore(false);
    };


    return (
        <View style={styles.main}>
            <Header

                leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack} />}
                title={<BasicText text="배달 N빵" style={styles.headerText} />}
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
                        onPress={() => navigation.navigate('DeliverySearch')}
                    />
                )}

                <View style={styles.btns}>
                    <View style={styles.filters}>
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

                    </View>
                    <View style={styles.arrayBtn}>
                        <SVGTextButton
                            onPress={toggleArrayPopup}
                            text={sortOrder === 'createAt' ? '최신순' : '시간 임박순'}
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
                                    <BasicText text="최신순" onPress={() => {
                                        setSortOrder('createAt');
                                        dispatch(fetchOrdersBySearchKeyword({ searchKeyword, pageNumber: 0, pageSize: 20, property: 'createAt' }));
                                        dispatch(fetchOrders({ pageNumber: 0, pageSize: 20, property: 'createAt' }));
                                    }
                                    } style={sortOrder === 'createAt' ? styles.arrayPanelClickText : styles.arrayPanelText} />
                                    <BasicText text="마감 임박순" onPress={() => {
                                        setSortOrder('orderAt');
                                        dispatch(fetchOrdersBySearchKeyword({ searchKeyword, pageNumber: 0, pageSize: 20, property: 'orderAt' }));
                                        dispatch(fetchOrders({ pageNumber: 0, pageSize: 20, property: 'orderAt' }));
                                    }} style={sortOrder === 'createAt' ? styles.arrayPanelText : styles.arrayPanelClickText} />
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
                        <BasicText text="배달 N빵이 없습니다." color={theme.colors.grayV1} />
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
                        keyExtractor={(item) => item.id}
                        //onEndReached={loadMoreData}
                        //initialNumToRender={10}
                        //removeClippedSubviews={true} // 렌더링 최적화
                        onEndReachedThreshold={0.5} // 화면의 50% 정도 남았을 때 다음 페이지를 불러옴
                        renderItem={({ item }) => (
                            <DeliveryItem
                                item={item}
                                onPress={() => navigation.navigate('DeliveryDetail', { orderId: item.id })}
                                searchKeyword={searchKeyword}
                            />
                        )}
                    />
                )}
            </View>
            <FloatingButton onPress={() => navigation.navigate('CreateDelivery')} />
            <ArrayPopup
                ref={arrayPopupRef}
                onConfirm={(selectedSortOrder) => {
                    if (selectedSortOrder === 'latest') {
                        dispatch(fetchOrdersBySearchKeyword({ searchKeyword, pageNumber: 0, pageSize: 20, property: 'createAt' }));
                        dispatch(fetchOrders({ pageNumber: 0, pageSize: 20, property: 'createAt' }));
                        setSortOrder('createAt');
                    } else {
                        dispatch(fetchOrdersBySearchKeyword({ searchKeyword, pageNumber: 0, pageSize: 20, property: 'orderAt' }));
                        dispatch(fetchOrders({ pageNumber: 0, pageSize: 20, property: 'orderAt' }));
                        setSortOrder('orderAt');
                    }
                }}
            />

            <NowGaldaeSameGender
                visible={sameGenderPopupVisible}
                onConfirm={() => { setSameGenderPopupVisible(false); }}
            />
        </View>
    );
};

export default DeliveryNDivide;
