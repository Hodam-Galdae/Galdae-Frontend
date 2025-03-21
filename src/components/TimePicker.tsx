import React, { useState,useEffect } from 'react';
import moment from 'moment';
import {
  StyleProp,
  ViewStyle,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from '../styles/TimePicker.style';
import SVG from './SVG';
import SVGTextButton from './button/SVGTextButton';
import { theme } from '../styles/theme';
import SelectTextButton from './button/SelectTextButton';
import DeletePopup from './popup/DeletePopup';

export interface TimePickerProps {
  onTimeChange?: (amPm: '오전' | '오후', hour: number, minute: number) => void;
  isToday?: boolean; // 오늘 날짜 여부. true이면 현재 시간 이전 선택 불가
   style?: StyleProp<ViewStyle>;
}

const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const minutes = [0, 15, 30, 45];

const TimePicker: React.FC<TimePickerProps> = ({ onTimeChange, isToday = false,style}) => {
  // AM/PM, 시, 분 상태를 관리
  const [selectedAmPm, setSelectedAmPm] = useState<'오전' | '오후'>('오전');
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [dropdownOpen, setDropdownOpen] = useState<'hour' | 'minute' | null>(null);
  const [invalidPopupVisible, setInvalidPopupVisible] = useState<boolean>(false);
  // 초기화: reset 값이 변경되거나 처음 렌더링 시 현재 시간(다음 15분 단위)으로 설정
  useEffect(() => {
    const now = moment();
    let nextMinute = Math.ceil(now.minute() / 15) * 15;
    let hour = now.hour();
    if (nextMinute >= 60) {
      nextMinute = 0;
      hour += 1;
    }
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    const amPm = hour < 12 ? '오전' : '오후';
    setSelectedHour(hour12);
    setSelectedMinute(nextMinute);
    setSelectedAmPm(amPm);
    onTimeChange && onTimeChange(amPm, hour12, nextMinute);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAmPm = (amPm: '오전' | '오후') => {
    const convertedHour = amPm === '오전' ? (selectedHour % 12) : ((selectedHour % 12) + 12);
    console.log(`
      ⭐️amPm: ${amPm}
      ⭐️convertedHour : ${convertedHour}
      `);
    if (isToday) {
      const now = moment();
      const chosenTime = moment().startOf('day').set({ hour: convertedHour, minute: selectedMinute, second: 0, millisecond: 0 });
      if (chosenTime.isBefore(now)) {
        setInvalidPopupVisible(true);
        return;
      }
    }
    setSelectedAmPm(amPm);
    setDropdownOpen(null);
    onTimeChange && onTimeChange(amPm, selectedHour, selectedMinute);
  };
  const handleSelectHour = (hour: number) => {
    // 12시간 값을 24시간 값으로 변환
    const convertedHour = selectedAmPm === '오전' ? (hour % 12) : ((hour % 12) + 12);
    console.log(`
      🌸amPm: ${hour}
      🌸convertedHour : ${convertedHour}
      `);
    if (isToday) {
      const now = moment();
      // 오늘 날짜의 시작을 기준으로 선택한 시간 설정 (날짜는 오늘)
      const chosenTime = moment().startOf('day').set({ hour: convertedHour, minute: selectedMinute, second: 0, millisecond: 0 });
      if (chosenTime.isBefore(now)) {
        setInvalidPopupVisible(true);
        return;
      }
    }
    setSelectedHour(hour);
    setDropdownOpen(null);
    onTimeChange && onTimeChange(selectedAmPm, hour, selectedMinute);
  };


const handleSelectMinute = (minute: number) => {
  const convertedHour = selectedAmPm === '오전' ? (selectedHour % 12) : ((selectedHour % 12) + 12);
  console.log(`
    🐤amPm: ${minute}
    🐤convertedHour : ${convertedHour}
    `);
  if (isToday) {
    const now = moment();
    const chosenTime = moment().startOf('day').set({ hour: convertedHour, minute, second: 0, millisecond: 0 });
    if (chosenTime.isBefore(now)) {
      setInvalidPopupVisible(true);
      return;
    }
  }
  setSelectedMinute(minute);
  setDropdownOpen(null);
  onTimeChange && onTimeChange(selectedAmPm, selectedHour, minute);
};

  return (
   <View style={style}>
    <View style={styles.amPm}>
      <SelectTextButton
        text="오전"
        selected={selectedAmPm === '오전'}
        unselectedColors={{ textColor: theme.colors.black }}
        buttonStyle={styles.amPmBtn}
        textStyle={styles.amPmText}
        onPress={() => handleSelectAmPm('오전')}
      />
      <SelectTextButton
        text="오후"
        selected={selectedAmPm === '오후'}
        unselectedColors={{ textColor: theme.colors.black }}
        buttonStyle={styles.amPmBtn}
        textStyle={styles.amPmText}
        onPress={() => handleSelectAmPm('오후')}
      />
    </View>

    <View style={styles.container}>

      {/* 시간 선택 영역 */}
      <View style={styles.pickContainer}>
        <SVGTextButton
          style={styles.pickBtn}
          iconName={dropdownOpen === 'hour' ? 'up_line' : 'down_line'}
          text={selectedHour.toString()}
          iconPosition="right"
          SVGStyle={styles.upDownIcon}
          onPress={() => setDropdownOpen(dropdownOpen === 'hour' ? null : 'hour')}
          enabledColors={{
            backgroundColor: theme.colors.white,
            textColor: theme.colors.black,
            borderColor: theme.colors.lightGray,
          }}
          buttonStyle={styles.pickerButton}
          textStyle={styles.pickerButtonText}
        />
        {dropdownOpen === 'hour' && (
          <View style={styles.dropdownMenu}>
            <ScrollView>
              {hours.map((hour) => (
                <TouchableOpacity
                  key={hour.toString()}
                  onPress={() => handleSelectHour(hour)}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownItemText}>{hour}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      <SVG name="Separate" style={styles.separate} />
      {/* 분 선택 영역 */}
      <View style={styles.pickContainer}>
        <SVGTextButton
          style={styles.pickBtn}
          SVGStyle={styles.upDownIcon}
          iconName={dropdownOpen === 'minute' ? 'up_line' : 'down_line'}
          text={selectedMinute.toString()}
          iconPosition="right"
          onPress={() => setDropdownOpen(dropdownOpen === 'minute' ? null : 'minute')}
          enabledColors={{
            backgroundColor: theme.colors.white,
            textColor: theme.colors.black,
            borderColor: theme.colors.lightGray,
          }}
          buttonStyle={styles.pickerButton}
          textStyle={styles.pickerButtonText}
        />
        {dropdownOpen === 'minute' && (
          <View style={styles.dropdownMenu}>
            <ScrollView>
              {minutes.map((min) => (
                <TouchableOpacity
                  key={min.toString()}
                  onPress={() => handleSelectMinute(min)}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownItemText}>{min}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </View>

    <DeletePopup
    visible={invalidPopupVisible}
    onCancel={() => setInvalidPopupVisible(false)}
    onConfirm={() => setInvalidPopupVisible(false)}
    title="현재 시간 이전 시간은"
    message="선택이 불가능 합니다."
    buttonText="확인"
    />

   </View>
  );
};

export default TimePicker;
