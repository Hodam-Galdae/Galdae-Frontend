/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Alert, View, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../styles/SetDestination.style';
import BasicText from '../../../components/BasicText';
import SVGButton from '../../../components/button/SVGButton';
import Header from '../../../components/Header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../../../styles/theme';
import InputText from '../../../components/BasicInput';
// 내비게이션 스택 타입 정의
type RootStackParamList = {
    OTTNDivide: {
        searchKeyword: string,
    };
};
// 저장할 때 사용할 key 정의
const STORAGE_KEY = 'SEARCH_HISTORY_OTT';
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
const OTTSearch: React.FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const goBack = () => navigation.goBack();
    const [loading, setLoading] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [searchHistory, setSearchHistory] = useState<any[]>([]);


    // 컴포넌트 마운트 시 저장된 검색 기록 불러오기
    useEffect(() => {
        (async () => {
            const history = await loadSearchHistory();
            // 중복 제거: 검색어 기준으로 최신 것만 유지
            const uniqueHistory = history.filter((item, index, self) =>
                index === self.findIndex((t) => t.searchKeyword.main === item.searchKeyword.main)
            );
            setSearchHistory(uniqueHistory);
            // 중복 제거된 데이터를 다시 저장
            if (uniqueHistory.length !== history.length) {
                await saveSearchHistory(uniqueHistory);
            }
        })();
    }, []);

    // 새로운 검색 기록 추가 함수 - 중복 제거
    const addSearchHistoryItem = async (newItem: any) => {
        // 동일한 검색어가 있으면 제거
        const filteredHistory = searchHistory.filter(
            item => item.searchKeyword.main !== newItem.searchKeyword.main
        );
        const updatedHistory = [newItem, ...filteredHistory];
        setSearchHistory(updatedHistory);
        await saveSearchHistory(updatedHistory);
    };

    const handleSearchGaldae = async () => {
        setLoading(true);
        if (searchKeyword === '') {
            Alert.alert('검색어를 입력해주세요!');
            return;
        }
        navigation.navigate('OTTNDivide', {
            searchKeyword,
        });
        // 새로운 검색 기록 객체 생성: timestamp를 저장합니다.
        const newSearchRecord = {
            id: Date.now(), // 고유 id로 사용
            timestamp: Date.now(), // 검색 시각 저장
            searchKeyword: {
                label: '검색어',
                main: searchKeyword,
            },
        };

        // 검색 기록 추가 및 AsyncStorage에 저장
        await addSearchHistoryItem(newSearchRecord);
        setLoading(false);
    };
    // 단순한 상대 시간 포맷 함수 예제
    const formatRelativeTime = (timestamp: number): string => {
        const now = Date.now();
        const diff = now - timestamp;
        const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        // 0일이면 '오늘', 1일이면 '1일전', 그 이상이면 'n일전'
        return diffDays === 0 ? '오늘' : `${diffDays}일전`;
    };

    return (

        <View style={styles.mainContainer}>
            <Header
                style={styles.header}
                leftButton={<SVGButton iconName="arrow_left_line2" onPress={goBack} />}
                title={<BasicText text="구독료 N빵 검색" style={styles.mainTitle} />}
            />

            <View style={styles.container}>

                <View style={styles.searchInputContainer}>
                    <InputText
                        text="검색어를 입력하세요."
                        textColor="#D2D6DE"
                        value={searchKeyword}
                        onChangeText={setSearchKeyword}
                        onSubmitEditing={handleSearchGaldae}
                        returnKeyType="search"
                        style={styles.searchInput}
                    />
                    <SVGButton iconName="Search" onPress={handleSearchGaldae} buttonStyle={styles.searchIconInside}/>
                </View>

                <BasicText style={styles.title} text="최근 검색 기록" />

                <ScrollView style={styles.searchList}>
                    {searchHistory.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.searchListWrapper}
                            onPress={() => {
                                setSearchKeyword(item.searchKeyword.main);
                                handleSearchGaldae();
                            }}
                            activeOpacity={0.7}
                        >
                            <BasicText
                                text={formatRelativeTime(item.timestamp)}
                                style={styles.searchDate}
                                color={theme.colors.grayV1}
                                fontSize={theme.fontSize.size12}
                            />
                            <BasicText text={item.searchKeyword.main} style={styles.searchKeyword} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default OTTSearch;
