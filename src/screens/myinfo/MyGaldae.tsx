import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/MyGaldae.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import { theme } from '../../styles/theme';
import SVGTextButton from '../../components/button/SVGTextButton';
import BasicButton from '../../components/button/BasicButton';
import MyGaldaeItem from '../../components/MyGaldaeItem';
import FrequentRouteItem from '../../components/FrequentRouteItem';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {  useSelector } from 'react-redux';
import { useAppDispatch } from '../../modules/redux/store';
import { fetchFrequentRoutes } from '../../modules/redux/slice/frequentRouteSlice';
import { RootState } from '../../modules/redux/RootReducer';

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
  SetDestination: undefined;
  MyGaldaeHistory: any;
  NowGaldaeDetail: { postId: string };
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MyGaldae: React.FC<HomeProps> = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<nowGaldaeScreenNavigationProp>();

  // Redux에서 자주 가는 경로 데이터 가져오기 (인터페이스는 departure, arrival, createdAt 등)
  const { routes, loading, error } = useSelector((state: RootState) => state.frequentSlice);


  useEffect(() => {
    dispatch(fetchFrequentRoutes());
  }, [dispatch]);


  const handleMorePress = () => {
    navigation.navigate('MyGaldaeHistory');
  };

  // // 기존 갈대 아이템 예시 데이터 (여기서는 예시 아이템으로 GaldaeItem 사용)
  // const item = {
  //   id: 1,
  //   owner: '하재연님의 갈대',
  //   from: { main: '학교', sub: '정문' },
  //   users: 2,
  //   capacity: 4,
  //   destination: { main: '학교', sub: '정문' },
  //   time: '2025년 00월 00일 (0) 00 : 00',
  //   timeAgreement: true,
  //   tags: ['성별무관'],
  //   timestamp: 1735689600000,
  // };
  // 내 갈대 기록은 Redux slice에서 관리 (state.myGaldae)
  const { history: myGaldaeHistory, totalCount} = useSelector(
    (state: RootState) => state.myGaldaeSlice
  );
// 내 갈대 기록의 첫 번째 항목을 topItem으로 사용 (있다면)
const topItem = myGaldaeHistory.length > 0 ? myGaldaeHistory[0] : null;
  return (
    <View style={styles.container}>
      <Header
        leftButton={<SVGButton iconName="arrow_left_line" onPress={() => navigation.goBack()} />}
        title={<BasicText text="내 갈대 기록" style={styles.headerText} />}
      />

      <View style={styles.content}>
        <View style={styles.nowGaldaeTitle}>
          <BasicText text={`${totalCount}개의 경로`} style={styles.nowGaldae} />
          <SVGTextButton
            iconName="More"
            text="더보기"
            textStyle={styles.more}
            iconPosition="right"
            onPress={handleMorePress}
            enabledColors={{
              backgroundColor: 'transparent',
              textColor: theme.colors.gray1,
              borderColor: 'transparent',
            }}
          />
        </View>

        {topItem ? (
          <MyGaldaeItem
            item={topItem}
            onPress={() => navigation.navigate('NowGaldaeDetail', {postId: topItem.postId})}
          />
        ) : (
          <View style={styles.borderBox}>
            <BasicText text="새로운 갈대를 생성해보세요." style={styles.noGaldaeText} />
          </View>
        )}

        <BasicText text="자주가는 경로" style={styles.freqText} />
        {loading ? (
          <BasicText text="로딩중..." style={styles.noGaldaeText} />
        ) : error ? (
          <BasicText text={`오류: ${error}`} style={styles.noGaldaeText} />
        ) : (
          <FlatList
            style={styles.searchList}
            data={routes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <FrequentRouteItem key={item.createdAt} routeData={item} />
            )}
            ListEmptyComponent={
              <View style={styles.borderBox}>
                <BasicText text="기록이 없습니다." style={styles.noGaldaeText} />
              </View>
            }
          />
        )}

        <BasicButton
          text="갈대 생성하기"
          buttonStyle={styles.generateButton}
          textStyle={styles.generateText}
          onPress={() => navigation.navigate('CreateGaldae')}
        />
      </View>
    </View>
  );
};

export default MyGaldae;
