import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginTeacher from './components/views/login/teacher'
import LoginStudent from './components/views/login/student'
import RegisterStudent from './components/views/registration/student'
import RegisterTeacher from './components/views/registration/teacher'
import Success from './components/views/success'
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

            </Routes>
 
          </div>
    </Router>
  )
}

export default App