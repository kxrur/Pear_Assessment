import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageStudent from '@v/teacher/PageStudent';
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


import StudentManagement from '@v/StudentManagement';
import { TeamViewDelete } from '@v/team/AllTeamsDeleteView';
import TeamDropdown from '@c/input/Dropdown';
import PublicLayout from '@l/PublicLayout';
import ProtectedLayout from '@l/ProtectedLayout';

import { useEffect } from 'react';

import { teams } from '@t/SampleData';
import AssessmentView from '@v/assessment/AssessView';
import { useAppSelector } from '@s/store';

// Define a type for the expected props for the router
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
            <Route path="/assess" element={<AssessmentView />} />
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
            <Route path="/create-team" element={<CreateTeamForm />} />
            <Route path='/student-page' element={<PageStudent />} />
            <Route path="/select-teammat" element={<SelectTeammate />} />
            <Route path="/team-preview" element={<AllTeamsView teams={teams} />} />
            <Route path="/dropdown" element={<TeamDropdown />} />
            <Route path="/student-management" element={<StudentManagement />} />
            <Route path="/team-delete-preview" element={<TeamViewDelete teams={teams} />} />
          </Route>
        </Routes >
      </div >
    </RouterComponent >
  )
}
