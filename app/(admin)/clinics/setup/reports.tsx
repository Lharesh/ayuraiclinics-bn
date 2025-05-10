import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchReports } from '@/redux/slices/reportsSlice';
import { Card } from '@/components/ui/Card';
import { Picker } from '@/components/ui/Picker';
import { ReportTable } from '@/components/ui/ReportTable';
import { Toast } from '@/components/ui/Toast';
import { COLORS } from '@/constants/theme';
import { Download, FileText } from 'lucide-react-native';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
import dayjs from 'dayjs';

const REPORT_TYPES = [
  { label: 'Appointments', value: 'appointments' },
  { label: 'Revenue', value: 'revenue' },
];

const TIME_RANGE_OPTIONS = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'This Week', value: 'this_week' },
  { label: 'This Month', value: 'this_month' },
  { label: 'Current Quarter', value: 'current_quarter' },
  { label: 'Financial Year', value: 'financial_year' },
  { label: 'Custom Range', value: 'custom' },
];

export default function ReportsScreen() {
  const dispatch = useAppDispatch();
  const { filters, appointments, revenue, isLoading } = useAppSelector((state) => state.reports);

  const [timeRange, setTimeRange] = useState(filters.timeRange);
  const [reportType, setReportType] = useState(filters.reportType);
  const [dateRange, setDateRange] = useState({
    startDate: dayjs(),
    endDate: dayjs().add(3, 'day'),
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    dispatch(fetchReports({
      reportType,
      timeRange,
      startDate: dateRange.startDate.format('YYYY-MM-DD'),
      endDate: dateRange.endDate.format('YYYY-MM-DD'),
    }));
  }, [reportType, timeRange, dateRange]);

  const handleExport = (format: 'csv' | 'pdf') => {
    setToastMessage(`Report exported as ${format.toUpperCase()}`);
    setShowToast(true);
  };

  const selectedData = reportType === 'appointments' ? appointments : revenue;
  const columns =
    reportType === 'appointments'
      ? [
          { key: 'time', title: 'Time' },
          { key: 'clientName', title: 'Client Name' },
          { key: 'mobile', title: 'Mobile' },
          { key: 'reason', title: 'Reason' },
        ]
      : [
          { key: 'time', title: 'Time' },
          { key: 'clientName', title: 'Client Name' },
          { key: 'doctor', title: 'Doctor' },
          { key: 'amount', title: 'Amount' },
          { key: 'reason', title: 'Reason' },
        ];

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.filtersCard}>
        <Picker
          label="Report Type"
          items={REPORT_TYPES}
          selectedValue={reportType}
          onValueChange={(value) => setReportType(value)}
        />
        <Picker
          label="Time Range"
          items={TIME_RANGE_OPTIONS}
          selectedValue={timeRange}
          onValueChange={(value) => setTimeRange(value)}
        />
        {timeRange === 'custom' && (
          <View style={{ marginTop: 16 }}>
            <DateRangePicker
              startDate={dateRange.startDate.toDate()}
              endDate={dateRange.endDate.toDate()}
              onStartChange={(date) => setDateRange((prev) => ({ ...prev, startDate: dayjs(date) }))}
              onEndChange={(date) => setDateRange((prev) => ({ ...prev, endDate: dayjs(date) }))}
            />
          </View>
        )}
      </Card>

      <Card style={styles.reportCard}>
        <View style={styles.reportHeader}>
          <Text style={styles.reportTitle}>{reportType === 'appointments' ? 'Appointments' : 'Revenue'} Report</Text>
          <View style={styles.iconsRow}>
            <Download size={20} color={COLORS.vata[600]} onPress={() => handleExport('csv')} />
            <FileText size={20} color={COLORS.pitta[600]} onPress={() => handleExport('pdf')} style={{ marginLeft: 12 }} />
          </View>
        </View>
        <ReportTable columns={columns} data={selectedData} />
      </Card>

      <Toast
        visible={showToast}
        type="success"
        message={toastMessage}
        onDismiss={() => setShowToast(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.neutral[50],
  },
  filtersCard: {
    marginBottom: 16,
  },
  reportCard: {
    marginBottom: 16,
    padding: 12,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.neutral[900],
  },
  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
