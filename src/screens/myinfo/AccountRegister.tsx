import React, { useState } from 'react';
import {  View ,TouchableOpacity,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/AccountRegister.style';
import SVG from '../../components/SVG';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BasicInput from '../../components/BasicInput';
import { theme } from '../../styles/theme';
import * as svg from '../../assets/svg'; // svg 아이콘들이 export 된 모듈

type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
};
type BankOption = {
    code: string;
    name: string;
    svg: keyof typeof svg;
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
    WithDraw:undefined;
    Payment: { bank?: string; account?: string; svg?: string } | undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const AccountRegister: React.FC<HomeProps> = () => {
    // 은행 옵션 배열 (은행 코드와 이름)
    const banks:BankOption[] = [
        { code: 'kb', name: 'KB 국민은행', svg:'Bank_KB' },
        { code: 'kbin', name: 'KB 증권', svg:'Bank_KB' },
        { code: 'shinhan', name: '신한은행', svg:'Bank_Jeju' },
        { code: 'woori', name: '우리은행',svg:'Bank_Woori' },
        { code: 'hana', name: '하나은행',svg:'Bank_Hana' },
        { code: 'nh', name: 'NH 농협은행',svg:'Bank_NHINVESTMENT' },
        { code: 'nhin', name: 'NH 투자증권',svg:'Bank_NHINVESTMENT' },
        { code: 'ibk', name: 'IBK기업은행', svg: 'Bank_IBK' },
        { code: 'jeju', name: '제주은행', svg: 'Bank_Jeju' },
        { code: 'jeonbuk', name: '전북은행', svg: 'Bank_Jeonbuk' },
        { code: 'k', name: 'K은행', svg: 'Bank_K' },
        { code: 'keb', name: 'KEB외환은행', svg: 'Bank_KEB' },
        { code: 'kakao', name: '카카오뱅크', svg: 'Bank_Kakao' },
        { code: 'koreaInvestment', name: '한국투자은행', svg: 'Bank_KoreaInvestment' },
        { code: 'kwangju', name: '광주은행', svg: 'Bank_KWANGJU' },
        { code: 'nacufok', name: '신협은행', svg: 'Bank_NACUFOK' },
        { code: 'Bank_Postbank', name: '우체국은행', svg: 'Bank_Postbank' },
        { code: 'Bank_SavingsBank', name: '저축은행', svg: 'Bank_SavingsBank' },
        { code: 'Bank_SBI', name: 'SBI저축', svg: 'Bank_SBI' },
        { code: 'Bank_SC', name: 'SC제일', svg: 'Bank_SC' },
        { code: 'Bank_Suhyup', name: '수협은행', svg: 'Bank_Suhyup' },
        { code: 'busan', name: '부산은행', svg: 'Bank_Busan' },
        { code: 'gyeongnam', name: '경남은행', svg: 'Bank_Busan' },
        { code: 'Bank_Toss', name: '토스뱅크', svg: 'Bank_Toss' },
        { code: 'citi', name: '씨티은행', svg: 'Bank_Citi' },
        { code: 'daegu', name: '대구은행', svg: 'Bank_DaeGu' },
        { code: 'forestry', name: '산림조합은행', svg: 'Bank_ForestryCooperative' },
        { code: 'Bank_Saemaul', name: '새마을금고', svg: 'Bank_Saemaul' },
        { code: 'Bank_KDB', name: 'KDB산업은행', svg: 'Bank_KDB' },
    ];
    // 영어로 시작하는 은행과 한글로 시작하는 은행 분리 후 정렬
    const englishBanks = banks
    .filter(bank => /^[A-Za-z]/.test(bank.name))
    .sort((a, b) => a.name.localeCompare(b.name));
    const koreanBanks = banks
    .filter(bank => !/^[A-Za-z]/.test(bank.name))
    .sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    const sortedBanks = [...englishBanks, ...koreanBanks];
    const [account, setAccount] = useState<string>();
    const [selectedBank, setSelectedBank] = useState<string>(''); // 기본값 예: 'kb'
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [editable , setEditable] = useState<boolean>(false);
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () => navigation.goBack();
    const handleComplete = () =>{
        if (account && selectedBank) {
            // 선택한 은행 객체를 가져옵니다.
            const selectedBankObj = sortedBanks.find((bank) => bank.code === selectedBank);
            // Payment 화면으로 은행 이름, 계좌, 그리고 svg 키 값을 전달합니다.
            navigation.navigate('Payment', {
              bank: selectedBankObj?.name,
              account,
              svg: selectedBankObj?.svg,
            });
          }
    };

    return (
      <View style={styles.container}>
        <Header
        leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack}/>}
        title={<BasicText text="계좌 등록" style={styles.headerText}/>}
        />
        <View style={styles.content}>
            <BasicText text="은행 선택" style={styles.title}/>
            {/* 커스텀 드롭다운 */}
            <View style={styles.bankPickerContainer}>
              <TouchableOpacity
                style={styles.bankPickerButton}
                onPress={() =>
                {
                    setDropdownVisible(!dropdownVisible);
                    setEditable(false);
                }
                }
              >
                <View style={styles.bankSVGText}>
                {selectedBank && <SVG name={
                 sortedBanks.find((bank: BankOption) => bank.code === selectedBank)?.svg || 'Bank_KB'
                 } width={16} height={16}/>}
                <BasicText
                  text={
                    selectedBank
                      ? sortedBanks.find((bank) => bank.code === selectedBank)?.name || '은행 선택'
                      : '은행 선택'
                  }
                  style={styles.bankPickerText}
                />
                </View>
                <SVG
                  name={dropdownVisible ? 'up_line' : 'down_line'}
                  style={styles.bankPickerIcon}
                />
              </TouchableOpacity>
              {dropdownVisible && (
                <View style={styles.bankDropdown}>
                  <ScrollView>
                    {sortedBanks.map((bank) => (
                      <TouchableOpacity
                        key={bank.code}
                        style={styles.bankDropdownItem}
                        onPress={() => {
                          setSelectedBank(bank.code);
                          setDropdownVisible(false);
                          setEditable(true);
                        }}
                      >
                        <SVG name={bank.svg ?? 'KB'} width={16} height={16}/>
                        <BasicText text={bank.name} style={styles.bankDropdownText} />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            <BasicText text="계좌 정보" style={styles.title}/>
            <BasicInput
                text="계좌 입력"
                style={styles.input}
                value={account}
                editable={editable}
                onChangeText={setAccount}
                placeholderTextColor={theme.colors.gray2} // 원하는 색상으로 지정
              />
            <View style={styles.completeBtnContainer}>
              <BasicButton
                text="완료"
                buttonStyle={styles.completeBtn}
                textStyle={styles.completeText}
                //loading={loading}
                onPress={handleComplete}
                disabled={!account || !selectedBank}
                disabledColors={
                  {
                      backgroundColor:theme.colors.lightGray,
                      textColor:theme.colors.black,
                      borderColor:theme.colors.transparent,
                  }
                }
              />
            </View>
        </View>

      </View>
    );
};

export default AccountRegister;

