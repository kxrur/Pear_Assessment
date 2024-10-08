import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginTeacher from './components/views/login/teacher';
import LoginStudent from './components/views/login/student';
import RegisterStudent from './components/views/registration/student';
import RegisterTeacher from './components/views/registration/teacher';
import Success from './components/views/success';
import Begin from './components/views/Begin';
import { TeamView } from './TeacherPage/TeamView';
import StudentManagement from './TeacherPage/studentmanagement';

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
      teamDescription: "We are a team of developers working on cutting-edge technology projects.",
    },
    {
      teamName: 'Team Gamma',
      teamMembers: ['Grace', 'Heidi', 'Ivan'],
      teamDescription: 'Specializing in design and user experience.',
    },
    {
      teamName: 'Team Beta',
      teamMembers: ['David', 'Eve', 'Frank'],
      teamDescription: 'Focused on developing cutting-edge technology solutions.',
    },
  ];

  return (
    <Router>
      <div className='bg-background h-screen w-dvw'>
        <Routes>
          {/* Default Route - When user accesses the root URL, show this component */}
          <Route path="/" element={<StudentManagement />} />
          <Route path="/begin" element={<Begin />} />
          
          <Route path="/team-preview" element={<TeamView teams={teams} />} />

          {/* Teacher and Student Routes */}
          <Route path="/teacher/login" element={<LoginTeacher />} />
          <Route path="/teacher/register" element={<RegisterTeacher />} />
          
          <Route path="/student/login" element={<LoginStudent />} />
          <Route path="/student/register" element={<RegisterStudent />} />
          
          <Route path="/success" element={<Success />} />

          {/* If you want to use TeamView in the teacher's management, adjust as necessary */}
          <Route path="/studentmanagement" element={<StudentManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
