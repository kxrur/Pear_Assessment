import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Student } from '@t/types';

export interface TeamSlice {
  id: number | null,
  teacherId: number | null,
  students: Student[]
  teamName: string,
  teamDescription: string,
}

const initialState: TeamSlice = {
  teamName: "",
  teamDescription: "",
  id: null,
  teacherId: null,
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
    updateTeamFromAllTeams: (state, action: PayloadAction<TeamSlice>) => {
      const { id, teacherId, students, teamName, teamDescription } = action.payload;

      state.id = id;
      state.teacherId = teacherId;
      state.students = students;
      state.teamName = teamName;
      state.teamDescription = teamDescription;
    },
    updateTeam: (state, action: PayloadAction<Partial<TeamSlice>>) => {
      const { id, teacherId, students, teamName, teamDescription } = action.payload;

      if (id !== undefined) {
        state.id = id;
      }

      if (teacherId !== undefined) {
        state.teacherId = teacherId;
      }

      if (students) {
        state.students = [...students];
      }
      if (teamName) {
        state.teamName = teamName
      }
      if (teamDescription) {
        state.teamDescription = teamDescription
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
export const { resetTeam, updateTeamFromAllTeams } = teamSlice.actions;
