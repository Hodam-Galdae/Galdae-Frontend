/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import MyInfo from '../screens/MyInfo';
import Chat from '../screens/Chat';
import SVG from '../components/SVG';
import { moderateScale } from '../utils/ScreenScaler';
import styles from '../styles/MainTab.style';
import { theme } from '../styles/theme';

function App(): React.JSX.Element {


    const Tab = createBottomTabNavigator();


    return (
        <Tab.Navigator
            initialRouteName="홈"
            screenOptions={{
              // 탭 아이콘, 스타일 등을 여기에 설정할 수 있습니다.
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.colors.primary,
                height: moderateScale(84),
              },
              headerTitleAlign: 'center', // 헤더 타이틀을 가운데 정렬
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              // 헤더 가운데에 로고 추가
              headerTitle: () => (
                <View style={styles.container}>
                  <SVG name="GaldaeLogoTest" width={moderateScale(87)} height={moderateScale(39)} />
                </View>
              ),
              // 헤더 오른쪽에 종 모양 아이콘 추가
              headerRight: () => (
                <View style={{ marginRight: moderateScale(10) }}>
                  {/* 'BellIcon'이라는 이름의 SVG 파일이 assets에 있어야 합니다. */}
                  <SVG
                    name="Notification"
                    width={moderateScale(50)}
                    height={moderateScale(50)}
                  />
                </View>
              ),
              tabBarActiveTintColor: theme.colors.primary,
              tabBarInactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="내정보" component={MyInfo} />
            <Tab.Screen name="홈" component={Home} />
            <Tab.Screen name="채팅" component={Chat} />
        </Tab.Navigator>
    );
}

export default App;
