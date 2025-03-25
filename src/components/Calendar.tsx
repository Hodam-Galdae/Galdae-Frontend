import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import moment, { Moment } from 'moment';
import DateComponent from './Date';
import styles from '../styles/Calendar.style';
import { Dimensions } from 'react-native';
interface CalendarProps {
  onSelectDate: (date: string) => void;
  selected: string | null;
}

const screenWidth = Dimensions.get('window').width;

const Calendar: React.FC<CalendarProps> = ({ onSelectDate, selected }) => {
  const [dates, setDates] = useState<Moment[]>([]);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [currentMonth, setCurrentMonth] = useState<string>('');

  // 오늘부터 14일 간의 날짜 생성
  const getDates = (): void => {
    const _dates: Moment[] = [];
    for (let i = 0; i < 14; i++) {
      const date = moment().add(i, 'days');
      _dates.push(date);
    }
    setDates(_dates);
  };

  useEffect(() => {
    getDates();
  }, []);

  const getCurrentMonth = useCallback((): void => {
    if (dates.length === 0) {return;}

    const startIdx = Math.floor(scrollPosition / 80);
    const endIdx = startIdx + Math.ceil(screenWidth / 80);

    let current = dates[startIdx]?.month(); // 현재 월
    let displayMonth = dates[startIdx]?.format('YYYY년 M월') || '';

    for (let i = startIdx; i <= endIdx; i++) {
      const thisDate = dates[i];
      if (!thisDate) {continue;}

      if (thisDate.month() !== current) {
        displayMonth = thisDate.format('YYYY년 M월');
        break;
      }
    }

    setCurrentMonth(displayMonth);
  }, [dates, scrollPosition]);

  useEffect(() => {
    getCurrentMonth();
  }, [getCurrentMonth]);


// 📌 날짜 선택 시에도 currentMonth 업데이트
useEffect(() => {
  if (selected) {
    const selectedMoment = moment(selected);
    setCurrentMonth(selectedMoment.format('YYYY년 M월'));
  }
}, [selected]);

  return (
    <View>
      <View>
        <Text style={styles.title}>{currentMonth}</Text>
      </View>

      <View style={styles.dateSection}>
        <View style={styles.scroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
              setScrollPosition(e.nativeEvent.contentOffset.x)
            }
          >
            {dates.map((date, index) => (
              <DateComponent
                key={index.toString()}
                date={date}
                onSelectDate={onSelectDate}
                selected={selected}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Calendar;

