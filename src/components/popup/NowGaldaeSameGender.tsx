import React from 'react';
import { Modal,View, StyleProp, ViewStyle } from 'react-native';
import SVG from '../../components/SVG';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import { theme } from '../../styles/theme';
import styles from '../../styles/ReportCheckModal.style';

export interface ReportCheckModalProps {
    visible: boolean;
    onConfirm: () => void;
    containerStyle?: StyleProp<ViewStyle>;
  }

  const NowGaldaeSameGender: React.FC<ReportCheckModalProps> = ({
    visible,
    onConfirm,
    containerStyle,
  }) => {
    return (
      <Modal transparent={true} visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <View style={[styles.textPopUp, containerStyle]}>
            <View style={styles.textPopUpcontent}>
              <SVG name="Alert" style={{marginBottom: 20}}/>

              <BasicText
                text={'동성만 입장이 가능합니다'}
                fontSize={theme.fontSize.size16}
                fontWeight={'500'}
                color={theme.colors.blackV0}
                style={styles.textPopUpText}
              />
              <BasicButton
                text="확인"
                textStyle={styles.cancelBtnText}
                buttonStyle={styles.cancelBtn}
                enabledColors={{
                  backgroundColor: theme.colors.Galdae,
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

export default NowGaldaeSameGender;
