import React, { forwardRef, useImperativeHandle, useRef,useState } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import BasicText from '../BasicText';
import { theme } from '../../styles/theme';
import styles from '../../styles/FastGaldaePopup.style';
import BasicButton from '../button/BasicButton';
import Calendar from '../Calendar';
import moment from 'moment';
import TimePicker from '../TimePicker';
export interface FastGaldaeTimePopupRef {
  open: () => void;
  close: () => void;
}

export interface FastGaldaePopupProps {
  onClose?: () => void;
  onConfirm?: (selectedDate: string, amPm: '오전' | '오후', hour: number, minute: number) => void;
}

const FastGaldaeTimePopup = forwardRef<FastGaldaeTimePopupRef, FastGaldaePopupProps>(
  ({ onClose ,onConfirm}, ref) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedAmPm, setSelectedAmPm] = useState<'오전' | '오후'>('오전');
    const [selectedHour, setSelectedHour] = useState<number>(0);
    const [selectedMinute, setSelectedMinute] = useState<number>(0);
    const modalizeRef = useRef<Modalize>(null);

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

    const handleSelectConfirm = () =>{
      // 선택한 날짜, 오전/오후, 시간 정보를 활용
      onConfirm && selectedDate && onConfirm(selectedDate, selectedAmPm, selectedHour, selectedMinute);
      console.log('날짜:', selectedDate);
      console.log('오전/오후:', selectedAmPm);
      console.log('시간:', selectedHour, '시', selectedMinute, '분');
      modalizeRef.current?.close();
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
            text="출발 일시"
            fontSize={theme.fontSize.size16}
            color={theme.colors.black}
            style={styles.start}
          />

          <View style={styles.datePicker}>
            <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
          </View>

          <BasicText
            text="시간 선택"
            fontSize={theme.fontSize.size16}
            color={theme.colors.black}
            style={styles.start}
          />

          {/* 시간 선택 컴포넌트 추가 */}
          <TimePicker
              onTimeChange={(amPm, hour, minute) => {
                setSelectedAmPm(amPm);
                setSelectedHour(hour);
                setSelectedMinute(minute);
              }}
              isToday={true}
              style={styles.timePicker}
            />

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


export default FastGaldaeTimePopup;
