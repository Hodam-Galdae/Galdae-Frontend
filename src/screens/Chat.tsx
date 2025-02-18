// Chat.tsx 테스트
import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import Tabs from '../components/Tabs';
import stlyes from '../styles/Chat.style';
import ChatRoomItem from '../components/ChatRoomItem';

type ChatRoomType = {
  id: number,
  time: string;
  from: string;
  to: string;
  currentPerson: number;
  maxPerson: number;
  message: number;
};

const Chat: React.FC = () => {
  const [chatRoomData, setChatRoomData] = useState<ChatRoomType[]>([]); 
  const [tab, setTab] = useState(0);

  useEffect(()=> {
    setChatRoomData([
      {
        id: 1,
        time: '2025년 00월 00일 (0) 00:00',
        from: '학교',
        to: '호암동',
        currentPerson: 1,
        maxPerson: 4,
        message: 5,
      },
      {
        id: 2,
        time: '2025년 00월 00일 (0) 00:00',
        from: '서울역',
        to: '호암동',
        currentPerson: 1,
        maxPerson: 4,
        message: 5,
      },
    ]);
  }, [tab]);

  return (
    <View style={stlyes.container}>
      <Tabs
        menus={['참여중인 갈대', '완료된 갈대']}
        onSelectHandler={(index) => setTab(index)}
        selectedIndex={tab}
      />
      {chatRoomData.map((e) => {
        return <ChatRoomItem key={e.id} time={e.time} from={e.from} to={e.to} currentPerson={e.currentPerson} maxPerson={e.maxPerson} message={e.message}/>
      })};
    </View>
  );
};

export default Chat;
