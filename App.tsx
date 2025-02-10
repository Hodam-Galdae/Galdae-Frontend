import {Platform, StatusBar} from "react-native";
import React, {useEffect} from "react";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import MainTab from './src/components/MainTab'
import Login from './src/screens/Login'
import SignUp from './src/screens/SignUp'
import Onboarding from './src/screens/Onboarding';
import MyInfo from './src/screens/MyInfo';
import Chat from './src/screens/Chat';
import axios, {AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {errorLogger, requestLogger, responseLogger} from "axios-logger";

function App(): React.JSX.Element {
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

    const Stack = createNativeStackNavigator();

    const Tab = createBottomTabNavigator();
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
            (error) => {
                return Promise.reject(error);
            }
        );

        const responseInterceptors = axios.interceptors.response.use(
            (response: AxiosResponse) => responseLogger(response),
            (error) => errorLogger(error)
        );


        return () => {
            axios.interceptors.request.eject(requestInterceptors);
            axios.interceptors.response.eject(responseInterceptors);
        };
    }

    return (
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
                  <Stack.Screen name="SignUp" component={SignUp} />
                  <Stack.Screen name="MainTab" component={MainTab} />
               
              </Stack.Navigator>
              {/* <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                  // 탭 아이콘, 스타일 등을 여기에 설정할 수 있습니다.
                  headerShown: false,
                  tabBarActiveTintColor: '#007AFF',
                  tabBarInactiveTintColor: 'gray',
                }}
              >
                <Tab.Screen name="MyInfo" component={MyInfo} />
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Chat" component={Chat} />
              </Tab.Navigator> */}
          </NavigationContainer>   
        </SafeAreaProvider>
        
    );
}

export default App;
