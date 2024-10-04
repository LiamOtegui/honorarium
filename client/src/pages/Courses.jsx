import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import CourseDetails from '../components/CourseDetails'
import TeacherCourse from '../components/TeacherCourse'

const Courses = () => {

    const [courses, setCourses] = useState([])
    const [openCreate, setOpenCreate] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const [filteredCourses, setFilteredCourses] = useState([])

    const [searchedCourse, setSearchedCourse] = useState("")

    const getCourses = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/course`)
            const sortedCourses = response.data.sort((a, b) => a.name.localeCompare(b.name))
            setCourses(sortedCourses)
            setFilteredCourses(sortedCourses)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getCourses()
    }, [])

    useEffect(() => {
        setFilteredCourses(
            courses.filter((course) => course.name.toLowerCase().includes(searchedCourse.toLowerCase()))
        )
    }, [searchedCourse, courses])

    return (
        <div className='h-full'>

            <nav className='flex fixed w-full ml-[13.1rem] bg-fuchsia-900 py-[0.63rem] text-white'>
                <div className='flex justify-center ml-[0.5rem]'>
                    <input
                        type='text'
                        placeholder='Buscar curso...'
                        className='py-2 pl-3 pr-10 rounded-md text-black focus:outline-none'
                        value={searchedCourse}
                        onChange={(event) => setSearchedCourse(event.target.value)}
                    />
                </div>
                <button
                    onClick={() => setOpenCreate(true)}
                    className='ml-5 bg-fuchsia-800 border-[0.1rem] border-fuchsia-950 rounded-lg px-4 py-1 duration-200 hover:bg-fuchsia-700 text-lg text-white'>
                    Asociar Teacher
                </button>
                <button
                    onClick={() => setOpenDelete(true)}
                    className='ml-5 bg-fuchsia-800 border-[0.1rem] border-fuchsia-950 rounded-lg px-4 py-1 duration-200 hover:bg-fuchsia-700 text-lg text-white'>
                    Eliminar asociación
                </button>
            </nav>

            <div className='mt-[5rem]'>
                {
                    filteredCourses.map((course, index) => (
                        <div key={index}>
                            <div>
                                <CourseDetails course={course} />
                            </div>
                        </div>
                    ))
                }
            </div>
            <TeacherCourse openCreate={openCreate} openDelete={openDelete} onCloseCreate={() => setOpenCreate(false)} onCloseDeleted={() => setOpenDelete(false)}>
                Asociar Teacher:
            </TeacherCourse>
        </div>
    )
}

export default Courses