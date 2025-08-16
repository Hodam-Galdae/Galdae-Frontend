import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
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
  const [activeChatRoomData, setActiveChatRoomData] = useState<ChatroomResponse[]>([]);
  const [inactiveChatRoomData, setInactiveChatRoomData] = useState<ChatroomResponse[]>([]);

  useFocusEffect(
    useCallback(() => {
      // 참여중인 갈대와 완료된 갈대를 모두 가져오기
      const fetchAllChatRooms = async () => {
        try {
          const [activeData, inactiveData] = await Promise.all([
            getActiveChatroom(),
            getInActiveChatroom(),
          ]);
          setActiveChatRoomData(activeData);
          setInactiveChatRoomData(inactiveData);
        } catch (error) {
          console.error('채팅방 데이터 가져오기 실패:', error);
        }
      };

      fetchAllChatRooms();
    }, []),
  );

  const navigate = async(id: string) => {
    // 활성 채팅방과 비활성 채팅방 모두에서 찾기
    const targetRoom = activeChatRoomData.find(item => item.chatroomId === id) ||
                      inactiveChatRoomData.find(item => item.chatroomId === id);

    const userInfo = await getUserInfo();
    const token = await EncryptedStorage.getItem('accessToken');

    if(targetRoom){
      navigation.navigate('ChatRoom', { data: Object.freeze(targetRoom), userInfo: {...userInfo, token}});
    }
    else{
     // console.log('error');
      return;
    }
  };

  // 모든 채팅방 데이터를 하나의 배열로 합치기
  const allChatRoomData = [...activeChatRoomData, ...inactiveChatRoomData];

  return (
    <View style={styles.container}>
      {allChatRoomData.length !== 0 ? (
        <FlatList
          data={allChatRoomData}
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
              isActive={activeChatRoomData.some(activeItem => activeItem.chatroomId === item.chatroomId)}
            />
          }
        />
      ) : (
        <View style={styles.noData}>
          <SVG name="information_line" />
          <BasicText
            text="참여중인 채팅방이 없습니다."
            color={theme.colors.grayV1}
          />
        </View>
      )}
    </View>
  );
};

export default Chat;
