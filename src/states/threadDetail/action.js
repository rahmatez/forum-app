import {
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  toggleUpVoteThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  setThreadDetailLoadingActionCreator,
  setThreadDetailErrorActionCreator,
} from "./reducer";
import {
  getThreadDetail,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralizeThreadVote,
  upVoteComment,
  downVoteComment,
  neutralizeCommentVote,
} from "../../utils/api";

const asyncReceiveThreadDetail = (threadId) => async (dispatch) => {
  dispatch(setThreadDetailLoadingActionCreator({ isLoading: true }));
  dispatch(setThreadDetailErrorActionCreator({ error: null }));

  try {
    const threadDetail = await getThreadDetail(threadId);
    dispatch(receiveThreadDetailActionCreator({ threadDetail }));
  } catch (error) {
    dispatch(setThreadDetailErrorActionCreator({ error: error.message }));
  }

  dispatch(setThreadDetailLoadingActionCreator({ isLoading: false }));
};

const asyncAddComment =
  ({ threadId, content }) =>
  async (dispatch) => {
    dispatch(setThreadDetailLoadingActionCreator({ isLoading: true }));
    dispatch(setThreadDetailErrorActionCreator({ error: null }));

    try {
      const comment = await createComment({ threadId, content });
      dispatch(addCommentActionCreator({ comment }));
    } catch (error) {
      dispatch(setThreadDetailErrorActionCreator({ error: error.message }));
    }

    dispatch(setThreadDetailLoadingActionCreator({ isLoading: false }));
  };

const asyncToggleUpVoteThreadDetail =
  (threadId) => async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    const isUpVoted = threadDetail.threadDetail?.upVotesBy.includes(
      authUser.authUser.id
    );

    // Optimistic update
    dispatch(
      toggleUpVoteThreadDetailActionCreator({
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
        toggleUpVoteThreadDetailActionCreator({
          userId: authUser.authUser.id,
        })
      );
      dispatch(setThreadDetailErrorActionCreator({ error: error.message }));
    }
  };

const asyncToggleDownVoteThreadDetail =
  (threadId) => async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    const isDownVoted = threadDetail.threadDetail?.downVotesBy.includes(
      authUser.authUser.id
    );

    // Optimistic update
    dispatch(
      toggleDownVoteThreadDetailActionCreator({
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
        toggleDownVoteThreadDetailActionCreator({
          userId: authUser.authUser.id,
        })
      );
      dispatch(setThreadDetailErrorActionCreator({ error: error.message }));
    }
  };

const asyncToggleUpVoteComment =
  ({ threadId, commentId }) =>
  async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    const comment = threadDetail.threadDetail?.comments.find(
      (c) => c.id === commentId
    );
    const isUpVoted = comment?.upVotesBy.includes(authUser.authUser.id);

    // Optimistic update
    dispatch(
      toggleUpVoteCommentActionCreator({
        commentId,
        userId: authUser.authUser.id,
      })
    );

    try {
      if (isUpVoted) {
        await neutralizeCommentVote({ threadId, commentId });
      } else {
        await upVoteComment({ threadId, commentId });
      }
    } catch (error) {
      // Revert optimistic update
      dispatch(
        toggleUpVoteCommentActionCreator({
          commentId,
          userId: authUser.authUser.id,
        })
      );
      dispatch(setThreadDetailErrorActionCreator({ error: error.message }));
    }
  };

const asyncToggleDownVoteComment =
  ({ threadId, commentId }) =>
  async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    const comment = threadDetail.threadDetail?.comments.find(
      (c) => c.id === commentId
    );
    const isDownVoted = comment?.downVotesBy.includes(authUser.authUser.id);

    // Optimistic update
    dispatch(
      toggleDownVoteCommentActionCreator({
        commentId,
        userId: authUser.authUser.id,
      })
    );

    try {
      if (isDownVoted) {
        await neutralizeCommentVote({ threadId, commentId });
      } else {
        await downVoteComment({ threadId, commentId });
      }
    } catch (error) {
      // Revert optimistic update
      dispatch(
        toggleDownVoteCommentActionCreator({
          commentId,
          userId: authUser.authUser.id,
        })
      );
      dispatch(setThreadDetailErrorActionCreator({ error: error.message }));
    }
  };

export {
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
};
