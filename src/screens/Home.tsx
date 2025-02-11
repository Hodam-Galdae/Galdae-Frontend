// Home.tsx 테스트
import React,{useState} from 'react';
import { View } from 'react-native';

import styles from '../styles/Home.style';
import BasicButton from '../components/BasicButton';
import BasicText from '../components/BasicText';


const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const handlePress = () => {
    setLoading(true);
    // 버튼 클릭 시 원하는 로직을 수행하고, 완료 후 로딩 상태를 false로 전환합니다.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <BasicButton
        text="어플 공지사항/안내"
        onPress={handlePress}
        loading={loading}
        buttonStyle={styles.notiButton}
        textStyle={styles.notiText}
      />
      <BasicText text="갈대 시작하기" style={styles.startGaldae}/>
      <BasicText text="목적지 설정 후 동승자를 구하세요!" style={styles.startGaldaeEx}/>
    </View>
  );
};

export default Home;

