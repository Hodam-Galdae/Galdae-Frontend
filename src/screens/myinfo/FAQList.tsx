// FAQList.tsx (예: 자주 묻는 질문)
import React, { useState } from 'react';
import { View,ScrollView,FlatList } from 'react-native';
import styles from '../../styles/FAQ.style';
import SelectTextButton from '../../components/button/SelectTextButton';
import { theme } from '../../styles/theme';
import FAQItem from '../../components/FAQItem';
interface menu {
    id: number,
    title:string
}
interface QA{
  id:number,
  question:string,
  answer:string,
  menu:menu,
}
const FAQList = () => {
    const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const menus : menu[] = [
        {id:0, title:'이용자'},
        {id:1, title:'동승하기'},
        {id:2, title:'결제&정산'},
        {id:3, title:'채팅'},
        {id:4, title:'갈대키우기'},
        {id:5, title:'내 갈대'},
        {id:6, title:'이용약관'},
        {id:7, title:'신고'},
    ];

    const QA: QA[] = [
      {
        id: 0,
        question: '같은 성별만 타는 방법을 알려주세요.',
        answer: '1. 새로운 갈대 생성시 추가 정보 설정에서 동승자 성별 클릭',
        menu: { id: 0, title: '이용자' },
      },
      {
        id: 1,
        question: '동승하는 방법을 알려주세요.',
        answer: '1. 메인 화면에서 갈대 생성하기 클릭 혹은 실시간 갈대 목록에서 원하는 조건의 갈대에 참여하기 클릭',
        menu: { id: 1, title: '동승하기' },
      },
      {
        id: 2,
        question: '결제와 정산은 어떻게 하나요?',
        answer: '1. 결제 수단 등록 후 갈대 생성 시 사용 가능\n2. 정산 금액은 내 갈대 목록에서 확인 가능합니다.',
        menu: { id: 2, title: '결제&정산' },
      },
      {
        id: 3,
        question: '채팅 기능은 어디서 사용하나요?',
        answer: '1. 갈대에 참여한 후, 갈대 상세화면 하단의 채팅 버튼을 눌러 채팅방에 입장할 수 있습니다.',
        menu: { id: 3, title: '채팅' },
      },
      {
        id: 4,
        question: '갈대키우기는 어떤 기능인가요?',
        answer: '1. 갈대를 일정 이상 이용하면, 캐릭터를 키우는 형태로 리워드를 받을 수 있는 기능입니다.',
        menu: { id: 4, title: '갈대키우기' },
      },
      {
        id: 5,
        question: '내 갈대 목록에서 무엇을 확인할 수 있나요?',
        answer: '1. 내가 생성했거나 참여했던 갈대 이력, 정산 정보 등을 확인할 수 있습니다.',
        menu: { id: 5, title: '내 갈대' },
      },
      {
        id: 6,
        question: '이용약관을 확인하고 싶습니다.',
        answer: '1. 앱 내 [마이페이지] → [이용 가이드] → [이용약관] 메뉴에서 확인 가능합니다.',
        menu: { id: 6, title: '이용약관' },
      },
      {
        id: 7,
        question: '신고하기는 어떻게 진행되나요?',
        answer: '1. 문제 상황 발생 시 [고객센터] 또는 [신고하기] 메뉴를 통해 신고 접수할 수 있습니다.',
        menu: { id: 7, title: '신고' },
      },
      {
        id: 8,
        question: '이용자 설정에서 나이대 제한도 가능한가요?',
        answer: '현재 버전에서는 성별 선택만 가능하며, 나이대 제한 기능은 추후 업데이트 예정입니다.',
        menu: { id: 0, title: '이용자' },
      },
      {
        id: 9,
        question: '동승 인원을 추가로 늘리고 싶어요.',
        answer: '동승자는 갈대 생성 시 설정한 인원수 범위 내에서만 변경 가능하며, 초과 인원 탑승은 불가능합니다.',
        menu: { id: 1, title: '동승하기' },
      },
    ];

    // (A) selectedMenu가 null이면 전체 Q&A, 아니면 해당 메뉴 ID만 필터링
  const filteredQA = selectedMenu === null
  ? QA
  : QA.filter((qa) => qa.menu.id === selectedMenu);

  // 2) FlatList 렌더 함수
  const renderFAQItem = ({ item }: { item: QA }) => (
    <FAQItem
      id={item.id}
      question={item.question}
      answer={item.answer}
      expandedId={expandedId}
      setExpandedId={setExpandedId}
    />
  );

  // (선택) 데이터가 없을 때 표시할 컴포넌트
  const renderEmptyComponent = () => (
    <View>
      {/* 원하는 UI */}
      <FAQItem
        id={-1}
        question="해당 메뉴의 FAQ가 없습니다."
        answer=""
        expandedId={null}
        setExpandedId={() => null}
      />
    </View>
  );
    return (
      <View>
        <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              contentContainerStyle={styles.menuContainer} // 추가
            >
              {menus.map((menu) => (
                <View key={menu.id} style={styles.menuItem}>
                    <SelectTextButton
                        buttonStyle={styles.btnStyle}
                        textStyle={styles.textStyle}
                        text={menu.title}
                        selected={selectedMenu === menu.id}
                        onPress={() => {
                          if(selectedMenu === menu.id){
                            setSelectedMenu(null);
                          }else{
                            setSelectedMenu(menu.id);
                          }
                        }}
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
          data={filteredQA}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFAQItem}
          ListEmptyComponent={renderEmptyComponent}
          // 필요 시 스타일이나 여백을 조정하는 경우: contentContainerStyle 등
        />
      </View>
    );
};

export default FAQList;
