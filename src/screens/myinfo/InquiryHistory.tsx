// InquiryHistory.tsx (예: 문의하기 기록)
import React from 'react';
import { View } from 'react-native';
import styles from '../../styles/InquiryHistory.style';
import { useNavigation } from '@react-navigation/native';
import BasicText from '../../components/BasicText';
import SVG from '../../components/SVG';
import InquiryHistoryItem from '../../components/InquiryHistoryItem';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {theme} from '../../styles/theme';
interface FAQHistory{
  id:number,
  question:string,
  questionDetail:string,
  answer:string,
  answered:boolean
}
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
    Answer:{
      item:FAQHistory;
    }
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const InquiryHistory = () => {
  const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
  const FAQHistory:FAQHistory[] = [
    {
      id:0,
      question:'유저 신고하는 방법 알려주세요.',
      questionDetail:'폭력성이 드러나는 말을 쓰는 유저 신고룰 하고 싶은데요, 방법 알려주세요.',
      answer:'이용에 불편을 드려 죄송합니다.',
      answered:true,

    },
    {
      id:1,
      question:'내 갈대 기록 보고 싶은데요',
      questionDetail:'어디서 어떻게 봐야할지 모르겠어요ㅜ 알려주세요',
      answer:'내 갈대 기록을 보고 싶다면, 마이페이지 -> 내 갈대 -> 더보기 하시면 됩니다. ',
      answered:false,

    },
  ];

  if (FAQHistory.length === 0) {
    // 데이터가 없을 경우
    return (
      <View style={styles.emptyContainer}>
        <SVG name="information_line" />
        <BasicText text="문의 내역이 없습니다." color={theme.colors.gray1} />
      </View>
    );
  }

  return (
    <View>
      {
        FAQHistory.map((item)=>(
          <InquiryHistoryItem
          key={item.id}
          history={item}
          onPress={() => {
            navigation.navigate('Answer', { item });
          }}
        />
        ))
      }
    </View>
  );
};

export default InquiryHistory;
