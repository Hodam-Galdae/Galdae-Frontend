import React ,{useState,useEffect } from 'react';
import {  View,TouchableOpacity,Image } from 'react-native';
import { useNavigation,RouteProp, useRoute} from '@react-navigation/native';
import styles from '../../styles/Inquiry.style';
import { theme } from '../../styles/theme';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import SVG from '../../components/SVG';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useImagePicker from '../../hooks/useImagePicker';
import BasicInput from '../../components/BasicInput';

// 1) FAQHistory 인터페이스
interface FAQHistory {
    id: number;
    question: string;
    questionDetail: string;
    answer: string;
    answered: boolean;
  }

// 2) 내비게이션 스택 타입 (Answer 스크린에 item 넘김)
type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: {
    departureLarge?: string;
    departureSmall?: string;
    destinationLarge?: string;
    destinationSmall?: string;
  };
  SetDestination: undefined;
  FAQ: {
    tabIndex: number;
  };
  // ★ Answer 스크린에 'item' 파라미터로 FAQHistory 전달
  Answer: {
    item: FAQHistory;
  };
};

// 네비게이션/라우트 타입 정의
type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Answer'>;
type AnswerRouteProp = RouteProp<RootStackParamList, 'Answer'>;

const Answer: React.FC = () => {
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const route = useRoute<AnswerRouteProp>();
    const { item } = route.params; // InquiryHistoryItem에서 넘긴 FAQHistory 객체

    const [title, setTitle] = useState<string>(item.question);
    const [content, setContent] = useState<string>(item.questionDetail);
    const [answer, setAnswer] = useState<string>(item.answer);
    const [img, setImg] = useState<string>('');
    const {imageUri, getImageByGallery} = useImagePicker();
    const goBack = () => navigation.goBack();

    useEffect(() => {
      if (imageUri !== undefined) {
        setImg(imageUri);

      }
    }, [imageUri]);

    return (
      <View style={styles.container}>
            <Header
            leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack}/>}
            title={<BasicText text="" style={styles.headerText}/>}
            />

            <View style={styles.content}>
                <BasicInput
                  text=""
                  style={styles.input}
                  value={title}
                  editable={false}
                  onChangeText={setTitle}
                  placeholderTextColor={theme.colors.gray2} // 원하는 색상으로 지정
                />
                <BasicInput
                  multiline
                  text=""
                  editable={false}
                  style={styles.detail}
                  value={content}
                  onChangeText={setContent}
                  placeholderTextColor={theme.colors.gray2} // 원하는 색상으로 지정
                />

                <TouchableOpacity style={styles.imgContainer} onPress={getImageByGallery}>
                    {img ? (
                        <Image
                          source={
                            { uri: img }
                          }
                          style={styles.img}
                          resizeMode="cover"
                        />
                    ) : (
                        <SVG name="pic_line"/>
                    )}
                </TouchableOpacity>
                <BasicText text="답변" style={styles.answer}/>
                <BasicInput
                  multiline
                  text=""
                  editable={false}
                  style={styles.answerContainer}
                  value={answer}
                  onChangeText={setAnswer}
                  placeholderTextColor={theme.colors.gray2} // 원하는 색상으로 지정
                />
            </View>
      </View>
    );
};

export default Answer;

