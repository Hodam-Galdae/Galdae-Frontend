import React, {useState, useEffect, useCallback} from 'react';
import { View } from 'react-native';
import Tabs from '../components/Tabs';
import styles from '../styles/Chat.style';
import ChatRoomItem from '../components/ChatRoomItem';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { ChatroomResponse, getActiveChatroom, getInActiveChatroom } from '../api/chatApi';
import { useFocusEffect } from '@react-navigation/native';

type RootStackParamList = {
  ChatRoom: { data : Readonly<ChatroomResponse> },
};

type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChatRoom'>;

const Chat: React.FC = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const [chatRoomData, setChatRoomData] = useState<ChatroomResponse[]>([]);
  const [tab, setTab] = useState(0);

  useFocusEffect(
    useCallback(() => {
      if(tab === 0) { // 참여중인 갈대 탭
        getActiveChatroom().then(data => {
          setChatRoomData(data);
        });
      }
      else { // 완료된 갈대 탭
        getInActiveChatroom().then(data => {
          setChatRoomData(data);
        });
      }
    }, [tab]
  ));

  const navigate = (id: string) => {
    const tagetRoom = chatRoomData.find(item => item.chatroomId === id);

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
        keyExtractor={(item) => item.chatroomId}
        renderItem={({item}) => <ChatRoomItem onPress={navigate} id={item.chatroomId} time={new Date(item.departDate)} from={item.departPlace} to={item.arrivePlace} currentPerson={item.currentMemberCount} maxPerson={item.maxMemberCount} message={33}/>}
      />
    </View>
  );
};

export default Chat;
