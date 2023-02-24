import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { slicerNames } from "@utils/slices/slicerNames";
import { RootState } from "@utils/slices/store";

type AuthSliceProp = {
  accessToken?: string;
};

export const authSliceInitState: AuthSliceProp = {};

export const authSlice = createSlice({
  name: slicerNames.auth,
  initialState: authSliceInitState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
