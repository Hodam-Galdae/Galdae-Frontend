// Chat.tsx 테스트
import React from 'react';
import { Image, View } from 'react-native';
import styles from '../styles/ChatItem.style';
import BasicText from './BasicText';
import SVG from './SVG';
import { theme } from '../styles/theme';

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
    senderImage?: string,
    time: Date,
    type: Type,
    isShowProfile?: boolean,
    isShowTime?: boolean
}

const ChatItem: React.FC<{item: Chat}> = React.memo(({item}) => {
    //임시 이름
    const tempUser: string = 'donghyun';
    return (
    <View style={styles.container}>
        {item.type === Type.MESSAGE ? (
            <View>
                {item.sender !== tempUser && item.isShowProfile ? (
                    <View style={styles.userWrapper}>
                        {item.senderImage === undefined ? <SVG name="DefaultProfile" style={styles.userImage}/> : <Image source={{uri: item.senderImage}}/>}
                        <BasicText text={item.sender}/>
                    </View>
                ) : null}
                <View style={[styles.messageWrapper, {justifyContent: item.sender === tempUser ? 'flex-end' : 'flex-start'}]}>
                    {item.isShowTime && item.sender === tempUser ? (
                        <BasicText style={styles.timeText} text={item.time.getHours() + ':' + item.time.getMinutes()}/>
                    ) : null}
                    <View style={[styles.messageContainer, {alignSelf: item.sender === tempUser ? 'flex-end' : 'flex-start', backgroundColor: item.sender === tempUser ? theme.colors.brandSubColor : theme.colors.white}]}>
                        <BasicText style={styles.messageText} text={item.content}/>
                    </View>
                    {item.isShowTime && item.sender !== tempUser ? (
                        <BasicText style={styles.timeText} text={item.time.getHours() + ':' + item.time.getMinutes()}/>
                    ) : null}
                </View>
            </View>
        ) : null}
    </View>
    );
});

export default ChatItem;
