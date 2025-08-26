import {
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  setThreadsLoadingActionCreator,
  setThreadsErrorActionCreator,
} from "./reducer";
import {
  getAllThreads,
  createThread,
  upVoteThread,
  downVoteThread,
  neutralizeThreadVote,
} from "../../utils/api";

const asyncReceiveThreads = () => async (dispatch) => {
  dispatch(setThreadsLoadingActionCreator({ isLoading: true }));
  dispatch(setThreadsErrorActionCreator({ error: null }));

  try {
    const threads = await getAllThreads();
    dispatch(receiveThreadsActionCreator({ threads }));
  } catch (error) {
    dispatch(setThreadsErrorActionCreator({ error: error.message }));
  }

  dispatch(setThreadsLoadingActionCreator({ isLoading: false }));
};

const asyncAddThread =
  ({ title, body, category }) =>
  async (dispatch) => {
    dispatch(setThreadsLoadingActionCreator({ isLoading: true }));
    dispatch(setThreadsErrorActionCreator({ error: null }));

    try {
      const thread = await createThread({ title, body, category });
      dispatch(addThreadActionCreator({ thread }));
    } catch (error) {
      dispatch(setThreadsErrorActionCreator({ error: error.message }));
    }

    dispatch(setThreadsLoadingActionCreator({ isLoading: false }));
  };

const asyncToggleUpVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  const { threads } = getState();

  const thread = threads.threads.find((t) => t.id === threadId);
  const isUpVoted = thread?.upVotesBy.includes(authUser.authUser.id);

  // Optimistic update
  dispatch(
    toggleUpVoteThreadActionCreator({
      threadId,
      userId: authUser.authUser.id,
    })
  );

  try {
    if (isUpVoted) {
      await neutralizeThreadVote(threadId);
    } else {
      await upVoteThread(threadId);
    }
  } catch (error) {
    // Revert optimistic update
    dispatch(
      toggleUpVoteThreadActionCreator({
        threadId,
        userId: authUser.authUser.id,
      })
    );
    dispatch(setThreadsErrorActionCreator({ error: error.message }));
  }
};

const asyncToggleDownVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  const { threads } = getState();

  const thread = threads.threads.find((t) => t.id === threadId);
  const isDownVoted = thread?.downVotesBy.includes(authUser.authUser.id);

  // Optimistic update
  dispatch(
    toggleDownVoteThreadActionCreator({
      threadId,
      userId: authUser.authUser.id,
    })
  );

  try {
    if (isDownVoted) {
      await neutralizeThreadVote(threadId);
    } else {
      await downVoteThread(threadId);
    }
  } catch (error) {
    // Revert optimistic update
    dispatch(
      toggleDownVoteThreadActionCreator({
        threadId,
        userId: authUser.authUser.id,
      })
    );
    dispatch(setThreadsErrorActionCreator({ error: error.message }));
  }
};

export {
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncReceiveThreads,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
};
