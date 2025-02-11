/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import MyInfo from '../screens/MyInfo';
import Chat from '../screens/Chat';
import SVG from '../components/SVG';
import Header from './Header';
import { theme } from '../styles/theme';
import { moderateScale } from '../utils/ScreenScaler';

function App(): React.JSX.Element {


    const Tab = createBottomTabNavigator();


    return (
        <Tab.Navigator
            initialRouteName="홈"
            screenOptions={{
              // 탭 아이콘, 스타일 등을 여기에 설정할 수 있습니다.
              header: () => <Header />,
              tabBarActiveTintColor: theme.colors.tabText,
              tabBarInactiveTintColor: theme.colors.tabDisabledText,
              tabBarStyle: {
                height: moderateScale(106),
              },
              // 각 탭 항목 내부 컨테이너를 중앙 정렬
              tabBarItemStyle: {
                justifyContent: 'center',
                alignItems: 'center',
              },
              // 라벨 텍스트가 있을 경우 중앙 정렬
              tabBarLabelStyle: {
                textAlign: 'center',
              },
            }}
          >
            <Tab.Screen
              name="내정보"
              component={MyInfo}
              options={{
                tabBarIcon: ({ focused, size }) => {
                  const iconName = focused ? 'ClickedMyInfoIcon' : 'MyInfoIcon';
                  return <SVG name={iconName} width={size} height={size}/>;
                },
              }}
            />
            <Tab.Screen
              name="홈"
              component={Home}
              options={{
                tabBarIcon: ({ focused, size }) => {
                  const iconName = focused ? 'ClickedHomeIcon' : 'HomeIcon';
                  return <SVG name={iconName} width={size} height={size}/>;
                },
              }}
            />
            <Tab.Screen
              name="채팅"
              component={Chat}
              options={{
                tabBarIcon: ({ focused, size }) => {
                  const iconName = focused ? 'ClickedChatIcon' : 'ChatIcon';
                  return <SVG name={iconName} width={size} height={size}/>;
                },
              }}
            />
        </Tab.Navigator>
    );
}

export default App;
