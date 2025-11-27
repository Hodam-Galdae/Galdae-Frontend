import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
  StyleProp,
  Platform,
  Vibration,
  LogBox,
} from 'react-native';
import styles from '../styles/TimePicker.style';
import moment from 'moment';

// VirtualizedLists 중첩 경고 억제
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews',
]);

type AmPm = '오전' | '오후';

export interface WheelTimePickerProps {
  /** 초기값(없으면 현재 시각의 다음 step으로 자동 세팅) */
  initial?: { ampm: AmPm; hour12: number; minute: number };
  /** 분 간격(step). 기본 15 (예: 0, 15, 30, 45) */
  minuteStep?: 1 | 5 | 10 | 15 | 20 | 30;
  /** 오늘 선택 강제. true면 현재 시간 이전은 자동 보정 */
  isToday?: boolean;
  /** 선택 변경 콜백(24h, 12h 모두 제공) */
  onChange?: (payload: {
    ampm: AmPm;
    hour12: number;
    hour24: number;
    minute: number;
    dateTime: Date; // 오늘 날짜 기준의 Date
  }) => void;
  /** invalid(현재 이전) 시 호출 */
  onInvalidSelect?: (picked: { ampm: AmPm; hour24: number; minute: number }) => void;
  /** 스타일 래퍼 */
  style?: StyleProp<ViewStyle>;
  /** 선택행 높이(px). 기본 44 */
  itemHeight?: number;
  /** Haptic(진동) 사용 여부. 기본 true(안드로이드만 Vibration) */
  haptics?: boolean;
}

/** 가운데 선택 행 스타일을 위한 오버레이 높이 == itemHeight */
const DEFAULT_ITEM_HEIGHT = 52;

const HOURS_12 = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
const AMPM: AmPm[] = ['오전', '오후'];

function to24h(ampm: AmPm, hour12: number) {
  const h = hour12 % 12; // 12 -> 0
  return ampm === '오전' ? h : h + 12;
}

function from24h(hour24: number): { ampm: AmPm; hour12: number } {
  const ampm: AmPm = hour24 < 12 ? '오전' : '오후';
  const h = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return { ampm, hour12: h };
}

function roundMinuteToStep(min: number, step: number) {
  return Math.min(59, Math.ceil(min / step) * step) % 60;
}

