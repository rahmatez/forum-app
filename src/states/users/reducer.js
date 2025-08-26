import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    receiveUsersActionCreator: (state, action) => {
      state.users = action.payload.users;
    },
    setUsersLoadingActionCreator: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
    setUsersErrorActionCreator: (state, action) => {
      state.error = action.payload.error;
    },
  },
});

const {
  receiveUsersActionCreator,
  setUsersLoadingActionCreator,
  setUsersErrorActionCreator,
} = usersSlice.actions;

export {
  receiveUsersActionCreator,
  setUsersLoadingActionCreator,
  setUsersErrorActionCreator,
};

export default usersSlice.reducer;
