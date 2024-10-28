import React, { useEffect, useState } from 'react'
import EditTeacher from './EditTeacher'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link } from 'react-router-dom'

const TeacherDetails = ({ teacher, getTeacherCourses, getTeacherCoordinations }) => {

    const [courses, setCourses] = useState([])
    const [coordinations, setCoordinations] = useState([])

    const [openForEdit, setOpenForEdit] = useState(false)
    const [choosenForEdit, setChoosenForEdit] = useState(null)

    useEffect(() => {
        const fetchDetails = async () => {
            const coursesDetails = await getTeacherCourses(teacher.id)
            const coordinationsDetails = await getTeacherCoordinations(teacher.name)
            setCourses(coursesDetails)
            setCoordinations(coordinationsDetails)
        }
        fetchDetails()
    }, [teacher.id, teacher.name, getTeacherCourses, getTeacherCoordinations])

    const deleteTeacher = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/teacher/${id}`)
            toast.success(`Teacher: ${teacher.name} eliminado!`)
            setTimeout(() => {
                window.location = '/home'
            }, 2000)
        } catch (error) {
            toast.error(error.message)
        }
    }
    
    return (
        <div className='w-[60rem] ml-[24rem]'>
            <div
                className='grid grid-cols-[2.6fr_1fr_1fr] py-3 items-center text-md gap-x-4 mt-8 mb-8 bg-purple-950 rounded-xl text-white border-[0.2rem] border-fuchsia-600'>
                <div className='flex items-center bg-fuchsia-700 border-[0.1rem] border-fuchsia-500 rounded-lg m-3 justify-between'>
                    <Link to={`/home/${teacher.id}`} state={{ teacherId: teacher.id }}>
                        <button
                            className='flex flex-col m-2 p-2 items-center border-[0.1rem] duration-200 border-fuchsia-700 rounded-lg hover:bg-fuchsia-500 hover:rounded-lg hover:border-[0.1rem] hover:border-fuchsia-300 hover:duration-200'>
                            <div className='flex justify-center text-lg'>
                                {teacher.name}
                            </div>
                        </button>
                    </Link>
                    <div className='flex gap-x-3 items-start justify-center p-3'>
                        {teacher.title === true
                            ? <div className='bg-fuchsia-700 border-[0.1rem] rounded-lg px-1 py-1'>Título: Sí</div>
                            : <div className='bg-fuchsia-700 border-[0.1rem] rounded-lg px-1 py-1'>Título: No</div>}
                        <div className='flex flex-row gap-x-3'>
                            <button
                                onClick={() => {
                                    setOpenForEdit(true)
                                    setChoosenForEdit(teacher)
                                }
                                }
                                className='bg-fuchsia-600 px-3 py-1 rounded-md border-[0.1rem] border-white shadow-md hover:bg-fuchsia-400 hover:rounded-md hover:border-[0.1rem] hover:border-fuchsia-400 hover:duration-200'>
                                Editar
                            </button>
                            <button
                                onClick={() => deleteTeacher(teacher.id)}
                                className='bg-fuchsia-800 px-3 py-1 rounded-md border-[0.1rem] border-white shadow-md duration-200 hover:bg-fuchsia-950 hover:rounded-md hover:border-[0.1rem] hover:border-white hover:duration-200'>
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center bg-fuchsia-700 rounded-lg py-1 border-[0.1rem] border-fuchsia-500'>
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <div key={course.id} className='flex items-center gap-2 text-center'>
                                <div>
                                    {course.name}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-white bg-fuchsia-800 px-14 my-1 py-1 rounded-md'>Sin cursos</div>
                    )}
                </div>
                <div className='flex flex-col items-center justify-center bg-fuchsia-700 rounded-lg py-1 mr-3 border-[0.1rem] border-fuchsia-500'>
                    {coordinations.length > 0 ? (
                        coordinations.map((coordination) => (
                            <div key={coordination.id} className='text-center'>{coordination.name}</div>
                        ))
                    ) : (
                        <div className='text-white bg-fuchsia-800 px-7 my-1 py-1 rounded-md'>Sin coordinación</div>
                    )}
                </div>
            </div>
            <EditTeacher open={openForEdit} choosen={choosenForEdit} onClose={() => setOpenForEdit(false)}>
                Editar Nombre y/o Título:
            </EditTeacher>
        </div>
    )
}

export default TeacherDetails