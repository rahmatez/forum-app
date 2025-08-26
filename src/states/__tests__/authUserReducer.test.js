/**
 * Skenario testing untuk authUserReducer
 * 
 * - authUserReducer function
 *   - should return initial state when given by unknown action
 *   - should return authUser when given by SET_AUTH_USER action
 *   - should return null when given by UNSET_AUTH_USER action
 *   - should return isLoading true when given by SET_IS_AUTH_USER_LOADING action with payload true
 *   - should return error message when given by SET_AUTH_USER_ERROR action
 */

import authUserReducer from '../authUser/reducer';

describe('authUserReducer function', () => {
  it('should return initial state when given by unknown action', () => {
    // arrange
    const initialState = {
      authUser: null,
      isLoading: false,
      error: null,
      registerSuccess: false,
    };
    const action = { type: 'UNKNOWN_ACTION' };
    
    // action
    const nextState = authUserReducer(initialState, action);
    
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return authUser when given by setAuthUserActionCreator action', () => {
    // arrange
    const initialState = {
      authUser: null,
      isLoading: false,
      error: null,
      registerSuccess: false,
    };
    const action = {
      type: 'authUser/setAuthUserActionCreator',
      payload: {
        authUser: {
          id: 'user-1',
          name: 'User Test',
          email: 'user@test.com',
        },
      },
    };
    
    // action
    const nextState = authUserReducer(initialState, action);
    
    // assert
    expect(nextState).toEqual({
      ...initialState,
      authUser: action.payload.authUser,
    });
  });

  it('should return null when given by unsetAuthUserActionCreator action', () => {
    // arrange
    const initialState = {
      authUser: {
        id: 'user-1',
        name: 'User Test',
        email: 'user@test.com',
      },
      isLoading: false,
      error: null,
      registerSuccess: false,
    };
    const action = {
      type: 'authUser/unsetAuthUserActionCreator',
    };
    
    // action
    const nextState = authUserReducer(initialState, action);
    
    // assert
    expect(nextState).toEqual({
      ...initialState,
      authUser: null,
    });
  });

  it('should return isLoading true when given by setAuthUserLoadingActionCreator action with payload true', () => {
    // arrange
    const initialState = {
      authUser: null,
      isLoading: false,
      error: null,
      registerSuccess: false,
    };
    const action = {
      type: 'authUser/setAuthUserLoadingActionCreator',
      payload: {
        isLoading: true,
      },
    };
    
    // action
    const nextState = authUserReducer(initialState, action);
    
    // assert
    expect(nextState).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should return error message when given by setAuthUserErrorActionCreator action', () => {
    // arrange
    const initialState = {
      authUser: null,
      isLoading: false,
      error: null,
      registerSuccess: false,
    };
    const action = {
      type: 'authUser/setAuthUserErrorActionCreator',
      payload: {
        error: 'Error message',
      },
    };
    
    // action
    const nextState = authUserReducer(initialState, action);
    
    // assert
    expect(nextState).toEqual({
      ...initialState,
      error: 'Error message',
    });
  });
});
