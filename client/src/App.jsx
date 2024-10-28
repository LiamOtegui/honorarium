import './App.css'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Landing, Home, TeacherTemplate, Courses, Coordinations, CreateTeacher, CreateCourse, CreateCoordination } from './pages'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthenticateRoute from './components/AuthenticateRoute'
import tecLogo from '../public/tec-logo.svg'

function App() {

  const location = useLocation()
  const landing = location.pathname === '/'

  return (
    <div>
      {
        !landing &&
        <div className='bg-amber-200 min-h-screen w-full'>
          <div className='flex flex-row h-full'>

            <div className='fixed h-full'>
              <nav className='flex flex-col items-center bg-green-900 text-white h-screen'>
                <Link
                  to='/home'
                  className='flex text-3xl font-semibold bg-fuchsia-900 shadow-md text-white px-[3.1rem] py-3 mb-7'>
                  <img src={tecLogo} className='size-[7rem]' />
                </Link>
                <div className='flex flex-col space-y-7 text-center'>
                  <Link
                    to='/home/cursos'
                    className={`text-lg font-semibold border-[0.2rem] shadow-md border-amber-200 text-white p-3 rounded-md hover:bg-green-700 transition-all duration-200 ${location.pathname === '/home/cursos' ? "bg-green-700 hover:bg-green-700 border-amber-300 shadow-lg" : ""}`}>
                    Cursos
                  </Link>
                  <Link
                    to='/home/coordinaciones'
                    className={`text-lg font-semibold border-[0.2rem] shadow-md border-amber-200 text-white p-3 rounded-md hover:bg-green-700 transition-all duration-200 ${location.pathname === '/home/coordinaciones' ? "bg-green-700 hover:bg-green-700 border-amber-300 shadow-lg" : ""}`}>
                    Coordinaciones
                  </Link>
                  <Link
                    to='/home/crear-teacher'
                    className={`text-lg font-semibold border-[0.2rem] shadow-md border-amber-200 text-white p-3 rounded-md hover:bg-green-700 transition-all duration-200 ${location.pathname === '/home/crear-teacher' ? "bg-green-700 hover:bg-green-700 border-amber-300 shadow-lg" : ""}`}>
                    Nuevo Teacher
                  </Link>
                  <Link
                    to='/home/crear-curso'
                    className={`text-lg font-semibold border-[0.2rem] shadow-md border-amber-200 text-white p-3 rounded-md hover:bg-green-700 transition-all duration-200 ${location.pathname === '/home/crear-curso' ? "bg-green-700 hover:bg-green-700 border-amber-300 shadow-lg" : ""}`}>
                    Nuevo Curso
                  </Link>
                  <Link
                    to='/home/crear-coordinacion'
                    className={`text-lg font-semibold border-[0.2rem] shadow-md border-amber-200 text-white p-3 rounded-md hover:bg-green-700 transition-all duration-200 ${location.pathname === '/home/crear-coordinacion' ? "bg-green-700 hover:bg-green-700 border-amber-300 shadow-lg" : ""}`}>
                    Nueva Coordinación
                  </Link>
                </div>
              </nav>
            </div>

            <Routes>
              <Route path='/home' element={<AuthenticateRoute><Home /></AuthenticateRoute>} />
              <Route path='/home/:id' element={<AuthenticateRoute><TeacherTemplate /></AuthenticateRoute>} />
              <Route path='/home/cursos' element={<AuthenticateRoute><Courses /></AuthenticateRoute>} />
              <Route path='/home/coordinaciones' element={<AuthenticateRoute><Coordinations /></AuthenticateRoute>} />
              <Route path='/home/crear-teacher' element={<AuthenticateRoute><CreateTeacher /></AuthenticateRoute>} />
              <Route path='/home/crear-curso' element={<AuthenticateRoute><CreateCourse /></AuthenticateRoute>} />
              <Route path='/home/crear-coordinacion' element={<AuthenticateRoute><CreateCoordination /></AuthenticateRoute>} />
              <Route index element={<Landing />} />
            </Routes>

          </div>
        </div>
      }

      { landing && <Landing /> }

      <ToastContainer />
    </div>
  )
}

export default App