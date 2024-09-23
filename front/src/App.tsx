import './App.css'
import RegisterStudent from './components/views/registration/student'
import RegisterTeacher from './components/views/registration/teacher'

function App() {

  return (
    <div className='bg-background h-screen w-dvw'>
      <RegisterTeacher></RegisterTeacher>
      <h1 className="text-3xl font-bold underline text-background">
        Hello world!
      </h1>
    </div>
  )
}

export default App
