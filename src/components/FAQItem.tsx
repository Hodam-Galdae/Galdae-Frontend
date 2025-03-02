// FAQItem.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import BasicText from '../components/BasicText';
import SVGButton from '../components/button/SVGButton';
import  FAQStyles  from '../styles/FAQ.style'; // FAQ용 스타일
// 또는 다른 스타일에서 가져오되, 필요한 스타일만 import

interface FAQItemProps {
  id: number;
  question: string;
  answer: string;
  expandedId: number | null;
  setExpandedId: (id: number | null) => void;
}

const FAQItem: React.FC<FAQItemProps> = ({
  id,
  question,
  answer,
  expandedId,
  setExpandedId,
}) => {
  const isExpanded = expandedId === id;

  const handleToggle = () => {
    // 이미 열린 상태라면 닫음, 아니면 엶
    setExpandedId(isExpanded ? null : id);
  };

  return (
    <TouchableOpacity style={FAQStyles.FAQContainer} onPress={handleToggle}>
      {/* 상단 (질문/아이콘) 영역 */}
      <View style={FAQStyles.FAQItem}>
        <View style={FAQStyles.FAQText}>
          <BasicText text="Q. " style={FAQStyles.Q} />
          <BasicText text={question} style={FAQStyles.question} />
        </View>
        <SVGButton
          iconName={isExpanded ? 'up_line_black' : 'down'}
          onPress={handleToggle}
        />
      </View>

      {/* 펼쳐졌을 때만 보이는 상세 내용 */}
      {isExpanded && (
        <View style={FAQStyles.answerContainer}>
          <BasicText text={answer} style={FAQStyles.texts} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default FAQItem;
