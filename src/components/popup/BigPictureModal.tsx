// BigPictureModal.tsx
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, View, Image, ImageSourcePropType } from 'react-native';
import SVGButton from '../button/SVGButton';
import styles from '../../styles/FastGaldaePopup.style';

export interface BigPictureModalRef {
  open: () => void;
  close: () => void;
}

interface BigPictureModalProps {
  imageSource: ImageSourcePropType;
}

const BigPictureModal = forwardRef<BigPictureModalRef, BigPictureModalProps>(({ imageSource }, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
  }));

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
            <Image
              source={imageSource}
              style={styles.fullScreenImage}
              resizeMode="cover"
            />
        </View>

        <SVGButton
       onPress={handleClose}
        iconName="ClosePic"
        buttonStyle={styles.closeButton}
        SVGStyle={styles.closeButtonIcon}/>
      </View>
    </Modal>
  );
});

export default BigPictureModal;
