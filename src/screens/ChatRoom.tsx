// Chat.tsx 테스트
import React, {useState, useEffect, useRef, useCallback} from 'react';
import { View, FlatList, TextInput } from 'react-native';
import styles from '../styles/ChatRoom.style';
import ChatItem from '../components/ChatItem';
import SVGButton from '../components/button/SVGButton';

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

const Chat: React.FC = () => {
    const [data, setData] = useState<Chat[]>([]);
    const [message, setMessage] = useState<string>('');
    const chatListRef = useRef<FlatList>(null);

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
                    content: '안녕',
                    sender: 'ass',
                    time: new Date(2025, 2, 18, 17, 23, 35),
                    type: Type.MESSAGE,
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
            ]
        );
    }, []);

    //채팅 추가될 때 마다 자동 스크롤
    useEffect(()=> {
        if(chatListRef.current){
            setTimeout(() => chatListRef.current?.scrollToEnd({ animated: false }), 100);
        }
    }, [data]);

    //메시지 보내는 메서드
    const sendMessage = () => {
        //api 호출

        setData([...data, {id: data[data.length - 1].id + 1, content: message, sender: 'donghyun', time: new Date(), type: Type.MESSAGE}]);
        setMessage('');
    };

    const renderItem = useCallback(({item, index}: RenderItem) => {
        const isShowTime = !(data[index + 1]?.time.getMinutes() === item.time.getMinutes() && data[index + 1]?.time.getHours() === item.time.getHours()) || data[index + 1]?.sender !== item.sender;
        const isShowProfile = data[index - 1]?.sender !== item.sender || !(data[index - 1]?.time.getMinutes() === item.time.getMinutes() && data[index - 1]?.time.getHours() === item.time.getHours());
        return <ChatItem item={{...item, isShowProfile, isShowTime}}/>;
    }, [data]);

    return (
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
                <SVGButton iconName="AddFill" onPress={()=> {}} buttonStyle={styles.addBtn}/>
                <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="메시지를 입력하세요."
                multiline={true}
                />
                <SVGButton iconName="Send" onPress={sendMessage} buttonStyle={styles.sendBtn}/>
            </View>
        </View>
    );
};

export default Chat;
