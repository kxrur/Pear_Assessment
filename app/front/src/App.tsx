import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';
import LoginTeacher from '@v/login/TeacherLoginView'
import LoginStudent from '@v/login/StudentLoginView'
import RegisterStudent from '@v/registration/StudentRegView'
import RegisterTeacher from '@v/registration/TeacherRegView'
import SuccessLogin from '@v/login/SuccessLoginView'
import Welcome from '@v/Welcome';
import AllTeamsView from '@v/team/AllTeamsView';
import CreateTeamForm from '@v/team/CreateTeamFormView';
import SelectTeammate from '@v/team/SelectTeammate';
import ConfirmationPage from '@c/ui/assessment/ConfirmationPage.tsx';
import Summary from '@v/Summary.tsx'
import MyProfile from '@v/gamble/MyProfile';
import GradePage from '@v/gamble/GradePage';
import GamblePage from '@v/gamble/GamblePage';

import StudentManagement from '@v/StudentManagement';
import TeamViewDelete from '@v/team/AllTeamsDeleteView';
import PublicLayout from '@l/PublicLayout';
import ProtectedLayout from '@l/ProtectedLayout';

import { useEffect } from 'react';

import AssessmentView from '@v/assessment/AssessView';
import { useAppSelector } from '@s/store';
import AddedStudentsView from '@v/confirmation/AddedStudentsConfirmationView';
import DetailedView from '@v/overview/DetailedView';

interface AppRouterProps {
  children: ReactNode;
}

const AppRouter: React.FC<AppRouterProps> = ({ children }) => (
  <Router>{children}</Router>
);

interface AppProps {
  RouterComponent?: React.ComponentType<AppRouterProps>;
}

export default function App({ RouterComponent = AppRouter }: AppProps) {
  const currentUser = useAppSelector((state) => state.user);
  useEffect(() => {
    console.log("Current user updated: ", currentUser);
  }, [currentUser]);

  return (

    <RouterComponent>
      <div className='bg-background h-screen w-dvw'>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>


            <Route path="/welcome" element={<Welcome />} />
            <Route path="/teacher" element={
              <>
                <RegisterTeacher />
                <LoginTeacher />
              </>
            } />
            <Route path="/student" element={
              <>
                <RegisterStudent />
                <LoginStudent />
              </>
            } />
            <Route path="/success-login" element={<SuccessLogin />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<StudentManagement />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/table-student" element={<AddedStudentsView />} />
            <Route path="/create-team" element={<CreateTeamForm />} />
            <Route path="/assess" element={<AssessmentView />} />
            <Route path="/select-teammate" element={<SelectTeammate />} />
            <Route path="/team-preview" element={<AllTeamsView />} />
            <Route path="/student-management" element={<StudentManagement />} />
            <Route path="/team-delete-preview" element={<TeamViewDelete />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/detailed" element={<DetailedView />} />
            <Route path="/gamble" element={<MyProfile />} />
          </Route>
        </Routes >
      </div >
    </RouterComponent >
  )
}
