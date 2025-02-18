import React, { forwardRef, useImperativeHandle, useRef,useState } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import BasicText from '../BasicText';
import { theme } from '../../styles/theme';
import styles from '../../styles/FastGaldaePopup.style';
import BasicButton from '../button/BasicButton';
import Calendar from '../Calendar';
import SelectTextButton from '../button/SelectTextButton';
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

          <View style={styles.timePicker}>
            <View style={styles.amPm}>
              <SelectTextButton
                text="오전"
                selected={selectedAmPm === '오전'}
                unselectedColors={{ textColor: theme.colors.black }}
                buttonStyle={styles.amPmBtn}
                textStyle={styles.amPmText}
                onPress={() => setSelectedAmPm('오전')}
              />
              <SelectTextButton
                text="오후"
                selected={selectedAmPm === '오후'}
                unselectedColors={{ textColor: theme.colors.black }}
                buttonStyle={styles.amPmBtn}
                textStyle={styles.amPmText}
                onPress={() => setSelectedAmPm('오후')}
              />
            </View>
            {/* 시간 선택 컴포넌트 추가 */}
            <TimePicker
              onTimeChange={(hour, minute) => {
                setSelectedHour(hour);
                setSelectedMinute(minute);
              }}
            />
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


export default FastGaldaeTimePopup;
