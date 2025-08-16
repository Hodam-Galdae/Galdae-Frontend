import React, { useState, useMemo } from 'react';
import SVGTextButton, { SVGTextButtonProps } from './SVGTextButton';
import { theme } from '../../styles/theme';
import stylesheet from '../../styles/stylesheet';

// 헬퍼 함수: 전달받은 baseName에 대해, 선택 상태에 따라 variant 아이콘 이름을 반환
const getVariantIconName = (baseName: string, selected: boolean): string => {
  // 만약 baseName이 이미 "Gray"나 "White"로 시작하면 그대로 사용합니다.
  if (baseName.startsWith('Gray') || baseName.startsWith('White')) {
    return baseName;
  }
  return selected ? `White${baseName}` : `Gray${baseName}`;
};

export interface CarrierButtonProps
  extends Omit<SVGTextButtonProps, 'iconName' | 'enabledColors'> {
  // 기본 iconName을 string으로 받습니다. (예: "Bag", "Filter" 등)
  iconName: string;
}

const SelectSVGTextButton: React.FC<CarrierButtonProps> = ({
  iconName,
  buttonStyle,
  textStyle,
  onPress,
  disabled,
  loading,
  ...restProps
}) => {
  const [selected, setSelected] = useState<boolean>(false);

  const handlePress = () => {
    setSelected((prev) => !prev);
    if (onPress) {
      onPress();
    }
  };

  // 선택 상태에 따른 색상 결정
  const defaultEnabledColors = useMemo(() => {
    return selected
      ? {
          backgroundColor: theme.colors.Galdae, // 선택 시 배경색
          textColor: theme.colors.white,              // 선택 시 텍스트 색상
          borderColor: 'transparent',
        }
      : {
          backgroundColor: theme.colors.grayV3,    // 기본 배경색
          textColor: theme.colors.grayV1,              // 기본 텍스트 색상
          borderColor: 'transparent',
        };
  }, [selected]);

  // iconName을 선택 상태에 따라 variant로 변경 (예: "Bag" → "WhiteBag" 또는 "GrayBag")
  const variantIconName = getVariantIconName(iconName, selected);

  return (
    <SVGTextButton
      {...restProps}
      iconName={variantIconName as any}  // 타입 캐스팅 (필요 시 타입 정의를 수정)
      onPress={handlePress}
      disabled={disabled}
      loading={loading}
      enabledColors={defaultEnabledColors}
      // 기본 스타일과 외부 전달 스타일 병합하여 적용
      buttonStyle={[stylesheet.smallBorderTextBtn, buttonStyle]}
      textStyle={[stylesheet.smallBorderBtnText, textStyle]}
    />
  );
};

export default SelectSVGTextButton;
