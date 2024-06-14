import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  allMetadata: [],
  metadata: {},
  loading: true,
  error: null,
};

// Async thunk for creating a metadata
export const createMetadata = createAsyncThunk(
  "metadata/createMetadata",
  async (metadataData, { rejectWithValue }) => {
    try {
      const response = await api.post("/metadata", metadataData);
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for updating a metadata
export const updateMetadata = createAsyncThunk(
  "metadata/updateMetadata",
  async ({ id, metadataData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/metadata/${id}`, metadataData);
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for deleting a metadata
export const deleteMetadata = createAsyncThunk(
  "metadata/deleteMetadata",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/metadata/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for getting all metadata s with pagination
export const getAllMetadata = createAsyncThunk(
  "metadata/getAllMetadata",
  async (query = "", { rejectWithValue }) => {
    try {
      // Construct query parameters for pagination
      const response = await api.get(`/metadata?${query}`);
      return {
        data: response.data.data.data,
        results: response.data.results,
      };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for getting a single metadata
export const getMetadata = createAsyncThunk(
  "metadata/getMetadata",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/metadata/${id}`);
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const metadataSlice = createSlice({
  name: "metadata",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllMetadata.pending, (state) => {
        state.allMetadata = [];
      })
      .addCase(getAllMetadata.fulfilled, (state, action) => {
        state.loading = false;
        state.allMetadata = action.payload.data;
      })
      .addCase(deleteMetadata.fulfilled, (state, action) => {
        state.loading = false;
        state.allMetadata = state.allMetadata.filter(
          (metadata) => metadata._id !== action.payload
        );
      });
    builder
      .addMatcher(
        isAnyOf(
          createMetadata.pending,
          updateMetadata.pending,
          deleteMetadata.pending,
          getAllMetadata.pending,
          getMetadata.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          createMetadata.fulfilled,
          updateMetadata.fulfilled,
          getMetadata.fulfilled
        ),
        (state, { type, payload }) => {
          state.loading = false;
          switch (type) {
            case createMetadata.fulfilled.type:
              state.allMetadata.push(payload);
              break;
            case updateMetadata.fulfilled.type: {
              const index = state.allMetadata.findIndex(
                (metadata) => metadata._id === payload._id
              );
              if (index !== -1) {
                state.allMetadata[index] = payload;
              }
              break;
            }
            case getMetadata.fulfilled.type:
              state.metadata = payload;
              break;
            default:
              break;
          }
        }
      )
      .addMatcher(
        isAnyOf(
          createMetadata.rejected,
          updateMetadata.rejected,
          deleteMetadata.rejected,
          getAllMetadata.rejected,
          getMetadata.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default metadataSlice.reducer;
