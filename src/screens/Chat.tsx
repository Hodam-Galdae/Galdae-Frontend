// Chat.tsx 테스트
import React, {useState} from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { theme } from '../styles/theme';
import BasicText from '../components/BasicText';
import Tabs from '../components/Tabs';

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const Chat: React.FC = () => {
  const [tab, setTab] = useState(0);
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        menus={['메뉴1', '메뉴2']}
        onSelectHandler={(index) => {
          setTab(index);
        }}
        selectedIndex={tab}
      />
    </View>
  );
};

export default Chat;
