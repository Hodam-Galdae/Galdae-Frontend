/* eslint-disable react-native/no-inline-styles */
// Home.tsx 테스트
import React, { useState, useEffect } from 'react';
// import React, {useState, useRef, useEffect} from 'react'; // useRef 주석처리
import {
  ScrollView,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import styles from '../styles/Home.style';
import BasicText from '../components/BasicText';
import SVGButton from '../components/button/SVGButton';
import ServiceButton from '../components/ServiceButton';
import { useNavigation } from '@react-navigation/native';
import NowGaldaeSameGender from '../components/popup/NowGaldaeSameGender';
import AuthRequiredModal from '../components/popup/AuthRequiredModal';
import { getGroups } from '../api/groupApi';
//type
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// type
import { GroupListItem } from '../types/groupTypes';
import HomeTaxiItem from './category/taxi/HomeTaxiItem';
import HomeDeliveryItem from './category/delivery/HomeDeliveryItem';
import HomeSubscribeItem from './category/ott/HomeOTTItem';
import GaldaeItemSkeleton from '../components/GaldaeItemSkeleton';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/redux/RootReducer';

type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: undefined;
  NowGaldaeDetail: { taxiId: string; showAuthModal?: boolean };
  DeliveryDetail: { orderId: string; showAuthModal?: boolean };
  OTTDetail: { subscribeId: string; showAuthModal?: boolean };
  TaxiNDivide: undefined;
  OTTNDivide: undefined;
  DeliveryNDivide: undefined;
  SignUp: { data: boolean };
  ContinueSignUp: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
  NowGaldaeDetail: { postId: string };
};

