import { createSlice } from '@reduxjs/toolkit';

import { generateTestData } from '../../shared/utils/MockData';
import type { AgChartOptions } from 'ag-charts-community';

import { updateSeriesReducer } from './reducers/updateSeriesReducers';

const initialState: AgChartOptions = {
  data: generateTestData(), // 임시
  series: [
    // 임시
    {
      type: 'line',
      xKey: 'timestamp',
      yKey: 'series1',
      yName: '시리즈 1',
      stroke: '#2196F3',
      strokeWidth: 1,
      marker: { enabled: false },
    },
    {
      type: 'line',
      xKey: 'timestamp',
      yKey: 'series2',
      yName: '시리즈 2',
      stroke: '#4CAF50',
      strokeWidth: 1,
      marker: { enabled: false },
    },
    {
      type: 'line',
      xKey: 'timestamp',
      yKey: 'series3',
      yName: '시리즈 3',
      stroke: '#FFC107',
      strokeWidth: 1,
      marker: { enabled: false },
    },
  ],
  axes: [
    {
      type: 'time',
      position: 'bottom',
      label: {
        format: '%H:%M',
      },
    },
    {
      type: 'number',
      position: 'left',
    },
  ],
  legend: {
    enabled: true,
    position: 'bottom',
  },
  padding: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  },
  tooltip: {
    delay: 50,
  },
  animation: {
    enabled: false,
  },
  zoom: {
    enabled: true,
    enableAxisDragging: false,
    enablePanning: true,
    enableScrolling: false,
    enableSelecting: true,
    panKey: 'shift',
    axes: 'xy',
  },
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    updateAxis() {},
    updateSeries: updateSeriesReducer,
  },
});

export const { updateSeries } = chartSlice.actions;
export default chartSlice.reducer;
