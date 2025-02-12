import React from 'react';
import {  TextStyle, TextInput, TextInputProps, StyleSheet } from 'react-native';
import styles from '../styles/BasicInput.style';

// 기본 폰트 이름
const fontName = 'NotoSansKR';

// 폰트 매핑에 사용할 유니온 타입 선언
type FontMappingKey = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

// 모든 플랫폼에서 동일하게 사용할 폰트 매핑 객체 (유니온 타입을 사용)
const fontMap: { [key in FontMappingKey]: string } = {
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

const BasicInput = ({ text, ...props }: RNTextInputProps) => {
    // 전달된 스타일을 평탄화
    const flatStyle = StyleSheet.flatten(props.style) as TextStyle | undefined;

    // 기본적으로 '400'으로 설정, 유니온 타입(FontMappingKey)으로 선언
    let weight: FontMappingKey = '400';
    if (flatStyle && flatStyle.fontWeight !== undefined) {
        // 만약 fontWeight가 number라면 문자열로 변환하고, string인 경우 바로 캐스팅
        weight = (typeof flatStyle.fontWeight === 'number'
            ? flatStyle.fontWeight.toString()
            : flatStyle.fontWeight) as FontMappingKey;
    }

    // 통일된 스타일: 폰트 패밀리와 fontWeight 적용
    const unifiedStyle: TextStyle = { fontFamily: fontMap[weight], fontWeight: weight };

    return (
        <TextInput
            {...props}
            style={[unifiedStyle, styles.input, props.style]}
            placeholder={text}
        />
    );
};

export default BasicInput;
