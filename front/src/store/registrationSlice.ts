import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FormData, Student } from '@t/types';

interface RegistrationState {
  loading: boolean;
  error: string | null;
  studentId: number | null;
}

const initialState: RegistrationState = {
  loading: false,
  error: null,
  studentId: null,  // No default student object, will be populated on successful registration
};

// Async thunk for registering a user
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
        throw new Error(data.message || 'Registration failed');
      }

      return data.studentId;
    } catch (error) {
      return rejectWithValue(error || 'Network Error');
    }
  }
);

// Registration slice
const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    resetRegistrationState: (state) => {
      state.loading = false;
      state.error = null;
      state.studentId = null;  // Reset student information
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.studentId = action.payload;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      });
  },
});

// Export the reset action and reducer
export const { resetRegistrationState } = registrationSlice.actions;
export default registrationSlice.reducer;
