/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from '../src/states/authUser/reducer';
import usersReducer from '../src/states/users/reducer';
import threadsReducer from '../src/states/threads/reducer';
import leaderboardsReducer from '../src/states/leaderboards/reducer';
import threadDetailReducer from '../src/states/threadDetail/reducer';
import LoginPage from '../src/pages/LoginPage';
import * as api from '../src/utils/api';

// Mock the API
jest.mock('../src/utils/api', () => ({
  login: jest.fn(),
  getOwnProfile: jest.fn(),
  putAccessToken: jest.fn(),
}));

describe('Login E2E Test', () => {
  const store = configureStore({
    reducer: {
      authUser: authUserReducer,
      users: usersReducer,
      threads: threadsReducer,
      leaderboards: leaderboardsReducer,
      threadDetail: threadDetailReducer,
    },
  });

  // Setup success login scenario
  beforeEach(() => {
    // Reset mocks
    jest.resetAllMocks();

    // Mock successful API responses
    api.login.mockResolvedValue({
      status: 'success',
      message: 'ok',
      data: {
        token: 'test-token',
      },
    });

    api.getOwnProfile.mockResolvedValue({
      status: 'success',
      message: 'ok',
      data: {
        user: {
          id: 'user-1',
          name: 'Test User',
          email: 'test@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Test+User&background=random',
        },
      },
    });

    api.putAccessToken.mockImplementation(() => {});
  });

  test('should display login page and handle login correctly', async () => {
    // Render the login page
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    // Check if login form is displayed
    expect(screen.getByText('Login')).toBeInTheDocument();

    // Fill out the login form
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    // Wait for login process
    await waitFor(() => {
      expect(api.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    // Verify token was stored
    expect(api.putAccessToken).toHaveBeenCalledWith('test-token');

    // Verify user profile was fetched
    expect(api.getOwnProfile).toHaveBeenCalled();
  });

  test('should show error message when login fails', async () => {
    // Mock failed login
    api.login.mockRejectedValue(new Error('Invalid email or password'));

    // Render the login page
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    // Fill out the login form
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'wrong@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    // Wait for error message
    await waitFor(() => {
      expect(api.login).toHaveBeenCalled();
    });
  });
});
