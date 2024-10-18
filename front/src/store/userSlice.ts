import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StudentFormData, TeacherFormData } from '@t/types';

interface UserState {
  id: number,
  username?: string,
  firstName: string,
  lastName: string,
  studentId: string | null,
  roles: string[],
}

const initialState: UserState = {
  id: 0,
  username: "tester",
  firstName: "Test",
  lastName: "Testee",
  studentId: "1",
  roles: ["STUDENT"],
};

export const registerStudent = createAsyncThunk(
  'registration-student/fetch',
  async (formData: StudentFormData, { rejectWithValue }) => {
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

export const registerTeacher = createAsyncThunk(
  'registration-teacher/fetch',
  async (formData: TeacherFormData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/api/register/professor', {
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
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.studentId = action.payload.studentId
      state.roles = action.payload.roles
    })
    builder.addCase(registerTeacher.fulfilled, (state, action) => {
      state.id = action.payload.id
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.studentId = action.payload.studentId
      state.roles = action.payload.roles
    })
  },
});

// Export the reset action and reducer
export default userSlice.reducer;
export const { resetStudent } = userSlice.actions;
