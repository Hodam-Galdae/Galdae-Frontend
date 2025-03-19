import React,{useState} from 'react';
import {  ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/Announcement.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import SVG from '../../components/SVG';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NoticeItem from '../../components/NoticeItem';

type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
};

// 내비게이션 스택 타입 정의
type RootStackParamList = {
    CreateGaldae: undefined;
    NowGaldae: {
      departureLarge?:string,
      departureSmall?:string,
      destinationLarge?:string,
      destinationSmall?:string,
    };
    SetDestination:undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Announcement: React.FC<HomeProps> = () => {
  // (1) 어떤 공지가 확장되어 있는지를 저장하는 상태
  //     null이면 확장된 공지가 없음
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const notiList = [
    {
      id: 0,
      tag: '시스템 운영',
      content: '갈대 2.0 업데이트 이용 안내 및 지역 확장 안내',
      color: 'green',
      title: '안녕하세요 여러분, 같이 갈 그대 <갈대> 입니다.',
      important: '2025년 00월 00일 부터 갈대는 업데이트 된 버전으로 실행 될 예정입니다.',
      main: '시스템 중단 업무는 이렇고 언제 이렇게 업데이트가 되고 작업내용은 이렇습니다.',
      footer: '서비스 이용에 참고 부탁드립니다.',
    },
    {
      id: 1,
      tag: '정산 안내',
      content: '정산 금액 미지급 이용자 안내',
      color: 'red',
      title: '정산 안내입니다.',
      important: '최근 일부 이용자의 정산 금액이 미지급된 것으로 확인되었습니다.',
      main: '미지급 건은 우선적으로 처리할 예정이니 확인 부탁드립니다.',
      footer: '서비스 이용에 불편을 드려 죄송합니다.',
    },
    {
      id: 2,
      tag: '서비스 점검',
      content: '금일 02시부터 05시까지 서버 점검 예정입니다.',
      color: 'blue',
      title: '서버 점검 안내',
      important: '금일 02시부터 05시까지 서버 점검이 진행됩니다.',
      main: '점검 시간 동안 서비스 이용이 제한될 수 있습니다.',
      footer: '양해 부탁드립니다.',
    },
    {
      id: 3,
      tag: '공지',
      content: '앱 안정화 패치 예정 안내',
      color: 'green',
      title: '앱 안정화 패치 안내',
      important: '안정화 패치를 통해 서비스 품질이 개선됩니다.',
      main: '업데이트 후 최신 버전으로 이용 부탁드립니다.',
      footer: '감사합니다.',
    },
    {
      id: 4,
      tag: '이벤트',
      content: '신규 가입 이벤트 참여해보세요!',
      color: 'red',
      title: '신규 가입 이벤트',
      important: '가입 후 첫 갈대 생성 시 보너스 크레딧 증정!',
      main: '기한 내 가입하시면 추가 혜택을 받으실 수 있습니다.',
      footer: '친구들과 함께 이용해보세요.',
    },
    {
      id: 5,
      tag: '업데이트',
      content: '버전 2.1 업데이트 내역 안내',
      color: 'green',
      title: '버전 2.1 업데이트 안내',
      important: '새로운 기능과 개선 사항이 포함되었습니다.',
      main: '업데이트 후 안정적인 이용이 가능합니다.',
      footer: '업데이트 후 피드백 부탁드립니다.',
    },
    {
      id: 6,
      tag: '서비스 점검',
      content: '내일 새벽 서버 점검 예정 안내',
      color: 'blue',
      title: '서버 점검 일정 안내',
      important: '내일 새벽에 서비스 점검이 진행됩니다.',
      main: '점검 시간 동안 일부 기능이 제한될 수 있습니다.',
      footer: '미리 참고 부탁드립니다.',
    },
    {
      id: 7,
      tag: '시스템 운영',
      content: '일부 사용자 접속 장애가 해결되었습니다.',
      color: 'green',
      title: '접속 장애 해결 안내',
      important: '현재 모든 사용자 접속 문제가 정상화되었습니다.',
      main: '이용 도중 문제 발생 시 문의 부탁드립니다.',
      footer: '항상 노력하는 갈대가 되겠습니다.',
    },
    {
      id: 8,
      tag: '정산 안내',
      content: '정산 금액 환불 절차 안내',
      color: 'red',
      title: '정산 환불 안내',
      important: '환불 절차에 대한 방법과 소요 시간을 알려드립니다.',
      main: '해당 정책에 따라 처리되고 있으니 확인 부탁드립니다.',
      footer: '자세한 문의는 고객센터로 연락 바랍니다.',
    },
    {
      id: 9,
      tag: '공지',
      content: '안드로이드 앱 강제 종료 이슈 해결 안내',
      color: 'blue',
      title: '안드로이드 이슈 해결',
      important: '강제 종료 문제를 수정한 패치가 배포되었습니다.',
      main: '업데이트 후 문제가 지속될 경우 문의 부탁드립니다.',
      footer: '이용에 불편 드려 죄송합니다.',
    },
    {
      id: 10,
      tag: '이벤트',
      content: '친구 초대 이벤트 참여 안내',
      color: 'red',
      title: '친구 초대 이벤트',
      important: '친구 초대 시 포인트 적립 혜택이 있습니다.',
      main: '자세한 내용은 이벤트 페이지를 확인하세요.',
      footer: '많은 참여 부탁드립니다.',
    },
    {
      id: 11,
      tag: '업데이트',
      content: '버전 2.2 신규 기능 추가',
      color: 'green',
      title: '버전 2.2 업데이트',
      important: '신규 기능이 추가되고 성능이 개선되었습니다.',
      main: '원활한 이용을 위해 최신 버전으로 업데이트 부탁드립니다.',
      footer: '항상 감사합니다.',
    },
    {
      id: 12,
      tag: '서비스 점검',
      content: '이번 주말 서버 점검 안내',
      color: 'blue',
      title: '주말 서버 점검',
      important: '토요일 새벽 1시부터 3시까지 점검이 예정되어 있습니다.',
      main: '점검 시간 동안 서비스 이용이 어려울 수 있습니다.',
      footer: '양해 부탁드립니다.',
    },
    {
      id: 13,
      tag: '시스템 운영',
      content: '데이터 백업 작업 안내',
      color: 'green',
      title: '데이터 백업 작업',
      important: '중요 데이터 백업 작업이 예정되어 있습니다.',
      main: '일부 기능이 제한될 수 있으니 참고 바랍니다.',
      footer: '안정적인 서비스 제공을 위해 노력하겠습니다.',
    },
    {
      id: 14,
      tag: '정산 안내',
      content: '정산 처리 지연에 대한 사과 말씀드립니다.',
      color: 'red',
      title: '정산 지연 안내',
      important: '처리가 늦어진 점 대단히 죄송합니다.',
      main: '순차적으로 처리 중이니 조금만 기다려 주세요.',
      footer: '불편함을 드려 죄송합니다.',
    },
  ];
  const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
  const goBack = () => navigation.goBack();
  // (2) 아이템을 눌렀을 때 호출되는 함수
  const handleNotiDetail = (id: number) => {
    // 이미 열린 아이템을 다시 누르면 닫음
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <View style={styles.container}>
          <Header
          leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack}/>}
          title={<BasicText text="공지 사항" style={styles.headerText}/>}
          />
          <ScrollView style={styles.content}>
              <View style={styles.notiTitleContainer}>
                <SVG name="information"/>
                <BasicText text="알림 받기를 설정하고 유용한 알림들을 받아보세요." style={styles.notiTitleText}/>
              </View>
              <View>
              {notiList.map((noti) => (
                <NoticeItem
                  key={noti.id}
                  noti={noti}
                  isExpanded={expandedId === noti.id}
                  onToggle={handleNotiDetail}
                />
              ))}
              <View style={styles.line} />
        </View>
          </ScrollView>
    </View>
  );
};

export default Announcement;

