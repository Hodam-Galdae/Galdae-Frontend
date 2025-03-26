// BigMapModal.tsx
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import {WebView} from 'react-native-webview';
import SVGButton from '../button/SVGButton';
import styles from '../../styles/FastGaldaePopup.style';


export interface BigMapModalRef {
  open: () => void;
  close: () => void;
}

interface BigMapModalProps {
    mapUrl: string
}

const BigMapModal = forwardRef<BigMapModalRef, BigMapModalProps>(({ mapUrl }, ref) => {
    const [visible, setVisible] = useState(false);
    useImperativeHandle(ref, () => ({
      open: () => setVisible(true),
      close: () => setVisible(false),
    }));

    const handleClose = () => {
      setVisible(false);
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <Pressable style={styles.backdrop} onPress={handleClose}>
        {/* WebView는 backdrop 안에 있으면서도 이벤트 막기 */}
        <Pressable style={styles.wvContainer}>
          <WebView
            source={{ uri: mapUrl }}
            style={styles.webView}
            originWhitelist={['*']}
            javaScriptEnabled={true}
          />
        </Pressable>
        <View style={styles.closeMapContainer}>
          <SVGButton
            onPress={handleClose}
            iconName="ClosePic"
            buttonStyle={styles.closeButton}
            SVGStyle={styles.closeButtonIcon}
          />
        </View>
      </Pressable>
    </Modal>
  );
});

export default BigMapModal;
