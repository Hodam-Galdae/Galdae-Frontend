/* eslint-disable react-native/no-inline-styles */

/* eslint-disable react/no-unstable-nested-components */

import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Platform, View } from 'react-native';
import Home from '../screens/Home';
import MyInfo from '../screens/MyInfo';
import Chat from '../screens/Chat';
import SVG from '../components/SVG';
import Header from './Header';
import { theme } from '../styles/theme';
import SVGButton from './button/SVGButton';
import BasicText from '../components/BasicText';
//import SearchBar from '../components/SearchBar';
import styles from '../styles/Header.style';
import SVGTextButton from './button/SVGTextButton';
import AuthRequiredModal from './popup/AuthRequiredModal';
import NotificationPermissionModal from './popup/NotificationPermissionModal';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  checkNotificationPermissionStatus,
  openAppSettings,
} from '../utils/notification';
import {updateFcmToken} from '../api/notiApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules/redux/RootReducer';
import { useFocusEffect } from '@react-navigation/native';
import { getShorterUniversityName } from '../utils/universityUtils';
import { fetchUserInfo } from '../modules/redux/slice/myInfoSlice';
import { setUser } from '../modules/redux/slice/UserSlice';
import { AppDispatch } from '../modules/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
// 내비게이션 스택 타입 정의
type RootStackParamList = {
  Notification: undefined;
  Search: undefined;
  SignUp: { data: boolean };
};

