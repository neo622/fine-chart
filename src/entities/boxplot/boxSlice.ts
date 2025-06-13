import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  series: [],
};

const boxPlotSlice = createSlice({
  name: 'boxplot',
  initialState,
  reducers: {
    loadBoxPlot: (state, action: PayloadAction<any>) => {
      state.series = action.payload;
    },
  },
});

export const { loadBoxPlot } = boxPlotSlice.actions;
export default boxPlotSlice.reducer;
