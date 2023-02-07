import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { slicerNames } from "@utils/slices/slicerNames";
import { RootState } from "@utils/slices/store";
import { SortingAlgorithm } from "@utils/types";

type sortingControllerSliceProp = {
  algorithm: SortingAlgorithm;
  algorithmSpeed: number;
  algorithmExecuted: boolean;
  randomizeExecuted: boolean;
  numberOfBars: number;
};

export const sortingControllerSliceInitState: sortingControllerSliceProp = {
  algorithm: "Quicksort",
  algorithmSpeed: 1,
  algorithmExecuted: false,
  randomizeExecuted: false,
  numberOfBars: 7,
};

export const sortingControllerSlice = createSlice({
  name: slicerNames.pathfindingController,
  initialState: sortingControllerSliceInitState,
  reducers: {
    setSortindingAlgorithm: (
      state,
      action: PayloadAction<SortingAlgorithm>
    ) => {
      state.algorithm = action.payload;
    },
    setSortingAlgorithmSpeed: (state, action: PayloadAction<number>) => {
      state.algorithmSpeed = action.payload;
    },
    setSortingAlgorithmExecuted: (state, action: PayloadAction<boolean>) => {
      state.algorithmExecuted = action.payload;
    },
    setBarRandamized: (state, action: PayloadAction<boolean>) => {
      state.randomizeExecuted = action.payload;
    },
    setNumberOfBars: (state, action: PayloadAction<number>) => {
      state.numberOfBars = action.payload;
    },
  },
});

export const {
  setSortindingAlgorithm,
  setSortingAlgorithmSpeed,
  setSortingAlgorithmExecuted,
  setBarRandamized,
  setNumberOfBars,
} = sortingControllerSlice.actions;

export const selectSortindingController = (state: RootState) =>
  state.sortingController;

export default sortingControllerSlice.reducer;
