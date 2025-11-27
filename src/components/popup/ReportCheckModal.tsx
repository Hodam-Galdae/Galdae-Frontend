/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Modal,View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import SVG from '../../components/SVG';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import { theme } from '../../styles/theme';
import styles from '../../styles/ReportCheckModal.style';
import { ChatMember } from '../../api/chatApi';

export interface ReportCheckModalProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    member: ChatMember;
    containerStyle?: StyleProp<ViewStyle>;
  }

  const ReportCheckModal: React.FC<ReportCheckModalProps> = ({
    visible,
    onCancel,
    onConfirm,
    member,
    containerStyle,
  }) => {
    return (
      <Modal transparent={true} visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <View style={[styles.textPopUp, containerStyle]}>
            <TouchableOpacity onPress={onCancel} style={styles.cancelIconWrapper}>
              <SVG name="CancelBlack" style={styles.cancelIcon}/>
            </TouchableOpacity>
            <View style={styles.textPopUpcontent}>
              <SVG name="Alert" style={{marginBottom: 20}}/>
              <BasicText
                style={styles.textPopUpTitle}
                text={member.memberName + '님을'}
                fontSize={theme.fontSize.size18}
                color={theme.colors.blackV2}
              />
              <BasicText
                text={'정말 신고하겠습니까?'}
                fontSize={theme.fontSize.size18}
                color={theme.colors.blackV2}
                style={styles.textPopUpText}
              />
              <BasicButton
                text="신고하기"
                textStyle={styles.cancelBtnText}
                buttonStyle={styles.cancelBtn}
                enabledColors={{
                  backgroundColor: theme.colors.red,
                  textColor: theme.colors.white,
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

export default ReportCheckModal;
