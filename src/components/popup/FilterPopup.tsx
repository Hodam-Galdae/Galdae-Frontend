import React, { forwardRef, useImperativeHandle, useRef,useState } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import BasicText from '../BasicText';
import { theme } from '../../styles/theme';
import styles from '../../styles/FastGaldaePopup.style';
import BasicButton from '../button/BasicButton';
import moment from 'moment';
import SVGButton from '../button/SVGButton';
import SelectTextButton from '../button/SelectTextButton';
import TimePicker from '../TimePicker';
export interface FastGaldaeTimePopupRef {
  open: () => void;
  close: () => void;
}

export interface FastGaldaePopupProps {
  onClose?: () => void;
  onConfirm?: (
    selectedDate: string,
    selectedAmPm: '오전' | '오후',
    selectedHour: number,
    selectedMinute: number,
    selectedGender: number,       // 0: 성별무관, 1: 여자, 2: 남자
    selectedTimeDiscuss: number,  // 0: 가능, 1: 불가능
    passengerNumber: number
  ) => void;
}

const FilterPopup = forwardRef<FastGaldaeTimePopupRef, FastGaldaePopupProps>(
  ({ onClose ,onConfirm}, ref) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedAmPm, setSelectedAmPm] = useState<'오전' | '오후'>('오전');
    const [selectedHour, setSelectedHour] = useState<number>(0);
    const [selectedMinute, setSelectedMinute] = useState<number>(0);
    const [selectedGender, setSelectedGender] = useState<number>(0);
    const [selectedTimeDiscuss, setSelectedTimeDiscuss] = useState<number>(0);
    const [passengerNumber, setPassengerNumber] = useState<number>(0);
    const modalizeRef = useRef<Modalize>(null);
    const passengerNumberHandler = (type: String) => {
        if(type === 'PLUS' && passengerNumber < 4){
          setPassengerNumber(passengerNumber + 1);
        }
        else if(type === 'MINUS' && passengerNumber > 0){
          setPassengerNumber(passengerNumber - 1);
        }
      };
    // 외부에서 open/close 함수를 사용할 수 있도록 함
    useImperativeHandle(ref, () => ({
      open: () => {
        modalizeRef.current?.open();
      },
      close: () => {
        modalizeRef.current?.close();
      },
    }));

    // 팝업이 열릴 때 기본값을 현재 시간(다음 15분 단위)으로 설정하는 onOpened 콜백
    const handleOnOpened = () => {
      const now = moment();
      let nextMinute = Math.ceil(now.minute() / 15) * 15;
      let hour = now.hour();
      if (nextMinute >= 60) {
        nextMinute = 0;
        hour += 1;
      }
      setSelectedDate(now.format('YYYY-MM-DD'));
      // setSelectedHour(hour);
      // setSelectedMinute(nextMinute);
      setSelectedAmPm(hour < 12 ? '오전' : '오후');



      console.log(hour ,nextMinute );
    };

    const handleSelectConfirm = () => {
        if (selectedDate) {
          onConfirm &&
            onConfirm(
              selectedDate,
              selectedAmPm,
              selectedHour,
              selectedMinute,
              selectedGender,
              selectedTimeDiscuss,
              passengerNumber
            );
        }
        modalizeRef.current?.close();
      };

    return (
      <Modalize
        ref={modalizeRef}
        modalHeight={586} // 고정 높이 설정
        onClosed={onClose}
        onOpened={handleOnOpened} // 팝업 열릴 때 기본값 자동 매핑
        overlayStyle={styles.background}
        modalStyle={styles.container}
        withHandle={false}  // 기본 핸들을 비활성화
        {...({ swipeToClose: true, swipeThreshold: 10 } as any)}
      >
        {/* 팝업 안쪽에 커스텀 핸들 추가 */}
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>

        <View style={styles.content}>
            <BasicText
              text="검색 조건 설정"
              fontSize={theme.fontSize.size20}
              color={theme.colors.black}
              style={styles.start}
            />
            <View style={styles.line} />

            <BasicText
              text="시간대"
              fontSize={theme.fontSize.size16}
              color={theme.colors.black}
              style={styles.time}
            />

            {/* 시간 선택 컴포넌트 추가 */}
            <TimePicker
                onTimeChange={(amPm, hour, minute) => {
                  setSelectedAmPm(amPm);
                  setSelectedHour(hour);
                  setSelectedMinute(minute);
                }}
                isToday={true}
            />

            <BasicText style={styles.selectGender} text="동승자 성별을 선택해주세요." fontSize={theme.fontSize.size16}/>
            <View style={styles.buttonWrapper}>
              <SelectTextButton
                text="성별무관"
                selected={selectedGender === 0}
                buttonStyle={styles.selectBtn}
                onPress={() => setSelectedGender(0)}
              />
              <SelectTextButton
                text="여자"
                selected={selectedGender === 1}
                buttonStyle={styles.selectBtn}
                onPress={() => setSelectedGender(1)}
              />
              <SelectTextButton
                text="남자"
                selected={selectedGender === 2}
                buttonStyle={styles.selectBtn}
                onPress={() => setSelectedGender(2)}
              />
            </View>
            <BasicText style={styles.selectTime} text="시간 협의 가능 여부를 선택해주세요." fontSize={theme.fontSize.size16}/>
            <View style={styles.buttonWrapper}>
              <SelectTextButton
                text="가능"
                selected={selectedTimeDiscuss === 0}
                buttonStyle={styles.selectBtn}
                onPress={() => setSelectedTimeDiscuss(0)}
              />
              <SelectTextButton
                text="불가능"
                selected={selectedTimeDiscuss === 1}
                buttonStyle={styles.selectBtn}
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
            <View style={styles.confirmBtnContainer}>
              <BasicButton
                text="완료"
                disabled={false}
                onPress={handleSelectConfirm}
                buttonStyle={styles.confirmButton}
                textStyle={styles.confirmText}
                enabledColors={{
                  backgroundColor: theme.colors.brandColor,
                  textColor: theme.colors.white,
                  borderColor:theme.colors.transparent,
                }}
                disabledColors={{
                  backgroundColor: theme.colors.lightGray,
                  textColor: theme.colors.black,
                  borderColor:theme.colors.transparent,
                }}
              />
            </View>
        </View>

      </Modalize>
    );
  }
);


export default FilterPopup;
