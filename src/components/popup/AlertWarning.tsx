import React from 'react';
import { Modal, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import SVG from '../../components/SVG';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import { theme } from '../../styles/theme';
//import {  } from '../utils/ScreenScaler';
import styles from '../../styles/ParticipateModal.style';

export interface ParticipateModalProps {
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

const ParticipateModal: React.FC<ParticipateModalProps> = ({
    visible,
    onCancel,
    onConfirm,
    title = '지금 돌아가시면 학생 인증부터 다시 진행해야 합니다.',
    subTitle = '그래도 돌아가시겠습니까?',
    fromMajor,
    fromSub,
    toMajor,
    toSub,

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
                            toMajor && toSub && (
                                <View style={styles.locationContainer}>
                                    <View style={styles.fromContainer}>
                                        <BasicText
                                            text={fromMajor}
                                            fontSize={theme.fontSize.size16}
                                            fontWeight={'500'}
                                            color={theme.colors.blackV0}
                                            style={styles.textPopUpText}
                                        />
                                        <BasicText
                                            text={fromSub}
                                            fontSize={theme.fontSize.size16}
                                            fontWeight={'500'}
                                            color={theme.colors.blackV0}
                                            style={styles.textPopUpText}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        />
                                    </View>
                                    <SVG name="arrow_forward" style={styles.arrowForward} />
                                    <View style={styles.fromContainer}>
                                        <BasicText
                                            text={toMajor}
                                            fontSize={theme.fontSize.size16}
                                            fontWeight={'500'}
                                            color={theme.colors.blackV0}
                                            style={styles.textPopUpText}
                                        />
                                        <BasicText
                                            text={toSub}
                                            fontSize={theme.fontSize.size16}
                                            fontWeight={'500'}
                                            color={theme.colors.blackV0}
                                            style={styles.textPopUpText}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        />
                                    </View>
                                </View>
                            )
                        }
                        {
                            subTitle && (
                                <BasicText
                                    style={styles.onlySubTitleText}
                                    text={subTitle}
                                    fontSize={theme.fontSize.size14}
                                    color={theme.colors.blackV0}
                                />
                            )
                        }
                        <BasicButton
                            text="채팅방으로 이동"
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
        </Modal>
    );
};

export default ParticipateModal;
