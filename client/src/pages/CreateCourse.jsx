import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const CreateCourse = () => {

  const [course, setCourse] = useState({
    name: "",
    day: "",
    days: 0,
    students: 0,
    payment: 0
  })

  const create = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`http://localhost:5000/course`, course)
      toast.success('Curso creado!')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleChange = async (event) => {
    const { name, value } = event.target
    setCourse({
      ...course,
      [name]: value
    })
  }

  return (
    <div className='flex ml-[31.5rem] mt-[1.3rem] text-white font-medium bg-stone-500 pb-[3rem] pt-[3rem] px-[5rem] rounded-md'>
      <div className='flex flex-col items-center text-3xl'>
        <div className='text-[3rem] bg-stone-700 py-5 px-16 rounded-md'>
          Crear Nuevo Curso
        </div>
        <form onSubmit={create} className='flex flex-col items-center mt-7'>
          <div className='mb-1'>
            Nombre:
          </div>
          <input type='text' name='name' value={course.name} onChange={handleChange} placeholder="Nombre" className='text-black p-1 mb-2' />
          <div className='mb-1'>
            Día:
          </div>
          <input type='text' name='day' value={course.day} onChange={handleChange} placeholder="Día" className='text-black p-1 mb-2' />
          <div className='mb-1'>
            Cantidad de días:
          </div>
          <input type='number' name='days' value={course.days} onChange={handleChange} placeholder="Cantidad de días" className='text-black p-1 mb-2' />
          <div className='mb-1'>
            Estudiantes:
          </div>
          <input type='number' name='students' value={course.students} onChange={handleChange} placeholder="Estudiantes" className='text-black p-1 mb-2' />
          <div className='mb-1'>
            Pago:
          </div>
          <input type='number' name='payment' value={course.payment} onChange={handleChange} placeholder="$$$" className='text-black p-1 mb-2' />
          <button className='bg-stone-400 py-2 px-3 rounded-md mt-8 hover:bg-stone-600 duration-200'>Crear</button>
        </form>
      </div>
    </div>
  )
}

export default CreateCourse