import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { slicerNames } from "@utils/slices/slicerNames";
import { RootState } from "@utils/slices/store";

type AuthSliceProp = {
  accessToken?: string;
  avatorImagePath?: string;
  isAuth: boolean;
};

export const authSliceInitState: AuthSliceProp = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: slicerNames.auth,
  initialState: authSliceInitState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setAvatorImagePath: (state, action: PayloadAction<string>) => {
      state.avatorImagePath = action.payload;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setAuth, setAccessToken, setAvatorImagePath } =
  authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
