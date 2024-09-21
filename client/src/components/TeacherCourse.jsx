import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const TeacherCourse = ({ open, onClose, children }) => {

    const [associate, setAssociate] = useState({
        teacherId: 0,
        courseId: 0
    })

    const createAssociation = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`http://localhost:5000/teacher/associate-course`, associate)
            onClose()
            toast.success(`Course succesfully associated!`)
            setTimeout(() => {
                window.location = '/home/courses'
            }, 2000)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setAssociate({
            ...associate,
            [name]: value
        })
    }

    return (
        <div
            onClick={onClose}
            className={`flex fixed inset-0 justify-center items-center transition-colors ${open ? 'visible bg-black/50' : 'invisible'}`}>
            <div
                onClick={(event) => event.stopPropagation()}
                className={`bg-white px-5 py-5 rounded-md shadow-lg transition-all ${open ? 'scale-125 opacity-100' : 'scale-100 opacity-0'}`}>
                {children}
                <button onClick={onClose} className='absolute right-2 top-0'>x</button>
                <form
                    onSubmit={createAssociation}
                    className='flex flex-col space-y-1 items-center'>
                    Teacher ID: <input type='number' name='teacherId' value={associate.teacherId} onChange={handleChange} placeholder={0} className='p-1 border border-black rounded-md' />
                    Course ID: <input type='number' name='courseId' value={associate.courseId} onChange={handleChange} placeholder={0} className='p-1 border border-black rounded-md' />
                    <button className='relative bg-cyan-600 text-white px-3 py-1 rounded-md border-[0.1rem] border-cyan-800 duration-200 hover:bg-cyan-500 hover:border-[0.1rem] hover:border-cyan-600 hover:duration-200'>
                        Associate
                    </button>
                </form>

                {/* Hacer un controller para poder borrar la asociacion del teacher con el curso */}

            </div>
        </div>
    )
}

export default TeacherCourse