import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Student, Teacher } from '@t/types';
import { RootState } from './store';

export interface TeamSlice {
  id: number | null;
  teacher: Teacher
  students: Student[]
}

const initialState: TeamSlice = {
  id: null,
  teacher: {
    id: 0,
    firstName: "",
    lastName: "",
    username: "",
  },
  students: [
    {
      id: 0,
      name: "",
      studentId: "",
      teamName: "",
      averageGrade: 0,
    }
  ]
};

export const editTeam = createAsyncThunk(
  'edit-team/post',
  async (formData: string, { rejectWithValue }) => {
    try {
      //TODO: add team modification here
      const response = await fetch(`http://localhost:8080/api/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Assessment submission failed');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error || 'Network Error');
    }
  }
);

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    resetTeam: (state) => {
      Object.assign(state, initialState)
    },

    updateTeam: (state, action: PayloadAction<Partial<TeamSlice>>) => {
      const { id, teacher, students } = action.payload;

      if (id !== undefined) {
        state.id = id;
      }

      if (teacher) {
        state.teacher = {
          ...state.teacher,
          ...teacher,
        };
      }

      if (students) {
        state.students = [...students];
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(editTeam.fulfilled, (state, action) => {
      console.log("succesfull edit")
    })
  },
});

export const findStudentById = (state: TeamSlice, id: number) => {
  return state.students.find(student => student.id === id)
};

export default teamSlice.reducer;
export const { resetTeam } = teamSlice.actions;
