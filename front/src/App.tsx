import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginTeacher from '@v/login/TeacherLoginView'
import LoginStudent from '@v/login/StudentLoginView'
import RegisterStudent from '@v/registration/StudentRegView'
import RegisterTeacher from '@v/registration/TeacherRegView'
import SuccessLogin from '@v/login/SuccessLoginView'
import Welcome from '@v/Welcome';
import AllTeamsView from '@v/team/AllTeamsView';
import CreateTeamForm from '@v/team/CreateTeamFormView';



import StudentManagement from '@v/StudentManagement';
import { TeamViewDelete } from '@v/team/AllTeamsDeleteView';
import TeamDropdown from '@c/input/Dropdown';

import { teams } from '@t/SampleData';


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
          <Route path="/studentmanagement" element={<StudentManagement />} />
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

