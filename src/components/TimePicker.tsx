// components/TimePicker.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from '../styles/TimePicker.style';
import SVG from './SVG';
import SVGTextButton from './button/SVGTextButton';
import { theme } from '../styles/theme';

interface TimePickerProps {
  onTimeChange?: (hour: number, minute: number) => void;
}

const hours = Array.from({ length: 13 }, (_, i) => i); // 0 ~ 12
const minutes = [0, 15, 30, 45];

const TimePicker: React.FC<TimePickerProps> = ({ onTimeChange }) => {
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [dropdownOpen, setDropdownOpen] = useState<'hour' | 'minute' | null>(null);

  const handleSelectHour = (hour: number) => {
    setSelectedHour(hour);
    setDropdownOpen(null);
    onTimeChange && onTimeChange(hour, selectedMinute);
  };

  const handleSelectMinute = (minute: number) => {
    setSelectedMinute(minute);
    setDropdownOpen(null);
    onTimeChange && onTimeChange(selectedHour, minute);
  };


  return (
    <View style={styles.container}>
        {/* 시간 선택 영역 */}
        <View style={styles.pickContainer}>
            <SVGTextButton
                style={styles.pickBtn}
                iconName={dropdownOpen === 'hour' ? 'up_line' : 'down_line' }
                text={selectedHour.toString()}
                iconPosition="right"
                SVGStyle={styles.upDownIcon}
                onPress={() =>
                    setDropdownOpen(dropdownOpen === 'hour' ? null : 'hour')
                }
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

        <SVG name="Separate" style={styles.separate}/>


        {/* 분 선택 영역 */}
        <View style={styles.pickContainer}>
            <SVGTextButton
                style={styles.pickBtn}
                SVGStyle={styles.upDownIcon}
                iconName={dropdownOpen === 'minute' ? 'up_line' : 'down_line' }
                text={selectedMinute.toString()}
                iconPosition="right"
                onPress={() =>
                    setDropdownOpen(dropdownOpen === 'minute' ? null : 'minute')
                }
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
  );
};


export default TimePicker;
