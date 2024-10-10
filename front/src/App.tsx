import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginTeacher from './components/views/login/teacher';
import LoginStudent from './components/views/login/student';
import RegisterStudent from './components/views/registration/student';
import RegisterTeacher from './components/views/registration/teacher';
import Success from './components/views/success';
import Begin from './components/views/Begin';
import TeamView from './TeacherPage/TeamView';
import StudentManagement from './TeacherPage/studentmanagement';
import React, { useState } from 'react';

// Define the Team interface
interface Team {
  teamName: string;
  teamMembers: string[];
  teamDescription: string;
}

function App() {
  // State to hold the list of teams
  const [teams, setTeams] = useState<Team[]>([
    {
      teamName: 'Team Alpha',
      teamMembers: ['Alice', 'Bob', 'Charlie'],
      teamDescription: 'A team of talented individuals working on innovative projects.',
    },
    {
      teamName: "Dev Team",
      teamMembers: ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank'],
      teamDescription: "We are a team of developers working on cutting-edge technology projects. Our focus is on creating efficient, scalable, and innovative solutions.",
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
  ]);

  // Function to add a new team to the state
  const addTeam = (team: Team) => {
    setTeams((prevTeams) => [...prevTeams, team]); // Update teams state
  };

  return (
    <Router>
      <div className='bg-background h-screen w-dvw'>
        <Routes>
          {/* Default Route - When user accesses the root URL, show this component */}
          <Route path="/" element={<StudentManagement />} />
          <Route path="/begin" element={<Begin />} />
          <Route path="/teamview" element={<TeamView teams={teams} addTeam={addTeam} />} />
          <Route path="/teacher" element={
            <>
              <RegisterTeacher />
              <LoginTeacher />
            </>
          } />
          {/* Sidebar */}
          <Route path="/" element={<StudentManagement />} />
          <Route path="/student" element={
            <>
              <RegisterStudent />
              <LoginStudent />
            </>
          } />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
