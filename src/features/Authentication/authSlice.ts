import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "./services/authService";

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      return await getCurrentUser();
    } catch {
      return rejectWithValue(null);
    }
  }
);

const initialState = {
  user: null,
  isLoading: true
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user
    },
    logOut: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.data
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
      })
  }
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;