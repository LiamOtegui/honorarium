import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import CourseDetails from '../components/CourseDetails'
import TeacherCourse from '../components/TeacherCourse'

const Courses = () => {

    const [courses, setCourses] = useState([])
    const [openCreate, setOpenCreate] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const getCourses = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/course`)
            const sortedCourses = response.data.sort((a, b) => a.name.localeCompare(b.name))
            setCourses(sortedCourses)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getCourses()
    }, [])

    return (
        <div className='h-full'>
            <div>
                <button
                onClick={() => setOpenCreate(true)}
                className='ml-64 mt-8 bg-green-700 border-[0.2rem] rounded-md border-green-800 px-4 py-1 duration-200 hover:bg-green-600 text-lg text-white'>
                    Asociar Teacher
                </button>
                <button
                onClick={() => setOpenDelete(true)}
                className='ml-10 mt-8 bg-green-700 border-[0.2rem] rounded-md border-green-800 px-4 py-1 duration-200 hover:bg-green-600 text-lg text-white'>
                    Eliminar asociación
                </button>
            </div>
            <div>
                {
                    courses.map((course, index) => (
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