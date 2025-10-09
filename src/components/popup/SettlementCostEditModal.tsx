import React, {useState, useEffect} from 'react';
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
  title?: string;
}

const SettlementCostEditModal: React.FC<SettlementCostEditModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  title = '정산 금액 수정',
}) => {
  const [cost, setCost] = useState<string>('');

  useEffect(() => {
    setCost('');
  }, []);

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.textPopUp}>
          <TouchableOpacity onPress={onCancel} style={styles.cancelIconWrapper}>
            <SVG name="CancelBlack" style={styles.cancelIcon} />
          </TouchableOpacity>

          <BasicText text={title} style={styles.title} />
          <View style={styles.priceContainer}>
          <TextInput
            value={cost ? parseInt(cost, 10).toLocaleString() : ''}
            onChangeText={(text) => {
              // 숫자만 입력 가능하도록 필터링하고 쉼표 제거
              const numericValue = text.replace(/[^0-9]/g, '');
              setCost(numericValue);
            }}
            style={styles.input}
            keyboardType="numeric"
            placeholder="0"
          />
          <BasicText text="원" style={styles.priceText} />
          </View>

          <TouchableOpacity
            onPress={() => {onConfirm(Number.parseInt(cost, 10)); setCost('')}}
            style={styles.btn}>
            <BasicText text="완료" style={styles.btnText} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SettlementCostEditModal;
