// Chat.tsx 테스트
import React, {useState, useEffect, useRef, useCallback} from 'react';
import { View, PanResponder, FlatList, TextInput, Keyboard, KeyboardAvoidingView, KeyboardEvent, TouchableWithoutFeedback, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
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

type Member = {
    id: string,
    image: string,
    name: string,
    account?: Account,
}

type Account = {
    bankName: string,
    accountNumber: string,
};

type SettlementType = {
    accountNumber: String,
    accountBank: String,
    cost: number,
    time: Date;
    members: Member[];
};

type RenderItem = {
    item: Chat,
    index: number,
}

type RootStackParamList = {
    ChatRoom: { data : Readonly<ChatRoomType> },
    Settlement: { data : Readonly<SettlementType>},
};

type ChatRoomType = {
    id: string,
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
    const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
    const [settlementOpen, setSettlementOpen] = useState<boolean>(false);
    const [settlementCost, setSettlementCost] = useState<number>(10000);
    const [isLastSettlement, setIsLastSettlement] = useState(false);
    const chatListRef = useRef<FlatList>(null);
    const { imageUri, getImageByCamera, getImageByGallery } = useImagePicker();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Settlement'>>();
    const SIDE_MENU_WIDTH = Dimensions.get('window').width * 0.7;
    const EXTRA_MENU_HEIGHT = 249;
    const CHAT_AREA_HEIGHT = 96;
    const translateX = useRef(new Animated.Value(SIDE_MENU_WIDTH)).current;
    const translateY = useRef(new Animated.Value(EXTRA_MENU_HEIGHT)).current;
    const {params} = useRoute<RouteProp<RootStackParamList, 'ChatRoom'>>();
    const chatRoomData = params.data;

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
    }, [data, imageUri]);

    const closeAll = () => {
        closeSideMenu();
        closeExtraMenu();
        setSettlementOpen(false);
        setSideMenuOpen(false);
        setShowExtraView(false);
        setIsLastSettlement(false);
        Keyboard.dismiss;
    };

    const toggleSideMenu = () => {
        Animated.timing(translateX, {
            toValue: sideMenuOpen ? SIDE_MENU_WIDTH : 0, // 열고 닫기 애니메이션
            duration: 300,
            useNativeDriver: true,
        }).start();
        setSideMenuOpen(!sideMenuOpen);
    };

    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10, // 손가락이 이동했을 때 감지
          onPanResponderMove: (_, gestureState) => {
            if (gestureState.dx < 0) {
              // 🔹 왼쪽으로 스와이프 → 드로어 열기
              translateX.setValue(SIDE_MENU_WIDTH + gestureState.dx);
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

    const toggleExtraView = () => {
        if(showExtraView){
            closeExtraMenu();
        }
        else{
            openExtraMenu();
        }
        setShowExtraView(!showExtraView);
        Keyboard.dismiss;
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

    const openSettlement = () => {
        //TODO: 방장만 열 수 있게
        setSettlementOpen(true);
    };

    const closeSettlement = () => {
        setSettlementOpen(false);
        closeExtraMenu();
        setShowExtraView(false);
        setIsLastSettlement(false);
    };

    //정산 요청 메서드
    const requestSettlement = () => {
        if(!isLastSettlement){
            setIsLastSettlement(true);
            return;
        }
        //api 호출
        setData([...data, {id: data[data.length - 1].id + 1, content: settlementCost.toString(), sender: 'donghyun', time: new Date(), type: Type.MONEY}]);
        //메시지 보내기
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
        return item.type !== Type.MONEY ? <ChatItem item={{...item, isShowProfile, isShowTime}}/> : <SettlementBox settlement={{id: item.id, currentUser: chatRoomData.currentPerson, cost: parseInt(item.content), sender: item.sender, time: item.time, onPress: ()=>navigation.navigate('Settlement', { data: Object.freeze({accountNumber: '0000-0000',accountBank: '우리은행', cost: Number.parseInt(item.content), time: item.time, members: chatRoomData.currentPerson})}), isShowProfile, isShowTime}}/>;
    }, [data, chatRoomData, navigation]);

    return (
        <KeyboardAvoidingView
            style={styles.rootContainer}
            behavior={'padding'}
        >
        <TouchableWithoutFeedback {...panResponder.panHandlers} onPress={closeAll}>
            <View style={styles.container}>
                <SVGButton iconName="Kebab" onPress={toggleSideMenu}/>
                <Animated.View
                    style={[styles.sideMenu, { transform: [{ translateX }], width: SIDE_MENU_WIDTH}]}
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
                <Animated.View style={{height: CHAT_AREA_HEIGHT + EXTRA_MENU_HEIGHT, transform: [{ translateY }]}}>
                    {settlementOpen ? (
                        <View style={styles.settlementContainer}>
                            <SVGButton iconName="CloseFill" onPress={closeSettlement} buttonStyle={styles.settlementCloseBtn}/>
                            {!isLastSettlement ? (
                                <View>
                                    <View style={[styles.settlementCostContainer, {marginTop: 70}]}>
                                        <BasicText text="결제 금액" style={styles.settlementCostText}/>
                                        <View style={styles.settlementCostTextContainer}>
                                            <BasicText style={styles.settlementCostText}>{settlementCost + '원'}</BasicText>
                                            <TouchableOpacity>
                                                <BasicText text="정산 금액 수정" style={styles.settlementCostEditText}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={[styles.settlementCostContainer, {marginTop: 23}]}>
                                        <BasicText text="정산 금액" style={styles.settlementCostText}/>
                                        <BasicText style={styles.settlementCostText}>{Math.ceil(settlementCost / chatRoomData.currentPerson.length) + '원'}</BasicText>
                                    </View>
                                    <View style={styles.bankContainer}>
                                        <SVG width={26} height={26} style={styles.bankIcon} name="Bank"/>
                                        <BasicText style={styles.bankText}>{'KB 국민은행 000-0000-0000-00'}</BasicText>
                                    </View>
                                    <TouchableOpacity>
                                        <BasicText text="정산 계좌 변경하기" style={styles.bankEdit}/>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View>
                                    <BasicText style={styles.settlementTitle} text="최종 확인"/>
                                    <BasicText style={styles.settlementTime}>{new Date().toDateString()}</BasicText>
                                    <View style={styles.settlementLoactionContainer}>
                                        <SVG style={styles.settlementLocationIcon} width={16} height={16} name="LocationBlack"/>
                                        <BasicText style={styles.settlementLocationText} text={chatRoomData.from}/>
                                        <SVG style={styles.settlementLocationIcon} width={14} height={14} name="RightArrow"/>
                                        <BasicText style={styles.settlementLocationText} text={chatRoomData.to}/>
                                    </View>
                                    <View style={styles.settlementLastCostContainer}>
                                        <View style={styles.settlementLastCostBox}>
                                            <View style={styles.settlementLastTextContainer}>
                                                <BasicText style={styles.settlementLastText} text="정산 인원"/>
                                                <BasicText style={styles.settlementLastText}>{chatRoomData.currentPerson.length + '명'}</BasicText>
                                            </View>
                                            <View style={styles.settlementLastTextContainer}>
                                                <BasicText style={styles.settlementLastText} text="결제 금액"/>
                                                <BasicText style={styles.settlementLastText}>{settlementCost + '원'}</BasicText>
                                            </View>
                                            <View style={styles.settlementLastTextContainer}>
                                                <BasicText style={styles.settlementLastText} text="정산 금액"/>
                                                <BasicText style={styles.settlementLastText}>{Math.ceil(settlementCost / chatRoomData.currentPerson.length) + '원'}</BasicText>
                                            </View>
                                        </View>
                                        <View style={styles.settlementLastCostBox}>
                                            {chatRoomData.currentPerson.map(e => {
                                                return (
                                                    <View style={styles.settlementLastTextContainer}>
                                                        <BasicText style={styles.settlementLastText} text={e.name}/>
                                                        <BasicText style={styles.settlementLastText}>{Math.ceil(settlementCost / chatRoomData.currentPerson.length) + '원'}</BasicText>
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    </View>
                                </View>
                            )}
                            <BasicButton text={isLastSettlement ? '정산 요청하기' : '다음'} onPress={requestSettlement} textStyle={styles.settlementBtnText} buttonStyle={styles.settlementBtn}/>
                        </View>
                    ) : (
                        <View>
                            <View style={styles.inputContainer}>
                                <SVGButton iconName={showExtraView ? 'CloseFill' : 'AddFill'} onPress={()=>toggleExtraView()} buttonStyle={styles.addBtn}/>
                                <TextInput
                                style={styles.inputBox}
                                value={message}
                                onChangeText={setMessage}
                                placeholder="메시지를 입력하세요."
                                multiline={true}
                                />
                                <SVGButton iconName="Send" onPress={sendMessage} buttonStyle={styles.sendBtn}/>
                            </View>
                            <View style={[styles.extraView, { height: EXTRA_MENU_HEIGHT }]}>
                                <View style={styles.extraViewContainer}>
                                    <SVGButton onPress={()=>getImageByGallery()} iconName="Picture" SVGStyle={styles.extraViewItemIcon} buttonStyle={styles.extraViewItem}/>
                                    <BasicText text="앨범" style={styles.extraViewItemText}/>
                                </View>
                                <View style={styles.extraViewContainer}>
                                    <SVGButton onPress={getImageByCamera} iconName="Camera" SVGStyle={styles.extraViewItemIcon} buttonStyle={styles.extraViewItem}/>
                                    <BasicText text="카메라" style={styles.extraViewItemText}/>
                                </View>
                                <View style={styles.extraViewContainer}>
                                    <SVGButton onPress={openSettlement} iconName="Money" SVGStyle={styles.extraViewItemIcon} buttonStyle={styles.extraViewItem}/>
                                    <BasicText text="정산 요청" style={styles.extraViewItemText}/>
                                </View>
                            </View>
                        </View>
                    )}
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default ChatRoom;
