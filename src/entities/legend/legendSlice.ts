import { createSlice } from '@reduxjs/toolkit';

interface LegendValueType {
  equipment: boolean;
  lotid: boolean;
  module: boolean;
  recipe: boolean;
  parameter: boolean;
  wafer: boolean;
}

interface LegendStateType {
  isVisible: boolean;
  position: 'Bottom' | 'Top' | 'Left' | 'Right';
  value: LegendValueType;
}

const initialState: LegendStateType = {
  isVisible: true,
  position: 'Bottom',
  value: {
    equipment: true,
    lotid: true,
    module: true,
    recipe: true,
    parameter: true,
    wafer: true,
  },
};

const legendSlice = createSlice({
  name: 'legned',
  initialState,
  reducers: {
    toggleShowLegend: (state) => {
      state.isVisible = !state.isVisible;
    },
    updateLegedPosition: (state, action) => {
      const { newPosition } = action.payload;
      state.position = newPosition;
    },
    updateLegendValue: (state, action) => {
      const { newValue } = action.payload;
      state.value = newValue;
    },
  },
});

export const { toggleShowLegend, updateLegedPosition, updateLegendValue } = legendSlice.actions;
export default legendSlice.reducer;
