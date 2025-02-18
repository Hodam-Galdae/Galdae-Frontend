import React from 'react';
import styles from '../styles/PositionBox.style';
import BasicText from './BasicText';
import {
    TouchableOpacity,
  View,
} from 'react-native';

export interface PositionBoxProps {
    title: string;
    subTitle: string;
    isOrigin: boolean;
}

const PositionBox: React.FC<PositionBoxProps> = ({title, subTitle, isOrigin}) => {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <BasicText style={styles.tag} text={isOrigin ? '출발지' : '도착지'}/>
                <BasicText text={title} style={styles.title}/>
                <BasicText text={subTitle} style={styles.subTitle}/>
            </View>
        </TouchableOpacity>
    );
};

export default PositionBox;
