// src/store/registrationSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '@t/types'; // We'll define this type shortly

// Define the state interface
interface RegistrationState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

// Initial state
const initialState: RegistrationState = {
  loading: false,
  success: false,
  error: null,
};

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/api/register/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Assuming the API sends back an error message
        return rejectWithValue(data.message || 'Registration failed');
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network Error');
    }
  }
);

// Create the slice
const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    resetRegistrationState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      });
  },
});

// Export actions and reducer
export const { resetRegistrationState } = registrationSlice.actions;
export default registrationSlice.reducer;
