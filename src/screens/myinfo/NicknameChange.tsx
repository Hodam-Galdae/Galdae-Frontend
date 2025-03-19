import React,{ useState } from 'react';
import {  View } from 'react-native';
import { useNavigation ,useRoute, RouteProp} from '@react-navigation/native';
import styles from '../../styles/NicknameChange.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import DeletePopup from '../../components/popup/DeletePopup';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BasicInput from '../../components/BasicInput';

//api
import { updateNickname } from '../../api/membersApi'; // updateNickname API 임포트

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
    MyGaldaeHistory:any;

    NicknameChange: { nickname: string }; // 수정: 파라미터로 닉네임을 받음
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type NicknameChangeRouteProp = RouteProp<RootStackParamList, 'NicknameChange'>;

const NicknameChange: React.FC<HomeProps> = () => {
  const route = useRoute<NicknameChangeRouteProp>();
    // 전달받은 닉네임을 초기값으로 설정 (없으면 기본값 '하재연')
    const initialNickname = route.params?.nickname || '하재연';
    const [nickname, setNickname] = useState<string>(initialNickname);
    const [invalidPopupVisible, setInvalidPopupVisible] = useState<boolean>(false);
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () => navigation.goBack();
    const handleChangeNickname = async () => {
      try {
        // 닉네임 변경 API 호출
        await updateNickname(nickname);
        console.log('닉네임 변경 성공');
        setInvalidPopupVisible(false);
        goBack();
      } catch (error) {
        console.error('닉네임 변경 실패:', error);
        // 필요 시 에러 메시지 출력 등의 추가 처리
      }
    };

    return (
      <View style={styles.container}>
            <Header
            leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack}/>}
            title={<BasicText text="닉네임 변경" style={styles.headerText}/>}
            />

            <View style={styles.content}>
                <View>
                    <BasicText text="닉네임"/>
                    <BasicInput
                      text=""  // placeholder로 사용됨
                      style={styles.input}
                      value={nickname}
                      onChangeText={setNickname}
                    />
                     <BasicText text="* 닉네임은 최초 설정 후 최대 2회까지 변경 가능하오니," style={styles.redText}/>
                     <BasicText text="이점 유의하시어 신중하게 설정해 주시길 바랍니다." style={styles.redText}/>
                </View>
                <BasicButton
                    text="완료"
                    buttonStyle={styles.generateButton}
                    textStyle={styles.generateText}
                    onPress={()=>{setInvalidPopupVisible(true);}}
                />
            </View>

            <DeletePopup
                visible={invalidPopupVisible}
                onCancel={() => setInvalidPopupVisible(false)}
                onConfirm={handleChangeNickname }
                title="해당 닉네임으로"
                message="변경하시겠습니까?"
                buttonText="확인"
            />
      </View>
    );
};

export default NicknameChange;

