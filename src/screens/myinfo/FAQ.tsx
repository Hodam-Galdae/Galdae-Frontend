import React ,{useState} from 'react';
import {  View } from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';
import styles from '../../styles/FAQ.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import Tabs from '../../components/Tabs';
import FAQList from './FAQList';
import InquiryHistory from './InquiryHistory';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FloatingButton from '../../components/button/FloatingButton';

// 파라미터 타입
type FAQParamList = {
  tabIndex?: number;
};

type HomeProps = {
  route?: { params?: FAQParamList };
};


// 내비게이션 스택 타입 정의
type RootStackParamList = {
    CreateGaldae: undefined;
    MyInfo:undefined;
    NowGaldae: {
      departureLarge?:string,
      departureSmall?:string,
      destinationLarge?:string,
      destinationSmall?:string,
    };
    SetDestination:undefined;
    Inquiry:undefined;
    FAQ: { tabIndex?: number };
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const FAQ: React.FC<HomeProps> = () => {
    const route = useRoute(); // useRoute 훅으로 파라미터 가져옴
    // 1) route.params?.tabIndex가 있으면 그 값, 없으면 0
    const tabIndex = (route.params as FAQParamList)?.tabIndex ?? 0;
    const [tab, setTab] = useState(tabIndex);
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () =>  navigation.navigate('MyInfo');
    // 현재 탭에 따라 다른 화면을 렌더링
    const renderTabContent = () => {
      if (tab === 0) {
        // 자주 묻는 질문 탭
        return <FAQList />;
      } else {
        // 문의하기 기록 탭
        return <InquiryHistory />;
      }
    };

    return (
      <View style={styles.container}>
            <Header
            leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack}/>}
            title={<BasicText text="FAQ/문의하기" style={styles.headerText}/>}
            />

            <View style={styles.content}>
            <Tabs
              menus={['자주 묻는 질문', '문의하기 기록']}
              onSelectHandler={(index) => setTab(index)}
              selectedIndex={tab}
            />
            {renderTabContent()}
            </View>

            <FloatingButton iconName={'service_line'} onPress={()=>navigation.navigate('Inquiry')}/>
      </View>
    );
};

export default FAQ;