export default function TimePicker({
  initial,
  minuteStep = 15,
  isToday = false,
  onChange,
  onInvalidSelect,
  style,
  itemHeight = DEFAULT_ITEM_HEIGHT,
  haptics = true,
}: WheelTimePickerProps) {
  // ---------- 데이터 소스 ----------
  const minutes = useMemo(() => {
    const arr: number[] = [];
    for (let m = 0; m < 60; m += minuteStep) {arr.push(m);}
    return arr;
  }, [minuteStep]);

  // ---------- 선택 인덱스 상태 ----------
  const [ampmIndex, setAmPmIndex] = useState(0); // 0: 오전, 1: 오후
  const [hourIndex, setHourIndex] = useState(0); // HOURS_12 인덱스
  const [minuteIndex, setMinuteIndex] = useState(0); // minutes 인덱스

  // 리스트 참조
  const ampmRef = useRef<FlatList>(null);
  const hourRef = useRef<FlatList>(null);
  const minuteRef = useRef<FlatList>(null);

  // ---------- 초기 선택 세팅 ----------
  useEffect(() => {
    const now = moment();
    // 초기값 없으면 현재 시각의 "다음 step"으로
    const base = (() => {
      if (initial) {return initial;}
      let nextMinute = roundMinuteToStep(now.minute(), minuteStep);
      let h24 = now.hour();
      if (nextMinute === 0 && now.minute() > 0) {
        // 올림 결과가 60이 되어서 0으로 돌아왔으면 시간 +1
        h24 += 1;
      }
      const { ampm, hour12 } = from24h(h24 % 24);
      return { ampm, hour12, minute: nextMinute };
    })();

    const idxAm = AMPM.findIndex(a => a === base.ampm);
    const idxHour = HOURS_12.findIndex(h => h === base.hour12);
    const idxMin = Math.max(0, minutes.findIndex(m => m === base.minute));

    setAmPmIndex(idxAm < 0 ? 0 : idxAm);
    setHourIndex(idxHour < 0 ? 0 : idxHour);
    setMinuteIndex(idxMin < 0 ? 0 : idxMin);

    // 초기 스크롤 위치 세팅
    requestAnimationFrame(() => {
      ampmRef.current?.scrollToOffset({ offset: (idxAm < 0 ? 0 : idxAm) * itemHeight, animated: false });
      hourRef.current?.scrollToOffset({ offset: (idxHour < 0 ? 0 : idxHour) * itemHeight, animated: false });
      minuteRef.current?.scrollToOffset({ offset: (idxMin < 0 ? 0 : idxMin) * itemHeight, animated: false });
    });

    // 초기 콜백
    const h24 = to24h(base.ampm, base.hour12);
    const dateTime = moment().startOf('day').set({ hour: h24, minute: base.minute, second: 0, millisecond: 0 });
    onChange?.({
      ampm: base.ampm,
      hour12: base.hour12,
      hour24: h24,
      minute: base.minute,
      dateTime: dateTime.toDate(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minuteStep]);

  // ---------- 헬퍼: 인덱스 -> 값 ----------
  const picked = useMemo(() => {
    const ampm = AMPM[ampmIndex] ?? '오전';
    const hour12 = HOURS_12[hourIndex] ?? 12;
    const minute = minutes[minuteIndex] ?? 0;
    const hour24 = to24h(ampm, hour12);
    const dateTime = moment().startOf('day').set({ hour: hour24, minute, second: 0, millisecond: 0 });
    return { ampm, hour12, hour24, minute, dateTime };
  }, [ampmIndex, hourIndex, minuteIndex, minutes]);

  // 타입 정의를 위한 타입 별칭
  type PickedTime = typeof picked;

  // ---------- 유효성 검사/보정 ----------
  const ensureValidIfToday = useCallback(
    (next: typeof picked): PickedTime => {
      if (!isToday) {return next;}
      const now = moment();
      if (next.dateTime.isBefore(now)) {
        // 다음 유효 슬롯을 찾는다: 분을 step만큼 올리며 today & now 이상이 될 때까지
        let m = next.minute;
        let h = next.hour24;
        const advance = () => {
          m += minuteStep;
          if (m >= 60) {
            m = 0;
            h = (h + 1) % 24;
          }
        };
        let guard = 0;
        let test = moment().startOf('day').set({ hour: h, minute: m, second: 0, millisecond: 0 });
        while (test.isBefore(now) && guard < 200) {
          advance();
          test = moment().startOf('day').set({ hour: h, minute: m, second: 0, millisecond: 0 });
          guard++;
        }
        const { ampm, hour12 } = from24h(h);
        return {
          ampm,
          hour12: hour12 as typeof HOURS_12[number],
          hour24: h,
          minute: m,
          dateTime: test,
        };
      }
      return next;
    },
    [isToday, minuteStep]
  );

  const scrollToPicked = useCallback((next: PickedTime) => {
    const idxAm = AMPM.findIndex(a => a === next.ampm);
    const idxHour = HOURS_12.findIndex(h => h === next.hour12);
    const idxMin = minutes.findIndex(m => m === next.minute);

    if (idxAm >= 0) {
      setAmPmIndex(idxAm);
      ampmRef.current?.scrollToOffset({ offset: idxAm * itemHeight, animated: true });
    }
    if (idxHour >= 0) {
      setHourIndex(idxHour);
      hourRef.current?.scrollToOffset({ offset: idxHour * itemHeight, animated: true });
    }
    if (idxMin >= 0) {
      setMinuteIndex(idxMin);
      minuteRef.current?.scrollToOffset({ offset: idxMin * itemHeight, animated: true });
    }
  }, [minutes, itemHeight]);

  const commitChange = useCallback(
    (next: PickedTime, cameFromInvalid: boolean) => {
      onChange?.({
        ampm: next.ampm,
        hour12: next.hour12,
        hour24: next.hour24,
        minute: next.minute,
        dateTime: next.dateTime.toDate(),
      });
      if (cameFromInvalid) {onInvalidSelect?.({ ampm: picked.ampm, hour24: picked.hour24, minute: picked.minute });}
      if (haptics && Platform.OS === 'android') {
        Vibration.vibrate(10);
      }
    },
    [onChange, onInvalidSelect, picked, haptics]
  );

  // ---------- 공통 onMomentumScrollEnd ----------
  const onEnd = (kind: 'ampm' | 'hour' | 'minute') =>
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y;
      const idx = Math.round(y / itemHeight);

      if (kind === 'ampm') {setAmPmIndex(Math.max(0, Math.min(AMPM.length - 1, idx)));}
      if (kind === 'hour') {setHourIndex(Math.max(0, Math.min(HOURS_12.length - 1, idx)));}
      if (kind === 'minute') {setMinuteIndex(Math.max(0, Math.min(minutes.length - 1, idx)));}
    };

  // 인덱스가 확정될 때마다 유효성 검사 + 필요 시 보정 스크롤
  useEffect(() => {
    const valid = ensureValidIfToday(picked);
    const wasInvalid = valid !== picked;
    if (wasInvalid) {
      scrollToPicked(valid);
      commitChange(valid, true);
    } else {
      commitChange(picked, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ampmIndex, hourIndex, minuteIndex]);

  // ---------- 렌더 ----------
  const renderItem = useCallback(
    ({ item, index, kind }: { item: string; index: number; kind: 'ampm' | 'hour' | 'minute' }) => {
      const selected =
        (kind === 'ampm' && index === ampmIndex) ||
        (kind === 'hour' && index === hourIndex) ||
        (kind === 'minute' && index === minuteIndex);

      return (
        <View style={[styles.item, { height: itemHeight }]}>
          <Text style={[styles.itemText, selected && styles.itemTextSelected]}>{item}</Text>
        </View>
      );
    },
    [ampmIndex, hourIndex, minuteIndex, itemHeight]
  );

  return (
    <View style={[styles.container, style]}>
      {/* 가운데 선택 라인(오버레이) */}
      <View pointerEvents="none" style={[styles.centerOverlay, { height: itemHeight }]}>
        <View style={styles.centerBorder} />
      </View>

      {/* AM/PM */}
      <FlatList
        ref={ampmRef}
        style={styles.column}
        data={AMPM}
        keyExtractor={(v) => v}
        renderItem={({ item, index }) => renderItem({ item, index, kind: 'ampm' })}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        onMomentumScrollEnd={onEnd('ampm')}
        getItemLayout={(_, index) => ({ length: itemHeight, offset: itemHeight * index, index })}
        contentContainerStyle={{ paddingVertical: itemHeight * 2 }}
        nestedScrollEnabled={true}
      />

      {/* 시 */}
      <FlatList
        ref={hourRef}
        style={styles.column}
        data={HOURS_12 as unknown as number[]}
        keyExtractor={(v) => `h-${v}`}
        renderItem={({ item, index }) => renderItem({ item: String(item), index, kind: 'hour' })}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        onMomentumScrollEnd={onEnd('hour')}
        getItemLayout={(_, index) => ({ length: itemHeight, offset: itemHeight * index, index })}
        contentContainerStyle={{ paddingVertical: itemHeight * 2 }}
        nestedScrollEnabled={true}
      />

      {/* 분 */}
      <FlatList
        ref={minuteRef}
        style={styles.column}
        data={minutes}
        keyExtractor={(v) => `m-${v}`}
        renderItem={({ item, index }) => renderItem({ item: String(item).padStart(2, '0'), index, kind: 'minute' })}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        onMomentumScrollEnd={onEnd('minute')}
        getItemLayout={(_, index) => ({ length: itemHeight, offset: itemHeight * index, index })}
        contentContainerStyle={{ paddingVertical: itemHeight * 2 }}
        nestedScrollEnabled={true}
      />
    </View>
  );
}
