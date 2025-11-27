/* eslint-disable react/no-unstable-nested-components */

/* eslint-disable react-native/no-inline-styles */
// Chat.tsx 테스트
// 채팅 메시지 수신 시 채팅 목록 업데이트
// 안 읽은 사람 수 구독

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  PanResponder,
  FlatList,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardEvent,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image,
  AppState,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import styles from '../styles/ChatRoom.style';
import { theme } from '../styles/theme';
import ChatItem from '../components/ChatItem';
import SVGButton from '../components/button/SVGButton';
import BasicText from '../components/BasicText';
import SettlementBox from '../components/SettlementBox';
import DateSeparator from '../components/DateSeparator';
import useImagePicker from '../hooks/useImagePicker';
import SVG from '../components/SVG';
import BasicButton from '../components/button/BasicButton';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SettlementRequestPopup from '../components/popup/SettlementRequestPopup';
import { SettlementRequestPopupRef } from '../components/popup/SettlementRequestPopup';
import ReportModal from '../components/popup/ReportModal';
import ChatRoomExitModal from '../components/popup/ChatRoomExitModal';
import ReportCheckModal from '../components/popup/ReportCheckModal';
import ImageViewerModal from '../components/popup/ImageViewerModal';
import useDidMountEffect from '../hooks/useDidMountEffect';
import Header from '../components/Header';
import { useWebSocket } from '../hooks/useWebSocket';
import { getUserInfo } from '../api/membersApi';
// import RNFS from 'react-native-fs'; // Unused
import {
  ChatItem as ChatItemType,
  fetchChatMembers,
  fetchChatroomInfo,
  fetchChats,
  leaveChatroom,
  ChatMember as MemberResponse,
  sendChatImage,
  createPayment,
} from '../api/chatApi';
import moment from 'moment';
import { createReport } from '../api/reportApi';
import Loading from '../components/Loading';
import SettlementCostEditModal from '../components/popup/SettlementCostEditModal';
import EncryptedStorage from 'react-native-encrypted-storage';
import { UserInfo } from '../types/getTypes';
type SettlementType = {
  accountNumber: String;
  accountBank: String;
  cost: number;
  time: Date;
  id: string;
};

type RenderItem = {
  item: ChatItemType;
  index: number;
};

type RootStackParamList = {
  ChatRoom: { chatroomId: number };
  Settlement: { data: Readonly<SettlementType>; chatroomId: number };
};



