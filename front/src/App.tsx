import './App.css'
import LoginTeacher from './components/views/login-teacher'
import RegisterStudent from './components/views/registration/student'
import RegisterTeacher from './components/views/registration/teacher'

function App() {

  return (
    <div className='bg-background h-screen w-dvw'>
      <RegisterStudent></RegisterStudent>
      <LoginTeacher></LoginTeacher>
      <h1 className="text-3xl font-bold underline text-background">
        Hello world!
      </h1>
    </div>
  )
}

export default App
