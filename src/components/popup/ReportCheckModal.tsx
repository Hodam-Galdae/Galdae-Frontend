import React from 'react';
import { Modal,View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import SVG from '../../components/SVG';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import { theme } from '../../styles/theme';
import styles from '../../styles/ReportCheckModal.style';
import { MemberResponse } from '../../api/chatApi';

export interface ReportCheckModalProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    member: MemberResponse;
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
                text={member.memberName + '님 을'}
                fontWeight={'500'}
                fontSize={theme.fontSize.size16}
                color={theme.colors.black}
              />
              <BasicText
                text={'정말 신고하겠습니까?'}
                fontSize={theme.fontSize.size16}
                fontWeight={'500'}
                color={theme.colors.black}
                style={styles.textPopUpText}
              />
              <BasicButton
                text="신고하기"
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
      </Modal>
    );
  };

export default ReportCheckModal;
