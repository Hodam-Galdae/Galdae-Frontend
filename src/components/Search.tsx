
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Alert, View, ScrollView, TouchableOpacity, FlatList, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import styles from '../styles/Search.style';
import BasicText from '../components/BasicText';
import SVGButton from '../components/button/SVGButton';
import Header from '../components/Header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../styles/theme';
import InputText from '../components/BasicInput';
import { fetchSearchKeywords, fetchSearch } from '../api/searchApi';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/redux/RootReducer';
import SVG from '../components/SVG';
import NowGaldaeSameGender from '../components/popup/NowGaldaeSameGender';
// 내비게이션 스택 타입 정의
type RootStackParamList = {
    Search: {
        searchKeywordEnter: string | null,
    };
    TaxiNDivide: undefined;
    DeliveryNDivide: undefined;
    OTTNDivide: undefined;
    OTTDetail: { subscribeId: string };
    NowGaldaeDetail: { taxiId: string };
    DeliveryDetail: { orderId: string };
};
// 저장할 때 사용할 key 정의
const STORAGE_KEY = 'SEARCH_HISTORY_ALL';
type CategoryFlags = { TAXI: boolean; ORDER: boolean; SUBSCRIBE: boolean };
// 검색 기록 저장 함수
const saveSearchHistory = async (history: any[]) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
        //console.error('검색 기록 저장 실패:', error);
    }
};

// 검색 기록 불러오기 함수
const loadSearchHistory = async (): Promise<any[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (error) {
        //console.error('검색 기록 불러오기 실패:', error);
        return [];
    }
};

/**
 * 홈화면 검색 기능
 * @returns
 */
