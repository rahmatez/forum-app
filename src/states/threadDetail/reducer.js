import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  threadDetail: null,
  isLoading: false,
  error: null,
};

const threadDetailSlice = createSlice({
  name: "threadDetail",
  initialState,
  reducers: {
    receiveThreadDetailActionCreator: (state, action) => {
      state.threadDetail = action.payload.threadDetail;
    },
    clearThreadDetailActionCreator: (state) => {
      state.threadDetail = null;
    },
    addCommentActionCreator: (state, action) => {
      if (state.threadDetail) {
        state.threadDetail.comments.push(action.payload.comment);
      }
    },
    toggleUpVoteThreadDetailActionCreator: (state, action) => {
      const { userId } = action.payload;
      if (state.threadDetail) {
        const isUpVoted = state.threadDetail.upVotesBy.includes(userId);
        const isDownVoted = state.threadDetail.downVotesBy.includes(userId);

        if (isUpVoted) {
          // Remove upvote
          state.threadDetail.upVotesBy = state.threadDetail.upVotesBy.filter(
            (id) => id !== userId
          );
        } else {
          // Add upvote
          state.threadDetail.upVotesBy.push(userId);
          // Remove downvote if exists
          if (isDownVoted) {
            state.threadDetail.downVotesBy =
              state.threadDetail.downVotesBy.filter((id) => id !== userId);
          }
        }
      }
    },
    toggleDownVoteThreadDetailActionCreator: (state, action) => {
      const { userId } = action.payload;
      if (state.threadDetail) {
        const isUpVoted = state.threadDetail.upVotesBy.includes(userId);
        const isDownVoted = state.threadDetail.downVotesBy.includes(userId);

        if (isDownVoted) {
          // Remove downvote
          state.threadDetail.downVotesBy =
            state.threadDetail.downVotesBy.filter((id) => id !== userId);
        } else {
          // Add downvote
          state.threadDetail.downVotesBy.push(userId);
          // Remove upvote if exists
          if (isUpVoted) {
            state.threadDetail.upVotesBy = state.threadDetail.upVotesBy.filter(
              (id) => id !== userId
            );
          }
        }
      }
    },
    toggleUpVoteCommentActionCreator: (state, action) => {
      const { commentId, userId } = action.payload;
      if (state.threadDetail) {
        const comment = state.threadDetail.comments.find(
          (c) => c.id === commentId
        );
        if (comment) {
          const isUpVoted = comment.upVotesBy.includes(userId);
          const isDownVoted = comment.downVotesBy.includes(userId);

          if (isUpVoted) {
            // Remove upvote
            comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
          } else {
            // Add upvote
            comment.upVotesBy.push(userId);
            // Remove downvote if exists
            if (isDownVoted) {
              comment.downVotesBy = comment.downVotesBy.filter(
                (id) => id !== userId
              );
            }
          }
        }
      }
    },
    toggleDownVoteCommentActionCreator: (state, action) => {
      const { commentId, userId } = action.payload;
      if (state.threadDetail) {
        const comment = state.threadDetail.comments.find(
          (c) => c.id === commentId
        );
        if (comment) {
          const isUpVoted = comment.upVotesBy.includes(userId);
          const isDownVoted = comment.downVotesBy.includes(userId);

          if (isDownVoted) {
            // Remove downvote
            comment.downVotesBy = comment.downVotesBy.filter(
              (id) => id !== userId
            );
          } else {
            // Add downvote
            comment.downVotesBy.push(userId);
            // Remove upvote if exists
            if (isUpVoted) {
              comment.upVotesBy = comment.upVotesBy.filter(
                (id) => id !== userId
              );
            }
          }
        }
      }
    },
    setThreadDetailLoadingActionCreator: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
    setThreadDetailErrorActionCreator: (state, action) => {
      state.error = action.payload.error;
    },
  },
});

const {
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  toggleUpVoteThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  setThreadDetailLoadingActionCreator,
  setThreadDetailErrorActionCreator,
} = threadDetailSlice.actions;

export {
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  toggleUpVoteThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  setThreadDetailLoadingActionCreator,
  setThreadDetailErrorActionCreator,
};

export default threadDetailSlice.reducer;
