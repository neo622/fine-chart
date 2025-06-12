import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { generateTestData } from '../../shared/utils/MockData';
import type { AgCartesianChartOptions, AgChartOptions } from 'ag-charts-enterprise';
import type { ChartData } from './types';

interface ChartState {
  chartOptions: AgCartesianChartOptions;
  deletedValue: { [key: string]: any };
  originData: any[];
}

const traceChartData: ChartData = generateTestData(); //API 로직 타기

const initialState: ChartState = {
  chartOptions: {
    // width: 1000,
    // height: 400,
    navigator: {
      enabled: true,
    },
    data: [],
    series: [],
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
        keys: ['TM_Bara_Press_read', 'LL2_N2Flow_Switch_Monitor'],
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
      // position: 'bottom',
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
    annotations: {
      enabled: true,
      axesButtons: {
        axes: 'xy',
        enabled: false,
      },
      toolbar: {
        buttons: [],
      },
      optionsToolbar: {
        enabled: false,
      },
    },
    initialState: {
      annotations: [],
    },
  },
  deletedValue: {},
  originData: [],
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    loadLineChart: (state, action: PayloadAction<{ data: ChartData; series: any }>) => {
      state.chartOptions.data = action.payload.data;
      state.chartOptions.series = action.payload.series;
      state.originData = action.payload.data;
    },
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
    updateTooltip: (state, action: PayloadAction<any>) => {
      if (!state.chartOptions.initialState) {
        state.chartOptions.initialState = {};
      }
      state.chartOptions.initialState.annotations = action.payload;
    },
    toggleAnnotation: (state) => {
      const currentEnabled = state.chartOptions.annotations?.axesButtons?.enabled;
      state.chartOptions.annotations = {
        enabled: true,
        axesButtons: {
          axes: 'xy',
          enabled: !currentEnabled,
        },
        toolbar: !currentEnabled
          ? {
              buttons: [
                {
                  icon: 'horizontal-line-drawing',
                  value: 'line-menu',
                },
                {
                  icon: 'delete',
                  value: 'clear',
                },
              ],
            }
          : {
              buttons: [],
            },
      };
    },
  },
});

export const {
  loadLineChart,
  updateSeries,
  updateAxis,
  updateData,
  updateDeletedValue,
  updateTooltip,
  toggleAnnotation,
} = chartSlice.actions;
export default chartSlice.reducer;