const ChatRoom: React.FC = () => {
  const [data, setData] = useState<ChatItemType[]>([]);
  const [message, setMessage] = useState<string>('');
  const [showExtraView, setShowExtraView] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [initialCost, setInitialCost] = useState<number>(0);  // 초기 정산 금액
  const [isAppActive, setIsAppActive] = useState<boolean>(true); // 앱 포그라운드 상태 추적
  const [isSettlementRequestPopupOpen, setSettlementRequestPopupOpen] = useState<boolean>(false);
  const [isVisibleReportPopup, setIsVisibleReportPopup] =
    useState<boolean>(false);
  const [isVisibleReportCheckPopup, setIsVisibleReportCheckPopup] =
    useState<boolean>(false);
  const [isVisibleExitPopup, setIsVisibleExitPopup] = useState<boolean>(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const [unreadCounts, setUnreadCounts] = useState<{ [key: number]: number }>({});
  const [selectedImageUri, setSelectedImageUri] = useState<string>('');
  const [isImageViewerVisible, setIsImageViewerVisible] = useState<boolean>(false);
  const chatListRef = useRef<FlatList>(null);
  const { imageUri, getImageByCamera, getImageByGallery } =
    useImagePicker();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'Settlement'>
    >();
  const SIDE_MENU_WIDTH = Dimensions.get('window').width * 0.7;
  const EXTRA_MENU_HEIGHT = 280;
  const settlementRequestPopupRef = useRef<SettlementRequestPopupRef>(null);
  const translateX = useRef(new Animated.Value(SIDE_MENU_WIDTH)).current;
  const translateY = useRef(new Animated.Value(100)).current;
  const { chatroomId } = useRoute<RouteProp<RootStackParamList, 'ChatRoom'>>().params;

  // chatroomId 유효성 검사 및 디버깅
  console.log('🏠 [ChatRoom] 화면 로드 - chatroomId:', chatroomId, 'type:', typeof chatroomId);
  if (!chatroomId || chatroomId === undefined) {
    console.error('❌ [ChatRoom] chatroomId가 없습니다!');
  }

  const [chatroomTitle, setChatroomTitle] = useState<{
    titleLeft: string;
    titleRight: string | null;
    alertContent: string;
    lastReadChatId: number;
  }>({
    titleLeft: '',
    titleRight: '',
    alertContent: '',
    lastReadChatId: 0,
  });
  const isInitialLoad = useRef(true); // 초기 로드 여부 추적
  const [members, setMembers] = useState<MemberResponse[]>([]);
  const [reportImage, setReportImage] = useState({ uri: '', name: '' });
  const reportData = useRef({
    member: { memberId: '', memberName: '', memberImage: '' },
    reason: '',
  });
  useEffect(() => {
    const getUserInfos = async () => {
      const userInfo = await getUserInfo();
      console.log('ChatRoom 118줄 userInfo', userInfo);
      setUserInfo(userInfo);
    };
    getUserInfos();

    const getToken = async () => {
      const token = await EncryptedStorage.getItem('accessToken');
      console.log(`




        ChatRoom 132줄 token






        `, token);
      setToken('Bearer ' + token);
    };
    getToken();
  }, []);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  console.log('ChatRoom 120줄 userInfo', userInfo);
  const [token, setToken] = useState<string>('');

  // AppState 감지: 백그라운드로 가면 WebSocket 연결 해제
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      console.log('📱 [AppState] 상태 변경:', nextAppState);

      if (nextAppState === 'active') {
        console.log('✅ [AppState] 앱이 포그라운드로 전환됨 - WebSocket 연결 활성화');
        setIsAppActive(true);
      } else if (nextAppState === 'background' || nextAppState === 'inactive') {
        console.log('⚠️ [AppState] 앱이 백그라운드로 전환됨 - WebSocket 연결 비활성화');
        setIsAppActive(false);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // 수평으로 5px 이상 움직였을 때만 pan responder 활성화
        return Math.abs(gestureState.dx) > 5;
      },
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dx > 0) {
          // 오른쪽으로 스와이프하면 translateX를 업데이트
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx > 50) {
          closeSideMenu(); // 충분히 오른쪽으로 스와이프했을 때 메뉴 닫기
        } else {
          openSideMenu(); // 스와이프가 충분하지 않으면 다시 원래 위치로
        }
      },
    }),
  ).current;

  const fetchMembers = useCallback(async () => {
    console.log('📥 [멤버 API] fetchChatMembers 호출 시작 - chatroomId:', chatroomId);
    const memberData = await fetchChatMembers(chatroomId);
    console.log('✅ [멤버 API] fetchChatMembers 응답 성공');
    console.log('👥 [멤버 API] 멤버 수:', memberData.length);
    console.log('📋 [멤버 API] 멤버 데이터:', JSON.stringify(memberData, null, 2));
    setMembers(memberData);
  }, [chatroomId]);

  // const exitChat = async () => {
  //   await leaveChatroom(chatroomId);
  //   navigation.pop();
  // };

  useEffect(() => {
    const fetchChatsFunc = async () => {
      console.log('📥 [채팅 API] fetchChats 호출 시작 - chatroomId:', chatroomId);
      const chatData = await fetchChats(chatroomId);
      console.log('✅ [채팅 API] fetchChats 응답 성공');
      console.log('📊 [채팅 API] 받아온 메시지 개수:', chatData.length);
      console.log('📋 [채팅 API] 채팅 데이터 상세:', JSON.stringify(chatData, null, 2));
      setData(chatData);
    };
    const fetchChatroomInfos = async () => {
      console.log('📥 [채팅방 정보 API] fetchChatroomInfo 호출 시작 - chatroomId:', chatroomId);
      const chatroomData = await fetchChatroomInfo(chatroomId);
      console.log('✅ [채팅방 정보 API] fetchChatroomInfo 응답 성공');
      console.log('📋 [채팅방 정보 API] 채팅방 데이터:', JSON.stringify(chatroomData, null, 2));
      setChatroomTitle(chatroomData);
    };
    fetchChatroomInfos();
    fetchChatsFunc();
  }, [chatroomId]);

  // // ChatRoom 컴포넌트 안
  // useEffect(() => {
  //   console.log('★ 최신 unreadCounts:', unreadCounts);
  // }, [unreadCounts]);

  const { isLoading, sendMessage: wsSendMessage } = useWebSocket({
    chatroomId: chatroomId.toString(),
    token: token,
    enabled: isAppActive, // 앱이 포그라운드일 때만 WebSocket 연결
    onMessageReceived: useCallback((receiveData) => {
      console.log('🔵 [WebSocket] 새 메시지 수신');
      console.log('📩 [WebSocket] 메시지 타입:', receiveData.type);
      console.log('👤 [WebSocket] 발신자:', receiveData.sender);
      console.log('💬 [WebSocket] 메시지 내용:', receiveData.message);
      console.log('🕐 [WebSocket] 전송 시간:', receiveData.time);
      console.log('🖼️ [WebSocket] 발신자 이미지:', receiveData.senderImage);
      console.log('📋 [WebSocket] 전체 데이터:', JSON.stringify(receiveData, null, 2));

      setData(prev => [
        ...prev,
        {
          chatId: prev.length === 0 ? 0 : prev[prev.length - 1].chatId + 1,
          chatContent: receiveData.message,
          sender: receiveData.sender,
          chatType: receiveData.type,
          time: moment.utc(receiveData.time).add(9, 'hours').toISOString(), // UTC+9 (한국 시간)
          memberImage: receiveData.senderImage,
        },
      ]);

      console.log('✅ [WebSocket] 메시지가 로컬 상태에 추가됨');
    }, []),
    onUnreadCountReceived: useCallback((unreadData) => {
      console.log('🔢 [WebSocket] 안읽은 수 업데이트 수신');
      console.log('📊 [WebSocket] 안읽은 수 데이터:', JSON.stringify(unreadData, null, 2));
      setUnreadCounts(unreadData);
      console.log('✅ [WebSocket] 안읽은 수 상태 업데이트 완료');
    }, []),
  });

  const sendPayment = async (settlementCost: string) => {
    // createPayment API가 내부적으로 WebSocket 메시지를 브로드캐스트하므로
    // wsSendMessage를 별도로 호출하지 않음
    try {
      await createPayment(chatroomId.toString(), Number(settlementCost));
    } catch (error: any) {
      console.error('정산 요청 실패:', error);
      const { Alert } = require('react-native');
      Alert.alert(
        '정산 요청 실패',
        error?.message || '정산 요청 중 오류가 발생했습니다.',
        [{ text: '확인' }]
      );
    }
  };

  const sendMessage = async () => {
    if (message.length !== 0) {
      wsSendMessage(message, 'MESSAGE', userInfo?.nickname || '', userInfo?.image || '');
      setMessage('');
    }
  };

  //키보드 이벤트 리스너
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event: KeyboardEvent) => {
        setKeyboardHeight(event.endCoordinates.height);
        closeExtraMenu();
        setShowExtraView(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //채팅 추가될 때 마다 자동 스크롤
  useEffect(() => {
    if (chatListRef.current && data.length > 0) {
      setTimeout(() => {
        if (isInitialLoad.current && chatroomTitle.lastReadChatId > 0) {
          // 초기 로드 시: 마지막으로 읽은 메시지 위치로 스크롤
          const lastReadIndex = data.findIndex(item => item.chatId === chatroomTitle.lastReadChatId);
          if (lastReadIndex !== -1) {
            console.log(`📍 [스크롤] 마지막으로 읽은 메시지(chatId: ${chatroomTitle.lastReadChatId})로 스크롤 (index: ${lastReadIndex})`);
            chatListRef.current?.scrollToIndex({ index: lastReadIndex, animated: false });
          } else {
            // 마지막으로 읽은 메시지를 찾지 못하면 맨 아래로
            console.log('📍 [스크롤] 마지막으로 읽은 메시지를 찾지 못함 - 맨 아래로 스크롤');
            chatListRef.current?.scrollToEnd({ animated: false });
          }
          isInitialLoad.current = false;
        } else {
          // 새 메시지 도착 시: 맨 아래로 스크롤
          chatListRef.current?.scrollToEnd({ animated: false });
        }
      }, 100);
    }
  }, [data, chatroomTitle.lastReadChatId]);

  const toggleExtraView = () => {
    if (showExtraView) {
      closeExtraMenu();
    } else {
      openExtraMenu();
    }
    Keyboard.dismiss();
    setShowExtraView(!showExtraView);
  };

  const openExtraMenu = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeExtraMenu = () => {
    Animated.timing(translateY, {
      toValue: EXTRA_MENU_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const openSideMenu = () => {
    fetchMembers();
    setIsSideMenuOpen(true);
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
    Animated.timing(translateX, {
      toValue: SIDE_MENU_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // 참여자 목록이 열려있을 때만 정기적으로 폴링
  useEffect(() => {
    if (!isSideMenuOpen) {
      return; // 참여자 목록이 닫혀있으면 폴링 안 함
    }

    // 10초마다 참여자 목록 갱신
    const pollingInterval = setInterval(() => {
      fetchMembers();
    }, 10000); // 10초

    // 컴포넌트 언마운트 또는 사이드 메뉴 닫힐 때 인터벌 정리
    return () => {
      clearInterval(pollingInterval);
    };
  }, [isSideMenuOpen, fetchMembers]);

  const checkReportUser = (reason: string) => {
    // 신고 사유 검증
    if (!reason || reason.trim() === '') {
      console.log('❌ [신고] 신고 사유가 선택되지 않았습니다');
      // 검증 실패 시에도 모달은 유지 (사용자가 다시 선택할 수 있도록)
      return;
    }

    console.log('✅ [신고] 신고 사유 선택됨:', reason);
    reportData.current.reason = reason;
    setIsVisibleReportPopup(false);
    setIsVisibleReportCheckPopup(true);
  };

  const reportUser = async () => {
    setIsVisibleReportCheckPopup(false);

    try {
      console.log('📤 [신고] 신고 요청 시작');
      console.log('👤 [신고] 신고 대상:', reportData.current.member.memberName);
      console.log('📝 [신고] 신고 사유:', reportData.current.reason);
      console.log('🖼️ [신고] 이미지 첨부:', reportImage.uri ? '있음' : '없음');

      await createReport({
        reportRequestDto: {
          reported: reportData.current.member.memberId,
          reportContent: reportData.current.reason,
        },
        image: reportImage.uri || undefined,
      });

      console.log('✅ [신고] 신고가 성공적으로 접수되었습니다');

      // 신고 성공 피드백 (Alert)
      setTimeout(() => {
        const { Alert } = require('react-native');
        Alert.alert(
          '신고 완료',
          '신고가 성공적으로 접수되었습니다.',
          [{ text: '확인' }]
        );
      }, 100);

      // 신고 후 데이터 초기화
      reportData.current = {
        member: { memberId: '', memberName: '', memberImage: '' },
        reason: '',
      };
      setReportImage({ uri: '', name: '' });

    } catch (error: any) {
      console.error('❌ [신고] 신고 요청 실패:', error);

      // 에러 메시지 파싱
      let errorMessage = '신고 처리 중 오류가 발생했습니다. 다시 시도해주세요.';

      // axios 에러 응답 확인
      if (error?.response?.status === 500 || error?.response?.status === 409) {
        // 중복 신고 또는 DB constraint 에러
        errorMessage = '이미 신고한 사용자입니다.';
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      // 신고 실패 피드백
      setTimeout(() => {
        const { Alert } = require('react-native');
        Alert.alert(
          '신고 실패',
          errorMessage,
          [{ text: '확인' }]
        );
      }, 100);
    }
  };

  const startReportUser = (member: MemberResponse) => {
    reportData.current.member = {
      memberId: member.memberId,
      memberName: member.memberName,
      memberImage: member.memberImage || ''
    };
    setIsVisibleReportPopup(true);
  };

  const openSettlement = async () => {

    setSettlementRequestPopupOpen(true);
  };

  const closeSettlement = async (cost: number) => {
    console.log('입력된 정산금액:', cost);
    // 여기서 정산금액을 사용해서 필요한 로직을 처리할 수 있습니다
    setInitialCost(cost);
    await fetchMembers();
    Keyboard.dismiss();
    setSettlementRequestPopupOpen(false);
    settlementRequestPopupRef.current?.open();
  };

  const handleImagePress = (imageUri: string) => {
    setSelectedImageUri(imageUri);
    setIsImageViewerVisible(true);
  };

  const closeImageViewer = () => {
    setIsImageViewerVisible(false);
    setSelectedImageUri('');
  };

  const renderItem = useCallback(
    ({ item, index }: RenderItem) => {
      const isShowTime =
        !(
          moment.utc(data[index + 1]?.time).minute() ===
          moment.utc(item.time).minute() &&
          moment.utc(data[index + 1]?.time).hour() ===
          moment.utc(item.time).hour()
        ) || data[index + 1]?.sender !== item.sender;

      const isShowProfile =
        index === 1 || // 첫 번째 메시지는 항상 프로필 표시
        data[index - 1]?.sender !== item.sender ||
        !(
          moment.utc(data[index - 1]?.time).minute() ===
          moment.utc(item.time).minute() &&
          moment.utc(data[index - 1]?.time).hour() ===
          moment.utc(item.time).hour()
        );

      // 날짜 구분선 표시 여부 확인
      const isShowDateSeparator =
        index === 1 || // 첫 번째 메시지 전에는 항상 날짜 표시
        !moment.utc(data[index - 1]?.time).isSame(moment.utc(item.time), 'day');

      // unreadCount 계산 로직 개선
      let unreadCount = unreadCounts[item.chatId];
      if (unreadCount === undefined) {
        // unreadCounts에 없는 경우, 현재 메시지보다 큰 가장 작은 chatId의 값을 사용
        const chatIds = Object.keys(unreadCounts).map(Number).sort((a, b) => a - b);
        const currentChatId = item.chatId;

        // 현재 메시지보다 큰 가장 작은 chatId를 찾아서 그 값을 사용
        const nextChatId = chatIds.find(id => id > currentChatId);
        if (nextChatId !== undefined) {
          unreadCount = unreadCounts[nextChatId];
        }
      }

      const chatContent = item.chatType !== 'MONEY' ? (
        <ChatItem
          item={{
            id: item.chatId,
            alertContent: chatroomTitle.alertContent,
            content: item.chatContent,
            sender: item.sender,
            senderImage: item.memberImage || '',
            time: item.time,
            type: item.chatType.toString(),
            isShowProfile,
            isShowTime,
            nickname: userInfo?.nickname || '',
            unreadCount: unreadCount,
            onImagePress: handleImagePress,
          }}
        />
      ) : (
        <SettlementBox
          settlement={{
            sender: item.sender,
            senderImage: item.memberImage || '',
            chatroomId: chatroomId.toString(),
            time: item.time,
            isShowProfile,
            isShowTime,
            nickname: userInfo?.nickname || '',
          }}
        />
      );

      return (
        <>
          {isShowDateSeparator && <DateSeparator date={item.time} />}
          {chatContent}
        </>
      );
    },
    [data, chatroomId, userInfo, unreadCounts, chatroomTitle.alertContent],
  );

  useDidMountEffect(() => {
    const send = async () => {
      if (!imageUri) {return;}
      try {
        // 이미지 파일 정보 준비
        const fileName = imageUri.split('/').pop() || 'image.jpg';
        const fileType = fileName.endsWith('.png') ? 'image/png' : 'image/jpeg';

        // multipart/form-data 형식으로 전송
        await sendChatImage(
          chatroomId,
          {
            uri: imageUri,
            name: fileName,
            type: fileType,
          },
          {
            sender: userInfo?.nickname || '',
            senderImage: userInfo?.image || '',
          }
        );

        // 이미지 전송 성공 - WebSocket으로 별도로 메시지 보낼 필요 없음 (Backend가 처리)
        console.log('이미지 전송 성공');
      } catch (err) {
        console.log('sendImage 오류', err);
      }
    };
    send();
  }, [imageUri, chatroomId, userInfo]);

  return (
    <KeyboardAvoidingView style={styles.rootContainer} behavior={'padding'}>
      <Header
        style={styles.headerContainer}
        leftButton={
          <SVGButton onPress={() => navigation.goBack()} iconName="LeftArrow" />
        }
        title={
          <View style={styles.header}>
            {
              chatroomTitle.titleRight && (
                <SVG
                  width={22}
                  height={22}
                  style={styles.headerIcon}
                  name="LocationBlack"
                />
              )
            }
            <BasicText
              style={styles.headerText}
              text={chatroomTitle.titleLeft}
            />
            {
              chatroomTitle.titleRight && (
                <SVG
                  width={22}
                  height={22}
                  style={styles.headerIcon}
                  name="RightArrow"
                />
              )
            }
            <BasicText
              style={styles.headerText}
              text={chatroomTitle.titleRight ?? ''}
            />
          </View>
        }
        rightButton={<SVGButton onPress={openSideMenu} iconName="Kebab" />}
      />

      {isSideMenuOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeSideMenu}
        />
      )}
      {/* 사이드바 */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.sideMenu,
          { transform: [{ translateX }], width: SIDE_MENU_WIDTH },
        ]}>
        <BasicText style={styles.menuText}>
          {'참여자 목록 ( ' +
            members.length +
            ' / ' +
            members.length +
            ' )'}
        </BasicText>
        <View style={styles.menuUserList}>
          {members
            .sort((a, b) => {
              // 현재 사용자를 맨 위로
              if (a.memberName === userInfo?.nickname) {return -1;}
              if (b.memberName === userInfo?.nickname) {return 1;}
              return 0;
            })
            .map(member => {
              return (
                <View key={member.memberId} style={styles.menuUserContainer}>
                  <View style={styles.menuUserWrapper}>
                    {
                      member.memberImage === null ? <SVG name="DefaultProfile" width={40} height={40} style={styles.menuUserIcon} /> : <Image source={{uri: member.memberImage}} style={styles.menuUserIcon} />
                    }
                    <BasicText style={styles.menuUserText} text={member.memberName} />
                    {member.memberName === userInfo?.nickname ? (
                      <View style={styles.menuUserMe}>
                        <BasicText style={styles.menuUserMeText} text="나" />
                      </View>
                    ) : null}
                  </View>
                  {member.memberName !== userInfo?.nickname ? (
                    <BasicButton
                      textStyle={styles.menuUserBtnText}
                      buttonStyle={styles.menuUserBtn}
                      onPress={() => startReportUser(member)}
                      text="신고하기"
                    />
                  ) : null}
                </View>
              );
            })}
        </View>
        <TouchableOpacity
          onPress={() => setIsVisibleExitPopup(true)}
          activeOpacity={0.7}
          style={styles.exitIconContainer}
        >
          <SVG
            name="Exit"
            width={24}
            height={24}
          />
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.container}>
        {isLoading && <Loading />}
        <FlatList
          ref={chatListRef}
          style={styles.list}
          data={data}
          extraData={data}
          scrollEnabled={true}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          keyExtractor={item => item.chatId.toString()}
          renderItem={renderItem}
          onScrollToIndexFailed={info => {
            console.warn('📍 [스크롤] scrollToIndex 실패, scrollToEnd로 대체:', info);
            // 스크롤 실패 시 맨 아래로 스크롤
            setTimeout(() => {
              chatListRef.current?.scrollToEnd({ animated: false });
            }, 100);
          }}
          ListHeaderComponent={
            chatroomTitle.alertContent
              ? () => (
                <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
                  <BasicText
                    text={chatroomTitle.alertContent}
                    style={styles.enterBox}
                  />
                </View>
              )
              : null
          }
          ListFooterComponent={<View style={{ height: 30 }} />}
          onContentSizeChange={() =>
            chatListRef.current?.scrollToEnd({ animated: false })
          }
        />
        <View>
          {/* 채팅창 + 사진, 정산 요청 창 */}
          <View>
            <View style={styles.inputContainer}>
              <SVGButton
                iconName={showExtraView ? 'CloseFill' : 'AddFill'}
                onPress={() => toggleExtraView()}
                buttonStyle={styles.addBtn}
              />
              <TextInput
                style={styles.inputBox}
                value={message}
                onChangeText={setMessage}
                placeholder="메시지를 입력하세요."
                placeholderTextColor={theme.colors.blackV3}
                multiline={true}
              />
              <SVGButton
                iconName="Send"
                onPress={sendMessage}
                buttonStyle={styles.sendBtn}
              />
            </View>
            {showExtraView ? (
              <View
                style={[
                  styles.extraView,
                  { height: keyboardHeight || EXTRA_MENU_HEIGHT },
                ]}>

                <View style={styles.extraViewContainer}>
                  <SVGButton
                    onPress={getImageByCamera}
                    iconName="Camera"
                    SVGStyle={styles.extraViewItemIcon}
                    buttonStyle={styles.extraViewItem}
                  />
                  <BasicText text="카메라" style={styles.extraViewItemText} />
                </View>
                <View style={styles.extraViewContainer}>
                  <SVGButton
                    onPress={getImageByGallery}
                    iconName="Picture"
                    SVGStyle={styles.extraViewItemIcon}
                    buttonStyle={styles.extraViewItem}
                  />
                  <BasicText text="앨범" style={styles.extraViewItemText} />
                </View>
                <View style={styles.extraViewContainer}>
                  <SVGButton
                    onPress={openSettlement}
                    iconName="Money"
                    SVGStyle={styles.extraViewItemIcon}
                    buttonStyle={styles.extraViewItem}
                  />
                  <BasicText
                    text="정산 요청"
                    style={styles.extraViewItemText}
                  />
                </View>
              </View>
            ) : null}
          </View>
        </View>
        <SettlementRequestPopup
          member={members}
          titleLeft={chatroomTitle.titleLeft}
          titleRight={chatroomTitle.titleRight ?? ''}
          ref={settlementRequestPopupRef}
          sendPayment={sendPayment}
          initialCost={initialCost}
        />

        <ChatRoomExitModal
          visible={isVisibleExitPopup}
          onConfirm={async () => {
            try {
              await leaveChatroom(chatroomId.toString());
              setIsVisibleExitPopup(false);
            } catch (error) {
              console.error('채팅방 나가기 실패:', error);
              setIsVisibleExitPopup(false);
            }
          }}
          onCancel={() => setIsVisibleExitPopup(false)}
        />

        <ReportModal
          visible={isVisibleReportPopup}
          onConfirm={checkReportUser}
          onCancel={() => setIsVisibleReportPopup(false)}
          setImage={setReportImage}
        />
        <ReportCheckModal
          visible={isVisibleReportCheckPopup}
          onConfirm={reportUser}
          member={reportData.current.member}
          onCancel={() => setIsVisibleReportCheckPopup(false)}
        />
        <SettlementCostEditModal
          visible={isSettlementRequestPopupOpen}
          onConfirm={(cost) => closeSettlement(cost)}
          onCancel={() => setSettlementRequestPopupOpen(false)}
          title="정산 금액 입력"
        />
        <ImageViewerModal
          visible={isImageViewerVisible}
          imageUri={selectedImageUri}
          onClose={closeImageViewer}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;
