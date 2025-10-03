/* eslint-disable react-native/no-inline-styles */
// Home.tsx 테스트
import React, {useState, useEffect} from 'react';
// import React, {useState, useRef, useEffect} from 'react'; // useRef 주석처리
import {
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import styles from '../styles/Home.style';
import BasicText from '../components/BasicText';
import SVGButton from '../components/button/SVGButton';
import {theme} from '../styles/theme';
import SVG from '../components/SVG';
import TaxiItem from './category/taxi/TexiItem';
import ServiceButton from '../components/ServiceButton';
import {useNavigation} from '@react-navigation/native';
import NowGaldaeSameGender from '../components/popup/NowGaldaeSameGender';
import {getGroups} from '../api/groupApi';
//type
import {MyCreatedPost} from '../types/getTypes';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from '../modules/redux/RootReducer'; // store.ts에서 RootState 가져오기
// type
import {GaldaeItemType} from '../types/getTypes';
import { GroupListItem } from '../types/groupTypes';

type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: undefined;
  NowGaldaeDetail: {postId: string};
  TaxiNDivide: undefined;
  OTTNDivide: undefined;
  DeliveryNDivide: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
  NowGaldaeDetail: {postId: string};
};

const Home: React.FC<HomeProps> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<GroupListItem[]>([]);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [sameGenderPopupVisible, setSameGenderPopupVisible] = useState(false);
  const userGenderType = useSelector((state: RootState) => state.myInfoSlice.userInfo?.gender);
  useEffect(() => {
    getGroups().then(setPosts);
  }, []);
  // 새로고침 시 실행할 함수 (예: 데이터 다시 불러오기)
  const onRefresh = async () => {
    setRefreshing(true);
    try {

      // formatDepartureDateTime();
    } catch (error) {
      // console.error('새로고침 에러:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleMorePress = () => {
    navigation.navigate('NowGaldae');
  };



  return (
    <View style={{height: '100%'}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ScrollView style={styles.container}>

          {/* 새로운 서비스 섹션 */}
          <BasicText text="내 서비스" style={styles.serviceTitle} />
          <View style={styles.serviceContainer}>
            <ServiceButton
              iconName="Taxi"
              text="택시비 N빵"
              onPress={() => navigation.navigate('TaxiNDivide')}
            />
            <ServiceButton
              iconName="Ott"
              text="구독료 N빵"
              customStyle={{paddingLeft: 6}}
              onPress={() => navigation.navigate('OTTNDivide')}
            />
            <ServiceButton
              iconName="Delivery"
              text="배달 N빵"
              onPress={() => navigation.navigate('DeliveryNDivide')}
            />
          </View>

          <TouchableOpacity style={styles.nowGaldaeTitle} onPress={handleMorePress}>
            <BasicText text="실시간 N빵" style={styles.nowGaldae} onPress={handleMorePress}/>
            <SVGButton
              iconName="MoreIcon"
              onPress={handleMorePress}
            />
          </TouchableOpacity>

          <View style={styles.nowGaldaeList}>
            {posts.length === 0 ? (
              <ActivityIndicator size="small" color={theme.colors.Galdae} />
            ) : posts.length === 0 ? (
              <View style={styles.noData}>
                <SVG name="information_line" />
                <BasicText text="N빵이 없습니다" color={theme.colors.grayV1} />
              </View>
            ) : (
              posts.map(item => (
               <></>
              ))
            )}
          </View>
        </ScrollView>
      </ScrollView>

      <NowGaldaeSameGender
        visible={sameGenderPopupVisible}
        onConfirm={() => {
          setSameGenderPopupVisible(false);
        }}
      />

    </View>
  );
};

export default Home;
