/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
// CreateGaldae.tsx
import React, { useState, useRef } from 'react';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import { TouchableOpacity, View, ScrollView, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../styles/CreateDelivery.style';
import BasicText from '../../../components/BasicText';
import PositionBox from '../../../components/PostionBox';
import SVGButton from '../../../components/button/SVGButton';
import { theme } from '../../../styles/theme';
import BasicButton from '../../../components/button/BasicButton';
import Header from '../../../components/Header';
import SelectTextButton from '../../../components/button/SelectTextButton';
import FastGaldaeStartPopup, { FastGaldaeStartPopupRef } from '../../../components/popup/FastGaldaeStartPopup';
import FastGaldaeEndPopup, { FastGaldaeEndPopupRef } from '../../../components/popup/FastGaldaeEndPopup';
import FastGaldaeTimePopup, { FastGaldaeTimePopupRef } from '../../../components/popup/FastGaldaeTimePopup';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '../../../modules/redux/store';
import { fetchMyGaldaeHistory } from '../../../modules/redux/slice/myGaldaeSlice';
import { fetchHomeGaldaePosts } from '../../../modules/redux/slice/homeGaldaeSlice';
import { fetchMyCreatedGaldae } from '../../../modules/redux/slice/myCreatedGaldaeSlice';
import { fetchGaldaePosts } from '../../../modules/redux/slice/galdaeSlice';
import { fetchFrequentRoutes } from '../../../modules/redux/slice/frequentRouteSlice';
import SVG from '../../../components/SVG';
// API
import { createPost } from '../../../api/postApi'; // ✅ 갈대 생성 API 추가
//type
import { GetPostsRequest } from '../../../types/postTypes';
// ✅ 갈대 생성 요청 타입
import { CreatePostRequest } from '../../../types/postTypes';
import { Portal } from '@gorhom/portal';
import ParticipateModal from '../../../components/popup/ParticipateModal';

// 내비게이션 스택 타입 정의
type RootStackParamList = {
    CreateDelivery: undefined;
    NowGaldae: undefined;
    DeliveryDetail: { postId: string };
    TaxiNDivide: undefined;
    DeliveryNDivide: undefined;
};

const CreateDelivery: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const goBack = () => navigation.goBack();
    const [selectedGender, setSelectedGender] = useState<number>(0);
    const [selectedTimeDiscuss, setSelectedTimeDiscuss] = useState<number>(0);
    const [passengerNumber, setPassengerNumber] = useState<number>(2);
    const [selectedChannel, setSelectedChannel] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [departureDate, setDepartureDate] = useState<string | null>(null); // "YYYY-MM-DD" 형식
    const [departureAmPm, setDepartureAmPm] = useState<'오전' | '오후'>('오전');
    // 출발지 상태 (이름과 ID)
    const [departureLargeName, setDepartureLargeName] = useState<'출발지 선택' | string>('출발지 선택');
    const [departureLargeId, setDepartureLargeId] = useState<number | null>(null);
    const [departureSmallName, setDepartureSmallName] = useState<'출발지 선택' | string>('-');
    const [departureSmallId, setDepartureSmallId] = useState<number | null>(null);
    // 도착지 상태 (이름과 ID)
    const [destinationLargeName, setDestinationLargeName] = useState<'도착지 선택' | string>('도착지 선택');
    const [destinationLargeId, setDestinationLargeId] = useState<number | null>(null);
    const [destinationSmallName, setDestinationSmallName] = useState<'도착지 선택' | string>('-');
    const [destinationSmallId, setDestinationSmallId] = useState<number | null>(null);
    const [departureHour, setDepartureHour] = useState<number>(0);
    const [departureMinute, setDepartureMinute] = useState<number>(0);
    const [messageLength, setMessageLength] = useState<number>(0);
    const [placeLength, setPlaceLength] = useState<number>(0);
    const [message, setMessage] = useState<string>('');
    const dispatch = useAppDispatch();
    const fastGaldaeStartPopupRef = useRef<FastGaldaeStartPopupRef>(null);
    const fastGaldaeEndPopupRef = useRef<FastGaldaeEndPopupRef>(null);
    const fastGaldaeTimePopupRef = useRef<FastGaldaeTimePopupRef>(null);
    const [participating, setParticipating] = useState<boolean>(false);
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [editable, setEditable] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState<string>('');
    const [marketName, setMarketName] = useState<string>('');
    const [placeName, setPlaceName] = useState<string>('');
    const postType = [
        {
            name: '한식',
            code: 'KOREAN',
        },
        {
            name: '양식',
            code: 'WESTERN',
        },
        {
            name: '중식',
            code: 'CHINESE',
        },
        {
            name: '일식',
            code: 'JAPANESE',
        },
        {
            name: '패스트푸드',
            code: 'FAST_FOOD',
        },
        {
            name: '분식',
            code: 'SOUP',
        },
        {
            name: '디저트',
            code: 'DESSERT',
        },
        {
            name: '기타',
            code: 'ETC',
        },
    ];
    const passengerNumberHandler = (type: string) => {
        if (type === 'PLUS' && passengerNumber < 4) {
            setPassengerNumber(passengerNumber + 1);
        } else if (type === 'MINUS' && passengerNumber > 2) {
            setPassengerNumber(passengerNumber - 1);
        }
    };

    // ✅ 갈대 생성 API 호출 함수
    const handleCreateGaldaeConfirm = async () => {
        if (departureLargeName === '출발지 선택' || departureSmallName === '출발지 선택' || destinationLargeName === '도착지 선택' || destinationSmallName === '도착지 선택') {
            Alert.alert('식당이름 또는 주문 장소를 제대로 선택해주세요!');
            return;
        }
        if (departureLargeId === null || departureSmallId === null || destinationLargeId === null || destinationSmallId === null) {
            Alert.alert('식당이름 또는 주문 장소를 다시 선택해주세요!');
            return;
        }
        if (formatDepartureDateTime() === '출발 시간 선택') {
            Alert.alert('주문 시간을 선택해주세요!');
            return;
        }


        // 출발 일시를 Asia/Seoul 타임존의 ISO 8601 형식으로 변환
        const formattedDepartureTime = getFormattedDepartureTime();
        // 출발 시간을 moment 객체로 변환하여 현재 시간과 비교
        const departureMoment = moment(formattedDepartureTime.replace(/Z$/, ''));
        //console.log(` departureMoment:
        // ${departureMoment}`);
        if (departureMoment.isBefore(moment())) {
            Alert.alert('알림', '현재 시간보다 이후의 주문 시간을 선택해주세요!');
            return;
        }
        setLoading(true);
        const postData: CreatePostRequest = {
            majorDepartureId: departureLargeId,
            subDepartureId: departureSmallId,
            majorArrivalId: destinationLargeId,
            subArrivalId: destinationSmallId,
            departureTime: formattedDepartureTime,
            passengerType: selectedGender === 1 ? 'SAME' : 'DONT_CARE',
            arrangeTime: selectedTimeDiscuss === 0 ? 'POSSIBLE' : 'IMPOSSIBLE',
            passengerCount: passengerNumber,
            isFavoriteRoute: selectedChannel,
        };

        // console.log('🚀 서버로 보낼 갈대 생성 데이터:', postData);

        try {
            const response = await createPost(postData); // 서버에서 postId 반환
            // console.log('✅ 생성된 갈대 postId:', response.postId);
            dispatch(fetchMyGaldaeHistory());
            dispatch(fetchMyCreatedGaldae());
            dispatch(fetchHomeGaldaePosts());
            dispatch(fetchFrequentRoutes());
            const params: GetPostsRequest = {
                pageNumber: 0,
                pageSize: 20,
                direction: 'DESC',
                properties: ['create_at'],
            };
            dispatch(fetchGaldaePosts(params));

            if (response.postId) {
                // 상세 페이지로 이동하면서 postId 전달
                //navigation.replace('NowGaldaeDetail', { postId: response.postId });
                setParticipating(true);
            }
        } catch (error) {
            // console.error('❌ 갈대 생성 실패:', error);
        } finally {
            setLoading(false);
        }
    };
    const toggleFastGaldaeStartPopup = () => {
        fastGaldaeStartPopupRef.current?.open();
    };

    const toggleFastGaldaeEndPopup = () => {
        fastGaldaeEndPopupRef.current?.open();
    };

    const toggleFastGaldaeTimePopup = () => {
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
        setDepartureHour(amPm === '오후' && hour < 12 ? hour + 12 : amPm === '오전' && hour === 12 ? 0 : hour);
        setDepartureMinute(minute);
    };

    // 출발일시 문자열 포맷 함수
    const formatDepartureDateTime = () => {
        if (!departureDate) {
            // const now = moment();
            // const formattedDate = now.format('YYYY년 M월 D일 (ddd)');
            // const hour = now.hour();
            // const minute = now.minute();
            // const amPm = hour < 12 ? '오전' : '오후';
            // let hour12 = hour % 12;
            // if (hour12 === 0) {
            //   hour12 = 12;
            // }
            // const formattedTime = `${amPm} ${hour12} : ${minute < 10 ? '0' + minute : minute}`;
            return '주문 시간 선택';
        }
        const dateObj = moment(departureDate, 'YYYY-MM-DD');
        const formattedDate = dateObj.format('YYYY년 M월 D일 (ddd)');
        const formattedTime = `${departureHour === 0 ? '00' : departureHour} : ${departureMinute < 10 ? '0' + departureMinute : departureMinute}`;
        return `${formattedDate} ${formattedTime}`;
    };
    const getFormattedDepartureTime = (): string => {
        if (!departureDate) {
            return '주문 시간 선택';
        }

        // 12시간 -> 24시간 변환
        let hour24 = departureHour;
        if (departureAmPm === '오후' && departureHour < 12) {
            hour24 += 12;
        } else if (departureAmPm === '오전' && departureHour === 12) {
            hour24 = 0;
        }

        // 선택한 날짜와 시간 정보를 Asia/Seoul 타임존의 moment 객체로 생성
        const selectedMoment = moment.utc(departureDate).set({
            hour: hour24,
            minute: departureMinute,
            second: 0,
            millisecond: 0,
        });
        return selectedMoment.toISOString(); // UTC 기준 ISO 문자열 반환
    };
    const handleSwitch = () => {
        setDepartureLargeName(destinationLargeName);
        setDepartureSmallName(destinationSmallName);
        setDepartureSmallId(destinationSmallId);
        setDepartureLargeId(destinationLargeId);

        setDestinationLargeId(departureLargeId);
        setDestinationSmallId(departureSmallId);
        setDestinationLargeName(departureLargeName);
        setDestinationSmallName(departureSmallName);
    };
    const isFormValid =
        departureLargeId !== null &&
        departureSmallId !== null &&
        destinationLargeId !== null &&
        destinationSmallId !== null &&
        departureDate !== null;
    return (
        <View>
            <Header
                style={styles.header}
                leftButton={<SVGButton iconName="arrow_left_line2" onPress={goBack} />}
                title={<BasicText text="배달비 N빵 생성" style={styles.mainTitle} />}
            />
            <ScrollView>
                <View style={styles.container}>
                    <BasicText style={styles.title} text="배달 음식 선택" />
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

                                <BasicText
                                    text={
                                        selectedType
                                            ? postType.find((type) => type.code === selectedType)?.name || '종류 선택'
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
                                    {postType.map((type) => (
                                        <TouchableOpacity
                                            key={type.code}
                                            style={styles.bankDropdownItem}
                                            onPress={() => {
                                                setSelectedType(type.code);
                                                setDropdownVisible(false);
                                                setEditable(true);
                                            }}
                                        >
                                            <BasicText text={type.name} style={styles.bankDropdownText} />
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                    </View>

                    <TextInput
                        style={styles.priceInput}
                        value={marketName}
                        onChangeText={setMarketName}
                        placeholder="식당 이름을 작성해 주세요. ex)맥도날드 서울역점"
                        placeholderTextColor={theme.colors.blackV3}
                        keyboardType="default"
                        numberOfLines={1}
                        multiline={false}
                        maxLength={50}
                    />

                    <BasicText style={styles.title} text="주문 시간" />
                    <TouchableOpacity onPress={toggleFastGaldaeTimePopup}>
                        <View style={styles.timeBox}>
                            <BasicText text={formatDepartureDateTime()} style={styles.timeText} />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.messageWrapper}>
                        <BasicText style={styles.personText} text="주문 장소" />
                        <BasicText text={`(${placeLength}/8)`} style={styles.personSubText} />
                    </View>
                    <TextInput
                        style={styles.placeInput}
                        value={placeName}
                        onChangeText={setPlaceName}
                        onChange={(e) => setPlaceLength(e.nativeEvent.text.length)}
                        maxLength={8}
                        multiline={false}
                        placeholder={`배달을 나눌 장소를 작성해 주세요. ex) 중앙도서관 로비`}
                        placeholderTextColor={theme.colors.blackV3}
                    />

                    <BasicText style={styles.title} text="추가 정보 설정" />
                    {/* <BasicText style={styles.subTitle} text="동승자 성별을 선택해주세요." />
                    <View style={styles.buttonWrapper}>
                        <SelectTextButton
                            text="성별무관"
                            selected={selectedGender === 0}
                            buttonStyle={styles.selectBtn}
                            textStyle={styles.selectText}
                            onPress={() => setSelectedGender(0)}
                            unselectedColors={{
                                backgroundColor: theme.colors.grayV3,
                                textColor: theme.colors.grayV0,
                            }}
                        />
                        <SelectTextButton
                            text="동성만"
                            selected={selectedGender === 1}
                            buttonStyle={styles.selectBtn}
                            textStyle={styles.selectText}
                            onPress={() => setSelectedGender(1)}
                            unselectedColors={{
                                backgroundColor: theme.colors.grayV3,
                                textColor: theme.colors.grayV0,
                            }}
                        />
                    </View> */}
                    <BasicText style={styles.subTitle} text="시간 협의 가능 여부를 선택해주세요." />
                    <View style={styles.buttonWrapper}>
                        <SelectTextButton
                            text="가능"
                            selected={selectedTimeDiscuss === 0}
                            buttonStyle={styles.selectBtn}
                            textStyle={styles.selectText}
                            onPress={() => setSelectedTimeDiscuss(0)}
                            unselectedColors={{
                                backgroundColor: theme.colors.grayV3,
                                textColor: theme.colors.grayV0,
                            }}
                        />
                        <SelectTextButton
                            text="불가능"
                            selected={selectedTimeDiscuss === 1}
                            buttonStyle={styles.selectBtn}
                            textStyle={styles.selectText}
                            onPress={() => setSelectedTimeDiscuss(1)}
                            unselectedColors={{
                                backgroundColor: theme.colors.grayV3,
                                textColor: theme.colors.grayV0,
                            }}
                        />
                    </View>
                    <BasicText text="*최대 인원" style={styles.warnText} />
                    <View style={styles.personWrapper}>
                        <View style={styles.personBox}>
                            <BasicText text="모집 인원" style={styles.personText} />
                            <BasicText text="(본인포함)" style={styles.personSubText} />
                        </View>
                        <View style={styles.personBox}>
                            <SVGButton
                                onPress={() => passengerNumberHandler('MINUS')}
                                iconName="Minus"
                                buttonStyle={styles.plusBtn}
                                SVGStyle={styles.plusIcon}
                            />
                            <BasicText text={passengerNumber.toString()} style={styles.numberText} />
                            <SVGButton
                                onPress={() => passengerNumberHandler('PLUS')}
                                iconName="Plus"
                                buttonStyle={styles.plusBtn}
                                SVGStyle={styles.plusIcon}
                            />
                        </View>
                    </View>
                    {/* <TouchableOpacity onPress={() => setSelectedChannel(!selectedChannel)}>
            <View style={selectedChannel ? { ...styles.oftenBox, borderColor: theme.colors.Galdae } : styles.oftenBox}>
              <SVG name={selectedChannel ? 'CheckSelected' : 'Check'} width={18} height={18} style={styles.checkBtn} />
              <BasicText text="자주가는 경로로 등록하기" style={selectedChannel ? { ...styles.checkText, color: theme.colors.blackV0 } : styles.checkText} />
            </View>
          </TouchableOpacity> */}
                    <View style={styles.messageWrapper}>
                        <BasicText style={styles.personText} text="빵장의 한마디" />
                        <BasicText text={`(${messageLength}/200)`} style={styles.personSubText} />
                    </View>
                    <TextInput
                        style={styles.messageInput}
                        value={message}
                        onChangeText={setMessage}
                        onChange={(e) => setMessageLength(e.nativeEvent.text.length)}
                        maxLength={200}
                        multiline={true}
                        placeholder={`규칙이나 결제 방식을 알려주세요! \nex) 주문 화면을 보내주면 등록된 계좌로 돈을 송금해 \n주세요`}
                        placeholderTextColor={theme.colors.blackV3}
                    />
                    <BasicButton
                        text="생성하기"
                        buttonStyle={styles.generateButton}
                        textStyle={styles.generateText}
                        loading={loading}
                        disabled={!isFormValid} // 🔒 조건 미충족 시 비활성화
                        onPress={handleCreateGaldaeConfirm}
                        disabledColors={{
                            backgroundColor: theme.colors.grayV2,
                            textColor: theme.colors.grayV0,
                        }}
                    />
                </View>
            </ScrollView>

            <Portal>
                <FastGaldaeStartPopup
                    ref={fastGaldaeStartPopupRef}
                    onConfirm={(largeName, largeId, smallName, smallId) => {
                        setDepartureLargeName(largeName);
                        setDepartureLargeId(largeId);
                        setDepartureSmallName(smallName);
                        setDepartureSmallId(smallId);
                    }}
                    selectedStartPlaceId={destinationSmallId} // ✅ 출발지에서 선택한 소분류 ID 전달
                //onClose={() => console.log('팝업 닫힘')}
                />
            </Portal>

            <Portal>
                <FastGaldaeEndPopup
                    ref={fastGaldaeEndPopupRef}
                    onConfirm={(largeName, largeId, smallName, smallId) => {
                        setDestinationLargeName(largeName);
                        setDestinationLargeId(largeId);
                        setDestinationSmallName(smallName);
                        setDestinationSmallId(smallId);
                    }}
                    selectedStartPlaceId={departureSmallId} // ✅ 출발지에서 선택한 소분류 ID 전달
                //onClose={() => console.log('팝업 닫힘')}
                />
            </Portal>

            <Portal>
                <FastGaldaeTimePopup
                    ref={fastGaldaeTimePopupRef}
                    onConfirm={handleTimePopupConfirm}
                //onClose={() => console.log('팝업 닫힘')}
                />
            </Portal>
            {participating && (
                <ParticipateModal
                    title="생성 완료"
                    visible={participating}
                    onCancel={() => setParticipating(false)}
                    onConfirm={() => navigation.navigate('DeliveryNDivide')}
                    fromMajor={departureLargeName}
                    fromSub={departureSmallName}
                    toMajor={destinationLargeName}
                    toSub={destinationSmallName}
                />
            )}
        </View>
    );
};

export default CreateDelivery;
