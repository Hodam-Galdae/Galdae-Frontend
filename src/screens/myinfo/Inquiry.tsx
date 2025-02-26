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
    const handleInquiry = () =>{
        setLoading(true);
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

