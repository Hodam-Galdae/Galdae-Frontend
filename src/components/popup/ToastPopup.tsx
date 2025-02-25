import React, { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styles from '../../styles/FastGaldaePopup.style';
import BasicText from '../BasicText';
export interface ToastPopupProps {
  visible: boolean;
  text: string;
  onDismiss?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ToastPopup: React.FC<ToastPopupProps> = ({ visible, text, onDismiss, containerStyle }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onDismiss && onDismiss();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  if (!visible) {return null;}

  return (
    <BasicText text={text} style={[styles.toastPopup,containerStyle ]}/>
  );
};

export default ToastPopup;
