import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authUser: null,
  isLoading: false,
  error: null,
  registerSuccess: false,
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setAuthUserActionCreator: (state, action) => {
      state.authUser = action.payload.authUser;
    },
    unsetAuthUserActionCreator: (state) => {
      state.authUser = null;
    },
    setAuthUserLoadingActionCreator: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
    setAuthUserErrorActionCreator: (state, action) => {
      state.error = action.payload.error;
    },
    setRegisterSuccessActionCreator: (state, action) => {
      state.registerSuccess = action.payload.success;
    },
  },
});

const {
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  setAuthUserLoadingActionCreator,
  setAuthUserErrorActionCreator,
  setRegisterSuccessActionCreator,
} = authUserSlice.actions;

export {
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  setAuthUserLoadingActionCreator,
  setAuthUserErrorActionCreator,
  setRegisterSuccessActionCreator,
};

export default authUserSlice.reducer;
