import React ,{} from 'react';
import {  View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/FAQ.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import FAQList from './FAQList';

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

    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () =>  navigation.goBack();
    // 현재 탭에 따라 다른 화면을 렌더링
    const renderTabContent = () => {

      return <FAQList />;
      // if (tab === 0) {
      //   // 자주 묻는 질문 탭
      // } else {
      //   // 문의하기 기록 탭
      //   return <InquiryHistory />;
      // }
    };

    return (
      <View style={styles.container}>
            <Header
            leftButton={<SVGButton iconName="arrow_left_line2" onPress={goBack}/>}
            title={<BasicText text="FAQ/문의하기" style={styles.headerText}/>}
            style={styles.header}
            />

            <View style={styles.content}>
            {renderTabContent()}
            </View>

            <FloatingButton iconName={'headsetMic'} onPress={()=>navigation.replace('Inquiry')}/>
      </View>
    );
};

export default FAQ;

