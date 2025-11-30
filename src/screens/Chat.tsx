import React, { useState, useCallback, useEffect } from 'react';
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
import BasicButton from '../components/button/BasicButton';
import SVG from '../components/SVG';
import { theme } from '../styles/theme';
import { GroupType } from '../types/groupTypes';
import moment from 'moment';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/redux/RootReducer';

type RootStackParamList = {
  ChatRoom: { chatroomId: number };
  SignUp: { data: boolean };
  ContinueSignUp: undefined;
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
  const [inactiveChatRoomData, setInactiveChatRoomData] = useState<ChatroomSummary[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const userState = useSelector((state: RootState) => state.user);

  // 사용자 인증 상태 확인
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = await EncryptedStorage.getItem('accessToken');
        // 닉네임이 비어있어도 id가 있으면 인증된 사용자로 간주
        const hasUserInfo = userState.id !== '';

        console.log('🔍 [Chat] 인증 상태 체크:', {
          hasAccessToken: !!accessToken,
          userId: userState.id,
          userNickname: userState.nickname,
          hasUserInfo,
          finalAuth: !!(accessToken && hasUserInfo),
        });

        setIsAuthenticated(!!(accessToken && hasUserInfo));
      } catch (error) {
        console.error('❌ [Chat] 인증 상태 확인 실패:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, [userState]);

  // lastChatDate: ISO string (UTC 기준이라고 가정)
  const formatLastChatDate = (lastChatDate: string) => {
    const now = moment();
    const t = moment.utc(lastChatDate).local(); // UTC → 로컬

    // 미래 시간이면(시계 오차 등) 절충 표시
    if (t.isAfter(now)) {return '방금 전';}

    const years  = now.diff(t, 'years');
    if (years >= 1) {return `${years}년 전`;}

    const months = now.diff(t, 'months');
    if (months >= 1) {return `${months}달 전`;}

    const weeks  = now.diff(t, 'weeks');
    if (weeks >= 1) {return `${weeks}주 전`;}

    const days   = now.diff(t, 'days');
    if (days >= 1) {return `${days}일 전`;}

    const hours  = now.diff(t, 'hours');
    if (hours >= 1) {return `${hours}시간 전`;}

    const minutes = now.diff(t, 'minutes');
    if (minutes <= 0) {return '방금 전';}
    return `${minutes}분 전`;
  };

  // 채팅방 목록 가져오기 함수 (분리하여 재사용 가능하도록)
  const fetchAllChatRooms = useCallback(async () => {
    try {
      const allChatrooms = await fetchMyChatrooms();
      console.log('allChatrooms', allChatrooms);

      // isActive 필드로 active/inactive 구분
      const activeData = allChatrooms.filter(room => room.isActive);
      const inactiveData = allChatrooms.filter(room => !room.isActive);

      setActiveChatRoomData(activeData);
      setInactiveChatRoomData(inactiveData);
    } catch (error) {
      console.error('채팅방 데이터 가져오기 실패:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      // 참여중인 갈대와 완료된 갈대를 모두 가져오기
      fetchAllChatRooms();
    }, [fetchAllChatRooms]),
  );

  const navigate = async (id: string) => {
    // 활성 채팅방과 비활성 채팅방 모두에서 찾기
    const targetRoom =
      activeChatRoomData.find(item => item.chatroomId === Number(id)) ||
      inactiveChatRoomData.find(item => item.chatroomId === Number(id));

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

  // Backend에서 이미 active/inactive로 분리되어 오므로 그대로 사용
  // 데이터가 있을 때만 섹션 추가
  if (activeChatRoomData.length > 0) {
    sections.push({
      title: '참여하고 있는 N빵',
      data: activeChatRoomData,
    });
  }

  if (inactiveChatRoomData.length > 0) {
    sections.push({
      title: '종료된 N빵',
      data: inactiveChatRoomData,
    });
  }

  const renderSectionHeader = ({ section }: { section: SectionData }) => (
    <View style={styles.sectionHeader}>
      <BasicText style={styles.sectionTitle} text={section.title} />
    </View>
  );

  const renderItem = ({ item }: { item: ChatroomSummary }) => (
    <ChatRoomItem
      type={item.groupType as GroupType}
      onPress={navigate}
      onDelete={fetchAllChatRooms}
      id={item.chatroomId?.toString() || '0'}
      time={item.lastChatDate ? formatLastChatDate(item.lastChatDate) : ''}
      from={item.titleLeft || ''}
      to={item.titleRight || ''}
      currentPerson={item.notReadCount || 0}
      unreadCount={item.notReadCount || 0}
      message={item.lastChat || ''}
      isActive={item.isActive ?? true}
    />
  );

  // 인증되지 않은 경우 안내 화면 표시
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.authRequiredContainer}>
          <SVG name="NeedInfo" style={styles.needInfoIcon} />
          <BasicText
            text="학교 인증과 회원 정보 입력이 필요합니다."
            fontSize={theme.fontSize.size14}
            fontWeight={'500'}
            color={theme.colors.blackV3}
            style={styles.authRequiredText}
          />
          <BasicButton
            text="내 프로필 완성하기"
            buttonStyle={styles.authRequiredButton}
            textStyle={styles.authRequiredButtonText}
            enabledColors={{
              backgroundColor: theme.colors.white,
              textColor: theme.colors.blue,
              borderColor: theme.colors.blue,
            }}
            onPress={() => navigation.navigate('ContinueSignUp')}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {activeChatRoomData.length > 0 || inactiveChatRoomData.length > 0 ? (
        <SectionList
          sections={sections}
          keyExtractor={item => item.chatroomId?.toString() || Math.random().toString()}
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
