import React, { useState, useCallback } from 'react';
import { View, SectionList } from 'react-native';
import styles from '../styles/Chat.style';
import ChatRoomItem from '../components/ChatRoomItem';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {
  fetchMyChatrooms,
  ChatroomSummary,
} from '../api/chatApi';
import { useFocusEffect } from '@react-navigation/native';
import BasicText from '../components/BasicText';
import { theme } from '../styles/theme';
import { GroupType } from '../types/groupTypes';

type RootStackParamList = {
  ChatRoom: { chatroomId: number };
};

type ChatScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ChatRoom'
>;



type SectionData = {
  title: string;
  data: ChatroomSummary[];
};

const Chat: React.FC = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const [activeChatRoomData, setActiveChatRoomData] = useState<ChatroomSummary[]>([]);

  useFocusEffect(
    useCallback(() => {
      // 참여중인 갈대와 완료된 갈대를 모두 가져오기
      const fetchAllChatRooms = async () => {
        try {
          const [activeData] = await Promise.all([
            fetchMyChatrooms(),
          ]);
          console.log('activeData', activeData);
          setActiveChatRoomData(activeData);
        } catch (error) {
          console.error('채팅방 데이터 가져오기 실패:', error);
        }
      };

      fetchAllChatRooms();
    }, []),
  );

  const navigate = async (id: string) => {
    // 활성 채팅방과 비활성 채팅방 모두에서 찾기
    const targetRoom = activeChatRoomData.find(item => item.chatroomId === Number(id));

    if (targetRoom) {
      navigation.navigate('ChatRoom', { chatroomId: targetRoom.chatroomId });
    }
    else {
      // console.log('error');
      return;
    }
  };

  // 섹션 데이터 구성
  const sections: SectionData[] = [];
  let activeChatRoomData2: ChatroomSummary[] = [];
  let inactiveChatRoomData2: ChatroomSummary[] = [];

  console.log('activeChatRoomData', activeChatRoomData);
  for (const item of activeChatRoomData) {
    if (item.isActive === true) {
      activeChatRoomData2.push(item);
    } else {
      inactiveChatRoomData2.push(item);
    }
  }
  console.log('activeChatRoomData2', activeChatRoomData2);
  console.log('inactiveChatRoomData2', inactiveChatRoomData2);
  sections.push({
    title: '참여하고 있는 채팅',
    data: activeChatRoomData2,
  });

  sections.push({
    title: '종료된 채팅',
    data: inactiveChatRoomData2,
  });

  const renderSectionHeader = ({ section }: { section: SectionData }) => (
    <View style={styles.sectionHeader}>
      <BasicText style={styles.sectionTitle} text={section.title} />
    </View>
  );

  const renderItem = ({ item }: { item: ChatroomSummary }) => (
    <ChatRoomItem
      //type={item.type}
      type={item.groupType as GroupType}
      onPress={navigate}
      id={item.chatroomId.toString()}
      time={item.lastChatDate}
      from={item.titleLeft || ''}
      //from
      to={item.titleRight || ''}
      currentPerson={item.notReadCount}
      unreadCount={item.notReadCount}
      message={item.lastChat}
      isActive={item.isActive}
    />
  );

  return (
    <View style={styles.container}>

      {sections.length > 0 ? (
        <SectionList
          sections={sections}
          keyExtractor={item => item.chatroomId.toString()}
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
            onPress={() => { }}// 추후 수정
          />
        </View>
      )}
    </View>
  );
};

export default Chat;
