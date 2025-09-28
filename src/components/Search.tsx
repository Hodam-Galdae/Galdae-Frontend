/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Alert, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/Search.style';
import BasicText from '../components/BasicText';
import SVGButton from '../components/button/SVGButton';
import Header from '../components/Header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../styles/theme';
import InputText from '../components/BasicInput';
// 내비게이션 스택 타입 정의
type RootStackParamList = {
    DeliveryNDivide: {
        searchKeyword: string,
    };
};
// 저장할 때 사용할 key 정의
const STORAGE_KEY = 'SEARCH_HISTORY_DELIVERY';
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
const Search: React.FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const goBack = () => navigation.goBack();
    const [loading, setLoading] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [searchHistory, setSearchHistory] = useState<any[]>([]);


    // 컴포넌트 마운트 시 저장된 검색 기록 불러오기
    useEffect(() => {
        (async () => {
            const history = await loadSearchHistory();
            setSearchHistory(history);
        })();
    }, []);

    // 새로운 검색 기록 추가 함수 예시
    const addSearchHistoryItem = async (newItem: any) => {
        const updatedHistory = [newItem, ...searchHistory];
        setSearchHistory(updatedHistory);
        await saveSearchHistory(updatedHistory);
    };

    const handleSearchGaldae = async () => {
        setLoading(true);
        if (searchKeyword === '') {
            Alert.alert('검색어를 입력해주세요!');
            return;
        }
        navigation.navigate('DeliveryNDivide', {
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
                leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack} />}
                title={
                    <View style={styles.searchContainer}>
                        <InputText text="검색어를 입력해 주세요." value={searchKeyword} onChangeText={setSearchKeyword} style={styles.searchInput} />
                        <SVGButton iconName="Search" onPress={handleSearchGaldae} buttonStyle={styles.searchIconBtn} SVGStyle={styles.searchIcon} />
                    </View>
                }
            />

            <View style={styles.container}>



                <BasicText style={styles.title} text="추천 검색어" />

                <ScrollView style={styles.searchList}>
                    {searchHistory.map((item) => (
                        <View key={item.id} style={styles.searchListWrapper}>
                            <BasicText
                                text={formatRelativeTime(item.timestamp)}
                                style={styles.searchDate}
                                color={theme.colors.grayV1}
                                fontSize={theme.fontSize.size12}
                            />
                            <BasicText text={item.searchKeyword.main} style={styles.searchKeyword} />
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default Search;
