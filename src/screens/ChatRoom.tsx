/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
// Chat.tsx 테스트
// 채팅 메시지 수신 시 채팅 목록 업데이트
// 안 읽은 사람 수 구독

import React, {useState, useEffect, useRef, useCallback} from 'react';
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
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import styles from '../styles/ChatRoom.style';
import {theme} from '../styles/theme';
import ChatItem from '../components/ChatItem';
import SVGButton from '../components/button/SVGButton';
import BasicText from '../components/BasicText';
import SettlementBox from '../components/SettlementBox';
import useImagePicker from '../hooks/useImagePicker';
import SVG from '../components/SVG';
import BasicButton from '../components/button/BasicButton';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import SettlementRequestPopup from '../components/popup/SettlementRequestPopup';
import {SettlementRequestPopupRef} from '../components/popup/SettlementRequestPopup';
import ReportModal from '../components/popup/ReportModal';
import ChatRoomExitModal from '../components/popup/ChatRoomExitModal';
import ReportCheckModal from '../components/popup/ReportCheckModal';
import useDidMountEffect from '../hooks/useDidMountEffect';
import Header from '../components/Header';
import {useWebSocket} from '../hooks/useWebSocket';
import {
  ChatResponse,
  ChatroomResponse,
  getChats,
  getMembers,
  MemberResponse,
  sendImage,
  exitChatroom,
} from '../api/chatApi';
import moment from 'moment';
import {createReport} from '../api/reportApi';
import RNFS from 'react-native-fs';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/redux/RootReducer';

type SettlementType = {
  accountNumber: String;
  accountBank: String;
  cost: number;
  time: Date;
  id: string;
};

type RenderItem = {
  item: ChatResponse;
  index: number;
};

type RootStackParamList = {
  ChatRoom: {data: Readonly<ChatroomResponse>, userInfo: Readonly<User>};
  Settlement: {data: Readonly<SettlementType>};
};

type User = {
  nickname: string,
  image: string,
  university: string,
  bankType: string,
  accountNumber: string,
  depositor: string,
  token: string,
}

const ChatRoom: React.FC = () => {
  const [data, setData] = useState<ChatResponse[]>([]);
  const [message, setMessage] = useState<string>('');
  const [showExtraView, setShowExtraView] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [isVisibleReportPopup, setIsVisibleReportPopup] =
    useState<boolean>(false);
  const [isVisibleReportCheckPopup, setIsVisibleReportCheckPopup] =
    useState<boolean>(false);
  const [isVisibleExitPopup, setIsVisibleExitPopup] = useState<boolean>(false);
  const [unreadCounts, setUnreadCounts] = useState<{[key: number]: number}>({});
  const chatListRef = useRef<FlatList>(null);
  const {imageUri, imageType, imageName, getImageByCamera, getImageByGallery} =
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
  const {params} = useRoute<RouteProp<RootStackParamList, 'ChatRoom'>>();
  const [members, setMembers] = useState<MemberResponse[]>([]);
  const [reportImage, setReportImage] = useState({uri: '', name: ''});
  const reportData = useRef({
    member: {memberId: '', memberName: '', memberImage: ''},
    reason: '',
  });
  const chatRoomData = params.data;
  const userInfo = params.userInfo;
  const userInfo2 = useSelector((state: RootState) => state.user);
  console.log('userInfo2', userInfo2?.token?.startsWith('Bearer '));
  console.log('userInfo', userInfo?.token?.startsWith('Bearer '));
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
    const memberData = await getMembers(chatRoomData.chatroomId);
    setMembers(memberData);
  }, [chatRoomData]);

  const exitChat = async () => {
    await exitChatroom(chatRoomData.chatroomId);
    navigation.pop();
  };

  useEffect(() => {
    const fetchChats = async () => {
      const chatData = await getChats(chatRoomData.chatroomId);
      console.log(`
        
        
        처음 받아온 채팅 데이터들 
        
        
        
        `,chatData);
      setData(chatData);
    };

    fetchChats();
  }, [chatRoomData]);

  // ChatRoom 컴포넌트 안
