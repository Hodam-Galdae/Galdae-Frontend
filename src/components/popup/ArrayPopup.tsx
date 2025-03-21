import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import { View} from 'react-native';
import { Modalize } from 'react-native-modalize';
import styles from '../../styles/FastGaldaePopup.style';
import BasicText from '../BasicText';
import SVGButton from '../button/SVGButton';
import { theme } from '../../styles/theme';
export interface FastGaldaeTimePopupRef {
  open: () => void;
  close: () => void;
}

export interface FastGaldaePopupProps {
    onConfirm: (selectedSortOrder: 'latest' | 'departureTime') => void;
    onClose?: () => void;
}

const ArrayPopup = forwardRef<FastGaldaeTimePopupRef, FastGaldaePopupProps>(
  ({ onClose,onConfirm },ref ) => {

    const modalizeRef = useRef<Modalize>(null);
    const [selectedSortOrder, setSelectedSortOrder] = useState<'latest' | 'departureTime'>('latest');
    useImperativeHandle(ref, () => ({
        open: () => {
          modalizeRef.current?.open();
        },
        close: () => {
          modalizeRef.current?.close();
        },
      }));

      const handleSelect = (order: 'latest' | 'departureTime') => {
        onConfirm(order);
        setSelectedSortOrder(order);
        //modalizeRef.current?.close();
      };


    return (
      <Modalize
        ref={modalizeRef}
        modalHeight={152} // 고정 높이 설정
        onClosed={onClose}
        overlayStyle={styles.background}
        modalStyle={styles.container}
        withHandle={false}  // 기본 핸들을 비활성화
        {...({ swipeToClose: true, swipeThreshold: 10 } as any)}
      >
        {/* 팝업 안쪽에 커스텀 핸들 추가 */}
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>

        <View style={styles.arrayContent}>
            <View style={styles.latest}>
                <SVGButton
               onPress={() => handleSelect('latest')}
                iconName={selectedSortOrder === 'latest' ? 'check_circle_fill' : 'check_circle_line'}
                />

                <BasicText text="최신순" style={styles.font} color={selectedSortOrder === 'latest' ? theme.colors.black : theme.colors.gray2}  onPress={() => handleSelect('latest')}/>
            </View>
            <View style={styles.latest}>
                <SVGButton
                onPress={() => handleSelect('departureTime')}
                iconName={selectedSortOrder === 'departureTime' ? 'check_circle_fill' : 'check_circle_line'}
                />
                <BasicText text="시간임박순" style={styles.font} color={selectedSortOrder === 'departureTime' ? theme.colors.black : theme.colors.gray2}  onPress={() => handleSelect('departureTime')}/>
            </View>

        </View>

      </Modalize>
    );
  }
);


export default ArrayPopup;
