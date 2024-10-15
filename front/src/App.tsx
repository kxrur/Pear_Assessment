import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginTeacher from '@v/login/TeacherLoginView'
import LoginStudent from '@v/login/StudentLoginView'
import RegisterStudent from '@v/registration/StudentRegView'
import RegisterTeacher from '@v/registration/TeacherRegView'
import Success from '@v/login/SuccessLoginView'
import Welcome from '@v/Welcome';
import AllTeamsView from './views/team/AllTeamsView';
import CreateTeamForm from './views/team/CreateTeamFormView';



import StudentManagement from '@v/StudentManagement';
import { TeamViewDelete } from '@v/team/TeamDeleteView';
import TeamDropdown from './components/input/dropdown';

import { teams } from '@t/SampleData';


function App() {

  return (

    <Router>
      <div className='bg-background h-screen w-dvw'>

        <Routes>
          <Route path="/" element={<StudentManagement />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path='/create-team' element={<CreateTeamForm></CreateTeamForm>}
          />
          <Route path="/team-preview"
            element={
              <AllTeamsView teams={teams} />
            }

          />
          <Route path="/dropdown" element={<TeamDropdown />} />
          <Route path="/" element={<StudentManagement />} />
          <Route path='/home' element={<Welcome />} />
          <Route path="/teacher"
            element={
              <>
                <RegisterTeacher />
                <LoginTeacher />
              </>
            }
          />


          <Route path="/teamview" element=
            <AllTeamsView teams={teams}></AllTeamsView>
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
          <Route path="/success"
            element={
              <Success />
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

export default App
