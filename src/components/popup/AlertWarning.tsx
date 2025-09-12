import React from 'react';
import { Modal, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import SVG from '../../components/SVG';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import { theme } from '../../styles/theme';
//import {  } from '../utils/ScreenScaler';
import styles from '../../styles/AlertWarning.style';

export interface AlertWarningProps {
    visible: boolean;
    onCancel?: () => void;
    onConfirm: () => void;
    title?: string;
    subTitle?: string;
    fromMajor?: string;
    fromSub?: string;
    toMajor?: string;
    toSub?: string;
    containerStyle?: StyleProp<ViewStyle>;
}

const AlertWarning: React.FC<AlertWarningProps> = ({
    visible,
    onCancel,
    onConfirm,
    title = '지금 돌아가시면 학생 인증부터 다시 진행해야 합니다.',
    subTitle = '그래도 돌아가시겠습니까?',


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
                            style={styles.textPopUpTitle}
                            text={title}
                            fontSize={theme.fontSize.size18}
                            color={theme.colors.blackV0}
                        />
                        {
                            subTitle && (
                                <BasicText
                                    style={styles.onlySubTitleText}
                                    text={subTitle}
                                    fontSize={theme.fontSize.size18}
                                    color={theme.colors.blackV0}
                                />
                            )
                        }
                        <View style={styles.buttonContainer}>
                            <BasicButton
                                text="취소"
                                textStyle={styles.cancelBtnText}
                                buttonStyle={styles.cancelBtn}
                                enabledColors={{
                                    backgroundColor: theme.colors.blue2,
                                    textColor: theme.colors.blue,
                                    borderColor: theme.colors.transparent,
                                }}
                                onPress={onCancel}
                            />
                            <BasicButton
                                text="돌아가기"
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

export default AlertWarning;
