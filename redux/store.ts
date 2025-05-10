import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import clinicReducer from './slices/clinicSlice';
import configReducer from './slices/configSlice';
import appointmentsReducer from './slices/appointmentsSlice';
import clientsReducer from './slices/clientsSlice';
import setupReducer from './slices/setupSlice';
import reportsReducer from './slices/reportsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clinic: clinicReducer,
    config: configReducer,
    appointments: appointmentsReducer,
    clients: clientsReducer,
    setup: setupReducer,
    reports: reportsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;