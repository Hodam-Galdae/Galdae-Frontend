import React, {useState, useCallback} from 'react';
import {View, SectionList} from 'react-native';
import styles from '../styles/Chat.style';
import ChatRoomItem from '../components/ChatRoomItem';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {
  ChatroomResponse,
  getActiveChatroom,
  getInActiveChatroom,
} from '../api/chatApi';
import {useFocusEffect} from '@react-navigation/native';
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

type SectionData = {
  title: string;
  data: ChatroomResponse[];
};

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
          console.log(`activeData`,activeData);
          console.log(`inactiveData`,inactiveData);
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

  // 섹션 데이터 구성
  const sections: SectionData[] = [];

  if (activeChatRoomData.length > 0) {
    sections.push({
      title: '참여하고 있는 채팅',
      data: activeChatRoomData,
    });
  }

  if (inactiveChatRoomData.length > 0) {
    sections.push({
      title: '지난 채팅',
      data: inactiveChatRoomData,
    });
  }

  const renderSectionHeader = ({section}: {section: SectionData}) => (
    <View style={styles.sectionHeader}>
      <BasicText style={styles.sectionTitle} text={section.title} />
    </View>
  );

  const renderItem = ({item}: {item: ChatroomResponse}) => (
    <ChatRoomItem
      //type={item.type}
      onPress={navigate}
      id={item.chatroomId}
      time={item.departDate}
      from={item.departPlace}
      //from
      to={item.arrivePlace}
      currentPerson={item.currentMemberCount}
      maxPerson={item.maxMemberCount}
      message={item.notReadCount}
      isActive={activeChatRoomData.some(activeItem => activeItem.chatroomId === item.chatroomId)}
    />
  );

  return (
    <View style={styles.container}>

      {sections.length > 0 ? (
        <SectionList
          sections={sections}
          keyExtractor={item => item.chatroomId}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      ) : (
        <View style={styles.noData}>
          <BasicText
            text="현재 참여중인 채팅이 없습니다."
            color={theme.colors.blackV3}
          />
          <BasicText
            text="홈에 있는 서비스를 이용해 활성화해보세요!"
            color={theme.colors.blackV3}
          />
          <BasicText
            text="서비스 이용 가이드"
            color={theme.colors.blue}
            onPress={() => {}}// 추후 수정
          />
        </View>
      )}
    </View>
  );
};

export default Chat;
