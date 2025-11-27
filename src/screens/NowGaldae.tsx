/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/NowGaldae.style';
import Header from '../components/Header';
import SVGButton from '../components/button/SVGButton';
import BasicText from '../components/BasicText';
import HomeTaxiItem from './category/taxi/HomeTaxiItem';
import HomeDeliveryItem from './category/delivery/HomeDeliveryItem';
import HomeSubscribeItem from './category/ott/HomeOTTItem';
import SVG from '../components/SVG';
import NowGaldaeSameGender from '../components/popup/NowGaldaeSameGender';
import { theme } from '../styles/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GroupListItem } from '../types/groupTypes';
import { getGroups } from '../api/groupApi';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/redux/RootReducer';

type RootStackParamList = {
  NowGaldae: undefined;
  NowGaldaeDetail: { taxiId: string; showAuthModal?: boolean };
  DeliveryDetail: { orderId: string; showAuthModal?: boolean };
  OTTDetail: { subscribeId: string; showAuthModal?: boolean };
};

type NowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PAGE_SIZE = 10;

const NowGaldae: React.FC = () => {
  const navigation = useNavigation<NowGaldaeScreenNavigationProp>();
  const goBack = () => navigation.goBack();

  const flatListRef = useRef<FlatList>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  const [posts, setPosts] = useState<GroupListItem[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);        // 다음 페이지 로딩
  const [refreshing, setRefreshing] = useState(false);  // 당겨서 새로고침
  const [hasMore, setHasMore] = useState(true);         // 더 불러올 수 있는가
  const [sameGenderPopupVisible, setSameGenderPopupVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const userState = useSelector((state: RootState) => state.user);

  // 사용자 인증 상태 확인
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = await EncryptedStorage.getItem('accessToken');
        const hasUserInfo = userState.id !== '' && userState.nickname !== '';
        setIsAuthenticated(!!(accessToken && hasUserInfo));
      } catch (error) {
        console.error('❌ [NowGaldae] 인증 상태 확인 실패:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, [userState]);

  // 첫 로딩
  useEffect(() => {
    loadPage(0, { replace: true });
  }, []);

  // 페이지 로더
  const loadPage = useCallback(
    async (targetPage: number, opts?: { replace?: boolean }) => {
      if (loading) {return;}                 // 중복 호출 방지
      if (!opts?.replace && !hasMore) {return;} // 추가 로드인데 더 없음

      setLoading(true);
      try {
        const data = await getGroups({ pageNumber: targetPage, pageSize: PAGE_SIZE });
        // data가 배열이라고 가정. (페이지네이션 응답이 객체면 적절히 수정)
        const newItems: GroupListItem[] = Array.isArray(data) ? data : [];

        setPosts(prev =>
          opts?.replace ? newItems : [...prev, ...newItems]
        );

        // 다음 로드를 위한 상태 갱신
        setPage(targetPage);
        // 받아온 개수가 PAGE_SIZE보다 작으면 더 없음
        setHasMore(newItems.length === PAGE_SIZE);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore]
  );

  // 당겨서 새로고침
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setHasMore(true);
    try {
      await loadPage(0, { replace: true });
      // 스크롤 위치 복원 필요 없으면 아래 줄은 생략
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
      setScrollOffset(0);
    } finally {
      setRefreshing(false);
    }
  }, [loadPage]);

  // 스크롤 끝에서 다음 페이지
  const onEndReached = useCallback(() => {
    if (loading || !hasMore) {return;}
    // 다음 페이지 요청
    loadPage(page + 1);
  }, [loading, hasMore, page, loadPage]);

  // 키 추출기 (id와 postId 혼용 대비)
  const keyExtractor = (item: GroupListItem) => (item.id ?? `${item.type}-${Math.random()}`);

  const handleItemPress = useCallback((type: 'TAXI' | 'ORDER' | 'SUBSCRIBE', id: string) => {
    const shouldShowAuthModal = !isAuthenticated;

    // 상세 화면으로 이동
    if (type === 'TAXI') {
      navigation.navigate('NowGaldaeDetail', { taxiId: id, showAuthModal: shouldShowAuthModal });
    } else if (type === 'ORDER') {
      navigation.navigate('DeliveryDetail', { orderId: id, showAuthModal: shouldShowAuthModal });
    } else if (type === 'SUBSCRIBE') {
      navigation.navigate('OTTDetail', { subscribeId: id, showAuthModal: shouldShowAuthModal });
    }
  }, [isAuthenticated, navigation]);

  const renderItem = useCallback(({ item }: { item: GroupListItem }) => {
    switch (item.type) {
      case 'TAXI':
        return (
          <HomeTaxiItem
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
        return <HomeDeliveryItem item={item} onPress={() => handleItemPress('ORDER', item.id)} />;
      case 'SUBSCRIBE':
        return <HomeSubscribeItem item={item} onPress={() => handleItemPress('SUBSCRIBE', item.id)} />;
      default:
        return null;
    }
  }, [handleItemPress]);

  return (
    <View style={styles.main}>
      <Header
        leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack} />}
        title={<BasicText text="실시간 N빵 리스트" style={styles.headerText} />}
      />

      <View style={styles.galdaeList}>
        {posts.length === 0 && loading ? (
          <View style={styles.noData}>
            <ActivityIndicator size="large" color={theme.colors.Galdae} />
          </View>
        ) : posts.length === 0 ? (
          <View style={styles.noData}>
            <SVG name="information_line" />
            <BasicText text="해당 경로의 N빵이 없습니다" color={theme.colors.grayV1} />
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={posts}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.nowGaldaeList}
            renderItem={renderItem}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            scrollEventThrottle={16}
            onScroll={e => setScrollOffset(e.nativeEvent.contentOffset.y)}
            onContentSizeChange={() => {
              if (posts.length > 0 && flatListRef.current) {
                flatListRef.current.scrollToOffset({ offset: scrollOffset, animated: false });
              }
            }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            ListFooterComponent={
              loading && hasMore ? (
                // eslint-disable-next-line react-native/no-inline-styles
                <View style={{ paddingVertical: 16 }}>
                  <ActivityIndicator size="small" color={theme.colors.Galdae} />
                </View>
              ) : null
            }
          />
        )}
      </View>

      <NowGaldaeSameGender
        visible={sameGenderPopupVisible}
        onConfirm={() => setSameGenderPopupVisible(false)}
      />
    </View>
  );
};

export default NowGaldae;
