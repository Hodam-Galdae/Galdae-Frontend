import React from 'react';
import {Platform, TextStyle, TextInput, TextInputProps, StyleSheet} from 'react-native';
import styles from '../styles/BasicInput.style';

const fontName = 'Inter_24pt';
const androidFontMap: { [key: string]: string } = {
    '100': `${fontName}-Thin`,
    '200': `${fontName}-ExtraLight`,
    '300': `${fontName}-Light`,
    '400': `${fontName}-Regular`,
    '500': `${fontName}-Medium`,
    '600': `${fontName}-SemiBold`,
    '700': `${fontName}-Bold`,
    '800': `${fontName}-ExtraBold`,
    '900': `${fontName}-Black`,
};

interface RNTextInputProps extends TextInputProps {
    text?: string;
}

const BasicInput = ({ text, ...props} : RNTextInputProps) => {


    // 2.전달된 style을 객체로 변환
    const flatStyle: TextStyle | undefined = StyleSheet.flatten(props.style);

    let weight = flatStyle?.fontWeight;
    if (weight === undefined) {
        weight = '400';
    }

    // 3.플랫폼 별 폰트 매핑
    const platformStyle = Platform.select({
        // iOS는 기본적으로 fontWeight 사용.
        ios: { fontWeight: weight, fontFamily: 'Inter_24pt-Regular' },
        // Android에서는 폰트 매핑.
        android: {
            fontFamily: androidFontMap[weight] || androidFontMap['400'],
        },
    }) as TextStyle;


    return (
        <TextInput
            {...props}
            style={[props.style, platformStyle, styles.input]}
            placeholder={text}
        />
    );
};

export default BasicInput;
