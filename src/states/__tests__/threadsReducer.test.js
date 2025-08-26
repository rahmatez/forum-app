/**
 * Skenario testing untuk threadsReducer
 * 
 * - threadsReducer function
 *   - should return initial state when given by unknown action
 *   - should return threads when given by RECEIVE_THREADS action
 *   - should return threads with new thread when given by ADD_THREAD action
 *   - should return threads with toggled upvote when given by UP_VOTE_THREAD action
 *   - should return threads with toggled downvote when given by DOWN_VOTE_THREAD action
 *   - should return threads with removed upvote/downvote when given by NEUTRAL_VOTE_THREAD action
 */

import threadsReducer from '../threads/reducer';

describe('threadsReducer function', () => {
  it('should return initial state when given by unknown action', () => {
    // arrange
    const initialState = {
      threads: ['SENGAJA_SALAH_UNTUK_SCREENSHOT_CI_ERROR'], // Ini sengaja dibuat salah untuk mendapatkan screenshot CI error
      isLoading: false,
      error: null,
    };
    const action = { type: 'UNKNOWN_ACTION' };
    
    // action
    const nextState = threadsReducer(initialState, action);
    
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return threads when given by receiveThreadsActionCreator action', () => {
    // arrange
    const initialState = {
      threads: [],
      isLoading: false,
      error: null,
    };
    const action = {
      type: 'threads/receiveThreadsActionCreator',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Test 1',
            body: 'Thread body test 1',
            category: 'test',
            createdAt: '2023-05-29T07:00:00.000Z',
            ownerId: 'user-1',
            totalComments: 0,
            upVotesBy: [],
            downVotesBy: [],
          },
          {
            id: 'thread-2',
            title: 'Thread Test 2',
            body: 'Thread body test 2',
            category: 'test',
            createdAt: '2023-05-29T08:00:00.000Z',
            ownerId: 'user-2',
            totalComments: 0,
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    };
    
    // action
    const nextState = threadsReducer(initialState, action);
    
    // assert
    expect(nextState).toEqual({
      ...initialState,
      threads: action.payload.threads,
    });
  });

  it('should return threads with new thread when given by addThreadActionCreator action', () => {
    // arrange
    const initialState = {
      threads: [
        {
          id: 'thread-1',
          title: 'Thread Test 1',
          body: 'Thread body test 1',
          category: 'test',
          createdAt: '2023-05-29T07:00:00.000Z',
          ownerId: 'user-1',
          totalComments: 0,
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
      isLoading: false,
      error: null,
    };
    const action = {
      type: 'threads/addThreadActionCreator',
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Test 2',
          body: 'Thread body test 2',
          category: 'test',
          createdAt: '2023-05-29T08:00:00.000Z',
          ownerId: 'user-2',
          totalComments: 0,
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };
    
    // action
    const nextState = threadsReducer(initialState, action);
    
    // assert
    // Karena reducer menggunakan push() yang menambahkan di akhir array
    expect(nextState).toEqual({
      ...initialState,
      threads: [...initialState.threads, action.payload.thread],
    });
  });

  it('should return threads with toggled upvote when given by upVoteThreadActionCreator action', () => {
    // arrange
    const initialState = {
      threads: [
        {
          id: 'thread-1',
          title: 'Thread Test 1',
          body: 'Thread body test 1',
          category: 'test',
          createdAt: '2023-05-29T07:00:00.000Z',
          ownerId: 'user-1',
          totalComments: 0,
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
      isLoading: false,
      error: null,
    };
    const action = {
      type: 'threads/toggleUpVoteThreadActionCreator',
      payload: {
        threadId: 'thread-1',
        userId: 'user-2',
      },
    };
    
    // action
    const nextState = threadsReducer(initialState, action);
    
    // assert
    expect(nextState.threads[0].upVotesBy).toContain(action.payload.userId);
  });

  it('should return threads with toggled downvote when given by downVoteThreadActionCreator action', () => {
    // arrange
    const initialState = {
      threads: [
        {
          id: 'thread-1',
          title: 'Thread Test 1',
          body: 'Thread body test 1',
          category: 'test',
          createdAt: '2023-05-29T07:00:00.000Z',
          ownerId: 'user-1',
          totalComments: 0,
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
      isLoading: false,
      error: null,
    };
    const action = {
      type: 'threads/toggleDownVoteThreadActionCreator',
      payload: {
        threadId: 'thread-1',
        userId: 'user-2',
      },
    };
    
    // action
    const nextState = threadsReducer(initialState, action);
    
    // assert
    expect(nextState.threads[0].downVotesBy).toContain(action.payload.userId);
  });
});
