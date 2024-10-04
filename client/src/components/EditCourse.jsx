import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const EditCourse = ({ open, choosen, onClose, children }) => {

  const [course, setCourse] = useState({
    name: '',
    day: '',
    days: 0,
    students: 0,
    payment: 0
  })

  useEffect(() => {
    if (choosen !== null) {
      setCourse({
        name: choosen.name,
        day: choosen.day,
        days: choosen.days,
        students: choosen.students,
        payment: choosen.payment
      })
    }
  }, [choosen])

  const updateCourse = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.put(`http://localhost:5000/course/${choosen.id}`, course)
      onClose()
      toast.success(`Curso: ${course.name} actualizado!`)
      setTimeout(() => {
        window.location = '/home/cursos'
      }, 2000)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setCourse({
      ...course,
      [name]: value
    })
  }

  return (
    <div
      onClick={onClose}
      className={`flex fixed inset-0 justify-center items-center transition-colors ${open ? 'visible bg-black/50' : 'invisible'}`}>
      <div
        onClick={(event) => event.stopPropagation()}
        className={`bg-white flex flex-col items-center px-5 pb-5 py-4 rounded-md shadow-lg transition-all ${open ? 'scale-125 opacity-100' : 'scale-100 opacity-0'}`}>
        <div className='text-xl font-semibold'>
          {children}
        </div>
        <button onClick={onClose} className='absolute right-2 top-0'>x</button>
        <form
          onSubmit={updateCourse}
          className='flex flex-col items-center'>
          <div className='flex flex-col items-center mt-2'>
            <div className='mb-1 font-semibold'>
              Nombre:
            </div>
            <div>
              <input type='text' name='name' value={course.name} onChange={handleChange} placeholder={course.name} className='flex p-1 border border-black rounded-md' />
            </div>
          </div>
          <div className='flex flex-col items-center mt-2'>
            <div className='mb-1 font-semibold'>
              Día:
            </div>
            <div>
              <input type='text' name='day' value={course.day} onChange={handleChange} placeholder={course.day} className='flex p-1 border border-black rounded-md' />
            </div>
          </div>
          <div className='flex flex-col items-center mt-2'>
            <div className='mb-1 font-semibold'>
              Cantidad de días:
            </div>
            <div>
              <input type='number' name='days' value={course.days} onChange={handleChange} placeholder={course.days} className='flex p-1 border border-black rounded-md' />
            </div>
          </div>
          <div className='flex flex-col items-center mt-2'>
            <div className='mb-1 font-semibold'>
              Estudiantes:
            </div>
            <div>
              <input type='number' name='students' value={course.students} onChange={handleChange} placeholder={course.students} className='flex p-1 border border-black rounded-md' />
            </div>
          </div>
          <div className='flex flex-col items-center mt-2'>
            <div className='mb-1 font-semibold'>
              Pago:
            </div>
            <div>
              <input type='number' name='payment' value={course.payment} onChange={handleChange} placeholder={course.payment} className='flex p-1 border border-black rounded-md' />
            </div>
          </div>
          <button className='mt-4 bg-green-700 text-white px-3 py-1 rounded-md border-[0.1rem] border-green-900 duration-200 hover:bg-green-800 hover:border-[0.1rem] hover:border-green-900 hover:duration-200'>
            Editar
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditCourse