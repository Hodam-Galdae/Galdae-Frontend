/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Platform,View } from 'react-native';
import Home from '../screens/Home';
import MyInfo from '../screens/MyInfo';
import Chat from '../screens/Chat';
import SVG from '../components/SVG';
import Header from './Header';
import { theme } from '../styles/theme';
import SVGButton from './button/SVGButton';
import BasicText from '../components/BasicText';
import styles from '../styles/Header.style';
// 내비게이션 스택 타입 정의
type RootStackParamList = {
  Notification: undefined;
};

function App(): React.JSX.Element {


    const Tab = createBottomTabNavigator();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <Tab.Navigator
            initialRouteName="홈"
            screenOptions={{
              header: () => <Header rightButton={<SVGButton iconName="Notification" onPress={()=>navigation.navigate('Notification')}/>}/>,
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
            }}
          >
            <Tab.Screen
              name="홈"
              component={Home as React.ComponentType<any>}
              options={{
                tabBarIcon: ({ focused, size }) => {
                  const iconName = focused ? 'ClickedHomeIcon' : 'HomeIcon';
                  return (
                    <View style={{ paddingHorizontal: 30,paddingVertical:20,}}>
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
                header: () => <Header
                // rightButton={<SVGButton
                //   iconName="Notification"
                //   onPress={()=>navigation.navigate('Notification')}/>}
                  title={<BasicText text="채팅" style={styles.mainTitle} />}
                  />,
                tabBarIcon: ({ focused, size }) => {
                  const iconName = focused ? 'ClickedChatIcon' : 'ChatIcon';
                  return (
                    <View style={{ paddingHorizontal: 30,paddingVertical:20,}}>
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
                header: () => <Header
                // rightButton={<SVGButton
                //   iconName="Notification"
                //   onPress={()=>navigation.navigate('Notification')}/>}
                  title={<BasicText text="내 정보" style={styles.mainTitle} />}
                  />,
                tabBarIcon: ({ focused, size }) => {
                  const iconName = focused ? 'ClickedMyInfoIcon' : 'MyInfoIcon';
                  return (
                    <View style={{ paddingHorizontal: 30,paddingVertical:20, }}>
                      <SVG name={iconName} width={size} height={size} />
                    </View>
                  );
                },
              }}
            />


        </Tab.Navigator>
    );
}

export default App;
