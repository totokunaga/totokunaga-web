import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pathfinding } from "@utils/types";
import { slicerNames } from "@utils/slices/slicerNames";
import { RootState } from "@utils/slices/store";
import { ClearableCellType } from "@utils/types";

type pathfindingControllerSliceProp = {
  clearableCells: Record<ClearableCellType, boolean>;
  clearExecuted: boolean;
  algorithm: Pathfinding;
  algorithmSpeed: number;
  algorithmExecuted: boolean;
};

export const pathfindingControllerSliceInitState: pathfindingControllerSliceProp =
  {
    clearableCells: {
      Blocked: false,
      Visited: true,
      Path: true,
    },
    clearExecuted: false,
    algorithm: "BFS",
    algorithmSpeed: 1,
    algorithmExecuted: false,
  };

export const pathfindingControllerSlice = createSlice({
  name: slicerNames.pathfindingController,
  initialState: pathfindingControllerSliceInitState,
  reducers: {
    setClearableCells: (
      state,
      action: PayloadAction<Record<ClearableCellType, boolean>>
    ) => {
      state.clearableCells = action.payload;
    },
    setClearExecuted: (state, action: PayloadAction<boolean>) => {
      state.clearExecuted = action.payload;
    },
    setPathfindingAlgorithm: (state, action: PayloadAction<Pathfinding>) => {
      state.algorithm = action.payload;
    },
    setPathfindingAlgorithmSpeed: (state, action: PayloadAction<number>) => {
      state.algorithmSpeed = action.payload;
    },
    setPathfindingAlgorithmExecuted: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.algorithmExecuted = action.payload;
    },
  },
});

export const {
  setClearableCells,
  setClearExecuted,
  setPathfindingAlgorithm,
  setPathfindingAlgorithmSpeed,
  setPathfindingAlgorithmExecuted,
} = pathfindingControllerSlice.actions;
export const selectPathfindingController = (state: RootState) =>
  state.pathfindingController;

export default pathfindingControllerSlice.reducer;
