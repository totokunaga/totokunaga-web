import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { slicerNames } from "@utils/slices/slicerNames";
import { RootState } from "@utils/slices/store";

type GridSliceProp = {
  grid: number[][];
};

export const gridSliceInitState: GridSliceProp = {
  grid: [],
};
export const gridSlice = createSlice({
  name: slicerNames.grid,
  initialState: gridSliceInitState,
  reducers: {
    setGridCell: (
      state,
      action: PayloadAction<{ coordinate: [number, number]; value: number }>
    ) => {
      const { coordinate, value } = action.payload;
      const [row, col] = coordinate;
      state.grid[row][col] = value;
    },
    setGrid: (state, action: PayloadAction<number[][]>) => {
      state.grid = action.payload;
    },
  },
});

export const { setGrid, setGridCell } = gridSlice.actions;
export const selectGrid = (state: RootState) => state.grid;

export default gridSlice.reducer;
