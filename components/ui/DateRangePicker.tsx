// components/ui/DateRangePicker.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '@/constants/theme';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onStartChange: (date: Date) => void;
  onEndChange: (date: Date) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.pickerGroup}>
        <Text style={styles.label}>Start Date</Text>
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) onStartChange(selectedDate);
          }}
        />
      </View>

      <View style={styles.pickerGroup}>
        <Text style={styles.label}>End Date</Text>
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) onEndChange(selectedDate);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  pickerGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: COLORS.neutral[700],
    marginBottom: 4,
    fontWeight: '500',
  },
});
