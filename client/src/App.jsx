import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Landing, Home, TeacherTemplate, Courses, Coordinations, CreateTeacher, CreateCourse, CreateCoordination } from './pages'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'

function App() {

  return (
    <>
      <div className=''>

        <div className='flex flex-row'>
          <nav>
            TEC School of English
            <Link to='/home/courses'>
              Courses
            </Link>
            <Link to='/home/coordinations'>
              Coordinations
            </Link>
          </nav>
        </div>

        <Routes>
          <Route index element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home/:id' element={<TeacherTemplate />} />
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