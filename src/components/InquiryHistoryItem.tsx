// InquiryHistoryItem.tsx
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import BasicText from '../components/BasicText';
import styles from '../styles/InquiryHistory.style';
//type
import {QuestionItem}from '../types/getTypes';


interface InquiryHistoryItemProps {
  history: QuestionItem;               // 단일 문의 내역 데이터
  onPress?: () => void;              // 클릭 시 동작 (필요하다면)
}

const InquiryHistoryItem: React.FC<InquiryHistoryItemProps> = ({
  history,
  onPress,
}) => {
  return (
    <TouchableOpacity key={history.questionId} style={styles.historyBox} onPress={onPress}>
      <View style={styles.question}>
        <BasicText text="Q. " style={styles.Q} />
        <BasicText text={history.title} style={styles.questionText} />
      </View>
      <BasicText
        text={history.faqStatus === 'COMPLETE' ? '응답 완료' : '응답 대기'}
        style={history.faqStatus === 'COMPLETE' ? styles.complete : styles.wait}
      />
    </TouchableOpacity>
  );
};

export default InquiryHistoryItem;
