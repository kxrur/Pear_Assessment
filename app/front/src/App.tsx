import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginTeacher from '@v/login/TeacherLoginView.tsx'
import LoginStudent from '@v/login/StudentLoginView.tsx'
import RegisterStudent from '@v/registration/StudentRegView.tsx'
import RegisterTeacher from '@v/registration/TeacherRegView.tsx'
import SuccessLogin from '@v/login/SuccessLoginView.tsx'
import Welcome from '@v/Welcome.tsx';
import AllTeamsView from '@v/team/AllTeamsView.tsx';
import CreateTeamForm from '@v/team/CreateTeamFormView.tsx';



import StudentManagement from '@v/StudentManagement.tsx';
import { TeamViewDelete } from '@v/team/AllTeamsDeleteView.tsx';
import TeamDropdown from '@c/input/Dropdown.tsx';

import { teams } from '@t/SampleData.ts';


export default function App() {

  return (

    <Router>
      <div className='bg-background h-screen w-dvw'>

        <Routes>
          <Route path="/" element={<StudentManagement />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path='/create-team' element={<CreateTeamForm></CreateTeamForm>}
          />
          <Route path="/team-preview" element={<AllTeamsView teams={teams} />} />
          <Route path="/dropdown" element={<TeamDropdown />} />
          <Route path='/home' element={<Welcome />} />
          <Route path="/teacher"
            element={
              <>
                <RegisterTeacher />
                <LoginTeacher />
              </>
            }
          />
          <Route path="/student-management" element={<StudentManagement />} />
          <Route path="/student"
            element={
              <>
                <RegisterStudent />
                <LoginStudent />
              </>
            }
          />
          <Route path="/success-login"
            element={
              <SuccessLogin />
            }
          />
          <Route path="/team-delete-preview"
            element={
              <TeamViewDelete teams={teams} />
            }
          />
        </Routes >
      </div >
    </Router >
  )
}

