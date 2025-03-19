import React,{ useState } from 'react';
import {  TouchableOpacity, View,FlatList,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/Payment.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SVG from '../../components/SVG';
import BasicButton from '../../components/button/BasicButton';
import SettlementItem,{ Settlement } from '../../components/SettlementItem';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../../styles/theme';
import * as SVGIcon from '../../assets/svg';
import DeletePopup from '../../components/popup/DeletePopup';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../modules/redux/RootReducer'; // 실제 store 경로에 맞게 수정
import { banks, BankOption } from '../../constants/bankOptions';
//api
import { updateBankInfo } from '../../api/membersApi';
//redux
import { setUserInfo } from '../../modules/redux/slice/myInfoSlice';
type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
};
// 내비게이션 스택 타입 정의
type RootStackParamList = {
    CreateGaldae: undefined;
    MyInfo:undefined;
    NowGaldae: {
      departureLarge?:string,
      departureSmall?:string,
      destinationLarge?:string,
      destinationSmall?:string,
    };
    NowGaldaeDetail: { item: any };
    SetDestination:undefined;
    AccountRegister:undefined;
    Payment: { bank: string; account: string, svg: string } | undefined;
};
type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Payment: React.FC<HomeProps> = () => {
  const dispatch = useDispatch();
  const Settlements = [
    { id: 0, month: 10, date: 11, departure: '학교', destination: '호암동', settlement: 10000, bank: 'KB 국민은행', account: '3455-7568-67576-89' },
    { id: 1, month: 7, date: 6, departure: '중원도서관', destination: '베스킨라빈스', settlement: 18000, bank: '신한은행', account: '345-2341-2345-45' },
    { id: 2, month: 5, date: 20, departure: '기숙사', destination: '터미널', settlement: 15000, bank: '우리은행', account: '1234-567-890123' },
    { id: 3, month: 3, date: 1, departure: '회사', destination: '집', settlement: 9000, bank: '하나은행', account: '444-222-1111-00' },
    { id: 4, month: 11, date: 2, departure: '역', destination: '공항', settlement: 22000, bank: 'NH 농협', account: '5678-999-8888' },
    { id: 5, month: 9, date: 15, departure: '도서관', destination: '미용실', settlement: 13000, bank: 'KB 국민은행', account: '8888-555-777777' },
    { id: 6, month: 8, date: 29, departure: '호암동', destination: '카페', settlement: 5000, bank: '신한은행', account: '9999-5555-3333' },
    { id: 7, month: 2, date: 10, departure: '정문', destination: '후문', settlement: 4000, bank: '기업은행', account: '11-222-333-44' },
    { id: 8, month: 4, date: 18, departure: '강남', destination: '종로', settlement: 16000, bank: '카카오뱅크', account: '1234-12-567890' },
    { id: 9, month: 12, date: 30, departure: '집', destination: '마트', settlement: 7000, bank: '토스뱅크', account: '000-111-222-333' },
  ];
  // const accountInfo = {
  //   isAccountRegister :false,
  // };
  const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
  const goBack = () => navigation.goBack();
  //const route = useRoute<RouteProp<RootStackParamList, 'Payment'>>();
  const [deletePopupVisible, setDeletePopupVisible] = useState<boolean>(false);
    // Redux에 저장된 사용자 정보를 가져옵니다.
    const userInfo = useSelector((state: RootState) => state.myInfoSlice.userInfo);

  // 등록된 계좌 정보 여부를 Redux에서 확인합니다.
  const isAccountRegister = Boolean(userInfo?.bankType && userInfo?.accountNumber);
  // FlatList의 renderItem 함수
  const renderSettlementItem = ({ item }: { item: Settlement }) => {
    return <SettlementItem item={item} />;
  };
  // 키 추출 (각 항목 고유 키)
  const keyExtractor = (item: Settlement) => item.id.toString();
  const handleRegisterAccount = () =>{
    navigation.navigate('AccountRegister');
  };

  const handleDeleteConfirm = async() =>{

    dispatch(
      setUserInfo({
        bankType: '',
        accountNumber: '',
        depositor:'',
      })
    );
    try {
      // API 호출: 결제 정보 수정
      await updateBankInfo('', '', '');
      // 성공 시 Payment 화면으로 이동
      goBack();
    } catch (error) {
      Alert.alert('오류', '결제 정보 수정에 실패했습니다. 다시 시도해주세요.');
      console.error(error);
    }

  };
  // 서버에서 받은 bankType과 banks 배열의 name이 일치하는 항목을 찾습니다.
  const bankOption: BankOption | undefined = banks.find(
    (bank: BankOption) => bank.name === userInfo?.bankType
  );

  return (
    <View style={styles.container}>
          <Header
          leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack}/>}
          title={<BasicText text="결제 · 정산관리" style={styles.headerText}/>}
          />
          <View style={styles.content}>
              <BasicText text="현재 정산 계좌" style={styles.title}/>
              {
                isAccountRegister ? (
                  <LinearGradient
                    colors={[theme.colors.brandColor, theme.colors.sub]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                    >
                    <View style={styles.hasAccountContainer}>
                      <View style={styles.bankContainer}>
                        {/* 서버에서 받은 bankType과 banks의 name이 일치하면 해당 bankOption의 svg 사용 */}
                        <SVG name={(bankOption?.svg ?? 'Bank_Busan') as keyof typeof SVGIcon} width={23}/>
                        <BasicText text={userInfo?.bankType} style={styles.bankText}/>
                      </View>
                      <BasicText text={userInfo?.accountNumber} style={styles.accountText}/>
                    </View>
                  </LinearGradient>
                ) : (
                  <TouchableOpacity style={styles.accountContainer} onPress={handleRegisterAccount}>
                    <View style={styles.addContainer}>
                      <SVG name="add_line"/>
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
                    backgroundColor:theme.colors.lightGray,
                    textColor:theme.colors.black,

                  }
                }
                onPress={()=>navigation.navigate('AccountRegister')}/>
                <BasicButton
                text="삭제하기"
                textStyle={styles.text}
                buttonStyle={styles.btn}
                enabledColors={
                  {
                    backgroundColor:theme.colors.lightGray,
                    textColor:theme.colors.black,

                  }
                }
                onPress={()=>setDeletePopupVisible(true)}
                />
            </View>
              )}

              <BasicText text="정산 내역" style={styles.settleText}/>
              <FlatList
                data={Settlements}
                renderItem={renderSettlementItem}
                keyExtractor={keyExtractor}
                // 필요하다면 스타일 지정
                //contentContainerStyle={{ paddingBottom: 50 }}
              />
          </View>
          <DeletePopup
          visible={deletePopupVisible}
          onCancel={()=>setDeletePopupVisible(false)}
          onConfirm={() => {
            setDeletePopupVisible(false);
            handleDeleteConfirm();
          }}
          title="정산 계좌 정보를"
          message="삭제하시겠습니까?"
        />
    </View>
    );
};

export default Payment;

