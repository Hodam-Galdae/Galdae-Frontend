import React from 'react';
import { View } from 'react-native';
import BasicText from './BasicText';
import styles from '../styles/DateSeparator.style';
import moment from 'moment';

type DateSeparatorProps = {
  date: string;
};

const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => {
  const formatDate = (dateString: string) => {
    const today = moment();
    const targetDate = moment.utc(dateString);

    // 오늘이면
    if (today.isSame(targetDate, 'day')) {
      return '오늘';
    }

    // 어제면
    if (today.subtract(1, 'day').isSame(targetDate, 'day')) {
      return '어제';
    }

    // 올해면 월/일만 표시
    if (today.year() === targetDate.year()) {
      return targetDate.format('M월 D일');
    }

    // 다른 연도면 년/월/일 표시
    return targetDate.format('YYYY년 M월 D일');
  };

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <BasicText text={formatDate(date)} style={styles.dateText} />
      <View style={styles.line} />
    </View>
  );
};

export default DateSeparator;
