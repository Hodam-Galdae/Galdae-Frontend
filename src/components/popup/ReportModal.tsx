import React, {useState} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextInput,
} from 'react-native';
import SVG from '../../components/SVG';
import BasicText from '../../components/BasicText';
import styles from '../../styles/ReportModal.style';
import ItemSelector from '../ItemSelector';
import SVGButton from '../button/SVGButton';

export interface ReportPopupProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
  title?: string;
  message?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const ReportPopup: React.FC<ReportPopupProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  const [selected, setSelected] = useState<number>(-1);
  const [reason, setReason] = useState<string>('');
  const reportText = ['사유 선택1', '사유 선택2', '사유 선택3', '직접 입력'];

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.textPopUp}>
          <TouchableOpacity onPress={onCancel} style={styles.cancelIconWrapper}>
            <SVG name="CancelBlack" style={styles.cancelIcon} />
          </TouchableOpacity>
          <View style={styles.wrapper}>
            <BasicText text="신고하기" style={styles.title} />
            <View style={{position: 'relative', height: 42}}>
              <ItemSelector
                style={{position: 'absolute', zIndex: 999}}
                hint="신고사유를 선택해주세요."
                items={reportText}
                selected={selected}
                setSelected={setSelected}
              />
            </View>
            {selected === reportText.length - 1 ? (
              <TextInput
                value={reason}
                onChangeText={setReason}
                textAlignVertical="top"
                style={styles.input}
                multiline
                placeholder="신고사유를 입력해주세요."
              />
            ) : null}
          </View>
          <View style={styles.wrapper}>
            <SVGButton iconName="PictureGray" buttonStyle={styles.pictureBtn} />
            <TouchableOpacity
              onPress={() =>
                onConfirm(
                  selected === reportText.length - 1
                    ? reason
                    : reportText[selected],
                )
              }
              style={styles.btn}>
              <BasicText text="신고하기" style={styles.btnText} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReportPopup;
