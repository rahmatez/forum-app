import { asyncReceiveUsers } from "../users/action";
import { asyncReceiveThreads } from "../threads/action";

const asyncPopulateUsersAndThreads = () => async (dispatch) => {
  await dispatch(asyncReceiveUsers());
  await dispatch(asyncReceiveThreads());
};

export { asyncPopulateUsersAndThreads };
