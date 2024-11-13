import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
interface GableSlice {
  diceRoll: number
  gambleGrade: number
}

const initialState: GableSlice = {
  diceRoll: 0,
  gambleGrade: 0
}


export const approveGamble = createAsyncThunk(
  'gamble-approve/post',
  async ({ teamId, studentId, approve }: { teamId: number, studentId: number, approve: boolean }, { rejectWithValue }) => {

    try {
      const response = await fetch(`http://localhost:8080/api/user/gamble/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: studentId,
          teamId: teamId,
          approve: approve
        })
      });

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data || 'Assessment submission failed');
      }

      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error || 'Network Error');
    }
  }
);

export const gamble = createAsyncThunk(
  'gamble/get',
  async ({ teamId, studentId }: { teamId: number, studentId: number }, { rejectWithValue }) => {

    try {
      const response = await fetch(`http://localhost:8080/api/user/gamble/${teamId}/${studentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data || 'Assessment submission failed');
      }

      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error || 'Network Error');
    }
  }
);

const gambleSlice = createSlice({
  name: 'gamble',
  initialState,
  reducers: {
    resetGamble: (state) => {
      Object.assign(state, initialState)
    },
  }
});

export default gambleSlice.reducer;
export const { resetGamble } = gambleSlice.actions;
