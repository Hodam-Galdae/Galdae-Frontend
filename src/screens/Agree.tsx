// SignUp.tsx 테스트
import React, {useState} from 'react';
import { View, TouchableOpacity } from 'react-native';
import BasicText from '../components/BasicText';
import styles from '../styles/Agree.style';
import { theme } from '../styles/theme';
import SVG from '../components/SVG';

const Agree: React.FC = () => {
  const [selectedChannel, set] = useState<boolean>(false);
  return (
    <View style={styles.container}>
        <BasicText style={styles.title}>더 나은 서비스를 위해{'\n'}약관을 마련했습니다.</BasicText>
        <BasicText style={styles.subTitle}>이용자 편의에 더욱 적합한 서비스 제공을 위해{'\n'}서비스 운영 정책을 마련했습니다. {'\n\n'}이 약관은 2025년 00월 00일로부터 발효며{'\n'}동의 후에 갈대 서비스 이용이 가능합니다.</BasicText>
        <TouchableOpacity onPress={() => {}}>
          <View style={selectedChannel ? {...styles.agreeBtnWrapper, borderColor: theme.colors.brandColor} : styles.agreeBtnWrapper}>
              <SVG name={selectedChannel ? 'CheckSelected' : 'Check'} width={18} height={18} style={styles.agreeBtn}/>
              <BasicText text="모두 동의합니다." style={selectedChannel ? {...styles.agreeText, color: theme.colors.black} : styles.agreeText}/>
          </View>
        </TouchableOpacity>
        <View style={styles.agreeWrapper}>
            <SVG name="CheckLine"/>
        </View>
    </View>
  );
};

export default Agree;
