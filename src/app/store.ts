// Redux store 설정
import { configureStore } from '@reduxjs/toolkit';
import chartReducer from '../entities/chart/chartSlice';
import uiReducer from '../entities/ui/uiSlice';
import legendReducer from '../entities/legend/legendSlice';
import boxPlotReducer from '../entities/boxplot/boxSlice';

export const store = configureStore({
  reducer: {
    chart: chartReducer,
    ui: uiReducer,
    legend: legendReducer,
    boxplot: boxPlotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
