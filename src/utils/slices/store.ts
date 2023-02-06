import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  timeoutSlice,
  gridSlice,
  windowSlice,
  pathfindingControllerSlice,
  sortingControllerSlice,
} from "./algorithms/pathfinding";
import globalSlice from "./globalSlice";

const rootReducer = combineReducers({
  global: globalSlice,
  timeout: timeoutSlice.reducer,
  grid: gridSlice.reducer,
  window: windowSlice.reducer,
  pathfindingController: pathfindingControllerSlice.reducer,
  sortingController: sortingControllerSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
