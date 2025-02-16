import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import BasicText from '../BasicText';
import { theme } from '../../styles/theme';
import { moderateScale } from '../../utils/ScreenScaler';

export interface FastGaldaePopupRef {
  open: () => void;
  close: () => void;
}

export interface FastGaldaePopupProps {
  onClose?: () => void;
}

const FastGaldaePopup = forwardRef<FastGaldaePopupRef, FastGaldaePopupProps>(
  ({ onClose }, ref) => {
    const modalizeRef = useRef<Modalize>(null);

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
        adjustToContentHeight
        onClosed={onClose}
        modalStyle={styles.container}
        handleStyle={styles.handle}
      >
        <View style={styles.content}>
          <BasicText
            text="FastGaldaeGenerate 팝업"
            fontSize={theme.fontSize.size18}
            color={theme.colors.black}
          />
          <TouchableOpacity onPress={() => modalizeRef.current?.close()} style={styles.closeButton}>
            <BasicText
              text="닫기"
              fontSize={theme.fontSize.size16}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        </View>
      </Modalize>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
  handle: {
    backgroundColor: theme.colors.gray1,
    width: moderateScale(50),
  },
  content: {
    alignItems: 'center',
  },
  closeButton: {
    marginTop: moderateScale(10),
    backgroundColor: theme.colors.brandColor,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(10),
  },
});

export default FastGaldaePopup;
