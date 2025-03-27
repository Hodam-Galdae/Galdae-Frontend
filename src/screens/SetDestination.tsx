import React, {useEffect,useState,useRef} from 'react';
import { Alert, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/SetDestination.style';
import BasicText from '../components/BasicText';
import PositionBox from '../components/PostionBox';
import SVGButton from '../components/button/SVGButton';
import BasicButton from '../components/button/BasicButton';
import Header from '../components/Header';
import SVG from '../components/SVG';
import FastGaldaeStartPopup, { FastGaldaeStartPopupRef } from '../components/popup/FastGaldaeStartPopup';
import FastGaldaeEndPopup, { FastGaldaeEndPopupRef } from '../components/popup/FastGaldaeEndPopup';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TextTag from '../components/tag/TextTag';
import { theme } from '../styles/theme';
import { Portal } from '@gorhom/portal';
// 내비게이션 스택 타입 정의
type RootStackParamList = {
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
};
// 저장할 때 사용할 key 정의
const STORAGE_KEY = 'SEARCH_HISTORY';
// 검색 기록 저장 함수
const saveSearchHistory = async (history: any[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('검색 기록 저장 실패:', error);
  }
};

// 검색 기록 불러오기 함수
const loadSearchHistory = async (): Promise<any[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('검색 기록 불러오기 실패:', error);
    return [];
  }
};
const SetDestination: React.FC = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const goBack = () => navigation.goBack();
  const [loading, setLoading] = useState<boolean>(false);
  const [departureLargeName, setDepartureLargeName] = useState<string>('출발지 선택');
  const [departureLargeId, setDepartureLargeId] = useState<number|null>(null);

  const [departureSmallName, setDepartureSmallName] = useState<string>('출발지 선택');
  const [departureSmallId, setDepartureSmallId] = useState<number|null>(null);

  const [destinationLargeName, setDestinationLargeName] = useState<string>('도착지 선택');
  const [destinationLargeId, setDestinationLargeId] = useState<number|null>(null);

  const [destinationSmallName, setDestinationSmallName] = useState<string>('도착지 선택');
  const [destinationSmallId, setDestinationSmallId] = useState<number|null>(null);

  const [searchHistory, setSearchHistory] = useState<any[]>([]);

  const fastGaldaeStartPopupRef = useRef<FastGaldaeStartPopupRef>(null);
  const fastGaldaeEndPopupRef = useRef<FastGaldaeEndPopupRef>(null);
  const toggleFastGaldaeStartPopup = () =>{
    fastGaldaeStartPopupRef.current?.open();
  };

  const toggleFastGaldaeEndPopup = () =>{
    fastGaldaeEndPopupRef.current?.open();
  };

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
    if(departureLargeId === null || departureSmallId === null || destinationLargeId === null || destinationSmallId === null){
        Alert.alert('출발지 또는 도착지를 다시 선택해주세요!');
        return;
       }
    navigation.navigate('NowGaldae', {
      departureLargeName,
      departureLargeId,
      departureSmallName,
      departureSmallId,
      destinationLargeName,
      destinationLargeId,
      destinationSmallName,
      destinationSmallId,
    });
    // 새로운 검색 기록 객체 생성: timestamp를 저장합니다.
  const newSearchRecord = {
    id: Date.now(), // 고유 id로 사용
    timestamp: Date.now(), // 검색 시각 저장
    start: {
      label: '출발지',
      main: departureLargeName,
      sub: departureSmallName,
    },
    end: {
      label: '도착지',
      main: destinationLargeName,
      sub: destinationSmallName,
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
      leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack}/>}
      title={<BasicText text="목적지 설정" style={styles.mainTitle}/>}
      />

        <View style={styles.container}>

          <View style={styles.positionBox}>
            <PositionBox title={departureLargeName} subTitle={departureSmallName} isOrigin={true} onPress={toggleFastGaldaeStartPopup}/>
            <SVGButton
              iconName="Switch"
              buttonStyle={styles.switchBtn}
              SVGStyle={styles.switchIcon}
            />
            <PositionBox title={destinationLargeName} subTitle={destinationSmallName} isOrigin={false} onPress={toggleFastGaldaeEndPopup}/>
          </View>

          <BasicText style={styles.title} text="최근 검색 기록"/>

          <ScrollView style={styles.searchList}>
            {searchHistory.map((item) => (
              <View key={item.id} style={styles.searchListWrapper}>
                <BasicText
                  text={formatRelativeTime(item.timestamp)}
                  style={styles.searchDate}
                  color={theme.colors.gray1}
                  fontSize={theme.fontSize.size12}
                />
                <View style={styles.searchListBox}>
                  <View style={styles.startContain}>
                    <TextTag
                      text={item.start.label}
                      viewStyle={styles.start}
                      enabledColors={{
                        backgroundColor: theme.colors.white,
                        textColor: theme.colors.gray0,
                        borderColor: theme.colors.gray0,
                      }}
                    />
                    <BasicText text={item.start.main} style={styles.mainPosName} />
                    <BasicText text={item.start.sub} style={styles.subPosName} />
                  </View>

                  <SVG name="arrow_right_line" width={22} height={22} style={styles.arrowRight} />

                  <View style={styles.startContain}>
                    <TextTag
                      text={item.end.label}
                      viewStyle={styles.start}
                      enabledColors={{
                        backgroundColor: theme.colors.white,
                        textColor: theme.colors.gray0,
                        borderColor: theme.colors.gray0,
                      }}
                    />
                    <BasicText text={item.end.main} style={styles.mainPosName} />
                    <BasicText text={item.end.sub} style={styles.subPosName} />
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <BasicButton
            text="검색하기"
            buttonStyle={styles.generateButton}
            textStyle={styles.generateText}
            loading={loading}
            onPress={handleSearchGaldae}
          />
        </View>

        <Portal>
          <FastGaldaeStartPopup
            ref={fastGaldaeStartPopupRef}
            onConfirm={(largeName, largeId, smallName, smallId) => {
              setDepartureLargeName(largeName);
              setDepartureLargeId(largeId);
              setDepartureSmallName(smallName);
              setDepartureSmallId(smallId);
            }}
            selectedStartPlaceId={destinationSmallId}
            onClose={() => console.log('팝업 닫힘')}
          />
        </Portal>

        <Portal>
          <FastGaldaeEndPopup
          ref={fastGaldaeEndPopupRef}
          onConfirm={(largeName, largeId, smallName, smallId) => {
            setDestinationLargeName(largeName);
            setDestinationLargeId(largeId);
            setDestinationSmallId(smallId);
            setDestinationSmallName(smallName);
          }}
          selectedStartPlaceId={departureSmallId}
          onClose={() => console.log('팝업 닫힘')}
          />
        </Portal>
    </View>
  );
};

export default SetDestination;
