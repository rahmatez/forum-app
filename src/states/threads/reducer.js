import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  threads: [],
  isLoading: false,
  error: null,
};

const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    receiveThreadsActionCreator: (state, action) => {
      state.threads = action.payload.threads;
    },
    addThreadActionCreator: (state, action) => {
      state.threads.push(action.payload.thread);
    },
    toggleUpVoteThreadActionCreator: (state, action) => {
      const { threadId, userId } = action.payload;
      const thread = state.threads.find((t) => t.id === threadId);
      if (thread) {
        const isUpVoted = thread.upVotesBy.includes(userId);
        const isDownVoted = thread.downVotesBy.includes(userId);

        if (isUpVoted) {
          // Remove upvote
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        } else {
          // Add upvote
          thread.upVotesBy.push(userId);
          // Remove downvote if exists
          if (isDownVoted) {
            thread.downVotesBy = thread.downVotesBy.filter(
              (id) => id !== userId
            );
          }
        }
      }
    },
    toggleDownVoteThreadActionCreator: (state, action) => {
      const { threadId, userId } = action.payload;
      const thread = state.threads.find((t) => t.id === threadId);
      if (thread) {
        const isUpVoted = thread.upVotesBy.includes(userId);
        const isDownVoted = thread.downVotesBy.includes(userId);

        if (isDownVoted) {
          // Remove downvote
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        } else {
          // Add downvote
          thread.downVotesBy.push(userId);
          // Remove upvote if exists
          if (isUpVoted) {
            thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
          }
        }
      }
    },
    setThreadsLoadingActionCreator: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
    setThreadsErrorActionCreator: (state, action) => {
      state.error = action.payload.error;
    },
  },
});

const {
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  setThreadsLoadingActionCreator,
  setThreadsErrorActionCreator,
} = threadsSlice.actions;

export {
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  setThreadsLoadingActionCreator,
  setThreadsErrorActionCreator,
};

export default threadsSlice.reducer;
