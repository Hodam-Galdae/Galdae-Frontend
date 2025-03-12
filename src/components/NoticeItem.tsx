// NoticeItem.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import BasicText from '../components/BasicText';
import TextTag from '../components/tag/TextTag';
import SVGButton from '../components/button/SVGButton';
import { theme } from '../styles/theme';
import styles from '../styles/NoticeItem.style'; // 필요한 스타일 파일 import

// 문자열 -> 실제 색상코드 매핑 함수
const getColor = (colorName: string) => {
  switch (colorName) {
    case 'green':
      return '#00AA00';
    case 'red':
      return '#FF3333';
    case 'blue':
      return '#0066FF';
    default:
      return '#999999';
  }
};

// 공지 아이템(Notice) 구조
interface Notice {
  id: number;
  tag: string;
  content: string;
  color: string;
  title: string;
  important: string;
  main: string;
  footer: string;
}

// 컴포넌트 Props
interface NoticeItemProps {
  noti: Notice;                 // 공지 데이터
  isExpanded: boolean;          // 현재 아이템이 펼쳐져 있는지 여부
  onToggle: (id: number) => void; // 클릭 시 열고 닫기 토글 함수
}

const NoticeItem: React.FC<NoticeItemProps> = ({ noti, isExpanded, onToggle }) => {
  const mappedColor = getColor(noti.color);

  return (
    <View key={noti.id}>
      {/* 상단(한 줄) 영역 */}
      <TouchableOpacity
        style={styles.notiBox}
        onPress={() => onToggle(noti.id)}
      >
        {/* 태그 부분 */}
        <View style={styles.tagContainer}>
          <TextTag
            text={noti.tag}
            viewStyle={styles.notiTag}
            textStyle={styles.notiTagText}
            enabledColors={{
              backgroundColor: theme.colors.white,
              textColor: mappedColor,
              borderColor: mappedColor,
            }}
          />
        </View>

        {/* 제목/아이콘 영역 */}
        <View style={styles.notiBoxContent}>
          <BasicText
            text={noti.content}
            style={styles.notiBoxContentText}
            onPress={() => onToggle(noti.id)}
          />
          <SVGButton
            iconName={isExpanded ? 'up_line_black' : 'down'}
            onPress={() => onToggle(noti.id)}
          />
        </View>
      </TouchableOpacity>

      {/* 펼쳐졌을 때만 보이는 상세 내용 */}
      {isExpanded && (
        <View style={styles.notiDetailContainer}>
          <BasicText text={noti.title} style={styles.texts} />
          <BasicText text={noti.important} color={mappedColor} style={styles.texts} />
          <BasicText text={noti.main} style={styles.texts} />
          <BasicText text={noti.footer} style={styles.texts} />
        </View>
      )}
    </View>
  );
};

export default NoticeItem;
