import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import CourseDetails from '../components/CourseDetails'

const Courses = () => {

    const [courses, setCourses] = useState([])

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
        </div>
    )
}

export default Courses