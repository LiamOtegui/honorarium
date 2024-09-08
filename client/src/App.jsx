import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Landing, Home, Teachers, Courses, Coordinations, CreateTeacher, CreateCourse, CreateCoordination } from './pages'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
      <div className=''>

        <Routes>
          <Route index element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home/teachers' element={<Teachers />} />
          <Route path='/home/courses' element={<Courses />} />
          <Route path='/home/coordinations' element={<Coordinations />} />
          <Route path='/home/create-teacher' element={<CreateTeacher />} />
          <Route path='/home/create-course' element={<CreateCourse />} />
          <Route path='/home/create-coordination' element={<CreateCoordination />} />
        </Routes>

        <ToastContainer />
      </div>
    </>
  )
}

export default App