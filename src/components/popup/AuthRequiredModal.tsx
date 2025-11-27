import React from 'react';
import { Modal, View, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import SVG from '../../components/SVG';
import { theme } from '../../styles/theme';
import styles from '../../styles/AuthRequiredModal.style';

export interface AuthRequiredModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  containerStyle,
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.textPopUp, containerStyle]}>
          {onCancel && (
            <TouchableOpacity onPress={onCancel} style={styles.cancelIconWrapper}>
              <SVG name="CancelBlack" style={styles.cancelIcon} />
            </TouchableOpacity>
          )}
          <View style={styles.textPopUpcontent}>
            <BasicText
              text={'잠시만요!'}
              fontSize={theme.fontSize.size18}
              fontWeight={'700'}
              color={theme.colors.blackV0}
              style={styles.textPopUpTitle}
            />
            <BasicText
              text={'그룹 생성·참여 전,\n학교 인증과 회원 정보 입력이 필요합니다.'}
              fontSize={theme.fontSize.size14}
              fontWeight={'400'}
              color={theme.colors.blackV0}
              style={styles.textPopUpText}
            />
            <BasicButton
              text="내 프로필 완성하기"
              textStyle={styles.confirmBtnText}
              buttonStyle={styles.confirmBtn}
              enabledColors={{
                backgroundColor: theme.colors.white,
                textColor: theme.colors.Galdae,
                borderColor: theme.colors.Galdae,
              }}
              onPress={onConfirm}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AuthRequiredModal;
