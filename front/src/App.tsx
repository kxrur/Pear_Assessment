import './App.css'
import LoginTeacher from './components/views/login/teacher'
import LoginStudent from './components/views/login/student'
import RegisterStudent from './components/views/registration/student'
import RegisterTeacher from './components/views/registration/teacher'

function App() {

  return (
    <div className='bg-background h-screen w-dvw'>
      <RegisterTeacher></RegisterTeacher>
      <LoginTeacher></LoginTeacher>
      <LoginStudent></LoginStudent>
    </div>
  )
}

export default App
