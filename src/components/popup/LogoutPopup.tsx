import React from 'react';
import { Modal, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import SVG from '../../components/SVG';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import { theme } from '../../styles/theme';
//import {  } from '../utils/ScreenScaler';
import styles from '../../styles/LogoutPopup.style';

export interface LogoutPopupProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    containerStyle?: StyleProp<ViewStyle>;
    cancelButtonText?: string;
    buttonText?: string;
}

const LogoutPopup: React.FC<LogoutPopupProps> = ({
    visible,
    onCancel,
    onConfirm,
    title = '정말 로그아웃 하시겠습니까?',
    containerStyle,
    cancelButtonText = '취소',
    buttonText = '로그아웃',
}) => {
    return (
        <Modal transparent={true} visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={[styles.textPopUp, containerStyle]}>
                    <TouchableOpacity onPress={onCancel} style={styles.cancelIconWrapper}>
                        <SVG name="close" style={styles.cancelIcon} />
                    </TouchableOpacity>
                    <View style={styles.textPopUpcontent}>
                        <BasicText
                            text={title}
                            fontSize={theme.fontSize.size16}
                            color={theme.colors.blackV0}
                            style={styles.titleText}
                        />

                        <View style={styles.cancelContainer}>
                        <BasicButton
                                text={cancelButtonText}
                                textStyle={styles.cancelBtnText}
                                buttonStyle={styles.cancelBtn}
                                enabledColors={{
                                    backgroundColor: theme.colors.blue2,
                                    textColor: theme.colors.blue,
                                    borderColor: theme.colors.Galdae,
                                }}
                                onPress={onCancel}
                            />
                            <BasicButton
                                text={buttonText}
                                textStyle={styles.cancelBtnText}
                                buttonStyle={styles.cancelBtn}
                                enabledColors={{
                                    backgroundColor: theme.colors.blue,
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

export default LogoutPopup;
