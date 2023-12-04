import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setToken,
  removeToken,
  requestRegister,
  requestLogin,
  requestLogout,
  requestUserRefresh,
} from 'services/contactsApi';

export const registerThunk = createAsyncThunk(
  'auth/signup',
  async (contactData, thunkAPI) => {
    try {
      const userData = await requestRegister(contactData);
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (contactData, thunkAPI) => {
    try {
      const userData = await requestLogin(contactData);
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    try {
      setToken(token);
      const authData = await requestUserRefresh();
      return authData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) return false;
      return true;
    },
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await requestLogout();
      removeToken();
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const clearAuthError = () => ({
  type: 'auth/clearError',
});
