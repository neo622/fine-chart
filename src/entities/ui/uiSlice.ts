import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isLoading: boolean;
  isEditorVisible: boolean;
  isSeriesShiftVisible: boolean;
  isBoxPlotVisible: boolean;
}

const initialState: UiState = {
  isLoading: true,
  isEditorVisible: false,
  isSeriesShiftVisible: false,
  isBoxPlotVisible: false,
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
  },
});

export const { toggleLoading, toggleEditor, toggleSeriesShift, toggleBoxPlot } = uiSlice.actions;
export default uiSlice.reducer;
