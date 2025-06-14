import React,{ useState } from 'react';
import {  View,Alert } from 'react-native';
import { useNavigation ,useRoute, RouteProp} from '@react-navigation/native';
import styles from '../../styles/NicknameChange.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import DeletePopup from '../../components/popup/DeletePopup';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BasicInput from '../../components/BasicInput';
import { useAppDispatch } from '../../modules/redux/store';
import { fetchUserInfo } from '../../modules/redux/slice/myInfoSlice';
import { fetchMyGaldaeHistory } from '../../modules/redux/slice/myGaldaeSlice';
import { fetchMyCreatedGaldae } from '../../modules/redux/slice/myCreatedGaldaeSlice';
import {fetchHomeGaldaePosts} from  '../../modules/redux/slice/homeGaldaeSlice';
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

    SetDestination:undefined;
    MyGaldaeHistory:any;

    NicknameChange: { nickname: string }; // 수정: 파라미터로 닉네임을 받음
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type NicknameChangeRouteProp = RouteProp<RootStackParamList, 'NicknameChange'>;

const NicknameChange: React.FC<HomeProps> = () => {
  const route = useRoute<NicknameChangeRouteProp>();
  const dispatch = useAppDispatch();
    // 전달받은 닉네임을 초기값으로 설정 (없으면 기본값 '닉네임')
    const initialNickname = route.params?.nickname || '닉네임';
    const [nickname, setNickname] = useState<string>(initialNickname);
    const [invalidPopupVisible, setInvalidPopupVisible] = useState<boolean>(false);
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () => navigation.goBack();
    const handleChangeNickname = async () => {
      try {
        // 닉네임 변경 API 호출
        await updateNickname(nickname);
        //console.log('닉네임 변경 성공');
        dispatch(fetchUserInfo());
        dispatch(fetchMyGaldaeHistory());
        dispatch(fetchMyCreatedGaldae());
        dispatch(fetchHomeGaldaePosts());
        setInvalidPopupVisible(false);
        goBack();
      } catch (error : any) {
        // 에러 응답 객체에서 메시지를 추출합니다.
        const errorMessage =
        error.response?.data?.message || error.message || '닉네임 변경에 실패했습니다.';
        Alert.alert('오류', errorMessage);
        //console.error('닉네임 변경 실패:', error);
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
                     <BasicText text="이점 유의하시어 신중하게 설정해 주시길 바랍니다" style={styles.redText}/>
                </View>
                <BasicButton
                    text="완료"
                    buttonStyle={styles.generateButton}
                    textStyle={styles.generateText}
                    onPress={()=>{
                      // 닉네임 길이 검증: 2~6자 제한
                      if (nickname.length < 2 || nickname.length > 6) {
                        Alert.alert('닉네임 오류', '닉네임은 2~6자여야 합니다.');
                        return;
                      }
                      // 한글과 숫자만 허용하는 정규식 검사
                      const regex = /^[가-힣0-9]+$/;
                      if (!regex.test(nickname)) {
                        Alert.alert('닉네임 오류', '닉네임은 한글과 숫자만 사용할 수 있습니다.');
                        return;
                      }
                      setInvalidPopupVisible(true);
                    }}
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

