import * as svg from '../assets/svg';
import { SvgProps } from 'react-native-svg';
import React from 'react';

export type SVGIconProps = SvgProps & {
    name: keyof typeof svg |null;
};

const SVG = ({ name, ...props }: SVGIconProps) => {
    const Icon = svg[name ?? 'GaldaeLogo']; // 기본 아이콘 사용
    return <Icon {...props} />;
};


export default SVG;
