// Chat.tsx 테스트
import React, {useState, useEffect} from 'react';
import { View, FlatList } from 'react-native';
import styles from '../styles/ChatRoom.style';
import ChatItem from '../components/ChatItem';
import BasicText from '../components/BasicText';

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
    sender?: string,
    time: Date,
    senderImage?: string,
    type: Type,
    isFirstMessage?: boolean,
    isSameTimeMessage?: boolean,
    isLastMessage?: boolean,
}

const Chat: React.FC = () => {
    const [data, setData] = useState<Chat[]>([]);

    useEffect(()=>{
        setData(
            [
                {
                    id: "1",
                    content: "안녕",
                    sender: "ass",
                    time: new Date(2025, 2, 18, 17, 24, 30),
                    type: Type.MESSAGE,
                },
                {
                    id: "1",
                    content: "안녕",
                    sender: "ass",
                    time: new Date(2025, 2, 18, 17, 24, 35),
                    type: Type.MESSAGE,
                },
                {
                    id: "1",
                    content: "안녕3",
                    sender: "ass",
                    time: new Date(2025, 2, 18, 17, 25, 30),
                    type: Type.MESSAGE,
                },
                {
                    id: "2",
                    content: "안녕asdfasdfasdfa",
                    sender: "donghyun",
                    time: new Date(2025, 2, 18, 17, 50, 30),
                    type: Type.MESSAGE,
                },
            ]
        );
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => {
                    const isFirstMessage = index === data.length - 1 || data[index - 1]?.sender !== item.sender;
                    const isLastMessage = index === data.length - 1 || data[index + 1]?.sender !== item.sender;
                    const isSameTimeMessage = index === data.length - 1 || (data[index - 1]?.time.getMinutes() === item.time.getMinutes() && data[index - 1]?.time.getHours() === item.time.getHours());
                    return <ChatItem item={{...item, isFirstMessage, isSameTimeMessage, isLastMessage}}/>;
                }}
            />
        </View>
    );
};

export default Chat;
