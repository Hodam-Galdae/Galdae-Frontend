import React from 'react';
import { View, Dimensions } from 'react-native';
import styles from '../styles/SchoolCardVerify.style';
import BasicButton from '../components/button/BasicButton';
import { theme } from '../styles/theme';
import BasicText from '../components/BasicText';
import SVG from '../components/SVG';
import SVGButton from '../components/button/SVGButton';

const SchoolCardVerify: React.FC = () => {
  const width = Dimensions.get('window').width;
  const clickEvent = () => {

  };

  return (
    <View style={styles.container}>
      <View>
        <BasicText style={styles.title} text="학생증 인증"/>
        <BasicText style={styles.subTitle}>{'학생증을 촬영/스캔/캡쳐 후 첨부해주세요.\nex) 실물 학생증, 모바일 학생증 등'}</BasicText>
        <BasicText style={styles.alert}>{'본인 사진이나 민감할 수 있는 정보는 가려서 첨부해주시길 바랍니다.\n이름, 학번, 학교 이름 등 인증에 필요한 정보는 가리면 인증이 불가능 합니다.'}</BasicText>
        <View style={styles.exContainer}>
          <View style={styles.exWrapper}>
            <SVG name="CorrectEx" width={(width - 48) / 2} style={styles.exImage}/>
            <BasicText text="옳은 예시" style={styles.exTitle}/>
          </View>
          <View style={styles.exWrapper}>
            <SVG name="WrongEx" width={(width - 48) / 2} style={styles.exImage}/>
            <BasicText text="잘못된 예시" style={styles.exTitle}/>
            <BasicText text="ex) 정보를 읽을 수 없는 흐릿한 사진" style={styles.exSubTitle}/>
          </View>
        </View>
      </View>

      <View>
        <View style={styles.btnWrapper}>
          <SVGButton iconName="Camera" buttonStyle={styles.svgBtn}/>
          <SVGButton iconName="Picture" buttonStyle={styles.svgBtn}/>
        </View>
        <BasicText style={styles.alertText} text="개인정보 보호를 위해 심사 완료된 사진은 바로 삭제됩니다."/>
        <BasicButton
          text="다음"
          onPress={clickEvent}
          disabled={false}
          disabledColors={{
            backgroundColor: theme.colors.lightGray,
            textColor: theme.colors.black,
          }}
          buttonStyle={styles.nextButton}
          textStyle={styles.nextText}
        />
      </View>
      
    </View>
  );
};

export default SchoolCardVerify;
