import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const TeacherCourse = ({ openCreate, openDelete, onCloseCreate, onCloseDeleted, children }) => {

    const [associate, setAssociate] = useState({
        teacherId: 0,
        courseId: 0
    })
    const [deleted, setDeleted] = useState({
        teacherId: 0,
        courseId: 0
    })

    const createAssociation = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`http://localhost:5000/teacher/associate-course`, associate)
            onCloseCreate()
            toast.success(`Curso asociado!`)
            setTimeout(() => {
                window.location = '/home/cursos'
            }, 2000)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const deleteAssociation = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.delete(`http://localhost:5000/teacher/associate-course/${deleted.teacherId}/${deleted.courseId}`, deleted)
            onCloseDeleted()
            toast.success('Asociación eliminada!')
            setTimeout(() => {
                window.location = '/home/cursos'
            }, 2000)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleChangeCreate = (event) => {
        const { name, value } = event.target
        setAssociate({
            ...associate,
            [name]: value
        })
    }

    const handleChangeDeleted = (event) => {
        const { name, value } = event.target
        setDeleted({
            ...deleted,
            [name]: value
        })
    }

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
                        Teacher ID: <input type='number' name='teacherId' value={associate.teacherId} onChange={handleChangeCreate} placeholder={0} className='p-1 mb-2 border border-black rounded-md' />
                        Curso ID: <input type='number' name='courseId' value={associate.courseId} onChange={handleChangeCreate} placeholder={0} className='p-1 mb-5 border border-black rounded-md' />
                        <button className='relative bg-stone-500 text-white px-3 py-1 rounded-md border-[0.1rem] border-stone-600 duration-200 hover:bg-stone-400 hover:border-[0.1rem] hover:border-stone-500 hover:duration-200'>
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
                        className='flex flex-col mt-3 items-center'>
                        Teacher ID:<input type='number' name='teacherId' value={deleted.teacherId} onChange={handleChangeDeleted} placeholder={0} className='p-1 mb-2 border border-black rounded-md' />
                        Curso ID:<input type='number' name='courseId' value={deleted.courseId} onChange={handleChangeDeleted} placeholder={0} className='p-1 mb-5 border border-black rounded-md' />
                        <button className='relative bg-stone-500 text-white px-3 py-1 rounded-md border-[0.1rem] border-stone-600 duration-200 hover:bg-stone-400 hover:border-[0.1rem] hover:border-stone-500 hover:duration-200'>
                            Eliminar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TeacherCourse