import React from 'react';
import { Modal,View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import SVG from '../../components/SVG';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import { theme } from '../../styles/theme';
//import {  } from '../utils/ScreenScaler';
import styles from '../../styles/DeletePopup.style';

export interface CreateGaldaePopupProps {
    visible: boolean;
    loading: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    departureDateTime: string;
    departureLocation: string;
    destination: string;
    containerStyle?: StyleProp<ViewStyle>;
  }

  const CreateGaldaePopup: React.FC<CreateGaldaePopupProps> = ({
    loading,
    visible,
    onCancel,
    onConfirm,
    departureDateTime,
    departureLocation,
    destination,
    containerStyle,
  }) => {
    return (
      <Modal transparent={true} visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <View style={[styles.createGaldae, containerStyle]}>
            <TouchableOpacity onPress={onCancel} style={styles.cancelIconWrapper}>
              <SVG name="Cancel" style={styles.cancelIcon} />
            </TouchableOpacity>
            <View style={styles.createPopUpcontent}>
              <BasicText
                text={departureDateTime}
                fontSize={theme.fontSize.size14}
                color={theme.colors.black}
                style={styles.timeText}
              />

              <View style={styles.positionContainer}>
                <SVG name="location_line" width={18} height={18}/>
                <BasicText
                  text={departureLocation}
                  fontSize={theme.fontSize.size18}
                  color={theme.colors.black}
                  style={styles.departureText}
                />
                <SVG name="arrow_right_line" width={18} height={18}/>
                <BasicText
                  text={destination}
                  fontSize={theme.fontSize.size18}
                  color={theme.colors.black}
                  style={styles.departureText}
                />
              </View>

              <BasicText
                text="위 경로로 갈대를 생성하시겠습니까?"
                fontSize={theme.fontSize.size14}
                color={theme.colors.black}
                style={styles.timeText}
              />

              <View style={styles.cancelContainer}>
                <BasicButton
                  text="생성하기"
                  textStyle={styles.cancelBtnText}
                  buttonStyle={styles.cancelBtn}
                  enabledColors={{
                    backgroundColor: theme.colors.brandColor,
                    textColor: theme.colors.white,
                    borderColor: theme.colors.transparent,
                  }}
                  disabled={loading}
                  loading={loading}
                  onPress={onConfirm}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

export default CreateGaldaePopup;
