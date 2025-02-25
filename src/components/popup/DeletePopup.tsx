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
    buttonText?:string;
  }

  const DeletePopup: React.FC<DeletePopupProps> = ({
    visible,
    onCancel,
    onConfirm,
    title = '선택하신 갈대를',
    message = '삭제하시겠습니까?',
    containerStyle,
    buttonText="삭제하기",
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
                color={theme.colors.black}
                style={styles.titleText}
              />
              <BasicText
                text={message}
                fontSize={theme.fontSize.size16}
                color={theme.colors.black}
                style={styles.textPopUpText}
              />
              <View style={styles.cancelContainer}>
                <BasicButton
                  text={buttonText}
                  textStyle={styles.cancelBtnText}
                  buttonStyle={styles.cancelBtn}
                  enabledColors={{
                    backgroundColor: theme.colors.brandColor,
                    textColor: theme.colors.white,
                    borderColor: theme.colors.transparent,
                  }}
                  onPress={onConfirm}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

export default DeletePopup;
