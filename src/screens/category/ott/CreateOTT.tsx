/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
// CreateGaldae.tsx
import React, { useState, useEffect } from 'react';
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

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '../../../modules/redux/store';
import { createSubscribeGroup } from '../../../modules/redux/slice/subScribeSlice';

import ParticipateModal from '../../../components/popup/ParticipateModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules/redux/RootReducer';
import { fetchSubscribeTypeService } from '../../../modules/redux/slice/subScribeSlice';
// 내비게이션 스택 타입 정의
type RootStackParamList = {
    CreateOTT: undefined;
    NowGaldae: undefined;
    OTTNDivide: undefined;
    TaxiNDivide: undefined;
    ChatRoom: { chatroomId: number };
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
    const [passengerNumber, setPassengerNumber] = useState<number>(2);
    const [chatroomId, setChatroomId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [messageLength, setMessageLength] = useState<number>(0);
    const [message, setMessage] = useState<string>('');
    const dispatch = useAppDispatch();
    const [participating, setParticipating] = useState<boolean>(false);
    // ✅ 기존 selector 2개를 없애고 단일 소스만 가져온다
    //    (slice 이름이 subscribeSlice인지 확인. 예시는 그대로 사용)
    const typeService = useSelector((state: RootState) => state.subscribeSlice.typeService);
    const [etcService, setEtcService] = useState<string>('');
    // ✅ 드롭다운에서 재사용하기 위한 단순 옵션 타입
    type SimpleOption = { code: string; name: string };

    /** ✨ postType: 종류 드롭다운용 (subscribeType만 추출) */
    const postType: SimpleOption[] = React.useMemo(() => {
        // subscribeType이 { code, name } 구조라고 가정
        return (typeService ?? []).map(item => ({
            code: item.subscribeType,
            name: item.subscribeType,
        }));
    }, [typeService]);

    /** ✨ postService: 서비스(대학) 드롭다운용
     *  - selectedType(= subscribeType.code)에 해당하는 subscribeServiceTypeList 매핑
     *  - 대학 항목을 { code, name }로 변환하여 UI와 맞춘다
     */
    const postService: SimpleOption[] = React.useMemo(() => {
        if (!selectedType) {return [];}
        const matched = (typeService ?? []).find(
            item => item.subscribeType === selectedType
        );
        if (!matched) { return []; }
        console.log('🚀 matched:', matched);
        return matched.subscribeServiceTypeList.map(u => ({
            code: String(u.id),
            name: u.subscribeServiceTypeName,
        }));
    }, [typeService, selectedType]);

    /** 🔧 UX: 종류가 바뀌면 서비스 선택을 초기화 */
    React.useEffect(() => {
        setSelectedService('');
    }, [selectedType]);

    useEffect(() => {
        console.log('🚀 typeService:', typeService);
        dispatch(fetchSubscribeTypeService());
    }, []);

    const passengerNumberHandler = (type: string) => {
        if (type === 'PLUS' && passengerNumber < 4) {
            setPassengerNumber(passengerNumber + 1);
        } else if (type === 'MINUS' && passengerNumber > 2) {
            setPassengerNumber(passengerNumber - 1);
        }
    };

    // ✅ 갈대 생성 API 호출 함수
    const handleCreateGaldaeConfirm = async () => {
        const response = await dispatch(createSubscribeGroup({
            subscribeType: selectedType,
            subscribeServiceId: parseInt(selectedService ? selectedService : '0'),
            etcService: etcService,
            onePersonFee: price,
            totalPersonCount: passengerNumber,
            content: message,
        })).unwrap();
        setChatroomId(response.chatroomId);
        setParticipating(true);
    };

    const handleNavigateChatRoom = async (roomId: number) => {
        navigation.replace('ChatRoom', { chatroomId: roomId });
        setParticipating(false);
    };


    const isFormValid =
        selectedType !== '' &&
        (selectedType === '기타' || selectedService !== '') &&
        price !== '' &&
        messageLength !== 0;
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
                        {
                            selectedType === "기타" ? (
                                <TextInput
                                    style={styles.bankPickerButton}
                                    value={etcService}
                                    onChangeText={(text) => {
                                        setEtcService(text);
                                    }}
                                    placeholder="직접 입력해 주세요."
                                    placeholderTextColor={theme.colors.blackV3}
                                />
                            ) : (
                                <>
                                    <TouchableOpacity
                                        style={styles.bankPickerButton}
                                        onPress={() => {
                                            if (!selectedType) {
                                                Alert.alert('안내', '먼저 종류를 선택해 주세요.');
                                                return;
                                            }
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
                                    )}</>
                            )
                        }
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

            {participating && (
                <ParticipateModal
                    title="생성 완료"
                    visible={participating}
                    subTitle={selectedService === 'NETFLIX' ? '넷플릭스' : selectedService === 'TIVING' ? '티빙' : selectedService === 'DISNEY' ? '디즈니' : selectedService === 'WATCHA' ? '왓챠' : selectedService === 'WAVE' ? '웨이브' : selectedService === 'LAPTEAL' ? '라프텔' : '직접입력'}
                    onCancel={() => { navigation.replace('OTTNDivide'); setParticipating(false); }}
                    onConfirm={() => handleNavigateChatRoom(chatroomId || 0)} //구독 채팅방으로 이동해야함
                />
            )}
        </View>
    );
};

export default CreateOTT;
