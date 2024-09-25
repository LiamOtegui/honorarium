import React, { useState } from 'react'
import EditCourse from './EditCourse'
import axios from 'axios'
import { toast } from 'react-toastify'

const CourseDetails = ({ course }) => {

    const [openForEdit, setOpenForEdit] = useState(false)
    const [choosenForEdit, setChoosenForEdit] = useState(null)

    const deleteCourse = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/course/${id}`)
            toast.success(`${course.name} deleted!`)
            setTimeout(() => {
                window.location = '/home/courses'
            }, 2000)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='w-[90rem]'>
            <div
                className='grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr] ml-72 items-center text-md gap-x-4 mt-8 mb-8 bg-cyan-600 rounded-xl text-white border-[0.2rem] border-cyan-700'>
                <div className='flex items-center bg-cyan-700 rounded-lg m-3 justify-between'>
                    <div className='flex flex-col my-2 mx-1 p-2 items-center border-[0.1rem] duration-200 border-cyan-700'>
                        <div className='flex text-sm'>
                            Curso ID: {course.id}
                        </div>
                        <div>
                            {course.name}
                        </div>
                    </div>
                    <div className='flex gap-x-3 items-start justify-center p-3'>
                        <div className='flex flex-row gap-x-3'>
                            <button
                                onClick={() => {
                                    setOpenForEdit(true)
                                    setChoosenForEdit(course)
                                }
                                }
                                className='bg-cyan-500 px-3 py-1 rounded-md border-[0.1rem] border-cyan-300 shadow-md hover:bg-cyan-600 hover:rounded-md hover:border-[0.1rem] hover:border-cyan-300 hover:duration-200'>
                                Editar
                            </button>
                            <button
                                onClick={() => deleteCourse(course.id)}
                                className='bg-red-700 px-3 py-1 rounded-md border-[0.1rem] border-red-950 shadow-md duration-200 hover:bg-red-800 hover:rounded-md hover:border-[0.1rem] hover:border-red-950 hover:duration-200'>
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center bg-cyan-700 rounded-lg py-1'>
                    Días trabajando: {course.days}
                </div>
                <div className='flex flex-col items-center justify-center bg-cyan-700 rounded-lg py-1 mr-3'>
                    Estudiantes: {course.students}
                </div>
                <div className='flex flex-col items-center justify-center bg-cyan-700 rounded-lg py-1 mr-3'>
                    Pago: ${course.payment}
                </div>
            </div>
            <EditCourse open={openForEdit} choosen={choosenForEdit} onClose={() => setOpenForEdit(false)}>
                Editar Curso:
            </EditCourse>
        </div>
    )
}

export default CourseDetails