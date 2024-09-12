// Shows all the Teachers + Redirects to the teacher template
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import TeacherDetails from '../components/TeacherDetails'

const Home = () => {

    const [teachers, setTeachers] = useState([])

    const getTeachers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/teacher`)
            setTeachers(response.data);
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getTeacherDetails = async (teacherId) => {
        try {
            const coursesResponse = await axios.get(`http://localhost:5000/teacher/${teacherId}/courses`)
            const coordinationsResponse = await axios.get(`http://localhost:5000/teacher/${teacherId}/coordinations`)

            return {
                courses: coursesResponse.data,
                coordinations: coordinationsResponse.data
            }

        } catch (error) {
            toast.error(`Error fetching details for teacher ${teacherId}: ${error.message}`)
            return {
                courses: [],
                coordinations: []
            }
        }
    }

    useEffect(() => {
        getTeachers()
    }, [])

    return (
        <div>
            <div>
                <div>
                    {
                        teachers.map((teacher, index) => (
                            <div key={index}>
                                <div>
                                    <TeacherDetails key={index} teacher={teacher} getTeacherDetails={getTeacherDetails} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home