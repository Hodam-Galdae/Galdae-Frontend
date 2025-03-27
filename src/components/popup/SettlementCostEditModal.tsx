import React, {useState} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import SVG from '../../components/SVG';
import BasicText from '../../components/BasicText';
import styles from '../../styles/SettlementCostEditModal.style';

export interface SettlementCostEditModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (cost: number) => void;
}

const SettlementCostEditModal: React.FC<SettlementCostEditModalProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  const [cost, setCost] = useState<string>('');

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.textPopUp}>
          <TouchableOpacity onPress={onCancel} style={styles.cancelIconWrapper}>
            <SVG name="CancelBlack" style={styles.cancelIcon} />
          </TouchableOpacity>

          <BasicText text="정산 금액 수정" style={styles.title} />
          <TextInput
            value={cost}
            onChangeText={setCost}
            style={styles.input}
            keyboardType="numeric"
          />
          <TouchableOpacity
            onPress={() => onConfirm(Number.parseInt(cost))}
            style={styles.btn}>
            <BasicText text="완료" style={styles.btnText} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SettlementCostEditModal;
