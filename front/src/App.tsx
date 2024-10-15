import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginTeacher from '@v/login/TeacherLoginView'
import LoginStudent from '@v/login/StudentLoginView'
import RegisterStudent from '@v/registration/StudentRegView'
import RegisterTeacher from '@v/registration/TeacherRegView'
import Success from '@v/login/SuccessLoginView'
import Welcome from '@v/Welcome';
import { TeamView, Team } from './views/AllTeamsView';
import { TeamPreview } from './components/ui/TeamPreview';
import CreateTeamForm from './TeacherPage/CreateTeamForm';



import StudentManagement from './TeacherPage/studentmanagement';
//import { TeamView } from './components/views/team/TeamView';
import { TeamViewDelete } from '@v/team/TeamDeleteView';
import StudentTable from './components/StudentTable';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ButtonOpenFile from './components/input/buttonOpenFile';
import TeamDropdown from './components/input/dropdown';

function App() {
  const teams = [
    {
      teamName: 'Team Alpha',
      teamMembers: ['Alice', 'Bob', 'Charlie'],
      teamDescription: 'A team of talented individuals working on innovative projects.',
    },
    {
      teamName: "Dev Team",
      teamMembers: ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank'],
      teamDescription: "We are a team of developers working on cutting-edge technology projects. Our focus is on creating efficient, scalable, and innovative solutions. team description Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. "
    },
    {
      teamName: 'Team Gamma',
      teamMembers: ['Grace', 'Heidi', 'Ivan'],
      teamDescription: 'Specializing in design and user experience.',
    },
    {
      teamName: 'Team Alpha',
      teamMembers: ['Alice', 'Bob', 'Charlie'],
      teamDescription: 'A team of talented individuals working on innovative projects.',
    },
    {
      teamName: 'Team Beta',
      teamMembers: ['David', 'Eve', 'Frank'],
      teamDescription: 'Focused on developing cutting-edge technology solutions.',
    },
    {
      teamName: 'Team Gamma',
      teamMembers: ['Grace', 'Heidi', 'Ivan'],
      teamDescription: 'Specializing in design and user experience.',
    },
  ];
  return (

    <Router>
      <div className='bg-background h-screen w-dvw'>

        <Routes>
          {/* Default Route - When user accesses the root URL, show this component */}
          <Route path="/" element={<StudentManagement />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path='/create-team' element={<CreateTeamForm></CreateTeamForm>}
          />
          <Route path="/team-preview"
            element={
              <>
                <TeamView teams={teams} />
              </>
            }

          />
          <Route path="/" element={<TeamDropdown />} />
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
          {/* Sidebar */}


          <Route path="/teamview" element=
            <>
              <TeamView teams={teams}></TeamView>
            </>
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
              <>
                <Success />
              </>
            }
          />
          <Route path="/team-delete-preview"
            element={
              <>
                <TeamViewDelete teams={teams} />
              </>
            }
          />


        </Routes >

      </div >
    </Router >
  )
}

export default App
