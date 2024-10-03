import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import TeacherDetails from '../components/TeacherDetails'

const Home = () => {

    const [teachers, setTeachers] = useState([])

    const [searchTerm, setSearchTerm] = useState('')
    const [filteredTeachers, setFilteredTeachers] = useState([])

    const getTeachers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/teacher`)
            const sortedTeachers = response.data.sort((a, b) => a.name.localeCompare(b.name))
            setTeachers(sortedTeachers);
            setFilteredTeachers(sortedTeachers)
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

    useEffect(() => {
        setFilteredTeachers(
            teachers.filter(teacher => teacher.name.toLowerCase().includes(searchTerm.toLowerCase()))
        )
    }, [searchTerm, teachers])

    return (
        <div>
            <nav className='flex fixed w-full ml-[13.1rem] bg-fuchsia-900 py-[0.63rem] text-white'>
                <div className='flex justify-center ml-[0.5rem]'>
                    <input
                        type='text'
                        placeholder='Buscar teacher...'
                        className='py-2 pl-3 pr-10 rounded-md text-black'
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </div>
            </nav>

            <div className='mt-[5rem]'>
                {
                    filteredTeachers.map((teacher, index) => (
                        <div key={index} className=''>
                            <div>
                                <TeacherDetails teacher={teacher} getTeacherDetails={getTeacherDetails} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home