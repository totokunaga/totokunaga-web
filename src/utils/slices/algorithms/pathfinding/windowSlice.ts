import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { slicerNames } from "@utils/slices/slicerNames";
import { RootState } from "@utils/slices/store";
import { DeviceType } from "@utils/types";

type WindowSliceProp = {
  width: number;
  height: number;
  deviceType: DeviceType;
  isDarkMode: boolean;
};

export const windowSliceInitState: WindowSliceProp = {
  width: 0,
  height: 0,
  deviceType: "DESKTOP",
  isDarkMode: true,
};

export const windowSlice = createSlice({
  name: slicerNames.window,
  initialState: windowSliceInitState,
  reducers: {
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
      if (state.width <= 520) {
        state.deviceType = "SMARTPHONE";
      } else if (state.width <= 960) {
        state.deviceType = "TABLET";
      } else {
        state.deviceType = "DESKTOP";
      }
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setHeight, setWidth, setDarkMode } = windowSlice.actions;
export const selectWindow = (state: RootState) => state.window;

export default windowSlice.reducer;
