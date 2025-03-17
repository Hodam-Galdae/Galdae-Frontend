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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

//API
import { createPost } from '../api/postApi'; // ✅ 갈대 생성 API 추가

// ✅ 갈대 생성 요청 타입
import { CreatePostRequest } from '../types/postTypes';

// 내비게이션 스택 타입 정의
type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: undefined;
  NowGaldaeDetail: { item: any };
};


const CreateGaldae: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const goBack = () => navigation.goBack();
  const [selectedGender, setSelectedGender] = useState<number>(0);
  const [selectedTimeDiscuss, setSelectedTimeDiscuss] = useState<number>(0);
  const [passengerNumber, setPassengerNumber] = useState<number>(1);
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
    else if(type === 'MINUS' && passengerNumber > 1){
      setPassengerNumber(passengerNumber - 1);
    }
  };
  // const handleGenerateGaldae = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     // 생성된 갈대 정보를 담은 객체 생성 (필요에 따라 state 값을 활용하여 데이터를 구성)
  //     const createdItem = {
  //       id: Date.now(), // 예시용 ID
  //       owner: '내 갈대', // 본인 이름 또는 별칭
  //       from: { main: departureLarge, sub: departureSmall },
  //       // 현재 탑승 인원은 본인 포함(passengerNumber + 1)로 계산
  //       users: 1,
  //       capacity: passengerNumber + 1,
  //       destination: { main: destinationLarge, sub: destinationSmall },
  //       time: formatDepartureDateTime(),
  //       timeAgreement: selectedTimeDiscuss === 0,
  //       // 성별 선택에 따라 태그 처리
  //       tags: selectedGender === 0 ? ['성별무관'] : (selectedGender === 1 ? ['여자'] : ['남자']),
  //     };

  //     // NowGaldaeDetail 페이지로 이동하면서 생성된 데이터를 전달합니다.
  //     navigation.navigate('NowGaldaeDetail', { item: createdItem });
  //   }, 2000);
  // };

  // ✅ 갈대 생성 API 호출 함수
  const handleCreateGaldaeConfirm = async () => {
    setLoading(true);

    // 출발 일시를 ISO 8601 형식으로 변환
    const formattedDepartureTime = moment()
      .tz('Asia/Seoul')
      .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    const postData: CreatePostRequest = {
      departure: departureSmall,
      arrival: destinationSmall,
      departureTime: formattedDepartureTime,
      passengerType: selectedGender === 1 ? 'FEMALE' : 'MALE',
      arrangeTime: selectedTimeDiscuss === 0 ? 'POSSIBLE' : 'IMPOSSIBLE',
      passengerCount: passengerNumber,
      isFavoriteRoute: selectedChannel,
    };

    console.log('🚀 서버로 보낼 갈대 생성 데이터:', postData);

    try {
      await createPost(postData);
    } catch (error) {
      console.error('❌ 갈대 생성 실패:', error);
    } finally {
      setLoading(false);
    }
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
            onPress={handleCreateGaldaeConfirm}
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
