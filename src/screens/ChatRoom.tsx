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

enum Type {
  MESSAGE,
  ENTER,
  EXIT,
  IMAGE,
  MONEY,
}

type Chat = {
  id: string;
  content: string;
  sender: string;
  time: Date;
  senderImage?: string;
  type: Type;
  isShowProfile?: boolean;
  isShowTime?: boolean;
};

type Member = {
  id: string;
  image: string;
  name: string;
  account?: Account;
};

type Account = {
  bankName: string;
  accountNumber: string;
};

type SettlementType = {
  accountNumber: String;
  accountBank: String;
  cost: number;
  time: Date;
  members: Member[];
};

type RenderItem = {
  item: Chat;
  index: number;
};

type RootStackParamList = {
  ChatRoom: {data: Readonly<ChatRoomType>};
  Settlement: {data: Readonly<SettlementType>};
};

type ChatRoomType = {
  id: string;
  time: string;
  from: string;
  to: string;
  currentPerson: Member[];
  maxPerson: number;
  message: number;
};

const ChatRoom: React.FC = () => {
  const [data, setData] = useState<Chat[]>([]);
  const [message, setMessage] = useState<string>('');
  const [showExtraView, setShowExtraView] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [isVisibleReportPopup, setIsVisibleReportPopup] =
    useState<boolean>(false);
  const [isVisibleReportCheckPopup, setIsVisibleReportCheckPopup] =
    useState<boolean>(false);
  const [isVisibleExitPopup, setIsVisibleExitPopup] = useState<boolean>(false);
  const chatListRef = useRef<FlatList>(null);
  const {imageUri, getImageByCamera, getImageByGallery} = useImagePicker();
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
  const reportData = useRef({member: {}, reason: ''});
  const chatRoomData = params.data;

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

  //임시 데이터
  useEffect(() => {
    setData([
      {
        id: '0',
        content: '안녕',
        sender: 'ass',
        time: new Date(2025, 2, 18, 17, 23, 50),
        type: Type.MESSAGE,
      },
      {
        id: '1',
        content: '안녕',
        sender: 'ass',
        time: new Date(2025, 2, 18, 17, 23, 50),
        type: Type.MESSAGE,
      },
      {
        id: '2',
        content: '홍길동님이 들어왔습니다.',
        sender: 'abs',
        time: new Date(2025, 2, 18, 17, 23, 35),
        type: Type.ENTER,
      },
      {
        id: '50',
        content: '철수님이 들어왔습니다.',
        sender: 'abs',
        time: new Date(2025, 2, 18, 17, 23, 35),
        type: Type.ENTER,
      },
      {
        id: '6',
        content: '안녕ggg',
        sender: 'ass',
        time: new Date(2025, 2, 18, 17, 23, 37),
        type: Type.MESSAGE,
      },
      {
        id: '7',
        content: '안녕하세요',
        sender: 'lee',
        time: new Date(2025, 2, 18, 17, 23, 37),
        type: Type.MESSAGE,
      },
      {
        id: '3',
        content: '안녕3',
        sender: 'ass',
        time: new Date(2025, 2, 18, 17, 25, 30),
        type: Type.MESSAGE,
      },
      {
        id: '4',
        content:
          '안녕asdfasdfaasdfasdfasdfasdfasdfasdfasdfasdfasdfasfasdfasdfasdfasdfasdfasdfasdfasfasdfassdfa',
        sender: 'donghyun',
        time: new Date(2025, 2, 18, 17, 50, 30),
        type: Type.MESSAGE,
      },
      {
        id: '10',
        content: 'ㅎㅎㅎㅎㅎ',
        sender: 'donghyun',
        time: new Date(2025, 2, 18, 17, 50, 35),
        type: Type.MESSAGE,
      },
      {
        id: '11',
        content: '호우샷샷',
        sender: 'donghyun',
        time: new Date(2025, 2, 18, 17, 51, 35),
        type: Type.MESSAGE,
      },
    ]);
  }, []);

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

  const reportUser = () => {
    setIsVisibleReportCheckPopup(false);
    console.log(reportData.current);
    // TODO: 신고하기
  };

  const startReportUser = (member: Member) => {
    setIsVisibleReportPopup(true);
    reportData.current.member = member;
  };

  const openSettlement = () => {
    //TODO: 방장만 열 수 있게
    Keyboard.dismiss();
    settlementRequestPopupRef.current?.open();
  };

  //메시지 보내는 메서드
  const sendMessage = () => {
    //api 호출

    setData([
      ...data,
      {
        id: data[data.length - 1].id + 1,
        content: message,
        sender: 'donghyun',
        time: new Date(),
        type: Type.MESSAGE,
      },
    ]);
    setMessage('');
  };

  const renderItem = useCallback(
    ({item, index}: RenderItem) => {
      const isShowTime =
        !(
          data[index + 1]?.time.getMinutes() === item.time.getMinutes() &&
          data[index + 1]?.time.getHours() === item.time.getHours()
        ) || data[index + 1]?.sender !== item.sender;
      const isShowProfile =
        data[index - 1]?.sender !== item.sender ||
        !(
          data[index - 1]?.time.getMinutes() === item.time.getMinutes() &&
          data[index - 1]?.time.getHours() === item.time.getHours()
        );
      return item.type !== Type.MONEY ? (
        <ChatItem item={{...item, isShowProfile, isShowTime}} />
      ) : (
        <SettlementBox
          settlement={{
            id: item.id,
            currentUser: chatRoomData.currentPerson,
            cost: parseInt(item.content),
            sender: item.sender,
            time: item.time,
            onPress: () =>
              navigation.navigate('Settlement', {
                data: Object.freeze({
                  accountNumber: '0000-0000',
                  accountBank: '우리은행',
                  cost: Number.parseInt(item.content),
                  time: item.time,
                  members: chatRoomData.currentPerson,
                }),
              }),
            isShowProfile,
            isShowTime,
          }}
        />
      );
    },
    [data, chatRoomData, navigation],
  );

  useDidMountEffect(() => {
    if (imageUri !== undefined) {
      setData([
        ...data,
        {
          id: data[data.length - 1].id + 1,
          content: imageUri,
          sender: 'donghyun',
          time: new Date(),
          type: Type.IMAGE,
        },
      ]);
    }
  }, [imageUri]);

  return (
    <KeyboardAvoidingView style={styles.rootContainer} behavior={'padding'}>
      <View style={styles.container}>
        <SVGButton iconName="Kebab" onPress={openSideMenu} />
        {/* 사이드바 */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.sideMenu,
            {transform: [{translateX}], width: SIDE_MENU_WIDTH},
          ]}>
          <BasicText style={styles.menuText}>
            {'참여자 목록 ( ' +
              chatRoomData.currentPerson.length +
              '/' +
              chatRoomData.maxPerson +
              ' )'}
          </BasicText>
          <View style={styles.menuUserList}>
            {chatRoomData.currentPerson.map(e => {
              return (
                <View key={e.id} style={styles.menuUserContainer}>
                  <View style={styles.menuUserWrapper}>
                    <SVG
                      width={46}
                      height={46}
                      name="DefaultProfile"
                      style={styles.menuUserIcon}
                    />
                    <BasicText style={styles.menuUserText} text={e.name} />
                    {e.name === 'donghyun' ? (
                      <View style={styles.menuUserMe}>
                        <BasicText style={styles.menuUserMeText} text="나" />
                      </View>
                    ) : null}
                  </View>
                  {e.name !== 'donghyun' ? (
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
        <FlatList
          ref={chatListRef}
          style={styles.list}
          data={data}
          extraData={data}
          scrollEnabled={true}
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          keyExtractor={item => item.id}
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
          data={data}
          setData={setData}
          chatRoomData={chatRoomData}
          ref={settlementRequestPopupRef}
        />

        <ChatRoomExitModal
          visible={isVisibleExitPopup}
          onConfirm={() => setIsVisibleExitPopup(false)}
          onCancel={() => setIsVisibleExitPopup(false)}
        />

        <ReportModal
          visible={isVisibleReportPopup}
          onConfirm={checkReportUser}
          onCancel={() => setIsVisibleReportPopup(false)}
        />
        <ReportCheckModal
          visible={isVisibleReportCheckPopup}
          onConfirm={reportUser}
          onCancel={() => setIsVisibleReportCheckPopup(false)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;
