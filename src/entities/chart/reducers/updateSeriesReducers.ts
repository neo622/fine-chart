import type { PayloadAction } from '@reduxjs/toolkit';
import type { AgChartOptions } from 'ag-charts-community';
import type { WritableDraft } from 'immer';
export const updateSeriesReducer = (
  state: WritableDraft<AgChartOptions>,
  action: PayloadAction<{
    index: number;
    //@ts-ignore
    newSeries: Partial<AgChartOptions['series'][number]>;
  }>,
) => {
  const { index, newSeries } = action.payload;
  if (state.series && state.series[index]) {
    state.series[index] = {
      ...state.series[index],
      ...newSeries,
    };
  }
};
