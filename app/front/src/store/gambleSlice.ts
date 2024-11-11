import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
interface GableSlice {
  diceRoll: number
  gambleGrade: number
}

const initialState: GableSlice = {
  diceRoll: 0,
  gambleGrade: 0
}

export const assessStudent = createAsyncThunk(
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
