import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginTeacher from './components/views/login/teacher'
import LoginStudent from './components/views/login/student'
import RegisterStudent from './components/views/registration/student'
import RegisterTeacher from './components/views/registration/teacher'
import Success from './components/views/success'
import Begin from './components/views/Begin';
import { TeamView } from './components/views/team/TeamView';
import StudentTable from './components/StudentTable';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ButtonOpenFile from './components/input/buttonOpenFile';

import StudentManagement from './pages/studentmanagement';
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
          <Route path="/" element={<ButtonOpenFile />} />
          <Route path="/" element={<StudentManagement />} />
          <Route path='/home' element = { <Begin/>}/>
          <Route path="/teacher"
            element={
              <>
                <RegisterTeacher />
                <LoginTeacher />
              </>
            }
          />

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
          <Route path="/team-preview"
            element={
              <>
                <TeamView teams={teams} />
              </>
            }
          />


        </Routes>

      </div>
    </Router>
  )
}

export default App
