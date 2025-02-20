// Chat.tsx 테스트
import React, {useState, useEffect, useRef, useCallback} from 'react';
import { View, PanResponder, FlatList, TextInput, Keyboard, KeyboardEvent, TouchableWithoutFeedback, Animated, Dimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/ChatRoom.style';
import ChatItem from '../components/ChatItem';
import SVGButton from '../components/button/SVGButton';
import BasicText from '../components/BasicText';
import SettlementBox from '../components/SettlementBox';
import useImagePicker from '../hooks/useImagePicker';
import SVG from '../components/SVG';
import BasicButton from '../components/button/BasicButton';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

enum Type {
    MESSAGE,
    ENTER,
    EXIT,
    IMAGE,
    MONEY,
}

type Chat = {
    id: string,
    content: string,
    sender: string,
    time: Date,
    senderImage?: string,
    type: Type,
    isShowProfile?: boolean,
    isShowTime?: boolean,
}

type RenderItem = {
    item: Chat,
    index: number,
}

type RootStackParamList = {
    ChatRoom: { data : Readonly<ChatRoomType> },
    Settlement: undefined,
};

type ChatRoomType = {
    id: string,
    time: string;
    from: string;
    to: string;
    currentPerson: number;
    maxPerson: number;
    message: number;
};

const Chat = ({ route }: { route: RouteProp<RootStackParamList, 'ChatRoom'> }) => {
    const [data, setData] = useState<Chat[]>([]);
    const [message, setMessage] = useState<string>('');
    const [showExtraView, setShowExtraView] = useState<boolean>(false);
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const chatListRef = useRef<FlatList>(null);
    const { imageUri, getImageByCamera, getImageByGallery } = useImagePicker();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Settlement'>>();
    const chatRoomData = route.params.data;
    const MENU_WIDTH = Dimensions.get('window').width * 0.7;
    const translateX = useRef(new Animated.Value(MENU_WIDTH)).current;

    //임시 데이터
    useEffect(()=>{
        setData(
            [
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
                    content: '안녕asdfasdfaasdfasdfasdfasdfasdfasdfasdfasdfasdfasfasdfasdfasdfasdfasdfasdfasdfasfasdfassdfa',
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
                {
                    id: '14',
                    content: '12000',
                    sender: 'donghyun',
                    time: new Date(2025, 2, 18, 17, 51, 35),
                    type: Type.MONEY,
                },
                {
                    id: '15',
                    content: '호우샷샷',
                    sender: 'lee',
                    time: new Date(2025, 2, 18, 17, 51, 35),
                    type: Type.IMAGE,
                },
            ]
        );
    }, []);

    //키보드 이벤트 리스너
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event: KeyboardEvent) => {
            setKeyboardHeight(event.endCoordinates.height);
        });

        return () => {
            keyboardDidShowListener.remove();
        };
    }, [keyboardHeight]);

    //채팅 추가될 때 마다 자동 스크롤
    useEffect(()=> {
        if(chatListRef.current){
            setTimeout(() => chatListRef.current?.scrollToEnd({ animated: false }), 100);
        }
    }, [data]);

    useEffect(() => {
        if(imageUri === undefined) {
            return;
        }
        //서버에 이미지 올리고 url 가져와서 content에 넣기
        setData([...data, {id: data[data.length - 1].id + 1, content: '', sender: 'donghyun', time: new Date(), type: Type.IMAGE}]);
    }, [imageUri]);

    const closeAll = () => {
        closeSideMenu();
        setSideMenuOpen(false);
        setShowExtraView(false);
        Keyboard.dismiss;
    };

    const toggleSideMenu = () => {
        Animated.timing(translateX, {
            toValue: sideMenuOpen ? MENU_WIDTH : 0, // 열고 닫기 애니메이션
            duration: 300,
            useNativeDriver: true,
        }).start();
        setSideMenuOpen(!sideMenuOpen);
    };

    const toggleExtraView = () => {
        setShowExtraView(!showExtraView);
        setTimeout(() => chatListRef.current?.scrollToEnd({ animated: false }), 100);
        Keyboard.dismiss;
    };

    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10, // 손가락이 이동했을 때 감지
          onPanResponderMove: (_, gestureState) => {
            if (gestureState.dx < 0) {
              // 🔹 왼쪽으로 스와이프 → 드로어 열기
              translateX.setValue(MENU_WIDTH + gestureState.dx);
            }
          },
          onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx < -50) {
                openSideMenu(); // 🔹 -50px 이상 이동하면 열기
            } else {
                closeSideMenu(); // 🔹 닫기
            }
          },
        })
    ).current;

    const openSideMenu = () => {
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
    };

    const closeSideMenu = () => {
        Animated.timing(translateX, {
            toValue: MENU_WIDTH,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    //메시지 보내는 메서드
    const sendMessage = () => {
        //api 호출

        setData([...data, {id: data[data.length - 1].id + 1, content: message, sender: 'donghyun', time: new Date(), type: Type.MESSAGE}]);
        setMessage('');
    };

    const renderItem = useCallback(({item, index}: RenderItem) => {
        const isShowTime = !(data[index + 1]?.time.getMinutes() === item.time.getMinutes() && data[index + 1]?.time.getHours() === item.time.getHours()) || data[index + 1]?.sender !== item.sender;
        const isShowProfile = data[index - 1]?.sender !== item.sender || !(data[index - 1]?.time.getMinutes() === item.time.getMinutes() && data[index - 1]?.time.getHours() === item.time.getHours());
        return item.type !== Type.MONEY ? <ChatItem item={{...item, isShowProfile, isShowTime}}/> : <SettlementBox settlement={{id: item.id, currentUser: chatRoomData.currentPerson, cost: parseInt(item.content), sender: item.sender, time: item.time, onPress: ()=>navigation.navigate('Settlement'), isShowProfile, isShowTime}}/>;
    }, [data, chatRoomData, navigation]);

    return (
        <TouchableWithoutFeedback {...panResponder.panHandlers} onPress={closeAll}>
            <View style={styles.container}>
                <SVGButton iconName="Kebab" onPress={toggleSideMenu}/>
                <Animated.View
                    style={[styles.sideMenu, { transform: [{ translateX }], width: MENU_WIDTH}]}
                >
                    <BasicText style={styles.menuText}>{'참여자 목록 ( ' + chatRoomData.currentPerson + '/' + chatRoomData.maxPerson + ' )'}</BasicText>
                    <View style={styles.menuUserList}>
                    <View style={styles.menuUserContainer}>
                        <View style={styles.menuUserWrapper}>
                            <SVG width={46} height={46} name="DefaultProfile" style={styles.menuUserIcon}/>
                            <BasicText style={styles.menuUserText} text="김동현"/>
                            <BasicText style={styles.menuUserMe} text="나"/>
                        </View>
                        <BasicButton textStyle={styles.menuUserBtnText} buttonStyle={styles.menuUserBtn} text="신고하기"/>
                    </View>
                    <View style={styles.menuUserContainer}>
                        <View style={styles.menuUserWrapper}>
                            <SVG width={46} height={46} name="DefaultProfile" style={styles.menuUserIcon}/>
                            <BasicText style={styles.menuUserText} text="김동현"/>
                        </View>
                        <BasicButton textStyle={styles.menuUserBtnText} buttonStyle={styles.menuUserBtn} text="신고하기"/>
                    </View>
                    </View>
                    <SVGButton iconName="Exit" buttonStyle={styles.exitIcon}/>
                </Animated.View>
                <FlatList
                    ref={chatListRef}
                    style={styles.list}
                    data={data}
                    extraData={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    onContentSizeChange={() => chatListRef.current?.scrollToEnd({ animated: false })}
                />
                <View style={styles.inputContainer}>
                    <SVGButton iconName={showExtraView ? 'CloseFill' : 'AddFill'} onPress={()=>toggleExtraView()} buttonStyle={styles.addBtn}/>
                    <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="메시지를 입력하세요."
                    multiline={true}
                    />
                    <SVGButton iconName="Send" onPress={sendMessage} buttonStyle={styles.sendBtn}/>
                </View>
                {
                    showExtraView && (
                    <View style={[styles.extraView, { height:  300 }]}>
                        <View style={styles.extraViewContainer}>
                            <SVGButton onPress={()=>getImageByGallery()} iconName="Picture" SVGStyle={styles.extraViewItemIcon} buttonStyle={styles.extraViewItem}/>
                            <BasicText text="앨범" style={styles.extraViewItemText}/>
                        </View>
                        <View style={styles.extraViewContainer}>
                            <SVGButton onPress={getImageByCamera} iconName="Camera" SVGStyle={styles.extraViewItemIcon} buttonStyle={styles.extraViewItem}/>
                            <BasicText text="카메라" style={styles.extraViewItemText}/>
                        </View>
                        <View style={styles.extraViewContainer}>
                            <SVGButton onPress={()=>{}} iconName="Money" SVGStyle={styles.extraViewItemIcon} buttonStyle={styles.extraViewItem}/>
                            <BasicText text="정산 요청" style={styles.extraViewItemText}/>
                        </View>
                    </View>
                    )
                }
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Chat;
