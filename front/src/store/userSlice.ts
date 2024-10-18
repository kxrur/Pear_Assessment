import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FormData } from '@t/types';

interface UserState {
  id: number,
  username: string,
  firsNmae: string,
  lastName: string,
  studentId: string | null,
  role: string[],
}

const initialState: UserState = {
  id: 0,
  username: "tester",
  firsNmae: "Test",
  lastName: "Testee",
  studentId: "1",
  role: ["STUDENT"],
};

export const registerStudent = createAsyncThunk(
  'registration-student/fetch',
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

      return data;
    } catch (error) {
      return rejectWithValue(error || 'Network Error');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetStudent: (state) => {
      Object.assign(state, initialState)
    },
  },
  extraReducers(builder) {
    builder.addCase(registerStudent.fulfilled, (state, action) => {
      state.id = action.payload.id
      state.username = action.payload.username
      state.firsNmae = action.payload.firsNmae
      state.lastName = action.payload.lastName
      state.studentId = action.payload.studentId
      state.role = action.payload.role
    })
  },
});

// Export the reset action and reducer
export default userSlice.reducer;
export const { resetStudent } = userSlice.actions;
