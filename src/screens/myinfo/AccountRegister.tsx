import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Alert } from 'react-native';
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
import { banks, BankOption } from '../../constants/bankOptions';
import { useDispatch } from 'react-redux';
//redux
import { setUserInfo } from '../../modules/redux/slice/myInfoSlice';

//api
import { updateBankInfo } from '../../api/membersApi';

type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
};

// 내비게이션 스택 타입 정의
type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: {
    departureLarge?: string,
    departureSmall?: string,
    destinationLarge?: string,
    destinationSmall?: string,
  };
  SetDestination: undefined;
  WithDraw: undefined;
  Payment: { bank?: string; account?: string; svg?: string } | undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const AccountRegister: React.FC<HomeProps> = () => {

  // 영어로 시작하는 은행과 한글로 시작하는 은행 분리 후 정렬
  const englishBanks = banks
    .filter(bank => /^[A-Za-z]/.test(bank.name))
    .sort((a, b) => a.name.localeCompare(b.name));
  const koreanBanks = banks
    .filter(bank => !/^[A-Za-z]/.test(bank.name))
    .sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  const sortedBanks = [...englishBanks, ...koreanBanks];
  const [depositor, setDepositor] = useState<string>(''); // 예금주 입력 상태 추가
  const [account, setAccount] = useState<string>();
  const [selectedBank, setSelectedBank] = useState<string>(''); // 기본값 예: 'kb'
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
  const goBack = () => navigation.goBack();
  const handleComplete = async () => {
    if (account && selectedBank && depositor) {
      // 선택한 은행 객체를 가져옵니다.
      const selectedBankObj = sortedBanks.find(bank => bank.code === selectedBank);
      if (!selectedBankObj) { return; }

      // Redux에 은행 정보 업데이트
      dispatch(
        setUserInfo({
          bankType: selectedBankObj.name,
          accountNumber: account,
          depositor,
          id: '',
          nickname: '',
          image: '',
          university: '',
          area: '',
          isAuthenticated: false,
          gender: '',
          nicknameCount: 0,
        })
      );

      try {
        // API 호출: 결제 정보 수정
        await updateBankInfo(selectedBankObj.name, account, depositor);
        // 성공 시 Payment 화면으로 이동
        goBack();
      } catch (error) {
        Alert.alert('오류', '결제 정보 수정에 실패했습니다. 다시 시도해주세요.');
        //console.error(error);
      }
    }
  };

  const handleAccountChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setAccount(numericValue);
  };

  return (
    <View style={styles.container}>
      <Header
        leftButton={<SVGButton iconName="arrow_left_line2" onPress={goBack} />}
        title={<BasicText text="계좌 변경하기" style={styles.headerText} />}
        style={styles.header}
      />
      <View style={styles.content}>
        <BasicText text="은행 선택" style={styles.title} />
        {/* 커스텀 드롭다운 */}
        <View style={styles.bankPickerContainer}>
          <TouchableOpacity
            style={styles.bankPickerButton}
            onPress={() => {
              setDropdownVisible(!dropdownVisible);
              setEditable(false);
            }
            }
          >
            <View style={styles.bankSVGText}>
              {selectedBank && <SVG name={
                sortedBanks.find((bank: BankOption) => bank.code === selectedBank)?.svg || 'Bank_KB'
              } width={16} height={16} />}
              <BasicText
                text={
                  selectedBank
                    ? sortedBanks.find((bank) => bank.code === selectedBank)?.name || '종류 선택'
                    : '종류 선택'
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
                    <SVG name={bank.svg ?? 'KB'} width={16} height={16} />
                    <BasicText text={bank.name} style={styles.bankDropdownText} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        <BasicText text="예금주" style={styles.title} />
        <BasicInput
          text="예금주 입력"
          style={styles.input}
          value={depositor}
          onChangeText={setDepositor}
          textColor={theme.colors.blackV0} // 원하는 색상으로 지정
        />
        <BasicText text="계좌 정보" style={styles.title} />
        <BasicInput
          text="계좌 입력"
          style={styles.input}
          value={account}
          onChangeText={handleAccountChange}
          keyboardType="numeric"
          maxLength={15}
          textColor={theme.colors.blackV0} // 원하는 색상으로 지정
        />
        <View style={styles.completeBtnContainer}>
          <BasicButton
            text="완료"
            buttonStyle={styles.completeBtn}
            textStyle={styles.completeText}
            //loading={loading}
            onPress={handleComplete}
            disabled={!account || !selectedBank || !depositor}
            disabledColors={
              {
                backgroundColor: theme.colors.grayV3,
                textColor: theme.colors.blackV0,
                borderColor: theme.colors.transparent,
              }
            }
          />
        </View>
      </View>

    </View>
  );
};

export default AccountRegister;

