import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  isEditorVisible: boolean;
}

const initialState: UiState = {
  isEditorVisible: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleEditor: (state) => {
      state.isEditorVisible = !state.isEditorVisible;
    },
  },
});

export const { toggleEditor } = uiSlice.actions;
export default uiSlice.reducer;
