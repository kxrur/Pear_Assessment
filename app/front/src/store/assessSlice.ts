import { encodeFormData } from '@f/apiHelper';
import { UTurnRightSharp } from '@mui/icons-material';
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
      comment: "no comment",
    },
    conceptual: {
      stars: 0,
      comment: "no comment",
    },
    practical: {
      stars: 0,
      comment: "no comment",
    },
    workEthic: {
      stars: 0,
      comment: "no comment",
    },
  }
};

export const assessStudent = createAsyncThunk(
  'assessment/post',
  async ({ formData: { cooperation, conceptual, practical, workEthic }, graderId, dbAssesseeId }: { formData: AssessmentData; graderId: number | null; dbAssesseeId: number | null }, { rejectWithValue }) => {
    if (!graderId || !dbAssesseeId) {
      return rejectWithValue('Missing graderId or dbAssesseeId');
    }

    const bodyData = {
      cooperation_rating: cooperation.stars.toString(),
      cooperation_comment: cooperation.comment,
      conceptual_contribution_rating: conceptual.stars.toString(),
      conceptual_contribution_comment: conceptual.comment,
      practical_contribution_rating: practical.stars.toString(),
      practical_contribution_comment: practical.comment,
      work_ethic_rating: workEthic.stars.toString(),
      work_ethic_comment: workEthic.comment,
    };

    const encodedBody = encodeFormData(bodyData);
    console.log(encodedBody)
    console.log(`http://localhost:8080/api/teams/evaluate/${graderId}/rate/${dbAssesseeId}`);
    try {
      const response = await fetch(`http://localhost:8080/api/teams/evaluate/${graderId}/rate/${dbAssesseeId}?${encodedBody.toString()}`, {
        method: 'POST',
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
