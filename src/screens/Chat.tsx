import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import Tabs from '../components/Tabs';
import styles from '../styles/Chat.style';
import ChatRoomItem from '../components/ChatRoomItem';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {
  ChatroomResponse,
  getActiveChatroom,
  getInActiveChatroom,
} from '../api/chatApi';
import {useFocusEffect} from '@react-navigation/native';
import SVG from '../components/SVG';
import BasicText from '../components/BasicText';
import {theme} from '../styles/theme';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getUserInfo } from '../api/membersApi';

type RootStackParamList = {
  ChatRoom: {data: Readonly<ChatroomResponse>, userInfo: Readonly<User>};
};

type ChatScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ChatRoom'
>;

type User = {
  nickname: string,
  image: string,
  university: string,
  bankType: string,
  accountNumber: string,
  depositor: string,
  token: string,
}

const Chat: React.FC = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const [chatRoomData, setChatRoomData] = useState<ChatroomResponse[]>([]);
  const [tab, setTab] = useState(0);

  useFocusEffect(
    useCallback(() => {
      if (tab === 0) {
        // 참여중인 갈대 탭
        getActiveChatroom().then(data => {
          setChatRoomData(data);
        });
      } else {
        // 완료된 갈대 탭
        getInActiveChatroom().then(data => {
          setChatRoomData(data);
        });
      }
    }, [tab]),
  );

  const navigate = async(id: string) => {
    const tagetRoom = chatRoomData.find(item => item.chatroomId === id);
    const userInfo = await getUserInfo();
    const token = await EncryptedStorage.getItem('accessToken');
    if(tagetRoom){
      navigation.navigate('ChatRoom', { data: Object.freeze(tagetRoom), userInfo: {...userInfo, token}});
    }
    else{
     // console.log('error');
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Tabs
        menus={['참여중인 갈대', '완료된 갈대']}
        onSelectHandler={index => setTab(index)}
        selectedIndex={tab}
      />
      {chatRoomData.length !== 0 ? (
        <FlatList
          data={chatRoomData}
          keyExtractor={item => item.chatroomId}
          renderItem={({item}) =>
            <ChatRoomItem
              onPress={navigate}
              id={item.chatroomId}
              time={item.departDate}
              from={item.departPlace}
              to={item.arrivePlace}
              currentPerson={item.currentMemberCount}
              maxPerson={item.maxMemberCount}
              message={item.notReadCount}
            />
          }
        />
      ) : (
        <View style={styles.noData}>
          <SVG name="information_line" />
          <BasicText
            text="참여중인 채팅방이 없습니다."
            color={theme.colors.gray1}
          />
        </View>
      )}
    </View>
  );
};

export default Chat;
