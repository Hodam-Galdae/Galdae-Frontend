import React from 'react';
import {Image, View} from 'react-native';
import styles from '../styles/ChatItem.style';
import BasicText from './BasicText';
import SVG from './SVG';
import {theme} from '../styles/theme';

type Chat = {
  id: number;
  content: string;
  sender: string;
  senderImage?: string;
  time: Date;
  type: string;
  isShowProfile?: boolean;
  isShowTime?: boolean;
};

const ChatItem: React.FC<{item: Chat}> = React.memo(({item}) => {
  //임시 이름
  const tempUser: string = 'donghyun';
  return (
    <View style={styles.container}>
      {item.type === 'ENTER' || item.type === 'EXIT' ? (
        <BasicText text={item.content} style={styles.enterBox} />
      ) : (
        <View>
          {item.sender !== tempUser && item.isShowProfile ? (
            <View style={styles.userWrapper}>
              {item.senderImage === undefined ? (
                <SVG name="DefaultProfile" style={styles.userImage} />
              ) : (
                <Image source={{uri: item.senderImage}} />
              )}
              <BasicText text={item.sender} />
            </View>
          ) : null}
          <View
            style={[
              styles.messageWrapper,
              {
                justifyContent:
                  item.sender === tempUser ? 'flex-end' : 'flex-start',
              },
            ]}>
            {item.isShowTime && item.sender === tempUser ? (
              <BasicText
                style={styles.timeText}
                text={item.time.getHours() + ':' + item.time.getMinutes()}
              />
            ) : null}
            {item.type === 'MESSAGE' ? (
              <View
                style={[
                  styles.messageContainer,
                  {
                    alignSelf:
                      item.sender === tempUser ? 'flex-end' : 'flex-start',
                    backgroundColor:
                      item.sender === tempUser
                        ? theme.colors.brandSubColor
                        : theme.colors.white,
                  },
                ]}>
                <BasicText style={styles.messageText} text={item.content} />
              </View>
            ) : item.type === 'IMAGE' ? (
              //TODO: item.content로 변경
              <Image style={styles.image} source={{uri: item.content}} />
            ) : null}
            {item.isShowTime && item.sender !== tempUser ? (
              <BasicText
                style={styles.timeText}
                text={item.time.getHours() + ':' + item.time.getMinutes()}
              />
            ) : null}
          </View>
        </View>
      )}
    </View>
  );
});

export default ChatItem;
