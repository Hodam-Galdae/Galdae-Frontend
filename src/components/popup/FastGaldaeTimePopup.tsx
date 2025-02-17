import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import BasicText from '../BasicText';
import { theme } from '../../styles/theme';
import styles from '../../styles/FastGaldaePopup.style';
import BasicButton from '../button/BasicButton';


export interface FastGaldaeTimePopupRef {
  open: () => void;
  close: () => void;
}

export interface FastGaldaePopupProps {
  onClose?: () => void;
}

const FastGaldaeTimePopup = forwardRef<FastGaldaeTimePopupRef, FastGaldaePopupProps>(
  ({ onClose }, ref) => {
    const modalizeRef = useRef<Modalize>(null);
 
    const handleSelectConfirm = () =>{
      modalizeRef.current?.close();
    };

    // 외부에서 open/close 함수를 사용할 수 있도록 함
    useImperativeHandle(ref, () => ({
      open: () => {
        modalizeRef.current?.open();
      },
      close: () => {
        modalizeRef.current?.close();
      },
    }));

    return (
      <Modalize
        ref={modalizeRef}
        modalHeight={586} // 고정 높이 설정
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

        <View style={styles.content}>
          <BasicText
            text="출발 일시"
            fontSize={theme.fontSize.size16}
            color={theme.colors.black}
            style={styles.start}
          />

          <View style={styles.landMarkContainer}>

          

           
          </View>


          <BasicButton
            text="완료"
            disabled={false}
            onPress={handleSelectConfirm}
            buttonStyle={styles.confirmButton}
            textStyle={styles.confirmText}
            enabledColors={{
              backgroundColor: theme.colors.brandColor,
              textColor: theme.colors.white,
              borderColor:theme.colors.transparent,
            }}
            disabledColors={{
              backgroundColor: theme.colors.lightGray,
              textColor: theme.colors.black,
              borderColor:theme.colors.transparent,
            }}
          />
        </View>
      </Modalize>
    );
  }
);


export default FastGaldaeTimePopup;
