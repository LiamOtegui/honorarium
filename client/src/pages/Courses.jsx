import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import CourseDetails from '../components/CourseDetails'
import TeacherCourse from '../components/TeacherCourse'

const Courses = () => {

    const [courses, setCourses] = useState([])
    const [open, setOpen] = useState(false)

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
        <div className='h-screen'>
            <div>
                <button
                onClick={() => setOpen(true)}
                className='ml-64 mt-8 bg-cyan-600 border-[0.2rem] rounded-md border-cyan-700 px-4 py-1 duration-200 hover:bg-cyan-700 text-lg text-white'>
                    Associate Teacher
                </button>
                <button className='ml-10 mt-8 bg-cyan-600 border-[0.2rem] rounded-md border-cyan-700 px-4 py-1 duration-200 hover:bg-cyan-700 text-lg text-white'>
                    Delete association
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
            <TeacherCourse open={open} onClose={() => setOpen(false)}>
                Associate by IDs
            </TeacherCourse>
        </div>
    )
}

export default Courses