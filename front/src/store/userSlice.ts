import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StudentRegFormData, TeacherRegFormData } from '@t/types';
import toast from 'react-hot-toast';

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
  studentId: null,
  roles: ["STUDENT"],
};

export const loginTeacher = createAsyncThunk(
  'login-teacher/fetch',
  async (formData: URLSearchParams, { rejectWithValue }) => {
    let message = '';
    console.log('login request body: ' + formData.toString())

    try {
      const response = await fetch('http://localhost:8080/api/login/professor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),// aint no way u just used a different parsing than registration (json) for login
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else if (response.status > 399 && response.status < 500) {
        message = 'Invalid credentials';
      } else {
        message = 'An error occurred. Please try again.';
      }
    } catch (error) {
      message = 'Failed to connect to the server. Error: ' + error;
    }
    if (message != '') {
      toast.error(message);
    }
  }
);

export const loginStudent = createAsyncThunk(
  'login-student/fetch',
  async (formData: URLSearchParams, { rejectWithValue }) => {
    let message = '';
    console.log('login request body: ' + formData.toString())

    try {
      const response = await fetch('http://localhost:8080/api/login/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),// aint no way u just used a different parsing than registration (json) for login
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else if (response.status > 399 && response.status < 500) {
        message = 'Invalid credentials';
      } else {
        message = 'An error occurred. Please try again.';
      }
    } catch (error) {
      message = 'Failed to connect to the server. Error: ' + error;
    }
    if (message != '') {
      toast.error(message);
    }
  }
);



export const registerStudent = createAsyncThunk(
  'registration-student/fetch',
  async (formData: StudentRegFormData, { rejectWithValue }) => {
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
  async (formData: TeacherRegFormData, { rejectWithValue }) => {
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
    builder.addCase(loginStudent.fulfilled, (state, action) => {
      state.id = action.payload.id
      state.username = action.payload.username
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.studentId = action.payload.studentID
      state.roles = action.payload.roles[0]['name']
    })
    builder.addCase(loginTeacher.fulfilled, (state, action) => {
      state.id = action.payload.id
      state.username = action.payload.username
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.roles = action.payload.roles[0]['name']
    })
  },
});

// Export the reset action and reducer
export default userSlice.reducer;
export const { resetStudent } = userSlice.actions;