useEffect(() => {
  console.log('★ 최신 unreadCounts:', unreadCounts);
}, [unreadCounts]);

  const {isLoading, sendMessage: wsSendMessage} = useWebSocket({
    chatroomId: chatRoomData.chatroomId,
    token: userInfo.token.startsWith('Bearer ') ? userInfo.token : 'Bearer ' + userInfo.token,
    onMessageReceived: useCallback((receiveData) => {
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
    wsSendMessage(settlementCost, 'MONEY', userInfo.nickname, userInfo.image);
  };

  const sendMessage = async () => {
    if (message.length !== 0) {
      wsSendMessage(message, 'MESSAGE', userInfo.nickname, userInfo.image);
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
        () => chatListRef.current?.scrollToEnd({animated: false}),
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
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSideMenu = () => {
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
      let imageFile = {uri: imageUri, type: imageType, name: imageName};
      formData.append('profileImage', imageFile as any);
    }

    await createReport(formData);
  };

  const startReportUser = (member: MemberResponse) => {
    setIsVisibleReportPopup(true);
    reportData.current.member = member;
  };

  const openSettlement = async () => {
    await fetchMembers();
    Keyboard.dismiss();
    settlementRequestPopupRef.current?.open();
  };

  const renderItem = useCallback(
    ({item, index}: RenderItem) => {
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
            senderImage: item.memberImage,
            time: item.time,
            type: item.chatType.toString(),
            isShowProfile,
            isShowTime,
            nickname: userInfo.nickname,
            unreadCount: unreadCount,
          }}
        />
      ) : (
        <SettlementBox
          settlement={{
            sender: item.sender,
            senderImage: item.memberImage,
            chatroomId: chatRoomData.chatroomId,
            time: item.time,
            isShowProfile,
            isShowTime,
            nickname: userInfo.nickname,
          }}
        />
      );
    },
    [data, chatRoomData, userInfo, unreadCounts],
  );

  useDidMountEffect(() => {
    const send = async () => {
      if (imageUri !== '') {
        try {
          const formData = new FormData();
          let imageFile = {uri: imageUri, type: imageType, name: imageName};
          formData.append('image', imageFile as any);
          const url = await sendImage(formData);

          wsSendMessage(url, 'IMAGE', userInfo.nickname, userInfo.image);
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
            <SVG
              width={22}
              height={22}
              style={styles.headerIcon}
              name="LocationBlack"
            />
            <BasicText
              style={styles.headerText}
              text={chatRoomData.departPlace}
            />
            <SVG
              width={22}
              height={22}
              style={styles.headerIcon}
              name="RightArrow"
            />
            <BasicText
              style={styles.headerText}
              text={chatRoomData.arrivePlace}
            />
          </View>
        }
        rightButton={<SVGButton onPress={openSideMenu} iconName="Kebab" />}
      />
      {/* 사이드바 */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.sideMenu,
          {transform: [{translateX}], width: SIDE_MENU_WIDTH},
        ]}>
        <BasicText style={styles.menuText}>
          {'참여자 목록 ( ' +
            members.length +
            ' / ' +
            chatRoomData.maxMemberCount +
            ' )'}
        </BasicText>
        <View style={styles.menuUserList}>
          {members.map(e => {
            return (
              <View key={e.memberId} style={styles.menuUserContainer}>
                <View style={styles.menuUserWrapper}>
                  <SVG
                    width={46}
                    height={46}
                    name="DefaultProfile"
                    style={styles.menuUserIcon}
                  />
                  <BasicText style={styles.menuUserText} text={e.memberName} />
                  {e.memberName === userInfo.nickname ? (
                    <View style={styles.menuUserMe}>
                      <BasicText style={styles.menuUserMeText} text="나" />
                    </View>
                  ) : null}
                </View>
                {e.memberName !== userInfo.nickname ? (
                  <BasicButton
                    textStyle={styles.menuUserBtnText}
                    buttonStyle={styles.menuUserBtn}
                    onPress={() => startReportUser(e)}
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
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          keyExtractor={item => item.chatId.toString()}
          renderItem={renderItem}
          ListFooterComponent={<View style={{height: 30}} />}
          onContentSizeChange={() =>
            chatListRef.current?.scrollToEnd({animated: false})
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
                  {height: keyboardHeight || EXTRA_MENU_HEIGHT},
                ]}>
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
                    onPress={getImageByCamera}
                    iconName="Camera"
                    SVGStyle={styles.extraViewItemIcon}
                    buttonStyle={styles.extraViewItem}
                  />
                  <BasicText text="카메라" style={styles.extraViewItemText} />
                </View>
                {chatRoomData.isRoomManager ? (
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
          chatRoomData={chatRoomData}
          ref={settlementRequestPopupRef}
          sendPayment={sendPayment}
        />

        <ChatRoomExitModal
          visible={isVisibleExitPopup}
          onConfirm={() => exitChat()}
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
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;
