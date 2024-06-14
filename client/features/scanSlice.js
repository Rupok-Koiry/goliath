import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  scans: [],
  scan: {},
  loading: true,
  error: null,
};

// Async thunk for creating a scan
export const createScan = createAsyncThunk(
  "scan/createScan",
  async (scanData, { rejectWithValue }) => {
    try {
      const response = await api.post("/scans", scanData);
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for updating a scan
export const updateScan = createAsyncThunk(
  "scan/updateScan",
  async ({ id, scanData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/scans/${id}`, scanData);
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for deleting a scan
export const deleteScan = createAsyncThunk(
  "scan/deleteScan",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/scans/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for getting all scan s with pagination
export const getAllScans = createAsyncThunk(
  "scan/getAllScans",
  async (query = "", { rejectWithValue }) => {
    try {
      // Construct query parameters for pagination
      const response = await api.get(`/scans?${query}`);
      return {
        data: response.data.data.data,
        results: response.data.results,
      };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for getting a single scan
export const getScan = createAsyncThunk(
  "scan/getScan",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/scans/${id}`);
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const scanSlice = createSlice({
  name: "scan",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllScans.pending, (state) => {
        state.scans = [];
      })
      .addCase(getAllScans.fulfilled, (state, action) => {
        state.loading = false;
        state.scans = action.payload.data;
      })
      .addCase(deleteScan.fulfilled, (state, action) => {
        state.loading = false;
        state.scans = state.scans.filter((scan) => scan._id !== action.payload);
      });
    builder
      .addMatcher(
        isAnyOf(
          createScan.pending,
          updateScan.pending,
          deleteScan.pending,
          getAllScans.pending,
          getScan.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(createScan.fulfilled, updateScan.fulfilled, getScan.fulfilled),
        (state, { type, payload }) => {
          state.loading = false;
          switch (type) {
            case createScan.fulfilled.type:
              state.scans.push(payload);
              break;
            case updateScan.fulfilled.type: {
              const index = state.scans.findIndex(
                (scan) => scan._id === payload._id
              );
              if (index !== -1) {
                state.scans[index] = payload;
              }
              break;
            }
            case getScan.fulfilled.type:
              state.scan = payload;
              break;
            default:
              break;
          }
        }
      )
      .addMatcher(
        isAnyOf(
          createScan.rejected,
          updateScan.rejected,
          deleteScan.rejected,
          getAllScans.rejected,
          getScan.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default scanSlice.reducer;
