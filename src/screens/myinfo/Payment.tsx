import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/Payment.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SVG from '../../components/SVG';
import BasicButton from '../../components/button/BasicButton';
import { theme } from '../../styles/theme';
import * as SVGIcon from '../../assets/svg';
import { useSelector} from 'react-redux';
import { RootState } from '../../modules/redux/RootReducer'; // 실제 store 경로에 맞게 수정
import { banks, BankOption } from '../../constants/bankOptions';

type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
};
// 내비게이션 스택 타입 정의
type RootStackParamList = {
  CreateGaldae: undefined;
  MyInfo: undefined;
  NowGaldae: {
    departureLarge?: string,
    departureSmall?: string,
    destinationLarge?: string,
    destinationSmall?: string,
  };
  SetDestination: undefined;
  AccountRegister: undefined;
  Payment: { bank: string; account: string, svg: string } | undefined;
};
type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Payment: React.FC<HomeProps> = () => {


  const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
  const goBack = () => navigation.goBack();

  // Redux에 저장된 사용자 정보를 가져옵니다.
  const userInfo = useSelector((state: RootState) => state.myInfoSlice.userInfo);


  // 등록된 계좌 정보 여부를 Redux에서 확인합니다.
  const isAccountRegister = Boolean(userInfo?.bankType && userInfo?.accountNumber);

  const handleRegisterAccount = () => {
    navigation.navigate('AccountRegister');
  };
  // 서버에서 받은 bankType과 banks 배열의 name이 일치하는 항목을 찾습니다.
  const bankOption: BankOption | undefined = banks.find(
    (bank: BankOption) => bank.name === userInfo?.bankType
  );
  return (
    <View style={styles.container}>
      <Header
        leftButton={<SVGButton iconName="arrow_left_line2" onPress={goBack} />}
        title={<BasicText text="계좌 정보 수정" style={styles.headerText} />}
        style={styles.header}
      />
      <View style={styles.content}>
        <BasicText text="현재 정산 계좌" style={styles.title} />
        {
          isAccountRegister ? (
            <View style={styles.hasAccountContainer}>
              <View style={styles.bankContainer}>
                {/* 서버에서 받은 bankType과 banks의 name이 일치하면 해당 bankOption의 svg 사용 */}
                <SVG name={(bankOption?.svg ?? 'Bank_Busan') as keyof typeof SVGIcon} width={23} />
                <BasicText text={userInfo?.bankType} style={styles.bankText} />
              </View>
              <BasicText text={userInfo?.accountNumber} style={styles.accountText} />
            </View>
          ) : (
            <TouchableOpacity style={styles.accountContainer} onPress={handleRegisterAccount}>
              <View style={styles.addContainer}>
                <SVG name="add_line" />
              </View>
            </TouchableOpacity>
          )
        }


        {isAccountRegister && (
          <View style={styles.btns}>
            <BasicButton
              text="변경하기"
              textStyle={styles.text}
              buttonStyle={styles.btn}
              enabledColors={
                {
                  backgroundColor: theme.colors.grayV3,
                  textColor: theme.colors.blackV0,

                }
              }
              onPress={() => navigation.navigate('AccountRegister')} />

          </View>
        )}

      </View>

    </View>
  );
};

export default Payment;

