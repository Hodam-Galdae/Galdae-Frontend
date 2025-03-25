// Chat.tsx 테스트
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
import {Client, IMessage} from '@stomp/stompjs';
import {useSelector} from 'react-redux';
import {RootState} from '../modules/redux/RootReducer';
import {
  ChatResponse,
  ChatroomResponse,
  getChats,
  getMembers,
  MemberResponse,
  sendImage,
  exitChatroom,
} from '../api/chatApi';
import SockJS from 'sockjs-client';
import {API_BASE_URL, SUB_ENDPOINT, PUB_ENDPOINT} from '../api/axiosInstance';
import {createReport} from '../api/reportApi';
import RNFS from 'react-native-fs';

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
  ChatRoom: {data: Readonly<ChatroomResponse>};
  Settlement: {data: Readonly<SettlementType>};
};

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
  const userInfo = useSelector((state: RootState) => state.user);
  const client = useRef<Client>();

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

  const exitChat = async() => {
    await exitChatroom(chatRoomData.chatroomId);
    navigation.pop();
  };

  useEffect(() => {
    const fetchChats = async () => {
      const chatData = await getChats(chatRoomData.chatroomId);
      setData(chatData);
    };

    fetchChats();

    const socket = new SockJS(API_BASE_URL + '/ws');
    client.current = new Client({
      debug: (frame: any) => console.log(frame),
      connectHeaders: {
        Authorization: userInfo.token,
        chatroomId: chatRoomData.chatroomId,
      },
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
 			heartbeatOutgoing: 4000,
    });
    client.current.onConnect = () => {
      console.log('connected websocket');
      client.current!.subscribe(
        SUB_ENDPOINT + '/' + chatRoomData.chatroomId,
        (message: IMessage) => {
          const receiveData = JSON.parse(message.body);
          setData(prev => [
            ...prev,
            {
              chatId: prev.length === 0 ? 0 : prev[prev.length - 1].chatId + 1,
              chatContent: receiveData.message,
              sender: receiveData.sender,
              chatType: receiveData.type,
              time: new Date().toISOString(),
            },
          ]);
        },
      );
    };
    client.current.onStompError = function (frame) {
      console.log(`Broker reported error: ${frame.headers.message}`);
      console.log(`Additional details: ${frame.body}`);
      // 액세스 토큰 만료시
      if (
        frame.headers.message ===
        'Failed to send message to ExecutorSubscribableChannel[clientInboundChannel]'
      ) {
        // 가지고 있던 리프레시 토큰으로 새 엑세스 토큰을 발급받아
        // 세션 스토리지에 저장하고,
        // setToken으로 token 상태 업데이트.
      }
    };
    client.current.onDisconnect = error => {
      console.log('disconnected websocket');
      console.log(error);
    };

    client.current.activate();

    return () => {
      client.current?.deactivate();
    };
  }, [chatRoomData, userInfo]);

  const sendPayment = async (settlementCost: string) => {
    if (client.current?.connected) {
      client.current.publish({
        destination: PUB_ENDPOINT + '/' + chatRoomData.chatroomId,
        headers: {Authorization: userInfo.token},
        body: JSON.stringify({
          type: 'MONEY',
          sender: userInfo.nickname,
          message: settlementCost,
        }),
      });
    }
  };

  const sendMessage = async () => {
    if (client.current && message.length !== 0) {
      client.current.publish({
        destination: PUB_ENDPOINT + '/' + chatRoomData.chatroomId,
        headers: {Authorization: userInfo.token},
        body: JSON.stringify({
          type: 'MESSAGE',
          sender: userInfo.nickname,
          message: message,
        }),
      });

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
    formData.append('reportRequestDto', {
      uri: `file:///${filePath}`,
      type: 'application/json',
      name: fileName,
    });

    if (reportImage.uri !== '') {
      let imageFile = {uri: imageUri, type: imageType, name: imageName};
      formData.append('profileImage', imageFile);
    }

    await createReport(formData);
  };

  const startReportUser = (member: MemberResponse) => {
    setIsVisibleReportPopup(true);
    reportData.current.member = member;
  };

  const openSettlement = async () => {
    //TODO: 방장만 열 수 있게
    await fetchMembers();
    Keyboard.dismiss();
    settlementRequestPopupRef.current?.open();
  };

  const renderItem = useCallback(
    ({item, index}: RenderItem) => {
      const isShowTime =
        !(
          new Date(data[index + 1]?.time).getMinutes() ===
            new Date(item.time).getMinutes() &&
          new Date(data[index + 1]?.time).getHours() ===
            new Date(item.time).getHours()
        ) || data[index + 1]?.sender !== item.sender;
      const isShowProfile =
        data[index - 1]?.sender !== item.sender ||
        !(
          new Date(data[index - 1]?.time).getMinutes() ===
            new Date(item.time).getMinutes() &&
          new Date(data[index - 1]?.time).getHours() ===
            new Date(item.time).getHours()
        );
      return item.chatType !== 'MONEY' ? (
        <ChatItem
          item={{
            id: item.chatId,
            content: item.chatContent,
            sender: item.sender,
            senderImage: item.memberImage,
            time: new Date(item.time),
            type: item.chatType.toString(),
            isShowProfile,
            isShowTime,
          }}
        />
      ) : (
        <SettlementBox
          settlement={{
            sender: item.sender,
            senderImage: item.memberImage,
            chatroomId: chatRoomData.chatroomId,
            time: new Date(item.time),
            isShowProfile,
            isShowTime,
          }}
        />
      );
    },
    [data, chatRoomData],
  );

  useDidMountEffect(() => {
    const send = async () => {
      if (imageUri !== '') {
        const formData = new FormData();
        let imageFile = {uri: imageUri, type: imageType, name: imageName};
        formData.append('image', imageFile);
        const url = await sendImage(formData);

        if (client.current) {
          client.current.publish({
            destination: PUB_ENDPOINT + '/' + chatRoomData.chatroomId,
            headers: {Authorization: userInfo.token},
            body: JSON.stringify({
              type: 'IMAGE',
              sender: userInfo.nickname,
              message: url,
            }),
          });
        }
      }
    };

    send();
  }, [imageUri]);

  return (
    <KeyboardAvoidingView style={styles.rootContainer} behavior={'padding'}>
      <Header
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
            '/' +
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
