import React from 'react';
import {Image, View} from 'react-native';
import styles from '../styles/ChatItem.style';
import BasicText from './BasicText';
import SVG from './SVG';
import {theme} from '../styles/theme';
import {useSelector} from 'react-redux';
import {RootState} from '../modules/redux/RootReducer';
import moment from 'moment';

type Chat = {
  id: number;
  content: string;
  sender: string;
  senderImage?: string;
  time: string;
  type: string;
  isShowProfile?: boolean;
  isShowTime?: boolean;
};

const ChatItem: React.FC<{item: Chat}> = React.memo(({item}) => {
  const userInfo = useSelector((state: RootState) => state.user);
  console.log(item.time);
  return (
    <View style={styles.container}>
      {item.type === 'ENTER' || item.type === 'EXIT' ? (
        <BasicText text={item.content} style={styles.enterBox} />
      ) : (
        <View>
          {item.sender !== userInfo.nickname && item.isShowProfile ? (
            <View style={styles.userWrapper}>
              {item.senderImage === null ? (
                <SVG name="DefaultProfile" style={styles.userImage} />
              ) : (
                <Image style={styles.userImage} source={{uri: item.senderImage}} />
              )}
              <BasicText text={item.sender} />
            </View>
          ) : null}
          <View
            style={[
              styles.messageWrapper,
              {
                justifyContent:
                  item.sender === userInfo.nickname ? 'flex-end' : 'flex-start',
              },
            ]}>
            {item.isShowTime && item.sender === userInfo.nickname ? (
              <BasicText
                style={styles.timeText}
                text={moment.utc(item.time).hour() + ':' + moment.utc(item.time).minute()}
              />
            ) : null}
            {item.type === 'MESSAGE' ? (
              <View
                style={[
                  styles.messageContainer,
                  {
                    alignSelf:
                      item.sender === userInfo.nickname
                        ? 'flex-end'
                        : 'flex-start',
                    backgroundColor:
                      item.sender === userInfo.nickname
                        ? theme.colors.brandSubColor
                        : theme.colors.white,
                  },
                ]}>
                <BasicText style={styles.messageText} text={item.content} />
              </View>
            ) : item.type === 'IMAGE' ? (
              <Image style={styles.image} source={{uri: item.content}} />
            ) : null}
            {item.isShowTime && item.sender !== userInfo.nickname ? (
              <BasicText
                style={styles.timeText}
                text={moment.utc(item.time).hour() + ':' + moment.utc(item.time).minute()}
              />
            ) : null}
          </View>
        </View>
      )}
    </View>
  );
});

export default ChatItem;
