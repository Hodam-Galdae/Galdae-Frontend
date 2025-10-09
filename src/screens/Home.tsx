/* eslint-disable react-native/no-inline-styles */
// Home.tsx 테스트
import React, { useState, useEffect } from 'react';
// import React, {useState, useRef, useEffect} from 'react'; // useRef 주석처리
import {
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import styles from '../styles/Home.style';
import BasicText from '../components/BasicText';
import SVGButton from '../components/button/SVGButton';
import { theme } from '../styles/theme';
import ServiceButton from '../components/ServiceButton';
import { useNavigation } from '@react-navigation/native';
import NowGaldaeSameGender from '../components/popup/NowGaldaeSameGender';
import { getGroups } from '../api/groupApi';
//type
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// type
import { GroupListItem } from '../types/groupTypes';
import HomeTaxiItem from './category/taxi/HomeTaxiItem';
import HomeDeliveryItem from './category/delivery/HomeDeliveryItem';
import HomeSubscribeItem from './category/ott/HomeOTTItem';

type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: undefined;
  NowGaldaeDetail: { taxiId: string };
  DeliveryDetail: { orderId: string };
  OTTDetail: { subscribeId: string };
  TaxiNDivide: undefined;
  OTTNDivide: undefined;
  DeliveryNDivide: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
  NowGaldaeDetail: { postId: string };
};

const Home: React.FC<HomeProps> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<GroupListItem[]>([]);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [sameGenderPopupVisible, setSameGenderPopupVisible] = useState(false);
  useEffect(() => {
    getGroups({ pageNumber: 0, pageSize: 3 }).then(setPosts);
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
    <View style={{ height: '100%' }}>
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
              customStyle={{ paddingLeft: 6 }}
              onPress={() => navigation.navigate('OTTNDivide')}
            />
            <ServiceButton
              iconName="Delivery"
              text="배달 N빵"
              onPress={() => navigation.navigate('DeliveryNDivide')}
            />
          </View>

          <TouchableOpacity style={styles.nowGaldaeTitle} onPress={handleMorePress}>
            <BasicText text="실시간 N빵" style={styles.nowGaldae} onPress={handleMorePress} />
            <SVGButton
              iconName="MoreIcon"
              onPress={handleMorePress}
            />
          </TouchableOpacity>

          <View style={styles.nowGaldaeList}>
            {posts.length === 0 ? (
              <ActivityIndicator size="small" color={theme.colors.Galdae} />
            ) : (
              posts.map(item => {


                switch (item.type) {
                  case 'TAXI':
                    return (
                      <HomeTaxiItem
                        key={item.id}
                        item={item}
                        onPress={item.sameGenderYN ? ()=>navigation.navigate('NowGaldaeDetail', { taxiId: item.id }) : () => setSameGenderPopupVisible(true)}
                      />
                    );
                  case 'ORDER':
                    return (
                      <HomeDeliveryItem
                        key={item.id}
                        item={item}
                        onPress={()=>navigation.navigate('DeliveryDetail', { orderId: item.id })}
                      />
                    );
                  case 'SUBSCRIBE':
                    return (
                      <HomeSubscribeItem
                        key={item.id}
                        item={item}
                        onPress={()=>navigation.navigate('OTTDetail', { subscribeId: item.id })}
                      />
                    );
                  default:
                    return null;
                }
              })
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
