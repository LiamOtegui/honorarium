import './App.css'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Landing, Home, TeacherTemplate, Courses, Coordinations, CreateTeacher, CreateCourse, CreateCoordination } from './pages'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import tecLogo from '../public/tec-logo.svg'

function App() {

  const location = useLocation()

  return (
    <div className='bg-yellow-300 min-h-screen w-full'>
      <div className='flex flex-row h-full'>

        <div className='fixed h-full'>
          <nav className='flex flex-col items-center bg-green-950 text-white h-screen'>
            <Link
              to='/home'
              className='flex text-3xl font-semibold bg-fuchsia-900 shadow-md text-white px-20 py-3 mb-7'>
              <div>
                TEC
              </div>
            </Link>
            <div className='flex flex-col space-y-7 text-center'>
              <Link
                to='/home/cursos'
                className={`text-lg font-semibold border-[0.2rem] shadow-md border-yellow-500 text-white p-3 rounded-md hover:bg-yellow-500 transition-all duration-200 ${location.pathname === '/home/cursos' ? "bg-yellow-500 hover:bg-yellow-500 border-yellow-500 shadow-lg" : ""}`}>
                Cursos
              </Link>
              <Link
                to='/home/coordinaciones'
                className={`text-lg font-semibold border-[0.2rem] shadow-md border-yellow-500 text-white p-3 rounded-md hover:bg-yellow-500 transition-all duration-200 ${location.pathname === '/home/coordinaciones' ? "bg-yellow-500 hover:bg-yellow-500 border-yellow-500 shadow-lg" : ""}`}>
                Coordinaciones
              </Link>
              <Link
                to='/home/crear-teacher'
                className={`text-lg font-semibold border-[0.2rem] shadow-md border-yellow-500 text-white p-3 rounded-md hover:bg-yellow-500 transition-all duration-200 ${location.pathname === '/home/crear-teacher' ? "bg-yellow-500 hover:bg-yellow-500 border-yellow-500 shadow-lg" : ""}`}>
                Nuevo Teacher
              </Link>
              <Link
                to='/home/crear-curso'
                className={`text-lg font-semibold border-[0.2rem] shadow-md border-yellow-500 text-white p-3 rounded-md hover:bg-yellow-500 transition-all duration-200 ${location.pathname === '/home/crear-curso' ? "bg-yellow-500 hover:bg-yellow-500 border-yellow-500 shadow-lg" : ""}`}>
                Nuevo Curso
              </Link>
              <Link
                to='/home/crear-coordinacion'
                className={`text-lg font-semibold border-[0.2rem] shadow-md border-yellow-500 text-white p-3 rounded-md hover:bg-yellow-500 transition-all duration-200 ${location.pathname === '/home/crear-coordinacion' ? "bg-yellow-500 hover:bg-yellow-500 border-yellow-500 shadow-lg" : ""}`}>
                Nueva Coordinación
              </Link>
            </div>
          </nav>
        </div>

        <Routes>
          <Route index element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home/:id' element={<TeacherTemplate />} />
          <Route path='/home/cursos' element={<Courses />} />
          <Route path='/home/coordinaciones' element={<Coordinations />} />
          <Route path='/home/crear-teacher' element={<CreateTeacher />} />
          <Route path='/home/crear-curso' element={<CreateCourse />} />
          <Route path='/home/crear-coordinacion' element={<CreateCoordination />} />
        </Routes>

        <ToastContainer />
      </div>
    </div>
  )
}

export default App