import React, {useState} from 'react';
import { Modal,View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import SVG from '../../components/SVG';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import { theme } from '../../styles/theme';
import styles from '../../styles/ReportModal.style';
import ItemSelector from '../ItemSelector';

export interface ReportPopupProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    containerStyle?: StyleProp<ViewStyle>;
  }

  const ReportPopup: React.FC<ReportPopupProps> = ({
    visible,
    onCancel,
    onConfirm,
  }) => {
    const [selected, setSelcted] = useState<number>(-1);
    const reportText = [
        '사유 선택1',
        '사유 선택2',
        '사유 선택3',
    ];

    return (
      <Modal transparent={true} visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.textPopUp}>
            <TouchableOpacity onPress={onCancel} style={styles.cancelIconWrapper}>
              <SVG name="CancelBlack" style={styles.cancelIcon} />
            </TouchableOpacity>
            <BasicText text="신고하기" style={styles.title}/>
            <ItemSelector hint="신고사유를 선택해주세요." items={reportText} selected={selected} setSelected={setSelcted}/>
          </View>
        </View>
      </Modal>
    );
  };

export default ReportPopup;
