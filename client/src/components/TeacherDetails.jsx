import React, { useEffect, useState } from 'react'
import EditTeacher from './EditTeacher'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link } from 'react-router-dom'

const TeacherDetails = ({ teacher, getTeacherDetails }) => {

    const [details, setDetails] = useState({
        courses: [],
        coordinations: []
    })

    const [openForEdit, setOpenForEdit] = useState(false)
    const [choosenForEdit, setChoosenForEdit] = useState(null)

    useEffect(() => {
        const fetchDetails = async () => {
            const details = await getTeacherDetails(teacher.id)
            setDetails(details)
        }
        fetchDetails()
    }, [teacher.id, getTeacherDetails])

    const deleteTeacher = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/teacher/${id}`)
            toast.success(`${teacher.name} deleted!`)
            setTimeout(() => {
                window.location = '/home'
            }, 2000)
        } catch (error) {
            toast.error(error.message)
        }
    }
    

    return (
        <div className='w-[90rem]'>
            <div
                className='grid grid-cols-[2fr_1.5fr_1.5fr] ml-72 items-center text-md gap-x-4 mt-8 mb-8 bg-cyan-600 rounded-xl text-white border-[0.2rem] border-cyan-700'>
                <div className='flex items-center bg-cyan-700 rounded-lg m-3 justify-between'>
                    <Link to={`/home/${teacher.id}`} state={{ teacherId: teacher.id }}>
                        <button
                            className='flex flex-col m-2 p-2 items-center border-[0.1rem] duration-200 border-cyan-700 hover:bg-cyan-500 hover:rounded-lg hover:border-[0.1rem] hover:border-cyan-300 hover:duration-200'>
                            <div className='flex text-sm'>
                                ID: {teacher.id}
                            </div>
                            <div>
                                {teacher.name}
                            </div>
                        </button>
                    </Link>
                    <div className='flex gap-x-3 items-start justify-center p-3'>
                        {teacher.title === true ? "Título:✅" : "Título:❌"}
                        <div className='flex flex-row gap-x-3'>
                            <button
                                onClick={() => {
                                    setOpenForEdit(true)
                                    setChoosenForEdit(teacher)
                                }
                                }
                                className='bg-cyan-500 px-3 py-1 rounded-md border-[0.1rem] border-cyan-300 shadow-md hover:bg-cyan-600 hover:rounded-md hover:border-[0.1rem] hover:border-cyan-300 hover:duration-200'>
                                Editar
                            </button>
                            <button
                                onClick={() => deleteTeacher(teacher.id)}
                                className='bg-red-700 px-3 py-1 rounded-md border-[0.1rem] border-red-950 shadow-md duration-200 hover:bg-red-800 hover:rounded-md hover:border-[0.1rem] hover:border-red-950 hover:duration-200'>
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center bg-cyan-700 rounded-lg py-1'>
                    {details.courses.length > 0 ? (
                        details.courses.map((course) => (
                            <div key={course.id} className='flex items-center gap-2 text-center'>
                                <div className='text-sm'>
                                    ID: {course.id}
                                </div>
                                <div>
                                    {course.name}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-red-500'>Sin cursos</div>
                    )}
                </div>
                <div className='flex flex-col items-center justify-center bg-cyan-700 rounded-lg py-1 mr-3'>
                    {details.coordinations.length > 0 ? (
                        details.coordinations.map((coordination) => (
                            <div key={coordination.id} className='text-center'>{coordination.name}</div>
                        ))
                    ) : (
                        <div className='text-yellow-300'>Sin coordinación</div>
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