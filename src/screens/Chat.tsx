// Chat.tsx 테스트
import React, {useState} from 'react';
import { View } from 'react-native';
import Tabs from '../components/Tabs';
import stlyes from '../styles/Chat.style';
import ChatRoomItem from '../components/ChatRoomItem';

const Chat: React.FC = () => {
  const [tab, setTab] = useState(0);

  return (
    <View style={stlyes.container}>
      <Tabs
        menus={['참여중인 갈대', '완료된 갈대']}
        onSelectHandler={(index) => setTab(index)}
        selectedIndex={tab}
      />
      <ChatRoomItem time="2025년 00월 00일 (0) 00:00" from="학교" to="호암동" currentPerson={1} maxPerson={4} message={5}/>
    </View>
  );
};

export default Chat;
