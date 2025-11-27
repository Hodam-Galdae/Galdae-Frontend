import React from 'react';
import { Modal,View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import SVG from '../../components/SVG';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import { theme } from '../../styles/theme';
import styles from '../../styles/ChatRoomExitModal.style';

export interface ChatRoomExitModalProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
    title?: string;
    message?: string;
    containerStyle?: StyleProp<ViewStyle>;
  }

  const ChatRoomExitModal: React.FC<ChatRoomExitModalProps> = ({
    visible,
    onCancel,
    onConfirm,
    isLoading = false,
    title = '해당 N빵을 나가시겠습니까?',
    containerStyle,
  }) => {
    return (
      <Modal transparent={true} visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <View style={[styles.textPopUp, containerStyle]}>
            <TouchableOpacity
              onPress={onCancel}
              style={styles.cancelIconWrapper}
              disabled={isLoading}
            >
              <SVG name="CancelBlack" style={styles.cancelIcon} />
            </TouchableOpacity>
            <View style={styles.textPopUpcontent}>
              <BasicText
                style={styles.textPopUpTitle}
                text={title}
                fontSize={theme.fontSize.size18}
                color={theme.colors.blackV0}
              />
              {/* <BasicText
                text={message}
                fontSize={theme.fontSize.size16}
                fontWeight={'500'}
                color={theme.colors.blackV0}
                style={styles.textPopUpText}
              /> */}
              <BasicButton
                text="나가기"
                textStyle={styles.cancelBtnText}
                buttonStyle={styles.cancelBtn}
                enabledColors={{
                  backgroundColor: theme.colors.blue,
                  textColor: theme.colors.white,
                  borderColor: theme.colors.transparent,
                }}
                loading={isLoading}
                disabled={isLoading}
                onPress={onConfirm}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

export default ChatRoomExitModal;
