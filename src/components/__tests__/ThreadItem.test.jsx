/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ThreadItem from '../ThreadItem';
import authUserReducer from '../../states/authUser/reducer';
import usersReducer from '../../states/users/reducer';
import threadsReducer from '../../states/threads/reducer';
import { asyncToggleUpVoteThread, asyncToggleDownVoteThread } from '../../states/threads/action';

// Mock action creators
jest.mock('../../states/threads/action');
// Set up mock implementation
asyncToggleUpVoteThread.mockImplementation((id) => ({ type: 'mock/upVote', payload: { id } }));
asyncToggleDownVoteThread.mockImplementation((id) => ({ type: 'mock/downVote', payload: { id } }));

// Test fixture
const thread = {
  id: 'thread-1',
  title: 'Test Thread',
  body: 'This is a test thread body',
  category: 'test',
  createdAt: '2023-05-29T07:00:00.000Z',
  ownerId: 'user-1',
  upVotesBy: ['user-2'],
  downVotesBy: [],
  totalComments: 2,
};

const users = [
  {
    id: 'user-1',
    name: 'Test User',
    avatar: 'https://ui-avatars.com/api/?name=Test+User&background=random',
  }
];

describe('ThreadItem Component', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        authUser: authUserReducer,
        users: usersReducer,
        threads: threadsReducer,
      },
      preloadedState: {
        authUser: {
          authUser: { id: 'user-2', name: 'Logged User' },
          isLoading: false,
          error: null,
        },
        users: {
          users,
          isLoading: false,
          error: null,
        },
      },
    });

    // Clear mocks
    asyncToggleUpVoteThread.mockClear();
    asyncToggleDownVoteThread.mockClear();
  });

  test('should render thread information correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadItem thread={thread} />
        </BrowserRouter>
      </Provider>
    );

    // Check if thread title and content are displayed
    expect(screen.getByText('Test Thread')).toBeInTheDocument();
    expect(screen.getByText('This is a test thread body')).toBeInTheDocument();
    
    // Check category and author
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    
    // Check vote counts
    expect(screen.getByText('↑ 1')).toBeInTheDocument();
    expect(screen.getByText('↓ 0')).toBeInTheDocument();
    
    // Check comment count
    expect(screen.getByText('💬 2')).toBeInTheDocument();
  });

  test('should show correct upvote and downvote buttons', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadItem thread={thread} />
        </BrowserRouter>
      </Provider>
    );

    // Find upvote and downvote buttons
    const upvoteButton = screen.getByText('↑ 1').closest('button');
    const downvoteButton = screen.getByText('↓ 0').closest('button');
    
    // Check if buttons exist and show correct counts
    expect(upvoteButton).toBeInTheDocument();
    expect(downvoteButton).toBeInTheDocument();
    expect(upvoteButton).toHaveClass('voted'); // Should be voted since authUser.id is in upVotesBy
    expect(downvoteButton).not.toHaveClass('voted');
  });

  test('should handle when user is not authenticated', () => {
    // Create a store with no authenticated user
    const unauthenticatedStore = configureStore({
      reducer: {
        authUser: authUserReducer,
        users: usersReducer,
        threads: threadsReducer,
      },
      preloadedState: {
        authUser: {
          authUser: null,
          isLoading: false,
          error: null,
        },
        users: {
          users,
          isLoading: false,
          error: null,
        },
      },
    });

    render(
      <Provider store={unauthenticatedStore}>
        <BrowserRouter>
          <ThreadItem thread={thread} />
        </BrowserRouter>
      </Provider>
    );

    // Check if vote buttons are disabled
    const upvoteButton = screen.getByText('↑ 1').closest('button');
    const downvoteButton = screen.getByText('↓ 0').closest('button');
    
    expect(upvoteButton).toBeDisabled();
    expect(downvoteButton).toBeDisabled();
  });
});
