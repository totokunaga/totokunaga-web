import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { slicerNames } from "@utils/slices/slicerNames";
import { RootState } from "@utils/slices/store";
import { OAuthProvider } from "@utils/types";

type AuthSliceProp = {
  isAuth: boolean;
  accessToken?: string;
  username?: string;
  oauthProvider?: string;
  avatorImagePath?: string;
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
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setOAuthProvider: (state, action: PayloadAction<OAuthProvider>) => {
      const value = action.payload;
      state.oauthProvider = value.charAt(0).toUpperCase() + value.slice(1);
    },
    setAvatorImagePath: (state, action: PayloadAction<string>) => {
      state.avatorImagePath = action.payload;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    resetAuth: () => authSliceInitState,
  },
});

export const {
  setAuth,
  setAccessToken,
  setAvatorImagePath,
  setUsername,
  setOAuthProvider,
  resetAuth,
} = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
