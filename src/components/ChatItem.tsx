/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, View } from 'react-native';
import styles from '../styles/ChatItem.style';
import BasicText from './BasicText';
import SVG from './SVG';
import { theme } from '../styles/theme';
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
  nickname: string;
  unreadCount?: number;
};

const ChatItem: React.FC<{ item: Chat }> = React.memo(({ item }) => {

  return (
    <View style={styles.container}>
      {item.type === 'ENTER' || item.type === 'EXIT' ? (
        <BasicText text={item.content} style={styles.enterBox} />
      ) : (
        <View>
          {item.sender !== item.nickname && item.isShowProfile ? (
            <View style={styles.userWrapper}>
              {item.senderImage === null ? (
                <SVG name="DefaultProfile" style={styles.userImage} />
              ) : (
                <Image style={styles.userImage} source={{ uri: item.senderImage }} />
              )}
              <BasicText text={item.sender} />
            </View>
          ) : null}
          <View
            style={[
              styles.messageWrapper,
              {
                justifyContent:
                  item.sender === item.nickname ? 'flex-end' : 'flex-start',
              },
            ]}>
          <View style={styles.timeWrapperRight}>
          {item.unreadCount !== undefined && item.unreadCount > 0 && item.sender === item.nickname && (
              <BasicText
                style={[styles.unreadText, { marginTop: 4 }]}
                text={`${item.unreadCount}`}
              />
            )}
            {item.isShowTime && item.sender === item.nickname ? (
              <BasicText
                style={styles.timeText}
                text={moment.utc(item.time).hour() + ':' + moment.utc(item.time).minute()}
              />
            ) : null}
          </View>

            {item.type === 'MESSAGE' ? (
              <View
                style={[
                  styles.messageContainer,
                  {
                    alignSelf:
                      item.sender === item.nickname
                        ? 'flex-end'
                        : 'flex-start',
                    backgroundColor:
                      item.sender === item.nickname
                        ? theme.colors.blue2
                        : theme.colors.white,
                  },
                ]}>
                <BasicText style={styles.messageText} text={item.content} />

              </View>
            ) : item.type === 'IMAGE' ? (
              <Image style={styles.image} source={{ uri: item.content }} />
            ) : null}

            <View style={styles.timeWrapper}>
            {item.unreadCount !== undefined && item.unreadCount > 0 && item.sender !== item.nickname && (
                <BasicText
                  style={[styles.unreadText, { marginTop: 4 }]}
                  text={`${item.unreadCount}`}
                />
              )}
              {item.isShowTime && item.sender !== item.nickname ? (
                <BasicText
                  style={styles.timeText}
                  text={moment.utc(item.time).hour() + ':' + moment.utc(item.time).minute()}
                />
              ) : null}

            </View>
          </View>
        </View>
      )}
    </View>
  );
});

export default ChatItem;
