// components/Date.tsx
import React from 'react';
import {  Text, TouchableOpacity,View } from 'react-native';
import moment, { Moment } from 'moment';
import styles from '../styles/Calendar.style';

import 'moment/locale/ko'; // 한글 로케일을 불러옵니다.
import { theme } from '../styles/theme';
moment.locale('ko'); // 전역 locale을 한글로 설정

interface DateProps {
  date: Moment;
  onSelectDate: (date: string) => void;
  selected: string | null;
}

const DateComponent: React.FC<DateProps> = ({ date, onSelectDate, selected }) => {
  // 날짜를 'YYYY-MM-DD' 포맷으로 변환하여 비교합니다.
  const formattedDate = date.format('YYYY-MM-DD');
  const dayLabel =
    formattedDate === moment().format('YYYY-MM-DD')
      ? '오늘'
      : date.format('ddd'); // 오늘이면 '오늘', 아니면 요일 (예: Mon, Tue)
  const dayNumber = date.format('D'); // 일(day) 숫자
// 일요일이면 date.day()가 0입니다.
const isSunday = date.day() === 0;
  return (
    <TouchableOpacity
      onPress={() => onSelectDate(formattedDate)}
      style={[
        styles.card,
      ]}
    >
      <Text style={[styles.big,isSunday && { color: theme.colors.red }]}>
        {dayLabel}
      </Text>

      <View style={[styles.circle, selected === formattedDate && styles.clickedCircle]}>
        <Text
          style={[
            styles.medium,isSunday && { color: theme.colors.red },
            selected === formattedDate && styles.clickedDate,
          ]}
        >
          {dayNumber}
        </Text>
      </View>

    </TouchableOpacity>
  );
};

export default DateComponent;

