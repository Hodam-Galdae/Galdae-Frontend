import React ,{useState} from 'react';
import {  View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/FAQ.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import Tabs from '../../components/Tabs';
import FAQList from './FAQList';
import InquiryHistory from './InquiryHistory';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
    NowGaldaeDetail: { item: any };
    SetDestination:undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const FAQ: React.FC<HomeProps> = () => {
    const [tab, setTab] = useState(0);
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () => navigation.goBack();
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
      </View>
    );
};

export default FAQ;

