// FAQList.tsx (예: 자주 묻는 질문)
import React, { useState,useEffect } from 'react';
import { View,ScrollView,FlatList,ActivityIndicator } from 'react-native';
import styles from '../../styles/FAQ.style';
import SelectTextButton from '../../components/button/SelectTextButton';
import { theme } from '../../styles/theme';
import FAQItem from '../../components/FAQItem';
import { getFaqList } from '../../api/questionApi';
interface menu {
  id: number;
  title: string; // 사용자에게 보여지는 이름
  tag: string;   // 서버에 요청할 tag 이름
}
interface QA {
  questionId: number;
  tag: string;
  title: string;
  content: string;
}
const FAQList = () => {
    const [selectedMenu, setSelectedMenu] = useState<string>('이용자');
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [faqData, setFaqData] = useState<QA[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const menus: menu[] = [
      { id: 0, title: '이용자', tag: '이용자' },
      { id: 1, title: '같이타기', tag: '같이타기' },
      { id: 2, title: '결제&정산', tag: '결제_정산' },
      { id: 3, title: '채팅', tag: '채팅' },
      { id: 4, title: '기타', tag: '기타' },
    ];
    const fetchFAQ = async (tag: string) => {
      setLoading(true);
      try {
        const data = await getFaqList(tag);
        setFaqData(data);
      } catch (e) {
        console.error('FAQ 가져오기 실패:', e);
        setFaqData([]);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (selectedMenu !== null) {
        fetchFAQ(selectedMenu);
      } else {
        setFaqData([]); // 전체 보기 지원 안 하므로 초기화
      }
    }, [selectedMenu]);


  // 2) FlatList 렌더 함수
  const renderFAQItem = ({ item }: { item: QA }) => (
    <FAQItem
      id={item.questionId}
      question={item.title}
      answer={item.content}
      expandedId={expandedId}
      setExpandedId={setExpandedId}
    />
  );

  // (선택) 데이터가 없을 때 표시할 컴포넌트
  const renderEmptyComponent = () => (
    <View>
     {
      loading ? (
        <ActivityIndicator color={theme.colors.brandColor} />
      ) : (
      <FAQItem
      id={-1}
      question="해당 메뉴의 FAQ가 없습니다."
      answer=""
      expandedId={null}
      setExpandedId={() => null}
    />
      )
     }
    </View>
  );
    return (
      <View>
        <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  scrollEventThrottle={16}
  contentContainerStyle={styles.menuContainer}
>
  {menus.map((menu) => (
    <View key={menu.id} style={styles.menuItem}>
      <SelectTextButton
        buttonStyle={styles.btnStyle}
        textStyle={styles.textStyle}
        text={menu.title}
        selected={selectedMenu === menu.tag}
        onPress={() =>
          setSelectedMenu(menu.tag)
        }
        unselectedColors={{
          backgroundColor: theme.colors.white,
          borderColor: theme.colors.brandColor,
          textColor: theme.colors.brandColor,
        }}
      />
    </View>
  ))}
</ScrollView>


        <FlatList
          data={faqData}
          keyExtractor={(item) => item.questionId.toString()}
          renderItem={renderFAQItem}
          ListEmptyComponent={renderEmptyComponent}
          // 필요 시 스타일이나 여백을 조정하는 경우: contentContainerStyle 등
        />
      </View>
    );
};

export default FAQList;
