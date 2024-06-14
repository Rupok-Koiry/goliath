import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  targets: [],
  target: {},
  loading: true,
  error: null,
};

// Async thunk for creating a target
export const createTarget = createAsyncThunk(
  "target/createTarget",
  async (targetData, { rejectWithValue }) => {
    try {
      const response = await api.post("/targets", targetData);
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for updating a target
export const updateTarget = createAsyncThunk(
  "target/updateTarget",
  async ({ id, targetData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/targets/${id}`, targetData);
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for deleting a target
export const deleteTarget = createAsyncThunk(
  "target/deleteTarget",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/targets/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for getting all target s with pagination
export const getAllTargets = createAsyncThunk(
  "target/getAllTargets",
  async (query = "", { rejectWithValue }) => {
    try {
      // Construct query parameters for pagination
      const response = await api.get(`/targets?${query}`);
      return {
        data: response.data.data.data,
        results: response.data.results,
      };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for getting a single target
export const getTarget = createAsyncThunk(
  "target/getTarget",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/targets/${id}`);
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const targetSlice = createSlice({
  name: "target",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllTargets.pending, (state) => {
        state.targets = [];
      })
      .addCase(getAllTargets.fulfilled, (state, action) => {
        state.loading = false;
        state.targets = action.payload.data;
      })
      .addCase(deleteTarget.fulfilled, (state, action) => {
        state.loading = false;
        state.targets = state.targets.filter((target) => target._id !== action.payload);
      });
    builder
      .addMatcher(
        isAnyOf(
          createTarget.pending,
          updateTarget.pending,
          deleteTarget.pending,
          getAllTargets.pending,
          getTarget.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(createTarget.fulfilled, updateTarget.fulfilled, getTarget.fulfilled),
        (state, { type, payload }) => {
          state.loading = false;
          switch (type) {
            case createTarget.fulfilled.type:
              state.targets.push(payload);
              break;
            case updateTarget.fulfilled.type: {
              const index = state.targets.findIndex(
                (target) => target._id === payload._id
              );
              if (index !== -1) {
                state.targets[index] = payload;
              }
              break;
            }
            case getTarget.fulfilled.type:
              state.target = payload;
              break;
            default:
              break;
          }
        }
      )
      .addMatcher(
        isAnyOf(
          createTarget.rejected,
          updateTarget.rejected,
          deleteTarget.rejected,
          getAllTargets.rejected,
          getTarget.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default targetSlice.reducer;
