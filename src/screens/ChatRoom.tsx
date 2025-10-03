/* eslint-disable @typescript-eslint/no-shadow */
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
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import styles from '../styles/ChatRoom.style';
import { theme } from '../styles/theme';
import ChatItem from '../components/ChatItem';
import SVGButton from '../components/button/SVGButton';
import BasicText from '../components/BasicText';
import SettlementBox from '../components/SettlementBox';
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
import useDidMountEffect from '../hooks/useDidMountEffect';
import Header from '../components/Header';
import { useWebSocket } from '../hooks/useWebSocket';
import {
  ChatItem as ChatItemType,
  fetchChatMembers,
  fetchChatroomInfo,
  fetchChats,
  leaveChatroom,
  ChatMember as MemberResponse,
  sendChatImage,
} from '../api/chatApi';
import moment from 'moment';
import { createReport } from '../api/reportApi';
import RNFS from 'react-native-fs';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/redux/RootReducer';
import SettlementCostEditModal from '../components/popup/SettlementCostEditModal';
import EncryptedStorage from 'react-native-encrypted-storage';
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
  Settlement: { data: Readonly<SettlementType> };
};



const ChatRoom: React.FC = () => {
  const [data, setData] = useState<ChatItemType[]>([]);
  const [message, setMessage] = useState<string>('');
  const [showExtraView, setShowExtraView] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [isSettlementRequestPopupOpen, setSettlementRequestPopupOpen] = useState<boolean>(false);
  const [isVisibleReportPopup, setIsVisibleReportPopup] =
    useState<boolean>(false);
  const [isVisibleReportCheckPopup, setIsVisibleReportCheckPopup] =
    useState<boolean>(false);
  const [isVisibleExitPopup, setIsVisibleExitPopup] = useState<boolean>(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const [unreadCounts, setUnreadCounts] = useState<{ [key: number]: number }>({});
  const chatListRef = useRef<FlatList>(null);
  const { imageUri, imageType, imageName, getImageByCamera, getImageByGallery } =
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
  const [chatroomTitle, setChatroomTitle] = useState<{
    titleLeft: string;
    titleRight: string;
    alertContent: string;
  }>({
    titleLeft: '',
    titleRight: '',
    alertContent: '',
  });
  const [members, setMembers] = useState<MemberResponse[]>([]);
  const [reportImage, setReportImage] = useState({ uri: '', name: '' });
  const reportData = useRef({
    member: { memberId: '', memberName: '', memberImage: '' },
    reason: '',
  });

   const userInfo = useSelector((state: RootState) => state.user);
   const [token, setToken] = useState<string>('');

   useEffect(() => {
    const getToken = async () => {
      const token = await EncryptedStorage.getItem('accessToken');
      setToken(token ?? '');
    };
    getToken();
   }, []);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
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
    const memberData = await fetchChatMembers(chatroomId);
    setMembers(memberData);
  }, [chatroomId]);

  // const exitChat = async () => {
  //   await leaveChatroom(chatroomId);
  //   navigation.pop();
  // };

  useEffect(() => {
    const fetchChatsFunc = async () => {
      const chatData = await fetchChats(chatroomId);
      console.log(`
        
        
        처음 받아온 채팅 데이터들 fetchChats
        
        
        
        `, chatData);
      //setData(chatData);

    };
    const fetchChatroomInfos = async () => {
      const chatroomData = await fetchChatroomInfo(chatroomId);
      setChatroomTitle(chatroomData);
     console.log(`
        
        
      처음 받아온 채팅 데이터들 fetchChatroomInfo
      
      
      
      `, chatroomData);
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
    onMessageReceived: useCallback((receiveData) => {

      console.log('receiveData', receiveData);
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
    }, []),
    onUnreadCountReceived: useCallback((unreadData) => {
      console.log(unreadData);
      setUnreadCounts(unreadData);
    }, []),
  });

  const sendPayment = async (settlementCost: string) => {
    wsSendMessage(settlementCost, 'MONEY', userInfo?.nickname || '', userInfo?.image || '');
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
    if (chatListRef.current) {
      setTimeout(
        () => chatListRef.current?.scrollToEnd({ animated: false }),
        100,
      );
    }
  }, [data]);

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

  const checkReportUser = (reason: string) => {
    reportData.current.reason = reason;
    setIsVisibleReportPopup(false);
    setIsVisibleReportCheckPopup(true);
  };

  const reportUser = async () => {
    setIsVisibleReportCheckPopup(false);

    const formData = new FormData();
    const data = {
      reported: reportData.current.member.memberId,
      reportContent: reportData.current.reason,
    };
    const fileName = `${reportData.current.member.memberId}.json`;
    const filePath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
    await RNFS.writeFile(filePath, JSON.stringify(data), 'utf8');
    formData.append('reportRequestDto', `file:///${filePath}`);

    if (reportImage.uri !== '') {
      let imageFile = { uri: imageUri, type: imageType, name: imageName };
      formData.append('profileImage', imageFile as any);
    }

    await createReport(formData);
  };

  const startReportUser = (member: MemberResponse) => {
    setIsVisibleReportPopup(true);
    reportData.current.member = { memberId: member.memberId, memberName: member.memberName, memberImage: member.memberImage || '' };
  };

  const openSettlement = async () => {

    setSettlementRequestPopupOpen(true);
  };

  const closeSettlement = async (cost: number) => {
    console.log('입력된 정산금액:', cost);
    // 여기서 정산금액을 사용해서 필요한 로직을 처리할 수 있습니다
    await fetchMembers();
    Keyboard.dismiss();
    setSettlementRequestPopupOpen(false);
    settlementRequestPopupRef.current?.open();
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
      return item.chatType !== 'MONEY' ? (
        <ChatItem
          item={{
            id: item.chatId,
            content: item.chatContent,
            sender: item.sender,
            senderImage: item.memberImage || '',
            time: item.time,
            type: item.chatType.toString(),
            isShowProfile,
            isShowTime,
            nickname: userInfo?.nickname || '',
            unreadCount: unreadCount,
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
    },
    [data, chatroomId, userInfo, unreadCounts],
  );

  useDidMountEffect(() => {
    const send = async () => {
      if (imageUri !== '') {
        try {
          const formData = new FormData();
          let imageFile = { uri: imageUri, type: imageType, name: imageName };
          formData.append('image', imageFile as any);
          const url = await sendChatImage(chatroomId.toString(), { imageSendCommand: { sender: userInfo?.nickname || '', senderImage: userInfo?.image || '' }, image: imageUri });

          wsSendMessage(url.toString() || '', 'IMAGE', userInfo?.nickname || '', userInfo?.image || '') as any;
        } catch (err) {
        }
      }
    };

    send();
  }, [imageUri]);

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
              text={chatroomTitle.titleRight}
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
          {members.map(member => {
            return (
              <View key={member.memberId} style={styles.menuUserContainer}>
                <View style={styles.menuUserWrapper}>
                  <SVG
                    width={46}
                    height={46}
                    name={member.memberImage === null ? "DefaultProfile" : member.memberImage as any}
                    style={styles.menuUserIcon}
                  />
                  <BasicText style={styles.menuUserText} text={member.memberName} />
                  {member.memberName === userInfo?.nickname || '' ? (
                    <View style={styles.menuUserMe}>
                      <BasicText style={styles.menuUserMeText} text="나" />
                    </View>
                  ) : null}
                </View>
                {member.memberName !== userInfo?.nickname || ''   ? (
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
        <SVGButton
          onPress={() => setIsVisibleExitPopup(true)}
          iconName="Exit"
          buttonStyle={styles.exitIcon}
        />
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
                {chatroomTitle.titleRight === userInfo?.nickname || '' ? (
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
                ) : null}
              </View>
            ) : null}
          </View>
        </View>
        <SettlementRequestPopup
          member={members}
          titleLeft={chatroomTitle.titleLeft}
          titleRight={chatroomTitle.titleRight}
          ref={settlementRequestPopupRef}
          sendPayment={sendPayment}
        />

        <ChatRoomExitModal
          visible={isVisibleExitPopup}
          onConfirm={() => leaveChatroom(chatroomId.toString())}
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
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;
