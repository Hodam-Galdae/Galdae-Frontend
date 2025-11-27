import React from 'react';
import {Modal, View, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import SVG from '../../components/SVG';
import {theme} from '../../styles/theme';
import styles from '../../styles/NotificationPermissionModal.style';

export interface NotificationPermissionModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const NotificationPermissionModal: React.FC<
  NotificationPermissionModalProps
> = ({visible, onConfirm, onCancel, containerStyle}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.textPopUp, containerStyle]}>
          {onCancel && (
            <TouchableOpacity
              onPress={onCancel}
              style={styles.cancelIconWrapper}>
              <SVG name="CancelBlack" style={styles.cancelIcon} />
            </TouchableOpacity>
          )}
          <View style={styles.textPopUpcontent}>
            <BasicText
              text={'알림 권한이 필요합니다'}
              fontSize={theme.fontSize.size18}
              fontWeight={'700'}
              color={theme.colors.blackV0}
              style={styles.textPopUpTitle}
            />
            <BasicText
              text={
                '갈대의 실시간 채팅 알림과\n중요한 정보를 받으려면\n알림 권한이 필요합니다.'
              }
              fontSize={theme.fontSize.size14}
              fontWeight={'400'}
              color={theme.colors.blackV0}
              style={styles.textPopUpText}
            />
            <View style={styles.buttonContainer}>
              {onCancel && (
                <BasicButton
                  text="나중에"
                  textStyle={styles.laterBtnText}
                  buttonStyle={styles.laterBtn}
                  enabledColors={{
                    backgroundColor: theme.colors.white,
                    textColor: theme.colors.blackV0,
                    borderColor: theme.colors.grayV2,
                  }}
                  onPress={onCancel}
                />
              )}
              <BasicButton
                text="설정으로 이동"
                textStyle={styles.confirmBtnText}
                buttonStyle={[
                  styles.confirmBtn,
                  !onCancel && styles.confirmBtnFullWidth,
                ]}
                enabledColors={{
                  backgroundColor: theme.colors.Galdae,
                  textColor: theme.colors.white,
                  borderColor: theme.colors.Galdae,
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

export default NotificationPermissionModal;
