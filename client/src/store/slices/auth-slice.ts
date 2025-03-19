import { IRegisterFormData, ILoginFormData } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk<any, IRegisterFormData>(
  "/auth/register",
  async (registerFormData) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      registerFormData
    );

    return response.data;
  }
);

export const loginUser = createAsyncThunk<any, ILoginFormData>(
  "/auth/login",
  async (loginFormData) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      loginFormData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
});

export const checkAuth = createAsyncThunk("/auth/checkAuth", async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/check-auth`,
    {
      withCredentials: true,
    }
  );
  return response.data;
});

interface AuthState {
  isAuthenticated: boolean;
  user: {
    userId: number;
    email: string;
    username: string;
    premium: false;
  } | null;
  isLoading: boolean;
  error: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action?.payload?.success ? true : false;
        state.user = action?.payload?.success ? action?.payload?.data : null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(checkAuth.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success ? true : false;
        state.user = action?.payload?.success ? action?.payload?.data : null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default authSlice.reducer;
