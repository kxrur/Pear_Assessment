import './App.css'
import LoginTeacher from './components/views/login-teacher'
import RegisterStudent from './components/views/registration/student'
import RegisterTeacher from './components/views/registration/teacher'
import LoginStudent from "./components/views/login-student.tsx";

function App() {

  return (
    <div className='bg-background h-screen w-dvw'>
      <RegisterTeacher></RegisterTeacher>
      <LoginStudent></LoginStudent>
      <h1 className="text-3xl font-bold underline text-background">
      </h1>
    </div>
  )
}

export default App
