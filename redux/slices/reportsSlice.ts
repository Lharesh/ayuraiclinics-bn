import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface ReportFilters {
  reportType: 'appointments' | 'revenue';
  timeRange: string;
  startDate?: string;
  endDate?: string;
}

export interface AppointmentReport {
  time: string;
  clientName: string;
  mobile: string;
  reason: string;
}

export interface RevenueReport {
  time: string;
  clientName: string;
  doctor: string;
  amount: number;
  reason: string;
}

interface ReportsState {
  filters: ReportFilters;
  appointments: AppointmentReport[];
  revenue: RevenueReport[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ReportsState = {
  filters: {
    reportType: 'appointments',
    timeRange: 'today',
  },
  appointments: [],
  revenue: [],
  isLoading: false,
  error: null,
};

const MOCK_APPOINTMENTS: AppointmentReport[] = [
  { time: '09:00', clientName: 'John Smith', mobile: '+1234567890', reason: 'Consultation' },
  { time: '10:30', clientName: 'Sarah Johnson', mobile: '+1234567891', reason: 'Follow-up' },
];

const MOCK_REVENUE: RevenueReport[] = [
  { time: '09:00', clientName: 'John Smith', doctor: 'Dr. Sharma', amount: 1200, reason: 'Consultation' },
  { time: '10:30', clientName: 'Sarah Johnson', doctor: 'Dr. Patel', amount: 2500, reason: 'Treatment' },
];

// Async mock fetch for demo
export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async (filters: ReportFilters) => {
    await new Promise((res) => setTimeout(res, 300));
    return {
      reportType: filters.reportType,
      data: filters.reportType === 'appointments' ? MOCK_APPOINTMENTS : MOCK_REVENUE,
    };
  }
);

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReportFilters(state, action: PayloadAction<ReportFilters>) {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.reportType === 'appointments') {
          state.appointments = action.payload.data;
        } else {
          state.revenue = action.payload.data;
        }
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch report';
      });
  },
});

export const { setReportFilters } = reportsSlice.actions;
export default reportsSlice.reducer;