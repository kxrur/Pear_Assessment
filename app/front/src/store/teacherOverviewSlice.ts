
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Student, Team } from './allTeamsSlice';

export interface Summary {
  studentId: number,
  lastName: string,
  firstName: string,
  teamName: string,
  cooperationR: string,
  conceptualR: string,
  practicalR: string,
  workEthic: string,
  average: string,
  nbResponses: number
}

interface StudentRating {
  teammateName: string
  cooperationRating: number
  conceptualRating: number
  practicalRating: number
  workEthicRating: number
  cooperationComment: string
  conceptualComment: string
  practicalComment: string
  workEthicComment: string
  averageRating: number
}

export interface Detailed {
  team: Team,
  student: Student,
  studentRatings: StudentRating[]
}

interface TeacherStudentsView {
  summary: Summary[],
  detailed: Detailed[]
}
const initialState: TeacherStudentsView = {
  summary: [
    {
      studentId: 0,
      lastName: "",
      firstName: "",
      teamName: "",
      cooperationR: "",
      conceptualR: "",
      practicalR: "",
      workEthic: "",
      average: "",
      nbResponses: 0
    },
  ],
  detailed: [{
    team: {
      teamName: "",
      teacherId: null,
      id: null,
      students: [
        {
          id: 0,
          firstName: "",
          lastName: "",
          studentId: "",
          teamName: "",
          averageGrade: 0,
        }
      ]
    },
    student: {
      id: 0,
      firstName: "",
      lastName: "",
      studentId: "",
      teamName: "",
      averageGrade: 0,
    },
    studentRatings: [
      {
        teammateName: "",
        cooperationRating: 0,
        conceptualRating: 0,
        practicalRating: 0,
        workEthicRating: 0,
        cooperationComment: "",
        conceptualComment: "",
        practicalComment: "",
        workEthicComment: "",
        averageRating: 0
      }
    ]
  }]
}


export const fetchTeacherDetailedStudentOverview = createAsyncThunk(
  'teacher_detailed_overview/fetch',
  async (teamId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/api/teams/detailed-view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamId: teamId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data || 'fetchTeacherDetailedStudentOverview failed');
      }

      console.log("data: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error || 'Network Error');
    }
  }
);

export const fetchTeacherStudentsOverview = createAsyncThunk<Summary[], number>(
  'teacher_summary_overview/fetch',
  async (teacherId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/api/teams/summary-view/${teacherId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data || 'fetchTeacherStudentsOverview failed');
      }

      console.log("data: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error || 'Network Error');
    }
  }
);

const teacherOverviewSlice = createSlice({
  name: 'teacherOverview',
  initialState,
  reducers: {
    resetTeacherOverview: (state) => {
      Object.assign(state, initialState)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeacherStudentsOverview.fulfilled, (state, action: PayloadAction<Summary[]>) => {
      state.summary = action.payload;
    });
    builder.addCase(fetchTeacherStudentsOverview.rejected, (_, action) => {
      console.error('fetchTeacherStudentsOverview failed:', action.payload);
    });
    builder.addCase(fetchTeacherDetailedStudentOverview.fulfilled, (state, action: PayloadAction<{
      team: {
        id: number;
        professorID: number;
        teamName: string;
        students: {
          id: number;
          firstName: string;
          lastName: string;
          studentId: number;
          averageGrade?: number;
        }[];
      },
      student: {
        id: number;
        firstName: string;
        lastName: string;
        studentId: number;
        averageGrade?: number;
      },
      studentRatings: {
        teammateName: string;
        cooperationRating: number;
        conceptualRating: number;
        practicalRating: number;
        workEthicRating: number;
        cooperationComment: string;
        conceptualComment: string;
        practicalComment: string;
        workEthicComment: string;
        averageRating: number;
      }[]
    }[]>) => {
      // Define temporary types to avoid using `any`
      type ApiStudent = {
        id: number;
        firstName: string;
        lastName: string;
        studentId: number;
        averageGrade?: number;
      };

      type ApiTeam = {
        id: number;
        professorID: number;
        teamName: string;
        students: ApiStudent[];
      };

      type ApiStudentRating = {
        teammateName: string;
        cooperationRating: number;
        conceptualRating: number;
        practicalRating: number;
        workEthicRating: number;
        cooperationComment: string;
        conceptualComment: string;
        practicalComment: string;
        workEthicComment: string;
        averageRating: number;
      };

      type ApiDetailed = {
        team: ApiTeam;
        student: ApiStudent;
        studentRatings: ApiStudentRating[];
      };

      // Map API response to state structure
      state.detailed = action.payload.map((item: ApiDetailed) => ({
        team: {
          id: item.team.id,
          teamName: item.team.teamName,
          teacherId: item.team.professorID,
          students: item.team.students.map((s) => ({
            id: s.id,
            firstName: s.firstName,
            lastName: s.lastName,
            studentId: s.studentId.toString(),
            teamName: item.team.teamName,
            averageGrade: s.averageGrade || 0
          }))
        },
        student: {
          id: item.student.id,
          firstName: item.student.firstName,
          lastName: item.student.lastName,
          studentId: item.student.studentId.toString(),
          teamName: item.team.teamName,
          averageGrade: item.student.averageGrade || 0
        },
        studentRatings: item.studentRatings.map((rating) => ({
          teammateName: rating.teammateName,
          cooperationRating: rating.cooperationRating,
          conceptualRating: rating.conceptualRating,
          practicalRating: rating.practicalRating,
          workEthicRating: rating.workEthicRating,
          cooperationComment: rating.cooperationComment,
          conceptualComment: rating.conceptualComment,
          practicalComment: rating.practicalComment,
          workEthicComment: rating.workEthicComment,
          averageRating: rating.averageRating
        }))
      }));
    });
    builder.addCase(fetchTeacherDetailedStudentOverview.rejected, (_, action) => {
      console.error('fetchTeacherDetailedStudentOverview failed:', action.payload);
    });
  },
});

export function getSummaryByStudentIdAndTeam(
  summary: Summary[],
  studentId: number,
  teamName: string
): Summary | undefined {
  console.log(studentId, teamName)
  return summary.find(
    (student) => student.studentId === studentId && student.teamName === teamName
  );
};

export default teacherOverviewSlice.reducer;
export const { resetTeacherOverview } = teacherOverviewSlice.actions;
