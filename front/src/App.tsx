import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginTeacher from './components/views/login/teacher'
import LoginStudent from './components/views/login/student'
import RegisterStudent from './components/views/registration/student'
import RegisterTeacher from './components/views/registration/teacher'
import Success from './components/views/success'
import { TeamPreview } from './components/views/team/TeamPreview';
function App() {

  return (
    <Router>
      <div className='bg-background h-screen w-dvw'>

        <Routes>
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
          <Route path="/"
            element={
              <>
                <TeamPreview
                  teamName="Dev Team"
                  teamMembers={['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank']}
                  teamDescription="We are a team of developers working on cutting-edge technology projects. Our focus is on creating efficient, scalable, and innovative solutions. team description Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. "
                />
              </>
            }
          />

        </Routes>

      </div>
    </Router>
  )
}

export default App
