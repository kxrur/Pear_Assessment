import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AssessmentData } from '@t/types';
import { toast } from 'react-toastify';

interface AssessSlice {
  dbAssesseeId: number | null,
  assesseeId: string | null,
  assesseeFirstName: string,
  assesseeLastName: string,
  assessmentData: AssessmentData
}

const initialState: AssessSlice = {
  dbAssesseeId: null,
  assesseeId: null,
  assesseeFirstName: "",
  assesseeLastName: "",
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
  'assessment/post',
  async ({ formData, graderId, dbAssesseeId }: { formData: AssessmentData; graderId: number | null; dbAssesseeId: number | null }, { rejectWithValue }) => {
    if (!graderId || !dbAssesseeId) {
      return rejectWithValue('Missing graderId or dbAssesseeId');
    }

    //TODO: adapt to have all evaluation criteria
    const rating = formData.conceptual.stars;
    console.log(`http://localhost:8080/api/teams/evaluate/${graderId}/rate/${dbAssesseeId}?rating=${rating}`);
    try {
      const response = await fetch(`http://localhost:8080/api/teams/evaluate/${graderId}/rate/${dbAssesseeId}?rating=${rating}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: "",
      });

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data || 'Assessment submission failed');
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
    updateAssessee: (state, action: PayloadAction<{ studentId: string, firstName: string, lastName: string, id: number }>) => {
      state.assesseeId = action.payload.studentId;
      state.assesseeFirstName = action.payload.firstName;
      state.assesseeLastName = action.payload.lastName;
      state.dbAssesseeId = action.payload.id;
    }
  },
  extraReducers(builder) {
    builder.addCase(assessStudent.fulfilled, (state, action) => {
      toast.success("assessment submitted")
      console.log("succesfull assessment")
    })
    builder.addCase(assessStudent.rejected, (state, action) => {
      toast.error("error submitting the assessment")
      console.log("ERROR: " + action.error.message)
    })
  },
});

export default assessSlice.reducer;
export const { resetAssessment, updateAssessment, updateAssessee } = assessSlice.actions;
