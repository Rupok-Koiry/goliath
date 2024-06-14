import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import api from "../utils/api";
import Cookies from "js-cookie";

// Initial state for the user slice
const initialState = {
  users: [],
  user: {},
  loading: false,
  error: null,
};

// Helper functions to manage token in Cookies
const storeToken = (token) => Cookies.set("token", token);
const removeToken = () => Cookies.remove("token");

// Generic user request function
const userRequest = async (endpoint, formData, rejectWithValue) => {
  try {
    const response = await api.post(endpoint, formData);
    if (response.data.status === "success") storeToken(response.data.token);
    return response.data.data.user;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
};

// Thunks for user actions
export const userSignup = createAsyncThunk(
  "user/signup",
  async (formData, { rejectWithValue }) => {
    return userRequest("/users/signup", formData, rejectWithValue);
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    return userRequest("/users/login", formData, rejectWithValue);
  }
);

export const userLoginWithSocialMedia = createAsyncThunk(
  "user/loginWithSocialMedia",
  async (formData, { rejectWithValue }) => {
    return userRequest("/users/login-with-media", formData, rejectWithValue);
  }
);

export const userLogout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/logout");
      if (response.data.status === "success") removeToken();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getMe = createAsyncThunk(
  "user/me",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for getting all user s with pagination
export const getAllUsers = createAsyncThunk(
  "users/",
  async (query = "", { rejectWithValue }) => {
    try {
      const response = await api.get(`/users?${query}`);
      return {
        data: response.data.data.data,
        results: response.data.results,
      };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for deleting a user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Create User thunk
export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/users", userData);
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// UpdateMe thunk
export const updateMe = createAsyncThunk(
  "user/updateMe",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.patch("/users/updateMe", userData);
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for updating a User
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/users/${id}`, userData);
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/forgotPassword", { email });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, password, passwordConfirm }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/users/resetPassword/${token}`, {
        password,
        passwordConfirm,
      });
      storeToken(response.data.token); // Assuming the createAndSendToken will send a token as response
      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Update Password
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (
    { passwordCurrent, password, passwordConfirm },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch("/users/updatePassword", {
        passwordCurrent,
        password,
        passwordConfirm,
      });
      storeToken(response.data.token); // Assuming the createAndSendToken will send a token as response
      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// User slice with extra reducers to handle async actions
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(getAllUsers.pending, (state) => {
        state.users = [];
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
    builder
      .addCase(userLogout.fulfilled, (state) => {
        state.user = {};
        state.loading = false;
        state.error = null;
      })
      // Handle pending states for various user actions
      .addMatcher(
        isAnyOf(
          userSignup.pending,
          userLogin.pending,
          userLoginWithSocialMedia.pending,
          getMe.pending,
          updateMe.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      // Handle fulfilled states for various user actions
      .addMatcher(
        isAnyOf(
          userSignup.fulfilled,
          userLogin.fulfilled,
          userLoginWithSocialMedia.fulfilled,
          getMe.fulfilled,
          updateMe.fulfilled
        ),
        (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.error = null;

        }
      )
      // Handle rejected states for various user actions
      .addMatcher(
        isAnyOf(
          userSignup.rejected,
          userLogin.rejected,
          userLoginWithSocialMedia.rejected,
          getMe.rejected,
          updateMe.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.user = {};
          state.error = action.payload;

        }
      );
    builder.addMatcher(
      isAnyOf(
        createUser.pending,
        updateUser.pending,
        forgotPassword.pending,
        resetPassword.pending,
        updatePassword.pending
      ),
      setLoading
    );
    builder.addMatcher(
      isAnyOf(
        forgotPassword.fulfilled,
        resetPassword.fulfilled,
        updatePassword.fulfilled
      ),
      setUserState
    );
    builder.addMatcher(
      isAnyOf(
        createUser.rejected,
        updateUser.rejected,
        forgotPassword.rejected,
        resetPassword.rejected,
        updatePassword.rejected
      ),
      setError
    );
  },
});
function setLoading(state) {
  state.loading = true;
  state.error = null;
}

function setError(state, action) {
  state.loading = false;
  state.error = action.payload;
}

function setUserState(state, action) {
  state.loading = false;
  state.user = action.payload;
  state.error = null;
}

// Exporting the user slice reducer
export default userSlice.reducer;
