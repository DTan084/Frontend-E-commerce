import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { USER_ROLES } from '../constants';
import { authDataService } from '../services/data';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for existing token on app load
    const { token, user } = authDataService.getSession();

    if (token && user) {
      try {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { token, user },
        });
      } catch (error) {
        // Invalid stored data, clear it
        authDataService.clearSession();
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (userData, token) => {
    try {
      const saved = authDataService.setSession({ user: userData, token });
      if (!saved) throw new Error('Failed to persist auth session');

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: userData, token },
      });
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: 'Failed to save login data',
      });
    }
  };

  const logout = () => {
    authDataService.clearSession();
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...state.user, ...updatedData };
    authDataService.updateUser(updatedUser);
    dispatch({ type: 'UPDATE_USER', payload: updatedData });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const isAdmin = () => {
    return state.user?.role === USER_ROLES.ADMIN;
  };

  const isSeller = () => {
    return state.user?.role === USER_ROLES.SELLER;
  };

  const value = {
    ...state,
    login,
    logout,
    updateUser,
    clearError,
    isAdmin,
    isSeller,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
