import React, {useRef} from 'react';
import {View, Dimensions, Image, TouchableOpacity} from 'react-native';
import styles from '../styles/SchoolCardVerify.style';
import {Modalize} from 'react-native-modalize';
import BasicButton from '../components/button/BasicButton';
import {theme} from '../styles/theme';
import BasicText from '../components/BasicText';
import SVG from '../components/SVG';
import SVGButton from '../components/button/SVGButton';
import useImagePicker from '../hooks/useImagePicker';
import BigPictureModal from '../components/popup/BigPictureModal';
import {certifyCard} from '../api/authApi';
import {useSelector} from 'react-redux';
import {RootState} from '../modules/redux/RootReducer';
import RNFS from 'react-native-fs';

interface SchoolCardVerifyProps {
  setNextStep: () => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SchoolCardVerify: React.FC<SchoolCardVerifyProps> = ({setNextStep, setIsLoading}) => {
  const width = Dimensions.get('window').width;
  const {imageUri, imageName, imageType, getImageByCamera, getImageByGallery, resetImage} =
    useImagePicker();
  const pictureModalRef = useRef<Modalize>(null);
  const userInfo = useSelector((state: RootState) => state.user);

  const clickEvent = async () => {
    if (imageUri.length !== 0) {
      try{
        setIsLoading(true);
        const form = new FormData();
        const universityAuthCommand = {
          university: userInfo.university,
          universityAuthType: 'STUDENT_CARD',
          email: '',
          code: '',
          studentCard: '',
        };
        const fileName = `${userInfo}.json`;
        const filePath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
        await RNFS.writeFile(filePath, JSON.stringify(universityAuthCommand), 'utf8');
  
        form.append('universityAuthCommand', {
          uri: `file:///${filePath}`,
          type: 'application/json',
          name: fileName,
        });
  
        let imageFile = {uri: imageUri, type: imageType, name: imageName};
        form.append('studentCard', imageFile);
        await certifyCard(form);
        setNextStep();
      } catch(err) {

      } finally {
        setIsLoading(false);
      }
      
    }
  };

  const handlePicturePress = () => {
    pictureModalRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <View>
        <BasicText style={styles.title} text="학생증 인증" />
        <BasicText style={styles.subTitle}>
          {
            '학생증을 촬영/스캔/캡쳐 후 첨부해주세요.\nex) 실물 학생증, 모바일 학생증 등'
          }
        </BasicText>
        <BasicText style={styles.alert}>
          {
            '본인 사진이나 민감할 수 있는 정보는 가려서 첨부해주시길 바랍니다.\n이름, 학번, 학교 이름 등 인증에 필요한 정보는 가리면 인증이 불가능 합니다.'
          }
        </BasicText>
        <View style={styles.exContainer}>
          <View style={styles.exWrapper}>
            <SVG
              name="CorrectEx"
              width={(width - 48) / 2}
              style={styles.exImage}
            />
            <BasicText text="옳은 예시" style={styles.exTitle} />
          </View>
          <View style={styles.exWrapper}>
            <SVG
              name="WrongEx"
              width={(width - 48) / 2}
              style={styles.exImage}
            />
            <BasicText text="잘못된 예시" style={styles.exTitle} />
            <BasicText
              text="ex) 정보를 읽을 수 없는 흐릿한 사진"
              style={styles.exSubTitle}
            />
          </View>
        </View>
      </View>

      <View>
        <View style={{alignItems: 'center'}}>
          {!imageUri ? (
            <View style={styles.btnWrapper}>
            <SVGButton
              onPress={getImageByCamera}
              iconName="Camera"
              buttonStyle={styles.svgBtn}
            />
            <SVGButton
              onPress={getImageByGallery}
              iconName="Picture"
              buttonStyle={styles.svgBtn}
            />
          </View>
          ) : (
          <TouchableOpacity onPress={resetImage}>
            <Image style={styles.image} source={{uri: imageUri}} />
            <SVG
              name="Cancel"
              width={22}
              height={22}
              style={styles.imageZoom}
            />
          </TouchableOpacity>
          )}
        </View>

        <BasicText
          style={styles.alertText}
          text="개인정보 보호를 위해 심사 완료된 사진은 바로 삭제됩니다."
        />
        <BasicButton
          text="다음"
          onPress={clickEvent}
          disabled={imageUri.length === 0}
          disabledColors={{
            backgroundColor: theme.colors.grayV3,
            textColor: theme.colors.blackV0,
          }}
          buttonStyle={styles.nextButton}
          textStyle={styles.nextText}
        />
      </View>

      <BigPictureModal ref={pictureModalRef} imageSource={{uri: imageUri}} />
    </View>
  );
};

export default SchoolCardVerify;
