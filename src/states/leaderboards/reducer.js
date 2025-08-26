import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leaderboards: [],
  isLoading: false,
  error: null,
};

const leaderboardsSlice = createSlice({
  name: "leaderboards",
  initialState,
  reducers: {
    receiveLeaderboardsActionCreator: (state, action) => {
      state.leaderboards = action.payload.leaderboards;
    },
    setLeaderboardsLoadingActionCreator: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
    setLeaderboardsErrorActionCreator: (state, action) => {
      state.error = action.payload.error;
    },
  },
});

const {
  receiveLeaderboardsActionCreator,
  setLeaderboardsLoadingActionCreator,
  setLeaderboardsErrorActionCreator,
} = leaderboardsSlice.actions;

export {
  receiveLeaderboardsActionCreator,
  setLeaderboardsLoadingActionCreator,
  setLeaderboardsErrorActionCreator,
};

export default leaderboardsSlice.reducer;
