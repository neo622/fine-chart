import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { generateBoxPlotData, generateBoxPlotData2 } from '../../shared/utils/MockData';

const boxPlotData: any = generateBoxPlotData();
const boxPlotData2: any = generateBoxPlotData2();

const initialState: any = {
  series: [
    {
      data: boxPlotData,
      type: 'box-plot',
      yName: 'Employee Salaries',
      xKey: 'department',
      minKey: 'min',
      q1Key: 'q1',
      medianKey: 'median',
      q3Key: 'q3',
      maxKey: 'max',
    },
    {
      data: boxPlotData2,
      type: 'box-plot',
      yName: 'Employee Salaries ggg',
      xKey: 'department',
      minKey: 'min',
      q1Key: 'q1',
      medianKey: 'median',
      q3Key: 'q3',
      maxKey: 'max',
    },
  ],
};

const boxPlotSlice = createSlice({
  name: 'boxplot',
  initialState,
  reducers: {
    updateBoxPlotData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { updateBoxPlotData } = boxPlotSlice.actions;
export default boxPlotSlice.reducer;