function App(): React.JSX.Element {
  const Tab = createBottomTabNavigator();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  const [authRequiredModalVisible, setAuthRequiredModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const userState = useSelector((state: RootState) => state.user);
  const myInfo = useSelector((state: RootState) => state.myInfoSlice.userInfo);

  // 대학 정보 상태 (Redux 또는 AsyncStorage에서 가져옴)
  const [universityName, setUniversityName] = useState<string>('대학');
  const [universityLocation, setUniversityLocation] = useState<string>('캠퍼스');

  // 대학 정보 업데이트 (Redux 또는 AsyncStorage에서)
  useEffect(() => {
    const updateUniversityInfo = async () => {
      // 1. Redux에서 대학 정보 확인 (인증된 사용자)
      if (myInfo?.university) {
        setUniversityName(getShorterUniversityName(myInfo.university));
        setUniversityLocation(myInfo.area || '캠퍼스');
        console.log('🏫 [MainTab] Redux에서 대학 정보 로드:', {
          university: myInfo.university,
          area: myInfo.area,
        });
        return;
      }

      // 2. Redux에 없으면 AsyncStorage 확인 (게스트 모드)
      try {
        const savedUniversity = await AsyncStorage.getItem('selectedUniversity');
        const savedUniversityArea = await AsyncStorage.getItem('selectedUniversityArea');

        if (savedUniversity && savedUniversityArea) {
          setUniversityName(getShorterUniversityName(savedUniversity));
          setUniversityLocation(savedUniversityArea);
          console.log('🏫 [MainTab] AsyncStorage에서 대학 정보 로드 (게스트 모드):', {
            university: savedUniversity,
            area: savedUniversityArea,
          });
        } else {
          // 3. 둘 다 없으면 기본값 유지
          setUniversityName('대학');
          setUniversityLocation('캠퍼스');
          console.log('🏫 [MainTab] 대학 정보 없음 - 기본값 표시');
        }
      } catch (error) {
        console.error('❌ [MainTab] AsyncStorage 확인 실패:', error);
        setUniversityName('대학');
        setUniversityLocation('캠퍼스');
      }
    };

    updateUniversityInfo();
  }, [myInfo]);

  // 사용자 인증 상태 확인
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = await EncryptedStorage.getItem('accessToken');
        // 닉네임이 비어있어도 id가 있으면 인증된 사용자로 간주
        const hasUserInfo = userState.id !== '';

        console.log('🔍 [MainTab] 인증 상태 체크:', {
          hasAccessToken: !!accessToken,
          userId: userState.id,
          userNickname: userState.nickname,
          hasUserInfo,
          finalAuth: !!(accessToken && hasUserInfo),
        });

        setIsAuthenticated(!!(accessToken && hasUserInfo));
      } catch (error) {
        console.error('❌ [MainTab] 인증 상태 확인 실패:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, [userState]);

  // 초기 마운트 시 사용자 정보 로드 및 알림 권한 체크
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const accessToken = await EncryptedStorage.getItem('accessToken');
        if (accessToken && (!myInfo || !myInfo.university)) {
          console.log('📖 [MainTab] 사용자 정보 가져오기 시작...');

          // myInfoSlice 업데이트
          const userInfoResult = await dispatch(fetchUserInfo()).unwrap();
          console.log('✅ [MainTab] myInfoSlice 업데이트 완료');

          // UserSlice도 업데이트 (인증 체크용)
          dispatch(setUser({
            id: userInfoResult.id,
            nickname: userInfoResult.nickname,
            bankType: userInfoResult.bankType,
            accountNumber: userInfoResult.accountNumber,
            depositor: userInfoResult.depositor,
            token: 'Bearer ' + accessToken,
            image: userInfoResult.image,
          }));
          console.log('✅ [MainTab] UserSlice 업데이트 완료 - 게스트 모드 해제됨');
        }
      } catch (error) {
        console.error('❌ [MainTab] 사용자 정보 가져오기 실패:', error);
      }
    };
    loadUserInfo();

    // 알림 권한 체크 (자동 로그인 및 로그인 후 모두 처리)
    const checkNotificationPermission = async () => {
      try {
        const accessToken = await EncryptedStorage.getItem('accessToken');
        if (!accessToken) {
          // 로그인하지 않은 경우 권한 체크 건너뛰기
          console.log('⏭️ [MainTab] 로그인하지 않음 - 알림 권한 체크 건너뛰기');
          return;
        }

        console.log('🔔 [MainTab] 알림 권한 체크 시작...');
        // 권한 요청 없이 현재 상태만 확인
        const permissionResult = await checkNotificationPermissionStatus();

        if (permissionResult.granted) {
          // 권한이 허용된 상태
          if (permissionResult.token) {
            // 토큰이 있으면 서버에 업데이트
            await updateFcmToken(permissionResult.token);
            console.log('✅ [MainTab] FCM 토큰 갱신 성공');
          } else {
            // 시뮬레이터 등에서 토큰이 없는 경우
            console.log('ℹ️ [MainTab] 알림 권한은 허용되었으나 토큰 없음 (시뮬레이터)');
          }
        } else {
          // 권한이 없거나 거부된 상태 - 안내 모달 표시
          console.log('⚠️ [MainTab] 알림 권한 없음 - 안내 모달 표시');
          setNotificationModalVisible(true);
        }
      } catch (error) {
        console.error('❌ [MainTab] 알림 권한 체크 실패:', error);
      }
    };

    // 사용자 정보 로드 후 알림 권한 체크
    // 약간의 딜레이를 주어 사용자 정보 로드가 완료된 후 실행
    const timer = setTimeout(() => {
      checkNotificationPermission();
    }, 1000);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 화면 포커스될 때마다 사용자 정보 갱신
  useFocusEffect(
    React.useCallback(() => {
      const refreshUserInfo = async () => {
        try {
          const accessToken = await EncryptedStorage.getItem('accessToken');
          if (accessToken) {
            console.log('🔄 [MainTab] 사용자 정보 새로고침...');

            // myInfoSlice 업데이트
            const userInfoResult = await dispatch(fetchUserInfo()).unwrap();
            console.log('✅ [MainTab] myInfoSlice 새로고침 완료');

            // UserSlice도 업데이트 (인증 체크용)
            dispatch(setUser({
              id: userInfoResult.id,
              nickname: userInfoResult.nickname,
              bankType: userInfoResult.bankType,
              accountNumber: userInfoResult.accountNumber,
              depositor: userInfoResult.depositor,
              token: 'Bearer ' + accessToken,
              image: userInfoResult.image,
            }));
            console.log('✅ [MainTab] UserSlice 새로고침 완료 - 게스트 모드 해제됨');
          }
        } catch (error) {
          console.error('❌ [MainTab] 사용자 정보 새로고침 실패:', error);
        }
      };
      refreshUserInfo();
    }, [dispatch])
  );

  const handleSearchPress = () => {
    if (!isAuthenticated) {
      setAuthRequiredModalVisible(true);
    } else {
      navigation.navigate('Search');
    }
  };

  const handleAuthRequiredConfirm = () => {
    setAuthRequiredModalVisible(false);
    navigation.navigate('SignUp', { data: false });
  };

  const handleAuthRequiredCancel = () => {
    setAuthRequiredModalVisible(false);
  };

  const handleNotificationPermissionConfirm = async () => {
    console.log('🔘 [MainTab] "설정으로 이동" 버튼 클릭');
    setNotificationModalVisible(false);

    // 설정 화면으로 이동 (사용자가 직접 권한 허용)
    await openAppSettings();
  };

  const handleNotificationPermissionCancel = () => {
    setNotificationModalVisible(false);
  };

  return (
    <>
    <Tab.Navigator
      initialRouteName="홈"
      screenOptions={{
        // header: () => (
        //
        // ),
        //header: () => <Header rightButton={<SVGButton iconName="Notification" onPress={()=>navigation.navigate('Notification')}/>}/>,
        tabBarActiveTintColor: theme.colors.Galdae,
        tabBarInactiveTintColor: theme.colors.blackV3,
        tabBarStyle: {
          height: Platform.select({
            ios: 82,
            android: 74,
          }),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderColor: theme.colors.white,
          borderTopWidth: 0.1,
          backgroundColor: theme.colors.white,
          // iOS용 그림자
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          // Android용 그림자
          elevation: 6,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarItemStyle: {
          height: Platform.select({
            ios: 80,
            android: 54,
          }),
          //backgroundColor:theme.colors.blackV0,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 10, // ← 아이콘을 아래로 조금 내림
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          textAlign: 'center',
        },
      }}>
      <Tab.Screen
        name="홈"
        component={Home as React.ComponentType<any>}
        options={{
          header: () => (
            <View>
              <Header
                leftStyle={styles.homeLeftContainer}
                leftButton={
                  <View style={styles.titleContainer}>
                    <BasicText
                      text={universityName}
                      style={styles.universityName}
                      numberOfLines={1}
                      ellipsizeMode="clip"
                    />
                    <BasicText
                      text={universityLocation}
                      style={styles.universityLocation}
                    />
                  </View>
                }
                rightStyle={styles.homeLogoContainer}
                rightButton={
                  <SVGButton
                    iconName="Notification"
                    onPress={() => navigation.navigate('Notification')}
                  />
                }
              />
              <View style={styles.searchContainer}>
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
                        onPress={handleSearchPress}
                    />
              </View>
            </View>
          ),
          tabBarIcon: ({ focused, size }) => {
            const iconName = focused ? 'ClickedHomeIcon' : 'HomeIcon';
            return (
              <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
                <SVG name={iconName} width={size} height={size} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="채팅"
        component={Chat}
        options={{
          header: () => (
            <Header
              title={<BasicText text="채팅" style={styles.mainTitle} />}
            />
          ),
          tabBarIcon: ({ focused, size }) => {
            const iconName = focused ? 'ClickedChatIcon' : 'ChatIcon';
            return (
              <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
                <SVG name={iconName} width={size} height={size} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="내정보"
        component={MyInfo}
        options={{
          header: () => (
            <Header
              // rightButton={<SVGButton
              //   iconName="Notification"
              //   onPress={()=>navigation.navigate('Notification')}/>}
              title={<BasicText text="내 정보" style={styles.mainTitle} />}
            />
          ),
          tabBarIcon: ({ focused, size }) => {
            const iconName = focused ? 'ClickedMyInfoIcon' : 'MyInfoIcon';
            return (
              <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
                <SVG name={iconName} width={size} height={size} />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
    <AuthRequiredModal
      visible={authRequiredModalVisible}
      onConfirm={handleAuthRequiredConfirm}
      onCancel={handleAuthRequiredCancel}
    />
    <NotificationPermissionModal
      visible={notificationModalVisible}
      onConfirm={handleNotificationPermissionConfirm}
      onCancel={handleNotificationPermissionCancel}
    />
  </>
  );
}

export default App;
