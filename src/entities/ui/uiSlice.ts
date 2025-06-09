import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  isEditorVisible: boolean;
  isSeriesShiftVisible: boolean;
}

const initialState: UiState = {
  isEditorVisible: false,
  isSeriesShiftVisible: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleEditor: (state) => {
      state.isEditorVisible = !state.isEditorVisible;
      if (state.isEditorVisible) {
        state.isSeriesShiftVisible = false;
      }
    },
    toggleSeriesShift: (state) => {
      state.isSeriesShiftVisible = !state.isSeriesShiftVisible;
      if (state.isSeriesShiftVisible) {
        state.isEditorVisible = false;
      }
    },
  },
});

export const { toggleEditor, toggleSeriesShift } = uiSlice.actions;
export default uiSlice.reducer;
