import {
  receiveUsersActionCreator,
  setUsersLoadingActionCreator,
  setUsersErrorActionCreator,
} from "./reducer";
import { getAllUsers } from "../../utils/api";

const asyncReceiveUsers = () => async (dispatch) => {
  dispatch(setUsersLoadingActionCreator({ isLoading: true }));
  dispatch(setUsersErrorActionCreator({ error: null }));

  try {
    const users = await getAllUsers();
    dispatch(receiveUsersActionCreator({ users }));
  } catch (error) {
    dispatch(setUsersErrorActionCreator({ error: error.message }));
  }

  dispatch(setUsersLoadingActionCreator({ isLoading: false }));
};

export { receiveUsersActionCreator, asyncReceiveUsers };
