import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from '../styles/ChatRoomItem.style';
import BasicText from './BasicText';
import SVG from './SVG';
import { GroupType } from '../types/groupTypes';
// import moment from 'moment';
import ChatRoomExitModal from './popup/ChatRoomExitModal';
import { leaveChatroom } from '../api/chatApi';
interface Props {
  id: string,
  time: string,
  from: string,
  to: string,
  currentPerson: number,
  message: string,
  unreadCount: number,
  onPress: (id: string) => void,
  isActive?: boolean,
  type: GroupType,

}

const ChatRoomItem = (props: Props) => {
  // const formatDepartureTime = (departureTime: string): string => {
  //   return moment.utc(departureTime).format('YYYY년 MM월 DD일 (ddd) HH : mm');
  // };
  const [isVisibleExitPopup, setIsVisibleExitPopup] = useState<boolean>(false);
  return (
    <>
      <TouchableOpacity onPress={() => props.onPress(props.id)} onLongPress={() => setIsVisibleExitPopup(true)}>
        <View style={[
          styles.container,

        ]}>
          <View style={styles.iconLocationWrapper}>
            {
              props.type === 'TAXI' ? (
                <SVG name={props.isActive ? 'TaxiIcon' : 'TaxiIconInactive'} style={styles.taxiIcon} width={42} height={42} />
              ) : props.type === 'DELIVERY' ? (
                <SVG name={props.isActive ? 'Delivery' : 'DeliveryIconInactive'} style={styles.taxiIcon} width={42} height={42} />
              ) : (
                <SVG name={props.isActive ? 'Ott' : 'SubscribeIconInactive'} style={styles.taxiIcon} width={42} height={42} />
              )
            }

            <View style={styles.chatInfoWrapper}>

              <View style={styles.locationWrapper}>
                {/* <SVG name="LocationBlack" style={styles.locationIcon}/> */}
                <View style={styles.locationStartWrapper}>
                  <BasicText
                    text={props.from}
                    style={[
                      styles.locationText,
                      !props.isActive && styles.inactiveText,
                    ]}
                  // numberOfLines={1}
                  // ellipsizeMode="tail"
                  />

                </View>

                {
                  props.type !== 'SUBSCRIBE' && (
                    <SVG name="RightArrow" style={styles.arrowIcon} />

                  )
                }
                <View style={styles.locationEndWrapper}>
                  <BasicText
                    text={props.to}
                    style={[
                      styles.locationText,
                      !props.isActive && styles.inactiveText,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  />

                </View>
              </View>

              <View style={styles.chatWrapper}>
                <BasicText style={[styles.lastChat, !props.isActive && styles.inactiveLastChatText]} text={props.message.toString()} numberOfLines={1} ellipsizeMode="tail" /> {/** 추후에는 채팅 내용 적용해야 함 */}

              </View>


            </View>
          </View>

          <View style={styles.personWrapper}>
            <BasicText style={styles.personText} text={props.time} /> 
            <View style={styles.message}>
              <BasicText style={styles.messageText} text={props.unreadCount.toString()} />
            </View>
          </View>
        </View>

      </TouchableOpacity>

      <ChatRoomExitModal
        visible={isVisibleExitPopup}
        onConfirm={() => {
          leaveChatroom(props.id);
          setIsVisibleExitPopup(false);
        }}
        onCancel={() => {
          setIsVisibleExitPopup(false);
        }}
      />
    </>
  );
};

export default ChatRoomItem;
