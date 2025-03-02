import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Platform, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './src/components/MainTab';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import CreateGaldae from './src/screens/CreateGaldae';
import NowGaldae from './src/screens/NowGaldae';
import NowGaldaeDetail from './src/screens/NowGaldaeDetail';
import Onboarding from './src/screens/Onboarding';
import ChatRoom from './src/screens/ChatRoom';
import SetDestination from './src/screens/SetDestination';
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
function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      // StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
    StatusBar.setBarStyle('dark-content');
    StatusBar.setHidden(false);

    const setInterceptor = setupAxiosInterceptors();
    return () => {
      setInterceptor();
    };
  }, []);

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
            (error) => errorLogger(error)
        );


        return () => {
            axios.interceptors.request.eject(requestInterceptors);
            axios.interceptors.response.eject(responseInterceptors);
        };
    };

    return (

        <GestureHandlerRootView>
            <SafeAreaProvider>
                <NavigationContainer theme={theme}>
                    <Stack.Navigator
                        initialRouteName="Onboarding"
                        screenOptions={{
                            headerShown: false,
                        }}
                    >

                        <Stack.Screen name="Onboarding" component={Onboarding} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="CreateGaldae" component={CreateGaldae} />
                        <Stack.Screen name="NowGaldae" component={NowGaldae} />
                        <Stack.Screen name="NowGaldaeDetail" component={NowGaldaeDetail} />
                        <Stack.Screen name="SetDestination" component={SetDestination} />
                        <Stack.Screen name="SignUp" component={SignUp} />
                        <Stack.Screen
                          name="ReviewInProgress"
                          component={ReviewInProgress}
                        />
                        <Stack.Screen name="TermsDetail" component={TermsDetail} />
                        <Stack.Screen name="MainTab" component={MainTab} />
                        <Stack.Screen name="ChatRoom" component={ChatRoom}/>
                        <Stack.Screen name="Settlement" component={Settlement}/>
                        <Stack.Screen name="MyInfo" component={MyInfo}/>
                        <Stack.Screen name="Payment" component={Payment}/>
                        <Stack.Screen name="AccountRegister" component={AccountRegister}/>
                        <Stack.Screen name="MyGaldae" component={MyGaldae}/>
                        <Stack.Screen name="MyGaldaeHistory" component={MyGaldaeHistory}/>
                        <Stack.Screen name="NicknameChange" component={NicknameChange}/>
                        <Stack.Screen name="Announcement" component={Announcement}/>
                        <Stack.Screen name="UserGuide" component={UserGuide}/>
                        <Stack.Screen name="TermsOfUse" component={TermsOfUse}/>
                        <Stack.Screen name="TermsOfUseDetail" component={TermsOfUseDetail}/>
                        <Stack.Screen name="FAQ" component={FAQ}/>
                        <Stack.Screen name="Answer" component={Answer}/>
                        <Stack.Screen name="Inquiry" component={Inquiry}/>
                        <Stack.Screen name="Logout" component={Logout}/>
                        <Stack.Screen name="WithDraw" component={WithDraw}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </GestureHandlerRootView>

);

}

export default App;
