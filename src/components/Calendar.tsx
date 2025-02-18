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

interface CalendarProps {
  onSelectDate: (date: string) => void;
  selected: string | null;
}

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
    const daysOffset = scrollPosition / 80; // 80픽셀마다 하루로 계산
    const month = moment(dates[0])
      .add(daysOffset, 'days')
      .format('YYYY년 M월'); // 년도와 월을 함께 포맷팅
    setCurrentMonth(month);
  }, [dates, scrollPosition]);

  useEffect(() => {
    getCurrentMonth();
  }, [getCurrentMonth]);

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

