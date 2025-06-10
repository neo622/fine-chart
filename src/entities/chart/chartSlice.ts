import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { generateTestData } from '../../shared/utils/MockData';
import type { AgCartesianChartOptions, AgChartOptions } from 'ag-charts-community';

interface ChartState {
  chartOptions: AgCartesianChartOptions;
  deletedValue: { [key: string]: any };
  originData: any[];
}

const traceChartData: any[] = generateTestData(); //API 로직 타기

const initialState: ChartState = {
  chartOptions: {
    data: traceChartData,
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
        keys: ['series1', 'series2', 'series3'],
        min: undefined,
        max: undefined,
        interval: { step: undefined },
        label: { fontWeight: undefined, fontSize: undefined, color: undefined },
      },
      {
        type: 'number',
        position: 'right',
        keys: [],
        min: undefined,
        max: undefined,
        interval: { step: undefined },
        label: { fontWeight: undefined, fontSize: undefined, color: undefined },
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
  },
  deletedValue: {},
  originData: traceChartData,
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    updateAxis: (state, action: PayloadAction<any>) => {
      state.chartOptions.axes = action.payload;
    },
    updateSeries: (
      state,
      //AgChartOptions['series'][number] number에서 타입에러가 죽어라고 뜨는데 임시로 무시
      action: PayloadAction<{
        index: number;
        //@ts-ignore
        newSeries: Partial<AgChartOptions['series'][number]>;
      }>,
    ) => {
      const { index, newSeries } = action.payload;
      if (state.chartOptions.series && state.chartOptions.series[index]) {
        state.chartOptions.series[index] = {
          ...state.chartOptions.series[index],
          ...newSeries,
        };
      }
    },
    updateData: (state, action: PayloadAction<any>) => {
      state.chartOptions.data = action.payload;
    },
    updateDeletedValue: (state, action: PayloadAction<ChartState['deletedValue']>) => {
      state.deletedValue = action.payload;
    },
  },
});

export const { updateSeries, updateAxis, updateData, updateDeletedValue } = chartSlice.actions;
export default chartSlice.reducer;
