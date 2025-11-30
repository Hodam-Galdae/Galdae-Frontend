import React from 'react';
import { Modal, View, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles/ImageViewerModal.style';
import SVGButton from '../button/SVGButton';

type ImageViewerModalProps = {
  visible: boolean;
  imageUri: string;
  onClose: () => void;
};

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({ visible, imageUri, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <SVGButton
          iconName="close"
          onPress={onClose}
          buttonStyle={styles.closeButton}
        />
      </View>
    </Modal>
  );
};

export default ImageViewerModal;
