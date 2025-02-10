
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import MyInfo from '../screens/MyInfo';
import Chat from '../screens/Chat';


function App(): React.JSX.Element {


    const Tab = createBottomTabNavigator();


    return (
        <Tab.Navigator
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
        </Tab.Navigator>
    );
}

export default App;
