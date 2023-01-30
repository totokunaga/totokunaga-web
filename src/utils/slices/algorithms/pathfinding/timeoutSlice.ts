import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { slicerNames } from "@utils/slices/slicerNames";
import { RootState } from "@utils/slices/store";

export type TimeoutWaitlist = {
  duration: number;
  contents: Array<{
    id: NodeJS.Timeout;
    funcString: string;
  }>;
};
type TimeoutSliceProp = {
  waitlists: Array<TimeoutWaitlist>;
};

export const timeoutSliceInitState: TimeoutSliceProp = {
  waitlists: [],
};

export const timeoutSlice = createSlice({
  name: slicerNames.timeout,
  initialState: timeoutSliceInitState,
  reducers: {
    setTimeoutIds: (state, action: PayloadAction<TimeoutWaitlist[]>) => {
      state.waitlists = action.payload;
    },
  },
});

export const { setTimeoutIds } = timeoutSlice.actions;
export const selectTimeout = (state: RootState) => state.timeout;

export default timeoutSlice.reducer;
