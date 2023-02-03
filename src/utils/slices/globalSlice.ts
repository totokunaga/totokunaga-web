import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { slicerNames } from "@utils/slices/slicerNames";
import { RootState } from "@utils/slices/store";

type globalSliceProp = {
  resizeId: string;
};

export const globalSliceInitState: globalSliceProp = {
  resizeId: "",
};

export const globalSlice = createSlice({
  name: slicerNames.global,
  initialState: globalSliceInitState,
  reducers: {
    setResized: (state, action: PayloadAction<string>) => {
      state.resizeId = action.payload;
    },
  },
});

export const { setResized } = globalSlice.actions;
export const selectGlobal = (state: RootState) => state.global;

export default globalSlice.reducer;
