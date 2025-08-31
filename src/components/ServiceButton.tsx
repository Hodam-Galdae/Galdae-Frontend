import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import SVG from './SVG';
import BasicText from './BasicText';
import styles from '../styles/ServiceButton.style';

interface ServiceButtonProps {
    iconName: string;
    text: string;
    onPress?: () => void;
    customStyle?: any;
}

const ServiceButton: React.FC<ServiceButtonProps> = ({
    iconName,
    text,
    onPress,
    customStyle,
}) => {
    return (
        <View style={styles.serviceButtonContainer}>
            <TouchableOpacity
                style={[styles.serviceButton, customStyle]}
                onPress={onPress}
            >
                <SVG name={iconName as any} style={styles.serviceIcon} />
            </TouchableOpacity>
            <BasicText text={text} style={styles.serviceButtonText} />
        </View>
    );
};

export default ServiceButton;
