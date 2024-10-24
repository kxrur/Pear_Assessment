import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AssessmentData } from '@t/types';
import { useAppSelector } from '@s/store';

interface AssessSlice {
  dbAssesseeId: number | null,
  assesseeId: string | null,
  assessmentData: AssessmentData
}

const initialState: AssessSlice = {
  dbAssesseeId: null,
  assesseeId: null,
  assessmentData: {
    cooperation: {
      stars: 0,
      comment: "",
    },
    conceptual: {
      stars: 0,
      comment: "",
    },
    practical: {
      stars: 0,
      comment: "",
    },
    workEthic: {
      stars: 0,
      comment: "",
    },
  }
};

export const assessStudent = createAsyncThunk(
  'registration-teacher/fetch',
  async (formData: AssessmentData, { rejectWithValue }) => {
    const graderId = useAppSelector((state) => state.user.id);
    const dbAssesseeId = useAppSelector((state) => state.assess.dbAssesseeId);

    //TODO: adapt to have all evaluation criteria
    const rating = formData.conceptual.stars;
    try {
      const response = await fetch(`http://localhost:8080/api/teams/evaluate/${graderId}/rate/${dbAssesseeId}?rating=${rating}`, {
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

const assessSlice = createSlice({
  name: 'assess',
  initialState,
  reducers: {
    resetAssessment: (state) => {
      Object.assign(state, initialState)
    },
    updateAssessment: (state, action: PayloadAction<Partial<AssessmentData>>) => {
      Object.keys(action.payload).forEach((key) => {
        const assessmentKey = key as keyof AssessmentData;
        state.assessmentData[assessmentKey] = {
          ...state.assessmentData[assessmentKey],
          ...action.payload[assessmentKey],
        };
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(assessStudent.fulfilled, (state, action) => {
      console.log("succesfull assessment")
    })
  },
});

export default assessSlice.reducer;
export const { resetAssessment, updateAssessment } = assessSlice.actions;
