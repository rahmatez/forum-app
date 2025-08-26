/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation';
import { asyncUnsetAuthUser } from '../../states/authUser/action';

// Mock the required hooks and modules
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Disable prop-types validation for this mock component
/* eslint-disable react/prop-types */
jest.mock('react-router-dom', () => ({
  Link: ({ to, className, children }) => <a href={to} className={className}>{children}</a>,
  useNavigate: jest.fn(),
}));
/* eslint-enable react/prop-types */

jest.mock('../../states/authUser/action', () => ({
  asyncUnsetAuthUser: jest.fn(),
}));

describe('Navigation Component', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({ 
      authUser: { 
        authUser: null 
      } 
    }));
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render navigation correctly when user is not logged in', () => {
    render(<Navigation />);
    
    // Check if the brand title is rendered
    expect(screen.getByText('Forum Diskusi')).toBeInTheDocument();
    
    // Check if navigation links are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    
    // Check if login and register buttons are rendered when user is not logged in
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('should render navigation correctly when user is logged in', () => {
    // Mock a logged-in user
    useSelector.mockImplementation((selector) => selector({ 
      authUser: { 
        authUser: { 
          name: 'Test User', 
          avatar: 'https://ui-avatars.com/api/?name=Test+User&background=random' 
        } 
      } 
    }));

    render(<Navigation />);
    
    // Check if the user's name and avatar are displayed
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByAltText('Test User')).toBeInTheDocument();
    
    // Check if logout button is rendered
    expect(screen.getByText('Logout')).toBeInTheDocument();

    // Check if "Buat Thread" button is rendered
    expect(screen.getByText('Buat Thread')).toBeInTheDocument();
  });

  test('should call logout function when logout button is clicked', () => {
    // Mock a logged-in user
    useSelector.mockImplementation((selector) => selector({ 
      authUser: { 
        authUser: { 
          name: 'Test User', 
          avatar: 'https://ui-avatars.com/api/?name=Test+User&background=random' 
        } 
      } 
    }));

    render(<Navigation />);
    
    // Click on logout button
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    
    // Ensure logout action and navigation were called
    expect(mockDispatch).toHaveBeenCalledWith(asyncUnsetAuthUser());
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
