import './App.css'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Landing, Home, TeacherTemplate, Courses, Coordinations, CreateTeacher, CreateCourse, CreateCoordination } from './pages'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  const location = useLocation()

  return (
    <div className='bg-cyan-500 min-h-screen w-full'>
      <div className='flex flex-row'>

        <div className='fixed'>
          <nav className='flex flex-col items-center bg-cyan-600 text-white h-screen'>
            <Link
              to='/home'
              className='flex text-3xl font-semibold bg-cyan-700 shadow-md text-white px-20 py-3 mb-7'>
              TEC
            </Link>
            <div className='flex flex-col space-y-7 text-center'>
              <Link
                to='/home/courses'
                className={`text-lg font-semibold border-[0.2rem] shadow-md border-cyan-700 text-white p-3 rounded-md hover:bg-cyan-700 transition-all duration-200 ${location.pathname === '/home/courses' ? "bg-cyan-800 hover:bg-cyan-800 border-cyan-900 shadow-lg" : ""}`}>
                Courses
              </Link>
              <Link
                to='/home/coordinations'
                className={`text-lg font-semibold border-[0.2rem] shadow-md border-cyan-700 text-white p-3 rounded-md hover:bg-cyan-700 transition-all duration-200 ${location.pathname === '/home/coordinations' ? "bg-cyan-800 hover:bg-cyan-800 border-cyan-900 shadow-lg" : ""}`}>
                Coordinations
              </Link>
              <Link
                to='/home/create-teacher'
                className={`text-lg font-semibold border-[0.2rem] shadow-md border-cyan-700 text-white p-3 rounded-md hover:bg-cyan-700 transition-all duration-200 ${location.pathname === '/home/create-teacher' ? "bg-cyan-800 hover:bg-cyan-800 border-cyan-900 shadow-lg" : ""}`}>
                New Teacher
              </Link>
              <Link
                to='/home/create-course'
                className={`text-lg font-semibold border-[0.2rem] shadow-md border-cyan-700 text-white p-3 rounded-md hover:bg-cyan-700 transition-all duration-200 ${location.pathname === '/home/create-course' ? "bg-cyan-800 hover:bg-cyan-800 border-cyan-900 shadow-lg" : ""}`}>
                New Course
              </Link>
              <Link
                to='/home/create-coordination'
                className={`text-lg font-semibold border-[0.2rem] shadow-md border-cyan-700 text-white p-3 rounded-md hover:bg-cyan-700 transition-all duration-200 ${location.pathname === '/home/create-coordination' ? "bg-cyan-800 hover:bg-cyan-800 border-cyan-900 shadow-lg" : ""}`}>
                New Coordination
              </Link>
            </div>
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
    </div>
  )
}

export default App