const Home: React.FC<HomeProps> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<GroupListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [sameGenderPopupVisible, setSameGenderPopupVisible] = useState(false);
  const [authRequiredModalVisible, setAuthRequiredModalVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const userState = useSelector((state: RootState) => state.user);

  // 사용자 인증 상태 확인
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = await EncryptedStorage.getItem('accessToken');
        // 닉네임이 비어있어도 id가 있으면 인증된 사용자로 간주
        const hasUserInfo = userState.id !== '';

        console.log('🔍 [Home] 인증 상태 체크:', {
          hasAccessToken: !!accessToken,
          userId: userState.id,
          userNickname: userState.nickname,
          hasUserInfo,
          finalAuth: !!(accessToken && hasUserInfo)
        });

        setIsAuthenticated(!!(accessToken && hasUserInfo));
      } catch (error) {
        console.error('❌ [Home] 인증 상태 확인 실패:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, [userState]);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log('📱 [Home] 그룹 목록 가져오기 시작...');
      setIsLoading(true);
      const startTime = Date.now();
      try {
        const response = await getGroups({ pageNumber: 0, pageSize: 3 });
        console.log('✅ [Home] 그룹 목록 가져오기 성공:', response);
        console.log('📊 [Home] 받아온 데이터 개수:', response?.length ?? 0);

        // 최소 1초 로딩 보장
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 1000 - elapsedTime);
        await new Promise(resolve => setTimeout(resolve, remainingTime));

        setPosts(response || []);
      } catch (error) {
        console.error('❌ [Home] 그룹 목록 가져오기 실패:', error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);
  // 새로고침 시 실행할 함수 (예: 데이터 다시 불러오기)
  const onRefresh = async () => {
    console.log('🔄 [Home] Pull to Refresh 시작');
    setRefreshing(true);
    setIsLoading(true);
    const startTime = Date.now();
    try {
      const response = await getGroups({ pageNumber: 0, pageSize: 3 });
      console.log('✅ [Home] Pull to Refresh 성공:', response);
      console.log('📊 [Home] 새로고침 후 데이터 개수:', response?.length ?? 0);

      // 최소 1초 로딩 보장
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1000 - elapsedTime);
      await new Promise(resolve => setTimeout(resolve, remainingTime));

      setPosts(response || []);
    } catch (error) {
      console.error('❌ [Home] Pull to Refresh 실패:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const handleMorePress = () => {
    if (!isAuthenticated) {
      setAuthRequiredModalVisible(true);
    } else {
      navigation.navigate('NowGaldae');
    }
  };

  const handleServicePress = (screen: 'TaxiNDivide' | 'OTTNDivide' | 'DeliveryNDivide') => {
    if (!isAuthenticated) {
      setAuthRequiredModalVisible(true);
    } else {
      navigation.navigate(screen);
    }
  };

  const handleItemPress = (type: 'TAXI' | 'ORDER' | 'SUBSCRIBE', id: string) => {
    const shouldShowAuthModal = !isAuthenticated;

    // 상세 화면으로 이동
    if (type === 'TAXI') {
      navigation.navigate('NowGaldaeDetail', { taxiId: id, showAuthModal: shouldShowAuthModal });
    } else if (type === 'ORDER') {
      navigation.navigate('DeliveryDetail', { orderId: id, showAuthModal: shouldShowAuthModal });
    } else if (type === 'SUBSCRIBE') {
      navigation.navigate('OTTDetail', { subscribeId: id, showAuthModal: shouldShowAuthModal });
    }
  };

  const handleAuthRequiredConfirm = () => {
    setAuthRequiredModalVisible(false);
    navigation.navigate('ContinueSignUp');
  };

  const handleAuthRequiredCancel = () => {
    setAuthRequiredModalVisible(false);
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
              onPress={() => handleServicePress('TaxiNDivide')}
            />
            <ServiceButton
              iconName="Ott"
              text="구독료 N빵"
              customStyle={{ paddingLeft: 6 }}
              onPress={() => handleServicePress('OTTNDivide')}
            />
            <ServiceButton
              iconName="Delivery"
              text="배달 N빵"
              onPress={() => handleServicePress('DeliveryNDivide')}
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
            {(() => {
              console.log('🎨 [Home] 렌더링 - isLoading:', isLoading, 'posts.length:', posts.length);

              if (isLoading) {
                console.log('⏳ [Home] 스켈레톤 표시 중...');
                return (
                  <>
                    <GaldaeItemSkeleton />
                    <GaldaeItemSkeleton />
                    <GaldaeItemSkeleton />
                  </>
                );
              }

              if (posts.length === 0) {
                console.log('📭 [Home] 데이터 없음');
                return (
                  <View style={styles.noData}>
                    <BasicText text="아직 진행 중인 갈대가 없어요" style={styles.noDataText} />
                  </View>
                );
              }

              console.log('📋 [Home] 게시글 렌더링 시작');
              return posts.map(item => {
                console.log('📦 [Home] 아이템:', item.type, item.id);
                switch (item.type) {
                  case 'TAXI':
                    return (
                      <HomeTaxiItem
                        key={item.id}
                        item={item}
                        onPress={() => {
                          if (item.sameGenderYN) {
                            handleItemPress('TAXI', item.id);
                          } else {
                            setSameGenderPopupVisible(true);
                          }
                        }}
                      />
                    );
                  case 'ORDER':
                    return (
                      <HomeDeliveryItem
                        key={item.id}
                        item={item}
                        onPress={() => handleItemPress('ORDER', item.id)}
                      />
                    );
                  case 'SUBSCRIBE':
                    return (
                      <HomeSubscribeItem
                        key={item.id}
                        item={item}
                        onPress={() => handleItemPress('SUBSCRIBE', item.id)}
                      />
                    );
                  default:
                    return null;
                }
              });
            })()}
          </View>
        </ScrollView>
      </ScrollView>

      <NowGaldaeSameGender
        visible={sameGenderPopupVisible}
        onConfirm={() => {
          setSameGenderPopupVisible(false);
        }}
      />

      <AuthRequiredModal
        visible={authRequiredModalVisible}
        onConfirm={handleAuthRequiredConfirm}
        onCancel={handleAuthRequiredCancel}
      />

    </View>
  );
};

export default Home;
