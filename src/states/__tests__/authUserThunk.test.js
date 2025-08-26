/**
 * Skenario testing untuk authUser thunks
 * 
 * - asyncSetAuthUser thunk
 *   - should dispatch actions correctly when login success
 *   - should dispatch actions correctly when login failed
 * - asyncUnsetAuthUser thunk
 *   - should dispatch actions correctly when logout
 * - asyncRegisterUser thunk
 *   - should dispatch actions correctly when register success
 *   - should dispatch actions correctly when register failed
 */

// Import API modules
import * as api from '../../utils/api';
import { asyncSetAuthUser, asyncUnsetAuthUser, asyncRegisterUser } from '../authUser/action';
import { setAuthUserActionCreator, unsetAuthUserActionCreator, setAuthUserLoadingActionCreator, setAuthUserErrorActionCreator, setRegisterSuccessActionCreator } from '../authUser/reducer';

// Mock API
jest.mock('../../utils/api', () => ({
  login: jest.fn(),
  getOwnProfile: jest.fn(),
  putToken: jest.fn(),
  deleteToken: jest.fn(),
  register: jest.fn()
}));

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    // Reset mock
    api.login.mockReset();
    api.getOwnProfile.mockReset();
    api.putToken.mockReset();
  });

  it('should dispatch actions correctly when login success', async () => {
    // arrange
    const authUser = {
      id: 'user-1',
      name: 'User Test',
      email: 'user@test.com',
    };
    const token = 'token-test';
    api.login.mockResolvedValueOnce(token);
    api.getOwnProfile.mockResolvedValueOnce(authUser);
    const dispatch = jest.fn();

    // action
    await asyncSetAuthUser({
      email: 'user@test.com',
      password: 'password',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setAuthUserLoadingActionCreator({ isLoading: true }));
    expect(dispatch).toHaveBeenCalledWith(setAuthUserErrorActionCreator({ error: null }));
    expect(api.login).toHaveBeenCalledWith({
      email: 'user@test.com',
      password: 'password',
    });
    expect(api.putToken).toHaveBeenCalledWith(token);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator({ authUser }));
    expect(dispatch).toHaveBeenCalledWith(setAuthUserLoadingActionCreator({ isLoading: false }));
  });

  it('should dispatch actions correctly when login failed', async () => {
    // arrange
    const errorMessage = 'Login failed';
    api.login.mockRejectedValueOnce(new Error(errorMessage));
    const dispatch = jest.fn();

    // action
    await asyncSetAuthUser({
      email: 'user@test.com',
      password: 'password',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setAuthUserLoadingActionCreator({ isLoading: true }));
    expect(dispatch).toHaveBeenCalledWith(setAuthUserErrorActionCreator({ error: null }));
    expect(api.login).toHaveBeenCalledWith({
      email: 'user@test.com',
      password: 'password',
    });
    expect(dispatch).toHaveBeenCalledWith(setAuthUserErrorActionCreator({ error: errorMessage }));
    expect(dispatch).toHaveBeenCalledWith(setAuthUserLoadingActionCreator({ isLoading: false }));
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  beforeEach(() => {
    // Reset mock
    api.deleteToken.mockReset();
  });

  it('should dispatch actions correctly when logout', () => {
    // arrange
    const dispatch = jest.fn();

    // action
    asyncUnsetAuthUser()(dispatch);

    // assert
    expect(api.deleteToken).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
  });
});

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    // Reset mock
    api.register.mockReset();
  });

  it('should dispatch actions correctly when register success', async () => {
    // arrange
    const userData = {
      name: 'User Test',
      email: 'user@test.com',
      password: 'password',
    };
    api.register.mockResolvedValueOnce();
    const dispatch = jest.fn();

    // action
    const result = await asyncRegisterUser(userData)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setAuthUserLoadingActionCreator({ isLoading: true }));
    expect(dispatch).toHaveBeenCalledWith(setAuthUserErrorActionCreator({ error: null }));
    expect(api.register).toHaveBeenCalledWith(userData);
    expect(dispatch).toHaveBeenCalledWith(setRegisterSuccessActionCreator({ success: true }));
    expect(dispatch).toHaveBeenCalledWith(setAuthUserLoadingActionCreator({ isLoading: false }));
    expect(result).toBe(true);
  });

  it('should dispatch actions correctly when register failed', async () => {
    // arrange
    const userData = {
      name: 'User Test',
      email: 'user@test.com',
      password: 'password',
    };
    const errorMessage = 'Register failed';
    api.register.mockRejectedValueOnce(new Error(errorMessage));
    const dispatch = jest.fn();

    // action
    const result = await asyncRegisterUser(userData)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setAuthUserLoadingActionCreator({ isLoading: true }));
    expect(dispatch).toHaveBeenCalledWith(setAuthUserErrorActionCreator({ error: null }));
    expect(api.register).toHaveBeenCalledWith(userData);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserErrorActionCreator({ error: errorMessage }));
    expect(dispatch).toHaveBeenCalledWith(setAuthUserLoadingActionCreator({ isLoading: false }));
    expect(result).toBe(false);
  });
});