const Search: React.FC = () => {
    const userGenderType = useSelector((state: RootState) => state.myInfoSlice.userInfo?.gender);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const goBack = () => navigation.goBack();
    const [loading, setLoading] = useState<boolean>(false);
    const route = useRoute<RouteProp<RootStackParamList, 'Search'>>();
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [searchHistory, setSearchHistory] = useState<any[]>([]);
    const [searchRecommend, setSearchRecommend] = useState<any[]>([]); // 추천 경로
    const [searchResult, setSearchResult] = useState<any[]>([]); // 검색 결과
    const [searchTitle, setSearchTitle] = useState<string>('추천 경로');
    const { searchKeywordEnter } = route.params || { searchKeywordEnter: false };
    const [sameGenderPopupVisible, setSameGenderPopupVisible] = useState(false);
    // 검색 키워드 하이라이트 함수
    const highlightSearchKeyword = (text: string, keyword: string) => {
        if (!keyword || !text) {
            return text;
        }

        const regex = new RegExp(`(${keyword})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) => {
            if (part.toLowerCase() === keyword.toLowerCase()) {
                return (
                    <Text key={index} style={{ color: theme.colors.blue }}>
                        {part}
                    </Text>
                );
            }
            return part;
        });
    };
    const searchKeywords = [
        {
            id: 1,
            keywords: '정문',
        },
        {
            id: 2,
            keywords: '치킨',
        },
        {
            id: 3,
            keywords: '피자',
        },
        {
            id: 4,
            keywords: '떡볶이',
        },
        {
            id: 5,
            keywords: '넷플릭스',
        },
    ];
    // 컴포넌트 마운트 시 저장된 검색 기록 불러오기
    useEffect(() => {
        (async () => {
            const history = await loadSearchHistory();
            setSearchHistory(history);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const data = await fetchSearchKeywords();
            setSearchRecommend(data);
        })();
    }, []);


    //검색어가 존재 / 변경 하면 실행됨
    useEffect(() => {
        (async () => {
            const data = await fetchSearch(searchKeyword);
            setSearchResult(data);
        })();
    }, [searchKeyword]);

    // 소문자 비교 + 모든 카테고리를 모아서 true/false 계산
    const categoryFlags: CategoryFlags = React.useMemo(() => {
        if (!searchKeyword || searchRecommend.length === 0) {
            return { TAXI: false, ORDER: false, SUBSCRIBE: false };
        }
        const kw = searchKeyword.toLowerCase().trim();
        return searchRecommend.reduce<CategoryFlags>((acc, item) => {
            const cat = String(item.searchCategory || '').toUpperCase() as keyof CategoryFlags;
            const has = String(item.keywords || '').toLowerCase().includes(kw);
            if (has && (cat === 'TAXI' || cat === 'ORDER' || cat === 'SUBSCRIBE')) {
                acc[cat] = true;
            }
            return acc;
        }, { TAXI: false, ORDER: false, SUBSCRIBE: false });
    }, [searchKeyword, searchRecommend]);

    const isKeywordExist = categoryFlags.TAXI || categoryFlags.ORDER || categoryFlags.SUBSCRIBE;

    // 새로운 검색 기록 추가 함수 예시
    const addSearchHistoryItem = async (newItem: any) => {
        const updatedHistory = [newItem, ...searchHistory];
        setSearchHistory(updatedHistory);
        await saveSearchHistory(updatedHistory);
    };

    const handleSearchGaldae = async () => {
        setLoading(true);
        try {
            const keyword = (searchKeyword ?? '').trim();
            if (!keyword) {
                Alert.alert('검색어를 입력해주세요!');
                return;
            }
            navigation.navigate('Search', { searchKeywordEnter: keyword });



            // 검색 기록 저장
            const newSearchRecord = {
                id: Date.now(),
                timestamp: Date.now(),
                searchKeyword: { label: '검색어', main: keyword },
            };
            await addSearchHistoryItem(newSearchRecord);
        } finally {
            setLoading(false);
        }
    };
    const formatDepartureTime = (departureTime: string): string => {
        return moment.utc(departureTime).format('YYYY년 MM월 DD일 (ddd) HH : mm');
    };

    return (

        <View style={styles.mainContainer}>

            {
                searchKeywordEnter ? (
                    <>
                        <Header
                            style={styles.header}
                            leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack} />}
                            /** ✅ 여기만 fullWidthTitle */
                            fullWidthTitle
                            title={
                                <View style={styles.searchContainer}>
                                    <InputText
                                        text={searchKeywordEnter}
                                        value={searchKeyword}
                                        onChangeText={setSearchKeyword}
                                        style={styles.searchInput}
                                    />
                                    <SVGButton
                                        iconName="Cancel"
                                        onPress={() => { navigation.navigate('Search', { searchKeywordEnter: null }); setSearchKeyword(''); }}
                                        buttonStyle={styles.cancelBtn}
                                        SVGStyle={styles.searchIcon}
                                    />
                                </View>
                            }
                        />
                        {/** 검색 결과가 있을 경우  */}
                        {
                            searchResult.length > 0 && (
                                <View style={styles.container}>

                                    <BasicText style={styles.title2} text={'N빵 그룹'} />

                                    <View style={styles.searchKeywordList}>
                                        {searchResult.map((item) => (
                                            item.groupType === 'TAXI' ? (
                                                <TouchableOpacity style={styles.listBox} key={item.taxiSearchResponse?.taxiId} onPress={() => { item.sameGenderYN ? setSameGenderPopupVisible(true) : navigation.navigate('NowGaldaeDetail', { taxiId: item.taxiSearchResponse?.taxiId }); }}>
                                                    <SVG name="Taxi" />
                                                    <View>
                                                        <View style={styles.fromToContainer}>
                                                            {/* 출발지 정보 */}
                                                            <View style={styles.fromContainer}>
                                                                {/* <SVG name={!item.isSameGender && item.passengerGenderType === 'SAME_GENDER' ? 'Car1' : 'Car'} /> */}
                                                                <Text style={item.sameGenderYN  ? styles.fromMainLocationCom : styles.fromMainLocation}>
                                                                    {highlightSearchKeyword(item.taxiSearchResponse?.subDepartureName, searchKeywordEnter || '')}
                                                                </Text>            </View>
                                                            {/** */}
                                                            <SVG name={item.sameGenderYN ? 'arrow_forward' : 'arrow_forward'} />
                                                            {/* 도착지 정보 */}
                                                            <View style={styles.toContainer}>
                                                                {/* <SVG name={!item.isSameGender && item.passengerGenderType === 'SAME_GENDER' ? 'Location1' : 'Location'} /> */}
                                                                <Text style={item.sameGenderYN ? styles.fromMainLocationCom : styles.fromMainLocation}>
                                                                    {highlightSearchKeyword(item.taxiSearchResponse?.subArrivalName, searchKeywordEnter || '')}
                                                                </Text>

                                                            </View>
                                                            {/** */}
                                                        </View>

                                                        <View style={styles.departureTimeContainer}>
                                                            <BasicText text="출발 시간" style={item.sameGenderYN ? styles.departureTimeTitleCom : styles.departureTimeTitle} />
                                                            <BasicText
                                                                text={formatDepartureTime(item.taxiSearchResponse?.departureTime)}
                                                                style={item.sameGenderYN ? styles.departureTimeCom : styles.departureTime}

                                                            />
                                                        </View>

                                                    </View>


                                                </TouchableOpacity>
                                            ) : item.groupType === 'ORDER' ? (
                                                <TouchableOpacity style={styles.listBox} key={item.orderSearchResponse?.orderId} onPress={() => { navigation.navigate('DeliveryDetail', { orderId: item.orderSearchResponse?.orderId }); }}>
                                                    <SVG name="Delivery" />
                                                    <View>
                                                        <View style={styles.fromToContainer}>
                                                            {/* 출발지 정보 */}
                                                            <View style={styles.fromContainer}>
                                                                {/* <SVG name={!item.isSameGender && item.passengerGenderType === 'SAME_GENDER' ? 'Car1' : 'Car'} /> */}
                                                                <Text style={item.passengerGenderType === 'SAME_GENDER' && userGenderType === item.passengerGenderType ? styles.fromMainLocationCom : styles.fromMainLocation}>
                                                                    {highlightSearchKeyword(item.orderSearchResponse?.restaurantName, searchKeywordEnter || '')}
                                                                </Text>            </View>
                                                            {/** */}
                                                            <SVG name={item.passengerGenderType === 'SAME_GENDER' && userGenderType === item.passengerGenderType ? 'arrow_forward' : 'arrow_forward'} />
                                                            {/* 도착지 정보 */}
                                                            <View style={styles.toContainer}>
                                                                {/* <SVG name={!item.isSameGender && item.passengerGenderType === 'SAME_GENDER' ? 'Location1' : 'Location'} /> */}
                                                                <Text style={item.passengerGenderType === 'SAME_GENDER' && userGenderType === item.passengerGenderType ? styles.fromMainLocationCom : styles.fromMainLocation}>
                                                                    {highlightSearchKeyword(item.orderSearchResponse?.orderLocation, searchKeywordEnter || '')}
                                                                </Text>

                                                            </View>
                                                            {/** */}
                                                        </View>

                                                        <View style={styles.departureTimeContainer}>
                                                            <BasicText text="출발 시간" style={item.passengerGenderType === 'SAME_GENDER' && userGenderType === item.passengerGenderType ? styles.departureTimeTitleCom : styles.departureTimeTitle} />
                                                            <BasicText
                                                                text={formatDepartureTime(item.orderSearchResponse?.orderAt)}
                                                                style={item.passengerGenderType === 'SAME_GENDER' && userGenderType === item.passengerGenderType ? styles.departureTimeCom : styles.departureTime}

                                                            />
                                                        </View>
                                                    </View>



                                                </TouchableOpacity>
                                            ) : item.groupType === 'SUBSCRIBE' ? (
                                                <TouchableOpacity key={item.subcribeSearchResponse.subscribeId} style={styles.listBox} onPress={() => { navigation.navigate('OTTDetail', { subscribeId: item.subcribeSearchResponse.subscribeId }); }}>
                                                    <SVG name="Ott" />
                                                    <View style={styles.listBoxContent}>
                                                        <View style={styles.fromToContainer}>
                                                            {/* 출발지 정보 */}
                                                            <View style={styles.fromContainer}>
                                                                {/* <SVG name={!item.isSameGender && item.passengerGenderType === 'SAME_GENDER' ? 'Car1' : 'Car'} /> */}
                                                                <Text style={styles.fromMainLocation}>
                                                                    {highlightSearchKeyword(item.subcribeSearchResponse.subscribeServiceName, searchKeywordEnter || '')}
                                                                </Text>
                                                            </View>
                                                            {/** */}
                                                        </View>

                                                        <View style={styles.departureTimeContainer}>
                                                            <BasicText text="1인 가격" style={styles.departureTimeTitle} />
                                                            <BasicText
                                                                text={item.subcribeSearchResponse.onePersonFee + '원'}
                                                                style={styles.departureTime}

                                                            />
                                                        </View>
                                                    </View>



                                                </TouchableOpacity>
                                            ) : null
                                        ))}
                                    </View>

                                    {
                                        isKeywordExist && (
                                            <View>
                                                <BasicText style={styles.title} text="추천 경로" />
                                                {categoryFlags.TAXI && (
                                                    <TouchableOpacity style={styles.goToRouteContainer} onPress={() => { navigation.navigate('TaxiNDivide'); }}>
                                                        <BasicText style={styles.goToRoute} text="홈 > 택시비 N빵 바로가기" />
                                                        <SVGButton iconName="ArrowRightLine" />
                                                    </TouchableOpacity>
                                                )}
                                                {categoryFlags.ORDER && (
                                                    <TouchableOpacity style={styles.goToRouteContainer} onPress={() => { navigation.navigate('DeliveryNDivide'); }}>
                                                        <BasicText style={styles.goToRoute} text="홈 > 배달비 N빵 바로가기" />
                                                        <SVGButton iconName="ArrowRightLine" />
                                                    </TouchableOpacity>
                                                )}
                                                {categoryFlags.SUBSCRIBE && (
                                                    <TouchableOpacity style={styles.goToRouteContainer} onPress={() => { navigation.navigate('OTTNDivide'); }}>
                                                        <BasicText style={styles.goToRoute} text="홈 > 구독료 N빵 바로가기" />
                                                        <SVGButton iconName="ArrowRightLine" />
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                        )
                                    }

                                </View>
                            )
                        }
                        {/** 검색 결과가 없고, 키워드가 있을 경우  */}
                        {searchResult.length === 0 && isKeywordExist && (
                            <View style={styles.container}>
                                <BasicText style={styles.title2} text="추천 경로" />
                                {categoryFlags.TAXI && (
                                    <TouchableOpacity style={styles.goToRouteContainer} onPress={() => { navigation.navigate('TaxiNDivide'); }}>
                                        <BasicText style={styles.goToRoute} text="홈 > 택시비 N빵 바로가기" />
                                        <SVGButton iconName="ArrowRightLine" />
                                    </TouchableOpacity>
                                )}
                                {categoryFlags.ORDER && (
                                    <TouchableOpacity style={styles.goToRouteContainer} onPress={() => { navigation.navigate('DeliveryNDivide'); }}>
                                        <BasicText style={styles.goToRoute} text="홈 > 배달비 N빵 바로가기" />
                                        <SVGButton iconName="ArrowRightLine" />
                                    </TouchableOpacity>
                                )}
                                {categoryFlags.SUBSCRIBE && (
                                    <TouchableOpacity style={styles.goToRouteContainer} onPress={() => { navigation.navigate('OTTNDivide'); }}>
                                        <BasicText style={styles.goToRoute} text="홈 > 구독료 N빵 바로가기" />
                                        <SVGButton iconName="ArrowRightLine" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                        {/** 검색 결과도 없고, 키워드도 없을 경우  */}
                        {
                            searchResult.length === 0 && !isKeywordExist && (
                                <View style={styles.container}>
                                    <BasicText style={styles.title2} text={'N빵 그룹'} />

                                    <View style={styles.emptyContainer}>
                                        <BasicText style={styles.title} text="해당 검색어가 존재하지 않습니다." />

                                    </View>

                                    <View>
                                        <BasicText style={styles.title2} text="추천 경로" />
                                        <TouchableOpacity style={styles.goToRouteContainer} onPress={() => { navigation.navigate('TaxiNDivide'); }}>
                                            <BasicText style={styles.goToRoute} text="홈 > 택시비 N빵 바로가기" />
                                            <SVGButton iconName="ArrowRightLine" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.goToRouteContainer} onPress={() => { navigation.navigate('DeliveryNDivide'); }}>
                                            <BasicText style={styles.goToRoute} text="홈 > 배달비 N빵 바로가기" />
                                            <SVGButton iconName="ArrowRightLine" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.goToRouteContainer} onPress={() => { navigation.navigate('OTTNDivide'); }}>
                                            <BasicText style={styles.goToRoute} text="홈 > 구독료 N빵 바로가기" />
                                            <SVGButton iconName="ArrowRightLine" />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            )
                        }
                    </>
                ) : (
                    <>
                        <Header
                            style={styles.header}
                            leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack} />}
                            /** ✅ 여기만 fullWidthTitle */
                            fullWidthTitle
                            title={
                                <View style={styles.searchContainer}>
                                    <InputText
                                        text="검색어를 입력해 주세요."
                                        value={searchKeyword}
                                        onChangeText={setSearchKeyword}
                                        style={styles.searchInput}
                                    />
                                    <SVGButton
                                        iconName="Search"
                                        onPress={handleSearchGaldae}
                                        buttonStyle={styles.searchIconBtn}
                                        SVGStyle={styles.searchIcon}
                                    />
                                </View>
                            }
                        />

                        <View style={styles.container}>

                            <BasicText style={styles.title} text="추천 검색어" />

                            <View style={styles.searchKeywordList}>
                                {searchKeywords.map((item) => (
                                    <View key={item.id} style={styles.searchKeyword}>
                                        <BasicText text={item.keywords} style={styles.searchKeywordText} onPress={() => { setSearchKeyword(item.keywords); }} />
                                    </View>
                                ))}
                            </View>

                            <BasicText style={styles.title} text="검색 기록" />

                            <ScrollView style={styles.searchList} contentContainerStyle={styles.searchListContainer} >
                                <View style={styles.searchListContainer}>
                                    {searchHistory.map((item) => (
                                        <View key={item.id} style={styles.searchKeyword}>
                                            <BasicText text={item.searchKeyword.main} style={styles.searchKeywordText} onPress={() => { setSearchKeyword(item.searchKeyword.main); }} />
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    </>
                )
            }

            <NowGaldaeSameGender
                visible={sameGenderPopupVisible}
                onConfirm={() => { setSameGenderPopupVisible(false); }}
            />

        </View>
    );
};

export default Search;
