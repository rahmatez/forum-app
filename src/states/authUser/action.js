import {
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  setAuthUserLoadingActionCreator,
  setAuthUserErrorActionCreator,
  setRegisterSuccessActionCreator,
} from "./reducer";
import { login, register, getOwnProfile, putToken, deleteToken } from "../../utils/api";

const asyncSetAuthUser =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(setAuthUserLoadingActionCreator({ isLoading: true }));
    dispatch(setAuthUserErrorActionCreator({ error: null }));

    try {
      const token = await login({ email, password });
      putToken(token);

      const authUser = await getOwnProfile();
      dispatch(setAuthUserActionCreator({ authUser }));
    } catch (error) {
      dispatch(setAuthUserErrorActionCreator({ error: error.message }));
    }

    dispatch(setAuthUserLoadingActionCreator({ isLoading: false }));
  };

const asyncUnsetAuthUser = () => (dispatch) => {
  deleteToken();
  dispatch(unsetAuthUserActionCreator());
};

const asyncPreloadProcess = () => async (dispatch) => {
  try {
    const authUser = await getOwnProfile();
    dispatch(setAuthUserActionCreator({ authUser }));
  } catch (error) {
    dispatch(unsetAuthUserActionCreator());
  }
};

const asyncRegisterUser = 
  ({ name, email, password }) => 
  async (dispatch) => {
    dispatch(setAuthUserLoadingActionCreator({ isLoading: true }));
    dispatch(setAuthUserErrorActionCreator({ error: null }));

    try {
      await register({ name, email, password });
      dispatch(setRegisterSuccessActionCreator({ success: true }));
      return true;
    } catch (error) {
      dispatch(setAuthUserErrorActionCreator({ error: error.message }));
      return false;
    } finally {
      dispatch(setAuthUserLoadingActionCreator({ isLoading: false }));
    }
  };

export {
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncPreloadProcess,
  asyncRegisterUser,
};
