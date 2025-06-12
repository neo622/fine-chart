import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isLoading: boolean;
  isEditorVisible: boolean;
  isSeriesShiftVisible: boolean;
  isBoxPlotVisible: boolean;
  isWtwChartVisible: boolean;
}

const initialState: UiState = {
  isLoading: true,
  isEditorVisible: false,
  isSeriesShiftVisible: false,
  isBoxPlotVisible: false,
  isWtwChartVisible: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleEditor: (state) => {
      state.isEditorVisible = !state.isEditorVisible;
      if (state.isEditorVisible) {
        state.isSeriesShiftVisible = false;
        state.isBoxPlotVisible = false;
      }
    },
    toggleSeriesShift: (state) => {
      state.isSeriesShiftVisible = !state.isSeriesShiftVisible;
      if (state.isSeriesShiftVisible) {
        state.isEditorVisible = false;
        state.isBoxPlotVisible = false;
      }
    },
    toggleBoxPlot: (state) => {
      state.isBoxPlotVisible = !state.isBoxPlotVisible;
    },
    toggleWtwChart: (state) => {
      state.isWtwChartVisible = !state.isWtwChartVisible;
    },
  },
});

export const { toggleEditor, toggleSeriesShift, toggleBoxPlot, toggleLoading, toggleWtwChart } =
  uiSlice.actions;
export default uiSlice.reducer;
