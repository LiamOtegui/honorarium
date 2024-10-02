import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const TeacherCourse = ({ openCreate, openDelete, onCloseCreate, onCloseDeleted, children }) => {

    const [associate, setAssociate] = useState({
        teacherName: "",
        courseName: ""
    })
    const [deleted, setDeleted] = useState({
        teacherName: "",
        courseName: ""
    })
    const [teachers, setTeachers] = useState([])
    const [courses, setCourses] = useState([])

    const getTeachers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/teacher`)
            const sortedTeachers = response.data.sort((a, b) => a.name.localeCompare(b.name))
            setTeachers(sortedTeachers)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getCourses = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/course`)
            const sortedCourses = response.data.sort((a, b) => a.name.localeCompare(b.name))
            setCourses(sortedCourses)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const createAssociation = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`http://localhost:5000/teacher/associate-course`, associate)
            onCloseCreate()
            toast.success(`Curso asociado!`)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const deleteAssociation = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.delete(`http://localhost:5000/teacher/delete-association/${deleted.teacherName}/${deleted.courseName}`, deleted)
            onCloseDeleted()
            toast.success('Asociación eliminada!')
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleChangeDeleted = (event) => {
        const { name, value } = event.target
        setDeleted({
            ...deleted,
            [name]: value
        })
    }

    useEffect(() => {
        getTeachers(),
            getCourses()
    }, [])

    return (
        <div>

            <div
                onClick={onCloseCreate}
                className={`flex fixed inset-0 justify-center items-center transition-colors ${openCreate ? 'visible bg-black/50' : 'invisible'}`}>
                <div
                    onClick={(event) => event.stopPropagation()}
                    className={`bg-white flex flex-col items-center px-5 py-5 rounded-md shadow-lg transition-all ${openCreate ? 'scale-125 opacity-100' : 'scale-100 opacity-0'}`}>
                    <div className='text-xl font-semibold'>
                        {children}
                    </div>
                    <button onClick={onCloseCreate} className='absolute right-2 top-0'>x</button>
                    <form
                        onSubmit={createAssociation}
                        className='flex flex-col items-center mt-3'>
                        <div className='flex space-x-10'>
                            <div className='flex flex-col items-center'>
                                <div className='font-semibold'>
                                    Teacher:
                                </div>
                                <select
                                    value={associate.teacherName}
                                    onChange={(event) => setAssociate({ ...associate, teacherName: event.target.value })}
                                    className='flex justify-center p-1 mb-3 border-[0.1rem] border-black rounded-lg overflow-y-auto'
                                    size="8">
                                    {teachers.map((teacher, index) => (
                                        <option
                                            key={index}
                                            value={teacher.name}>
                                            {teacher.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className='font-semibold'>
                                    Curso:
                                </div>
                                <select
                                    value={associate.courseName}
                                    onChange={(event) => setAssociate({ ...associate, courseName: event.target.value })}
                                    className='flex justify-center p-1 mb-3 border-[0.1rem] border-black rounded-lg overflow-auto'
                                    size="8">
                                    {courses.map((course, index) => (
                                        <option key={index} value={course.name}>
                                            {course.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button className='relative bg-green-700 text-white px-3 py-1 rounded-md border-[0.1rem] border-green-800 duration-200 hover:bg-green-600 hover:border-[0.1rem] hover:border-green-700 hover:duration-200'>
                            Asociar
                        </button>
                    </form>
                </div>
            </div>

            <div
                onClick={onCloseDeleted}
                className={`flex fixed inset-0 justify-center items-center transition-colors ${openDelete ? 'visible bg-black/50' : 'invisible'}`}>
                <div
                    onClick={(event) => event.stopPropagation()}
                    className={`bg-white flex flex-col items-center px-5 py-5 rounded-md shadow-lg transition-all ${openDelete ? 'scale-125 opacity-100' : 'scale-100 opacity-0'}`}>
                    <div className='text-xl font-semibold'>
                        Eliminar asociación:
                    </div>
                    <button onClick={onCloseDeleted} className='absolute right-2 top-0'>x</button>
                    <form
                        onSubmit={deleteAssociation}
                        className='flex flex-col items-center mt-3'>
                        <div className='flex space-x-10'>
                            <div className='flex flex-col items-center'>
                                <div className='font-semibold'>
                                    Teacher:
                                </div>
                                <select
                                    value={deleted.teacherName}
                                    onChange={(event) => setDeleted({ ...deleted, teacherName: event.target.value })}
                                    className='flex justify-center p-1 mb-3 border-[0.1rem] border-black rounded-lg overflow-y-auto'
                                    size="8">
                                    {teachers.map((teacher, index) => (
                                        <option
                                            key={index}
                                            value={teacher.name}>
                                            {teacher.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className='font-semibold'>
                                    Curso:
                                </div>
                                <select
                                    value={deleted.courseName}
                                    onChange={(event) => setDeleted({ ...deleted, courseName: event.target.value })}
                                    className='flex justify-center p-1 mb-3 border-[0.1rem] border-black rounded-lg overflow-auto'
                                    size="8">
                                    {courses.map((course, index) => (
                                        <option
                                            key={index}
                                            value={course.name}>
                                            {course.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button className='relative bg-green-700 text-white px-3 py-1 rounded-md border-[0.1rem] border-green-800 duration-200 hover:bg-green-600 hover:border-[0.1rem] hover:border-green-700 hover:duration-200'>
                            Eliminar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TeacherCourse