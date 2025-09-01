import React from 'react';
import styles from '../styles/PositionBox.style';
import BasicText from './BasicText';
import TextTag from './tag/TextTag';
import {
    TouchableOpacity,
  View,
} from 'react-native';

export interface PositionBoxProps {
    title: string;
    subTitle: string;
    isOrigin: boolean;
    onPress?: () => void;
}

const PositionBox: React.FC<PositionBoxProps> = ({title, subTitle, isOrigin, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <TextTag
                    text={isOrigin ? '출발지' : '도착지'}
                    viewStyle={isOrigin ? styles.tag : styles.tagDestination}
                    textStyle={isOrigin ? styles.tagText : styles.tagDestinationText}
                />
                <BasicText text={title} style={styles.title}/>
                <BasicText text={subTitle} style={styles.subTitle}/>
            </View>
        </TouchableOpacity>
    );
};

export default PositionBox;
