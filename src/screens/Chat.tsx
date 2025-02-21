// Chat.tsx 테스트
import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import Tabs from '../components/Tabs';
import styles from '../styles/Chat.style';
import ChatRoomItem from '../components/ChatRoomItem';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

type RootStackParamList = {
  ChatRoom: { data : Readonly<ChatRoomType> },
};

type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChatRoom'>;

type ChatRoomType = {
  id: string,
  time: string;
  from: string;
  to: string;
  currentPerson: Member[];
  maxPerson: number;
  message: number;
};

type Member = {
  id: string,
  image: string,
  name: string,
  account?: Account
};

type Account = {
  bankName: string,
  accountNumber: string,
};

const Chat: React.FC = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const [chatRoomData, setChatRoomData] = useState<ChatRoomType[]>([]);
  const [tab, setTab] = useState(0);

  useEffect(()=> {
    setChatRoomData([
      {
        id: '1',
        time: '2025년 00월 00일 (0) 00:00',
        from: '학교',
        to: '호암동',
        currentPerson: [
          {
            id: 'a',
            image: '',
            name: 'donghyun',
            account: {
              bankName: '우리은행',
              accountNumber: '1234-12312312-12312',
            },
          },
          {
            id: 'b',
            image: '',
            name: 'lee',
          },
        ],
        maxPerson: 4,
        message: 5,
      },
      {
        id: '2',
        time: '2025년 00월 00일 (0) 00:00',
        from: '서울역',
        to: '호암동',
        currentPerson: [
          {
            id: 'a',
            image: '',
            name: 'donghyun',
            account: {
              bankName: '우리은행',
              accountNumber: '1234-12312312-12312',
            },
          },
          {
            id: 'b',
            image: '',
            name: 'lee',
          },
          {
            id: 'c',
            image: '',
            name: 'park',
          },
        ],
        maxPerson: 4,
        message: 5,
      },
    ]);
  }, [tab]);

  const navigate = (id: string) => {
    const tagetRoom = chatRoomData.find(item => item.id === id);

    if(tagetRoom){
      navigation.navigate('ChatRoom', { data: Object.freeze(tagetRoom)});
    }
    else{
      console.log('error');
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Tabs
        menus={['참여중인 갈대', '완료된 갈대']}
        onSelectHandler={(index) => setTab(index)}
        selectedIndex={tab}
      />
      <FlatList
        data={chatRoomData}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <ChatRoomItem onPress={navigate} id={item.id} key={item.id} time={item.time} from={item.from} to={item.to} currentPerson={item.currentPerson} maxPerson={item.maxPerson} message={item.message}/>}
      />
    </View>
  );
};

export default Chat;
