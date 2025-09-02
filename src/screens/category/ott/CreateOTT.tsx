/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
// CreateGaldae.tsx
import React, { useState, useRef } from 'react';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import { TouchableOpacity, View, ScrollView, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../styles/CreateOTT.style';
import BasicText from '../../../components/BasicText';
import SVG from '../../../components/SVG';
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
    CreateOTT: undefined;
    NowGaldae: undefined;
    OTTNDivide: undefined;
    TaxiNDivide: undefined;
};

const CreateOTT: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const goBack = () => navigation.goBack();
    const [selectedService, setSelectedService] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [dropdownVisible2, setDropdownVisible2] = useState<boolean>(false);
    const [editable, setEditable] = useState<boolean>(false);
    const [price, setPrice] = useState<string>('');
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
    const [message, setMessage] = useState<string>('');
    const dispatch = useAppDispatch();
    const fastGaldaeStartPopupRef = useRef<FastGaldaeStartPopupRef>(null);
    const fastGaldaeEndPopupRef = useRef<FastGaldaeEndPopupRef>(null);
    const fastGaldaeTimePopupRef = useRef<FastGaldaeTimePopupRef>(null);
    const [participating, setParticipating] = useState<boolean>(false);
    const postType = [
        {
            name: 'OTT',
            code: 'OTT',
        },
        {
            name: '음악',
            code: 'MUSIC',
        },
        {
            name: '생산성',
            code: 'PRODUCTIVITY',
        },
        {
            name: '교육',
            code: 'EDUCATION',
        },
        {
            name: '멤버쉽',
            code: 'MEMBERSHIP',
        },
        {
            name: '기타',
            code: 'ETC',
        },
    ];
    const postService = [
        {
            name: '넷플릭스',
            code: 'NETFLIX',
        },

        {
            name: '티빙',
            code: 'TIVING',
        },
        {
            name: '디즈니',
            code: 'DISNEY',
        },
        {
            name: '왓챠',
            code: 'WATCHA',
        },
        {
            name: '웨이브',
            code: 'WAVE',
        },
        {
            name: '라프텔',
            code: 'LAPTEAL',
        },
        {
            name: '직접입력',
            code: 'DIRECT_INPUT',
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
        setParticipating(true);
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
            return '출발 시간 선택';
        }
        const dateObj = moment(departureDate, 'YYYY-MM-DD');
        const formattedDate = dateObj.format('YYYY년 M월 D일 (ddd)');
        const formattedTime = `${departureHour === 0 ? '00' : departureHour} : ${departureMinute < 10 ? '0' + departureMinute : departureMinute}`;
        return `${formattedDate} ${formattedTime}`;
    };
    const getFormattedDepartureTime = (): string => {
        if (!departureDate) {
            return '출발 시간 선택';
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
        selectedType !== '' &&
        selectedService !== '' &&
        price !== '' &&
        messageLength <= 200;
    return (
        <View>
            <Header
                style={styles.header}
                leftButton={<SVGButton iconName="arrow_left_line2" onPress={goBack} />}
                title={<BasicText text="구독료 N빵 생성" style={styles.mainTitle} />}
            />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <BasicText style={styles.title} text="구독 서비스 선택" />
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

                    <View style={styles.bankPickerContainer}>
                        <TouchableOpacity
                            style={styles.bankPickerButton}
                            onPress={() => {
                                setDropdownVisible2(!dropdownVisible2);
                                setEditable(false);
                            }
                            }
                        >
                            <View style={styles.bankSVGText}>

                                <BasicText
                                    text={
                                        selectedService
                                            ? postService.find((service) => service.code === selectedService)?.name || '서비스 선택'
                                            : '서비스 선택'
                                    }
                                    style={styles.bankPickerText}
                                />
                            </View>
                            <SVG
                                name={dropdownVisible2 ? 'up_line' : 'down_line'}
                                style={styles.bankPickerIcon}
                            />
                        </TouchableOpacity>
                        {dropdownVisible2 && (
                            <View style={styles.bankDropdown}>
                                <ScrollView>
                                    {postService.map((service) => (
                                        <TouchableOpacity
                                            key={service.code}
                                            style={styles.bankDropdownItem}
                                            onPress={() => {
                                                setSelectedService(service.code);
                                                setDropdownVisible2(false);
                                                setEditable(true);
                                            }}
                                        >
                                            <BasicText text={service.name} style={styles.bankDropdownText} />
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
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

                    <BasicText style={styles.title} text="1인 구독료 (월 기준)" />
                    <View style={styles.priceWrapper}>
                        <TextInput
                            style={styles.priceInput}
                            value={price ? parseInt(price).toLocaleString() : ''}
                            onChangeText={(text) => {
                                // 숫자만 입력 가능하도록 필터링하고 쉼표 제거
                                const numericValue = text.replace(/[^0-9]/g, '');
                                setPrice(numericValue);
                            }}
                            placeholder="구독료를 입력하세요"
                            placeholderTextColor={theme.colors.grayV2}
                            keyboardType="numeric"
                        />
                        <BasicText text="원" style={styles.priceText} />
                    </View>

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
                        placeholder={`규칙이나 결제 방식을 알려주세요! \nex) 매월 1일이 결제일입니다. 6개월 이상 함께 할 분 \n찾아요`}
                        placeholderTextColor={theme.colors.blackV3}
                    />
                    <View style={styles.generateButtonWrapper}>
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
                    subTitle={selectedService === 'NETFLIX' ? '넷플릭스' : selectedService === 'TIVING' ? '티빙' : selectedService === 'DISNEY' ? '디즈니' : selectedService === 'WATCHA' ? '왓챠' : selectedService === 'WAVE' ? '웨이브' : selectedService === 'LAPTEAL' ? '라프텔' : '직접입력'}
                    onCancel={() => { navigation.navigate('OTTNDivide'); setParticipating(false); }}
                    onConfirm={() => navigation.navigate('OTTNDivide')} //구독 채팅방으로 이동해야함
                />
            )}
        </View>
    );
};

export default CreateOTT;
