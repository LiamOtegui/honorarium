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
        className={`bg-white flex flex-col items-center px-5 py-5 rounded-md shadow-lg transition-all ${open ? 'scale-125 opacity-100' : 'scale-100 opacity-0'}`}>
        {children}
        <button onClick={onClose} className='absolute right-2 top-0'>x</button>
        <form
          onSubmit={updateCourse}
          className='flex flex-col space-y-1 items-center'>
          Nombre: <input type='text' name='name' value={course.name} onChange={handleChange} placeholder={course.name} className='border border-black rounded-md' />
          Día: <input type='text' name='day' value={course.day} onChange={handleChange} placeholder={course.day} className='border border-black rounded-md' />
          Cantidad de días: <input type='number' name='days' value={course.days} onChange={handleChange} placeholder={course.days} className='border border-black rounded-md' />
          Estudiantes: <input type='number' name='students' value={course.students} onChange={handleChange} placeholder={course.students} className='border border-black rounded-md' />
          Pago: <input type='number' name='payment' value={course.payment} onChange={handleChange} placeholder={course.payment} className='border border-black rounded-md' />
          <button className='relative bg-stone-500 text-white px-3 py-1 rounded-md border-[0.1rem] border-stone-600 duration-200 hover:bg-stone-400 hover:border-[0.1rem] hover:border-stone-500 hover:duration-200'>
            Editar
          </button>
        </form>
        <div>

        </div>
      </div>
    </div>
  )
}

export default EditCourse