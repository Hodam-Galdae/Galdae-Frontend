// MyInfo.tsx 테스트
import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styles from '../styles/SetUserInfo.style';
import BasicText from '../components/BasicText';
import SVG from '../components/SVG';
import SVGButton from '../components/button/SVGButton';
import SelectTextButton from '../components/button/SelectTextButton';
import BasicButton from '../components/button/BasicButton';
import {theme} from '../styles/theme';
import ItemSelector from '../components/ItemSelector';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {checkNickname, join} from '../api/authApi';
import useImagePicker from '../hooks/useImagePicker';
import RNFS from 'react-native-fs';

interface AgreeProps {
  setNextStep: (name: string) => void;
}

const SetUserInfo: React.FC<AgreeProps> = ({setNextStep}) => {
  const [genderSelected, setGenderSelected] = useState<number>(-1);
  const [bankSelect, setBankSelect] = useState<number>(-1);
  const [name, setName] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [accountName, setAccountName] = useState<string>('');
  const [alertNameText, setAlertNameText] = useState<string>('');
  const [alertGenderText, setAlertGenderText] = useState<string>('');
  const {imageUri, imageName, imageType, getImageByCamera, getImageByGallery} = useImagePicker();

  const bankText = [
    '국민 은행',
    '우리 은행',
    '신한 은행',
    '농협',
    '카카오 뱅크',
    '제주 은행',
    '광주 은행',
  ];

  const clickEvent = async () => {
    const regex = /^[가-힣0-9]{2,8}$/;
    let flag = true;

    // 닉네임 확인
    if (name.length === 0) {
      setAlertNameText('*필수 입력 항목입니다.');
      flag = false;
    } else if (!regex.test(name)) {
      setAlertNameText('*닉네임은 한글, 숫자 2~8자로 제한됩니다.');
      flag = false;
    } else {
      setAlertNameText('');
    }
    const isAvailable = await checkNickname(name);

    if (!isAvailable) {
      setAlertNameText('*중복되는 닉네임입니다.');
      flag = false;
    } else {
      setAlertNameText('');
    }

    // 성별 확인
    if (genderSelected === -1) {
      setAlertGenderText('*필수 선택 항목입니다.');
      flag = false;
    } else {
      setAlertGenderText('');
    }

    // 모든 조건 충족
    if (flag) {
      try {
        const formData = new FormData();
        const data = {
          nickname: name,
          gender: genderSelected === 0 ? 'FEMALE' : 'MALE',
          bankType: bankText[bankSelect],
          accountNumber: accountNumber,
          depositor: accountName,
        };
        const fileName = `${name}.json`;
        const filePath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
        await RNFS.writeFile(filePath, JSON.stringify(data), 'utf8');

        formData.append('joinRequestCommand', {
          uri: `file:///${filePath}`,
          type: 'application/json',
          name: fileName,
        });

        if(imageUri) {
          let image = {uri: imageUri, type: imageType, name: imageName};
          formData.append('profileImage', image);
        }

        await join(formData);
        setNextStep('verifySchool');
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.container}>
            <View>
              <BasicText text="유저 정보 입력" style={styles.title} />
              <View style={styles.profileContainer}>
                <View style={styles.profileWrapper}>
                  <SVG
                    style={styles.profile}
                    name="DefaultProfile"
                    width={68}
                    height={68}
                  />
                  <SVGButton
                    onPress={getImageByGallery}
                    iconName="GalleryBlack"
                    SVGStyle={{width: 30, height: 30}}
                    buttonStyle={styles.camera}
                  />
                </View>
              </View>
              <View>
                <BasicText text="닉네임" style={styles.subTitle} />
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                  />
                  {/* <TouchableOpacity>
                <View style={styles.checkBtn}>
                  <BasicText style={styles.checkBtnText} text="중복 확인" />
                </View>
              </TouchableOpacity> */}
                </View>
                {alertNameText.length !== 0 ? (
                  <BasicText style={styles.alertText} text={alertNameText} />
                ) : null}
              </View>
              <View>
                <BasicText text="성별" style={styles.subTitle} />
                <View style={styles.genderBtnContainer}>
                  <SelectTextButton
                    text="여자"
                    selected={genderSelected === 0}
                    onPress={() => setGenderSelected(0)}
                    buttonStyle={styles.genderBtn}
                  />
                  <SelectTextButton
                    text="남자"
                    onPress={() => setGenderSelected(1)}
                    selected={genderSelected === 1}
                    buttonStyle={styles.genderBtn}
                  />
                </View>
                {alertGenderText.length !== 0 ? (
                  <BasicText style={styles.alertText} text={alertGenderText} />
                ) : null}
              </View>
              <BasicText text="결제·정산관리" style={styles.subTitle} />
              <View style={styles.bankSelector}>
                <ItemSelector
                  hint="은행 선택"
                  items={bankText}
                  selected={bankSelect}
                  setSelected={setBankSelect}
                  style={{position: 'absolute', zIndex: 999}}
                  textStyle={{paddingLeft: 10}}
                />
              </View>
              <TextInput
                style={styles.bankContainer}
                placeholder="계좌번호 입력"
                value={accountNumber}
                onChangeText={setAccountNumber}
                placeholderTextColor={theme.colors.gray2}
              />
              <TextInput
                style={styles.bankContainer}
                placeholder="예금주 입력"
                placeholderTextColor={theme.colors.gray2}
                value={accountName}
                onChangeText={setAccountName}
              />
            </View>
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SetUserInfo;
