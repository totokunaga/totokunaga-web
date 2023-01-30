import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { timeoutSlice, gridSlice, windowSlice } from "./algorithms/pathfinding";

const rootReducer = combineReducers({
  timeout: timeoutSlice.reducer,
  grid: gridSlice.reducer,
  window: windowSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
