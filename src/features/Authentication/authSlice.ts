import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, LoginUser, refreshToken } from "./services/authService";
import type { LoginValues } from "./schema/LoginSchema";
import axios from "axios";

const initialState = {
  isLoading: true,
  user: null,
  accessToken: null,
}

export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginValues, { rejectWithValue }) => {
    try {
      const response = await LoginUser(data);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Login Failed"
        );
      }
      return rejectWithValue("Something went wrong");
    }
  }
)

export const getCurrent = createAsyncThunk(
  "auth/getCurrent",
  async (accessToken: string, { rejectWithValue }) => {
    try {
      const response = await getCurrentUser(accessToken);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async (_, { rejectWithValue }) => {
    try {
      const refreshRes = await refreshToken();
      const accessToken = refreshRes?.data?.data?.accessToken;
      if (!accessToken) return rejectWithValue("No token");

      const userRes = await getCurrentUser(accessToken);
      const userData = userRes?.data?.data;
      if (!userData) return rejectWithValue("No user");

      return { accessToken, userData };
    } catch {
      return rejectWithValue("Session expired");
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.userData;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getCurrent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrent.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getCurrent.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isLoading = false;
      })
      .addCase(restoreSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload.userData;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isLoading = false;
      })
  }
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;