import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Platform, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './src/utils/navigationRef';
import MainTab from './src/components/MainTab';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import CreateGaldae from './src/screens/category/taxi/CreateGaldae';
import NowGaldae from './src/screens/NowGaldae';
import NowGaldaeDetail from './src/screens/category/taxi/NowGaldaeDetail';
import Onboarding from './src/screens/Onboarding';
import ChatRoom from './src/screens/ChatRoom';
import SetDestination from './src/screens/category/taxi/SetDestination';
import axios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {errorLogger, requestLogger, responseLogger} from 'axios-logger';
import Settlement from './src/screens/Settlement';
import ReviewInProgress from './src/screens/ReviewInProgress';
import TermsDetail from './src/screens/TermsDetail';
import MyInfo from './src/screens/MyInfo';
import Payment from './src/screens/myinfo/Payment';
import AccountRegister from './src/screens/myinfo/AccountRegister';
import UserGuide from './src/screens/myinfo/UserGuide';
import TermsOfUse from './src/screens/myinfo/TermsOfUse';
import TermsOfUseDetail from './src/screens/myinfo/TermsOfUseDetail';
import MyGaldae from './src/screens/myinfo/MyGaldae';
import MyGaldaeHistory from './src/screens/myinfo/MyGaldaeHistory';
import NicknameChange from './src/screens/myinfo/NicknameChange';
import Announcement from './src/screens/myinfo/Announcement';
import FAQ from './src/screens/myinfo/FAQ';
import Inquiry from './src/screens/myinfo/Inquiry';
import Answer from './src/screens/myinfo/Answer';
import Logout from './src/screens/myinfo/Logout';
import WithDraw from './src/screens/myinfo/WithDraw';
import Notification from './src/screens/Notification';
import {TabBarVisibilityProvider} from './src/utils/TabBarVisibilityContext';
import {Provider} from 'react-redux';
import store from './src/modules/redux/store/index';
import messaging from '@react-native-firebase/messaging';
import {requestUserPermission} from './src/utils/notification';
import notifee from '@notifee/react-native';
import {PortalProvider} from '@gorhom/portal';
import TaxiNDivide from './src/screens/category/taxi/TaxiNDivide';
import OTTNDivide from './src/screens/category/ott/OTTNDivide';
import OTTDetail from './src/screens/category/ott/OTTDetail';
import CreateOTT from './src/screens/category/ott/CreateOTT';
import DeliveryNDivide from './src/screens/category/delivery/DeliveryNDivide';
import DeliveryDetail from './src/screens/category/delivery/DeliveryDetail';
import CreateDelivery from './src/screens/category/delivery/CreateDelivery';
import SignupSuccess from './src/screens/SignupSuccess';
import DeliverySearch from './src/screens/category/delivery/DeliverySearch';
import Search from './src/components/Search';
import OTTSearch from './src/screens/category/ott/OTTSearch';
import OnboardingGuide from './src/screens/OnboardingGuide';
import ContinueSignUp from './src/screens/ContinueSignUp';
function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
    StatusBar.setBarStyle('dark-content');
    StatusBar.setHidden(false);
    const setInterceptor = setupAxiosInterceptors();
    return () => {
      setInterceptor();
    };
  }, []);

  useEffect(() => {
    const setup = async () => {
      await notifee.createChannel({
        id: 'default',
        name: '기본 알림 채널',
      });
    };
    setup();
    // 알림 권한 요청 및 토큰 획득
    requestUserPermission();

    // 포그라운드에서 수신된 알림 처리
    const unsubscribe = messaging().onMessage(async remoteMessage => {
     // console.log('🔥 포그라운드 알림 수신:', remoteMessage);

      // 로컬 알림 띄우기 (notifee 이용)
      await notifee.displayNotification({
        title: remoteMessage.notification?.title || '알림',
        body: remoteMessage.notification?.body || '',
        data: remoteMessage.data, // 화면 이동을 위한 데이터 추가
        android: {
          channelId: 'default',
        },
      });
    });

    // 앱이 백그라운드에 있을 때 알림 클릭으로 열린 경우
    const unsubscribeNotificationOpen = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log('📱 백그라운드에서 알림 클릭으로 앱 열림:', remoteMessage);
        handleNotificationNavigation(remoteMessage.data);
      },
    );

    // 앱이 완전히 종료된 상태에서 알림 클릭으로 열린 경우
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('📱 종료 상태에서 알림 클릭으로 앱 열림:', remoteMessage);
          handleNotificationNavigation(remoteMessage.data);
        }
      });

    // Notifee 로컬 알림 클릭 처리 (포그라운드 알림 클릭)
    const unsubscribeNotifeeEvent = notifee.onForegroundEvent(
      ({type, detail}) => {
        if (
          type === 1 && // EventType.PRESS
          detail.notification?.data
        ) {
          console.log('📱 포그라운드 알림 클릭:', detail.notification.data);
          handleNotificationNavigation(detail.notification.data);
        }
      },
    );

    return () => {
      unsubscribe();
      unsubscribeNotificationOpen();
      unsubscribeNotifeeEvent();
    };
  }, []);

  // 알림 데이터를 기반으로 화면 이동 처리
  const handleNotificationNavigation = (data: any) => {
    if (!data) return;

    console.log('🗺️ 알림 네비게이션 데이터:', data);

    // screen과 chatroomId를 확인
    if (data.screen === 'ChatRoom' && data.chatroomId) {
      // chatroomId를 숫자로 변환
      const chatroomId = parseInt(data.chatroomId, 10);

      if (isNaN(chatroomId)) {
        console.error('❌ 잘못된 chatroomId:', data.chatroomId);
        return;
      }

      // navigationRef를 통해 ChatRoom 화면으로 이동
      setTimeout(() => {
        navigationRef.current?.navigate('ChatRoom', {
          chatroomId,
        });
      }, 500); // 앱이 완전히 준비될 때까지 약간의 지연
    }
  };

  const Stack = createNativeStackNavigator();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  const setupAxiosInterceptors = () => {
    axios.defaults.timeout = 10000;

    const requestInterceptors = axios.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        return requestLogger(request);
      },
      error => {
        return Promise.reject(error);
      },
    );
    const responseInterceptors = axios.interceptors.response.use(
      (response: AxiosResponse) => responseLogger(response),
      error => errorLogger(error),
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptors);
      axios.interceptors.response.eject(responseInterceptors);
    };
  };

  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <TabBarVisibilityProvider>
            <PortalProvider>
              <NavigationContainer ref={navigationRef} theme={theme}>
                <Stack.Navigator
                  initialRouteName={'Onboarding'} //MainTab ,Onboarding,Login
                  screenOptions={{
                    headerShown: false,
                  }}>
                  <Stack.Screen name="Onboarding" component={Onboarding} />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="CreateGaldae" component={CreateGaldae} />
                  <Stack.Screen name="CreateOTT" component={CreateOTT} />
                  <Stack.Screen name="NowGaldae" component={NowGaldae} />
                  <Stack.Screen
                    name="NowGaldaeDetail"
                    component={NowGaldaeDetail}
                  />
                  <Stack.Screen
                    name="SetDestination"
                    component={SetDestination}
                  />
                  <Stack.Screen name="DeliverySearch" component={DeliverySearch} />
                  <Stack.Screen name="Search" component={Search} />
                  <Stack.Screen name="SignUp" component={SignUp} />
                  <Stack.Screen
                    name="ReviewInProgress"
                    component={ReviewInProgress}
                  />
                  <Stack.Screen name="TermsDetail" component={TermsDetail} />
                  <Stack.Screen name="MainTab" component={MainTab} />
                  <Stack.Screen name="ChatRoom" component={ChatRoom} />
                  <Stack.Screen name="Settlement" component={Settlement} />
                  <Stack.Screen name="MyInfo" component={MyInfo} />
                  <Stack.Screen name="Payment" component={Payment} />
                  <Stack.Screen
                    name="AccountRegister"
                    component={AccountRegister}
                  />
                  <Stack.Screen name="MyGaldae" component={MyGaldae} />
                  <Stack.Screen
                    name="MyGaldaeHistory"
                    component={MyGaldaeHistory}
                  />
                  <Stack.Screen
                    name="NicknameChange"
                    component={NicknameChange}
                  />
                  <Stack.Screen name="Announcement" component={Announcement} />
                  <Stack.Screen name="UserGuide" component={UserGuide} />
                  <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
                  <Stack.Screen
                    name="TermsOfUseDetail"
                    component={TermsOfUseDetail}
                  />
                  <Stack.Screen name="FAQ" component={FAQ} />
                  <Stack.Screen name="Answer" component={Answer} />
                  <Stack.Screen name="Inquiry" component={Inquiry} />
                  <Stack.Screen name="Logout" component={Logout} />
                  <Stack.Screen name="WithDraw" component={WithDraw} />
                  <Stack.Screen name="Notification" component={Notification} />
                  <Stack.Screen name="TaxiNDivide" component={TaxiNDivide} />
                  <Stack.Screen name="OTTNDivide" component={OTTNDivide} />
                  <Stack.Screen name="OTTDetail" component={OTTDetail} />
                  <Stack.Screen name="DeliveryNDivide" component={DeliveryNDivide} />
                  <Stack.Screen name="DeliveryDetail" component={DeliveryDetail} />
                  <Stack.Screen name="CreateDelivery" component={CreateDelivery} />
                  <Stack.Screen name="SignupSuccess" component={SignupSuccess} />
                  <Stack.Screen name="OnboardingGuide" component={OnboardingGuide} />
                  <Stack.Screen name="OTTSearch" component={OTTSearch} />
                  <Stack.Screen name="ContinueSignUp" component={ContinueSignUp} />
                </Stack.Navigator>
              </NavigationContainer>
            </PortalProvider>
          </TabBarVisibilityProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
