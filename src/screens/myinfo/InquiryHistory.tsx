// InquiryHistory.tsx (예: 문의하기 기록)
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import styles from '../../styles/InquiryHistory.style';
import { useNavigation } from '@react-navigation/native';
import BasicText from '../../components/BasicText';
import SVG from '../../components/SVG';
import InquiryHistoryItem from '../../components/InquiryHistoryItem';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {theme} from '../../styles/theme';
import { getMyQuestions } from '../../api/questionApi';
//type
import {QuestionItem}from '../../types/getTypes';

type RootStackParamList = {
    CreateGaldae: undefined;
    NowGaldae: {
      departureLarge?:string,
      departureSmall?:string,
      destinationLarge?:string,
      destinationSmall?:string,
    };
    SetDestination:undefined;
    Answer:{
      item:QuestionItem;
    }
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const InquiryHistory = () => {
  const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
  const [questionList, setQuestionList] = useState<QuestionItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const FAQHistory:FAQHistory[] = [
  //   {
  //     id:0,
  //     question:'유저 신고하는 방법 알려주세요.',
  //     questionDetail:'폭력성이 드러나는 말을 쓰는 유저 신고룰 하고 싶은데요, 방법 알려주세요.',
  //     answer:'이용에 불편을 드려 죄송합니다.',
  //     answered:true,

  //   },
  //   {
  //     id:1,
  //     question:'내 갈대 기록 보고 싶은데요',
  //     questionDetail:'어디서 어떻게 봐야할지 모르겠어요ㅜ 알려주세요',
  //     answer:'내 갈대 기록을 보고 싶다면, 마이페이지 -> 내 갈대 -> 더보기 하시면 됩니다. ',
  //     answered:false,

  //   },
  // ];
  useEffect(() => {
    const fetchMyQuestions = async () => {
      try {
        const response = await getMyQuestions();
        setQuestionList(response);
      } catch (e) {
        console.error('문의 내역 불러오기 실패:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyQuestions();
  }, []);
  if (questionList.length === 0) {
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
      { !isLoading &&
        questionList.map((item)=>(
          <InquiryHistoryItem
          key={item.questionId}
          history={item}
          onPress={() => {
            if(item.faqStatus === 'COMPLETE'){
              navigation.navigate('Answer', { item });
            }else{
              Alert.alert('아직 답변 전입니다! 조금만 기다려주세요.');
            }
          }}
        />
        ))
      }
    </View>
  );
};

export default InquiryHistory;
