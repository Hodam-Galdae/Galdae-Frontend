import React ,{useState,useEffect } from 'react';
import {  View,Alert,TouchableOpacity,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/Inquiry.style';
import { theme } from '../../styles/theme';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import SVG from '../../components/SVG';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BasicButton from '../../components/button/BasicButton';
import useImagePicker from '../../hooks/useImagePicker';
import BasicInput from '../../components/BasicInput';
import Clipboard from '@react-native-clipboard/clipboard';
import { createQuestion } from '../../api/questionApi';
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
    FAQ:{
      tabIndex:number,
    }
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Inquiry: React.FC<HomeProps> = () => {
    const [title, setTitle] = useState<string>('');
    const [img, setImg] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [content, setContent] = useState<string>('');
    const {imageUri, getImageByGallery} = useImagePicker();
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () => navigation.goBack();
    // 이메일 복사 함수
    const copyEmailToClipboard = () => {
      const email = 'hodamdae@gmail.com';
      Clipboard.setString(email);
      Alert.alert('클립보드에 복사됨', `'${email}'이(가) 복사되었습니다.`);
    };
    useEffect(() => {
      if (imageUri !== undefined) {
        setImg(imageUri);

      }
    }, [imageUri]);

    const handleInquiry = async () => {
      if (!title.trim() || !content.trim()) {
        Alert.alert('입력 확인', '제목과 내용을 모두 입력해주세요.');
        return;
      }

      setLoading(true);
      try {
        await createQuestion('USER', title, content, img); // "USER"는 문의 태그 예시
        Alert.alert('문의 완료', '문의가 성공적으로 접수되었습니다.');
        navigation.navigate('FAQ', { tabIndex: 1 });
      } catch (error) {
        console.error('문의 등록 실패:', error);
        Alert.alert('오류', '문의 등록 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };
    return (
      <View style={styles.container}>
            <Header
            leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack}/>}
            title={<BasicText text="문의하기" style={styles.headerText}/>}
            />

            <View style={styles.content}>
                <BasicInput
                  text="제목을 입력하세요."  // placeholder로 사용됨
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholderTextColor={theme.colors.gray2} // 원하는 색상으로 지정
                />
                <BasicInput
                multiline
                  text="상세 내용을 입력해주세요."  // placeholder로 사용됨
                  style={styles.detail}
                  value={content}
                  onChangeText={setContent}
                  placeholderTextColor={theme.colors.gray2} // 원하는 색상으로 지정
                />
                <View style={styles.texts}>
                    <BasicText text="빠른 답변을 원하신다면 " style={styles.text}/>
                    <BasicText
                     text="hodamdae@gmail.com"
                     style={styles.importText}
                     onPress={copyEmailToClipboard}
                    />
                    <BasicText text=" 으로 이메일을 남겨주세요." style={styles.text}/>
                </View>

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

                <View style={styles.inquiryBtnContainer}>
                    <BasicButton
                      text="문의하기"
                      buttonStyle={styles.inquiryBtn}
                      textStyle={styles.inquiryText}
                      loading={loading}
                      onPress={handleInquiry}
                    />
                </View>
            </View>
      </View>
    );
};

export default Inquiry;

