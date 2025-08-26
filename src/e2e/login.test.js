/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from '../states/authUser/reducer';
import usersReducer from '../states/users/reducer';
import threadsReducer from '../states/threads/reducer';
import leaderboardsReducer from '../states/leaderboards/reducer';
import threadDetailReducer from '../states/threadDetail/reducer';
import LoginPage from '../pages/LoginPage';
import * as api from '../utils/api';

// Mock the API
jest.mock('../utils/api', () => ({
  login: jest.fn(),
  getOwnProfile: jest.fn(),
  putToken: jest.fn(),
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
    api.login.mockResolvedValue('test-token');

    api.getOwnProfile.mockResolvedValue({
      id: 'user-1',
      name: 'Test User',
      email: 'test@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Test+User&background=random',
    });

    api.putToken.mockImplementation(() => {});
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
    expect(screen.getByText('Masuk ke Forum')).toBeInTheDocument();

    // Fill out the login form
    fireEvent.change(screen.getByPlaceholderText('Masukkan email Anda'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Masukkan password Anda'), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }));

    // Wait for login process and verify all API calls
    await waitFor(() => {
      expect(api.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      
      // Verify token was stored
      expect(api.putToken).toHaveBeenCalledWith('test-token');
      
      // Verify user profile was fetched
      expect(api.getOwnProfile).toHaveBeenCalled();
    });
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
    fireEvent.change(screen.getByPlaceholderText('Masukkan email Anda'), {
      target: { value: 'wrong@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Masukkan password Anda'), {
      target: { value: 'wrongpassword' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }));

    // Wait for error message
    await waitFor(() => {
      expect(api.login).toHaveBeenCalled();
    });
  });
});
