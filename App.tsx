import {Platform, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './src/components/MainTab';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import CreateGaldae from './src/screens/CreateGaldae';
import Onboarding from './src/screens/Onboarding';
import axios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {errorLogger, requestLogger, responseLogger} from 'axios-logger';
import SVGButton from './src/components/button/SVGButton';
import SVG from './src/components/SVG';

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
    };

    return (
        <SafeAreaProvider>
          <NavigationContainer theme={theme}>
              <Stack.Navigator
                  initialRouteName="Onboarding"
              >

                  <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }}/>
                  <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                  <Stack.Screen name="CreateGaldae" component={CreateGaldae} options={({ navigation }) => ({
                            headerTitle: '갈대 생성하기',
                            headerTitleStyle: {
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: 'black',
                            },
                            headerTitleAlign: 'center',
                            headerLeft: () => (<SVGButton iconName="LeftArrow" onPress={() => navigation.goBack()}/>),
                            })}
                    />
                  <Stack.Screen name="SignUp" component={SignUp} options={({ navigation }) => ({
                            headerTitle: () => <SVG name="Logo" style={{width: 81, height: 33}}/>,
                            headerTitleAlign: 'center',
                            headerLeft: () => (<SVGButton iconName="LeftArrow" onPress={() => navigation.goBack()}/>),
                            })}/>
                  <Stack.Screen name="MainTab" component={MainTab} options={{ headerShown: false }}/>

              </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>

    );
}

export default App;
