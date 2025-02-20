import React, {useState,useRef} from 'react';
import moment from 'moment';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/CreateGaldae.style';
import BasicText from '../components/BasicText';
import PositionBox from '../components/PostionBox';
import SVGButton from '../components/button/SVGButton';
import { theme } from '../styles/theme';
import BasicButton from '../components/button/BasicButton';
import SVG from '../components/SVG';
import Header from '../components/Header';
import SelectTextButton from '../components/button/SelectTextButton';
import FastGaldaeStartPopup, { FastGaldaeStartPopupRef } from '../components/popup/FastGaldaeStartPopup';
import FastGaldaeEndPopup, { FastGaldaeEndPopupRef } from '../components/popup/FastGaldaeEndPopup';
import FastGaldaeTimePopup, { FastGaldaeTimePopupRef } from '../components/popup/FastGaldaeTimePopup';
const CreateGaldae: React.FC = () => {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  const [selectedGender, setSelectedGender] = useState<number>(0);
  const [selectedTimeDiscuss, setSelectedTimeDiscuss] = useState<number>(0);
  const [passengerNumber, setPassengerNumber] = useState<number>(0);
  const [selectedChannel, setSelectedChannel] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [departureDate, setDepartureDate] = useState<string | null>(null); // "YYYY-MM-DD" 형식
  const [departureAmPm, setDepartureAmPm] = useState<'오전' | '오후'>('오전');
  const [departureLarge, setDepartureLarge] = useState<string>('학교');
  const [departureSmall, setDepartureSmall] = useState<string>('중원도서관');
  const [destinationLarge, setDestinationLarge] = useState<string>('학교');
  const [destinationSmall, setDestinationSmall] = useState<string>('중원도서관');
  const [departureHour, setDepartureHour] = useState<number>(0);
  const [departureMinute, setDepartureMinute] = useState<number>(0);

  const fastGaldaeStartPopupRef = useRef<FastGaldaeStartPopupRef>(null);
  const fastGaldaeEndPopupRef = useRef<FastGaldaeEndPopupRef>(null);
  const fastGaldaeTimePopupRef = useRef<FastGaldaeTimePopupRef>(null);
  const passengerNumberHandler = (type: String) => {
    if(type === 'PLUS' && passengerNumber < 4){
      setPassengerNumber(passengerNumber + 1);
    }
    else if(type === 'MINUS' && passengerNumber > 0){
      setPassengerNumber(passengerNumber - 1);
    }
  };
  const handleGenerateGaldae = () => {
    // 예시: 생성 처리 시작 시 로딩 상태 활성화 후 2초 후에 로딩 해제
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      goBack();
      // 필요에 따라 추가 작업을 진행하거나 다른 화면으로 이동
    }, 2000);
  };
  const toggleFastGaldaeStartPopup = () =>{
    fastGaldaeStartPopupRef.current?.open();
  };

  const toggleFastGaldaeEndPopup = () =>{
    fastGaldaeEndPopupRef.current?.open();
  };

  const toggleFastGaldaeTimePopup = () =>{
    fastGaldaeTimePopupRef.current?.open();
  };

  const handleTimePopupConfirm = (
    selectedDate: string,
    amPm: '오전' | '오후',
    hour: number,
    minute: number
  ) => {
    setDepartureDate(selectedDate);
    setDepartureAmPm(amPm);
    setDepartureHour(hour);
    setDepartureMinute(minute);
  };
  // 출발일시 문자열 포맷 함수
  const formatDepartureDateTime = () => {
    if (!departureDate) {
      const now = moment();
      const formattedDate = now.format('YYYY년 M월 D일 (ddd)'); // 예: 2025년 11월 12일 (수)
      const hour = now.hour();
      const minute = now.minute();
      const amPm = hour < 12 ? '오전' : '오후';
      let hour12 = hour % 12;
      if (hour12 === 0) {hour12 = 12;}
      const formattedTime = `${amPm} ${hour12} : ${minute < 10 ? '0' + minute : minute}`;
      return `출발일시: ${formattedDate} ${formattedTime}`;
    }
    const dateObj = moment(departureDate, 'YYYY-MM-DD');
    // 예: "2025년 11월 12일 (수)"
    const formattedDate = dateObj.format('YYYY년 M월 D일 (ddd)');
    // 예: "오전 2 : 30" (분이 10 미만일 경우 앞에 0 추가)
    const formattedTime = `${departureAmPm} ${departureHour} : ${departureMinute < 10 ? '0' + departureMinute : departureMinute}`;
    return `출발일시: ${formattedDate} ${formattedTime}`;
  };

  return (

    <View>
      <Header
      leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack}/>}
      title={<BasicText text="갈대 생성하기" style={styles.mainTitle}/>}
      />
      <ScrollView>
        <View style={styles.container}>
          <BasicText style={styles.title} text="목적지 설정"/>
          <View style={styles.positionBox}>
            <PositionBox title={departureLarge} subTitle={departureSmall} isOrigin={true} onPress={toggleFastGaldaeStartPopup}/>
            <SVGButton
              iconName="Switch"
              buttonStyle={styles.switchBtn}
              SVGStyle={styles.switchIcon}
            />
            <PositionBox title={destinationLarge} subTitle={destinationSmall} isOrigin={false} onPress={toggleFastGaldaeEndPopup}/>
          </View>

          <BasicText style={styles.title} text="출발 일시"/>

          <TouchableOpacity onPress={toggleFastGaldaeTimePopup}>
            <View style={styles.timeBox}>
              <BasicText text={formatDepartureDateTime()} style={styles.timeText}/>
            </View>
          </TouchableOpacity>

          <BasicText style={styles.title} text="추가 정보 설정"/>
          <BasicText style={styles.subTitle} text="동승자 성별을 선택해주세요."/>
          <View style={styles.buttonWrapper}>
            <SelectTextButton
              text="성별무관"
              selected={selectedGender === 0}
              buttonStyle={styles.selectBtn}
              textStyle={styles.selectText}
              onPress={() => setSelectedGender(0)}
            />
            <SelectTextButton
              text="여자"
              selected={selectedGender === 1}
              buttonStyle={styles.selectBtn}
              textStyle={styles.selectText}
              onPress={() => setSelectedGender(1)}
            />
            <SelectTextButton
              text="남자"
              selected={selectedGender === 2}
              buttonStyle={styles.selectBtn}
              textStyle={styles.selectText}
              onPress={() => setSelectedGender(2)}
            />
          </View>
          <BasicText style={styles.subTitle} text="시간 협의 가능 여부를 선택해주세요."/>
          <View style={styles.buttonWrapper}>
            <SelectTextButton
              text="가능"
              selected={selectedTimeDiscuss === 0}
              buttonStyle={styles.selectBtn}
              textStyle={styles.selectText}
              onPress={() => setSelectedTimeDiscuss(0)}
            />
            <SelectTextButton
              text="불가능"
              selected={selectedTimeDiscuss === 1}
              buttonStyle={styles.selectBtn}
              textStyle={styles.selectText}
              onPress={() => setSelectedTimeDiscuss(1)}
            />
          </View>
          <BasicText text="*최대 4명" style={styles.warnText}/>
          <View style={styles.personWrapper}>
            <View style={styles.personBox}>
              <BasicText text="탑승인원" style={styles.personText}/>
              <BasicText text="(본인포함)" style={styles.personSubText}/>
            </View>
            <View style={styles.personBox}>
              <SVGButton
                onPress={() => passengerNumberHandler('MINUS')}
                iconName="Minus"
                buttonStyle={styles.plusBtn}
                SVGStyle={styles.plusIcon}
              />
              <BasicText text={passengerNumber.toString()} style={styles.numberText}/>
              <SVGButton
                onPress={() => passengerNumberHandler('PLUS')}
                iconName="Plus"
                buttonStyle={styles.plusBtn}
                SVGStyle={styles.plusIcon}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => setSelectedChannel(!selectedChannel)}>
            <View style={selectedChannel ? {...styles.oftenBox, borderColor: theme.colors.brandColor} : styles.oftenBox}>
                <SVG name={selectedChannel ? 'CheckSelected' : 'Check'} width={18} height={18} style={styles.checkBtn}/>
                <BasicText text="자주가는 경로로 등록하기" style={selectedChannel ? {...styles.checkText, color: theme.colors.black} : styles.checkText}/>
            </View>
          </TouchableOpacity>
          <BasicButton
            text="생성하기"
            buttonStyle={styles.generateButton}
            textStyle={styles.generateText}
            loading={loading}
            onPress={handleGenerateGaldae}
          />
        </View>
        </ScrollView>

        <FastGaldaeStartPopup
          ref={fastGaldaeStartPopupRef}
          onConfirm={(large, small) => {
            setDepartureLarge(large);
            setDepartureSmall(small);
          }}
          onClose={() => console.log('팝업 닫힘')}
        />

        <FastGaldaeEndPopup
        ref={fastGaldaeEndPopupRef}
        onConfirm={(large, small) => {
          setDestinationLarge(large);
          setDestinationSmall(small);
        }}
        onClose={() => console.log('팝업 닫힘')}
        />

        <FastGaldaeTimePopup ref={fastGaldaeTimePopupRef} onConfirm={handleTimePopupConfirm} onClose={() => console.log('팝업 닫힘')}/>

    </View>
  );
};

export default CreateGaldae;
