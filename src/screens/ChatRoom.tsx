// Chat.tsx 테스트
import React, {useState, useEffect, useRef, useCallback} from 'react';
import { View, FlatList, TextInput, Keyboard, KeyboardEvent, TouchableWithoutFeedback } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/ChatRoom.style';
import ChatItem from '../components/ChatItem';
import SVGButton from '../components/button/SVGButton';
import BasicText from '../components/BasicText';
import SettlementBox from '../components/SettlementBox';
import useImagePicker from '../hooks/useImagePicker';

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

type TargetScreenRouteProp = RouteProp<RootStackParamList, 'ChatRoom'>;

const Chat = ({ route }: { route: TargetScreenRouteProp }) => {
    const [data, setData] = useState<Chat[]>([]);
    const [message, setMessage] = useState<string>('');
    const [showExtraView, setShowExtraView] = useState<boolean>(false);
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
    const chatListRef = useRef<FlatList>(null);
    const { imageUri, getImageByCamera, getImageByGallery } = useImagePicker();
    const chatRoomData = route.params.data;

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
        setShowExtraView(false);
        Keyboard.dismiss;
    };

    const toggleExtraView = () => {
        setShowExtraView(!showExtraView);
        setTimeout(() => chatListRef.current?.scrollToEnd({ animated: false }), 100);
        Keyboard.dismiss;
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
        return item.type !== Type.MONEY ? <ChatItem item={{...item, isShowProfile, isShowTime}}/> : <SettlementBox settlement={{id: item.id, currentUser: chatRoomData.currentPerson, cost: parseInt(item.content), sender: item.sender, time: item.time, isShowProfile, isShowTime}}/>;
    }, [data]);

    return (
        <TouchableWithoutFeedback onPress={closeAll}>
            <View style={styles.container}>
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
