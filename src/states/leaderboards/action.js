import {
  receiveLeaderboardsActionCreator,
  setLeaderboardsLoadingActionCreator,
  setLeaderboardsErrorActionCreator,
} from "./reducer";
import { getLeaderboards } from "../../utils/api";

const asyncReceiveLeaderboards = () => async (dispatch) => {
  dispatch(setLeaderboardsLoadingActionCreator({ isLoading: true }));
  dispatch(setLeaderboardsErrorActionCreator({ error: null }));

  try {
    const leaderboards = await getLeaderboards();
    dispatch(receiveLeaderboardsActionCreator({ leaderboards }));
  } catch (error) {
    dispatch(setLeaderboardsErrorActionCreator({ error: error.message }));
  }

  dispatch(setLeaderboardsLoadingActionCreator({ isLoading: false }));
};

export { receiveLeaderboardsActionCreator, asyncReceiveLeaderboards };
