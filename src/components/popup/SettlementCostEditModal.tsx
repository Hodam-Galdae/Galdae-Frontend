import React, {useState, useEffect, useRef} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import SVG from '../../components/SVG';
import BasicText from '../../components/BasicText';
import styles from '../../styles/SettlementCostEditModal.style';
import { theme } from '../../styles/theme';

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
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      // 모달이 열릴 때 약간의 딜레이 후 포커스
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      // 모달이 닫힐 때 입력칸 초기화 (애니메이션 후)
      setTimeout(() => {
        setCost('');
      }, 300);
    }
  }, [visible]);

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
            ref={inputRef}
            value={cost ? parseInt(cost, 10).toLocaleString() : ''}
            onChangeText={(text) => {
              // 숫자만 입력 가능하도록 필터링하고 쉼표 제거
              const numericValue = text.replace(/[^0-9]/g, '');
              setCost(numericValue);
            }}
            style={styles.input}
            keyboardType="numeric"
            placeholder="금액 입력"
            placeholderTextColor={theme.colors.grayV1}
          />
          <BasicText text="원" style={styles.priceText} />
          </View>

          <TouchableOpacity
            onPress={() => {
              onConfirm(Number.parseInt(cost, 10));
            }}
            style={styles.btn}>
            <BasicText text="완료" style={styles.btnText} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SettlementCostEditModal;
