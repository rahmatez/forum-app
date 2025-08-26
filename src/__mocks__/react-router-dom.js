/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
// src/__mocks__/react-router-dom.js
import React from 'react';

function Link({ children, to }) {
  return React.createElement('a', { href: to }, children);
}

function BrowserRouter({ children }) {
  return children;
}

function Routes({ children }) {
  return children;
}

function Route({ children }) {
  return children;
}

function useNavigate() {
  return jest.fn();
}

function useParams() {
  return { id: 'test-id' };
}

export {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
};
