import React from 'react';
import { Modal,View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import SVG from '../../components/SVG';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import { theme } from '../../styles/theme';
//import {  } from '../utils/ScreenScaler';
import styles from '../../styles/DeletePopup.style';

export interface DeletePopupProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    containerStyle?: StyleProp<ViewStyle>;
  }

  const DeletePopup: React.FC<DeletePopupProps> = ({
    visible,
    onCancel,
    onConfirm,
    title = '선택하신 갈대를',
    message = '삭제하시겠습니까?',
    containerStyle,
  }) => {
    return (
      <Modal transparent={true} visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <View style={[styles.textPopUp, containerStyle]}>
            <TouchableOpacity onPress={onCancel} style={styles.cancelIconWrapper}>
              <SVG name="Cancel" style={styles.cancelIcon} />
            </TouchableOpacity>
            <View style={styles.textPopUpcontent}>
              <BasicText
                text={title}
                fontSize={theme.fontSize.size16}
                color={theme.colors.white}
              />
              <BasicText
                text={message}
                fontSize={theme.fontSize.size16}
                color={theme.colors.white}
                style={styles.textPopUpText}
              />
              <BasicButton
                text="삭제하기"
                textStyle={styles.cancelBtnText}
                buttonStyle={styles.cancelBtn}
                enabledColors={{
                  backgroundColor: theme.colors.white,
                  textColor: theme.colors.brandColor,
                  borderColor: theme.colors.transparent,
                }}
                onPress={onConfirm}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

export default DeletePopup;
