import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const CreateCourse = () => {

  const [course, setCourse] = useState({
    name: "",
    days: 0,
    students: 0,
    payment: 0
  })

  const create = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`http://localhost:5000/course`, course)
      toast.success('Course created!')
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
    <div className='flex ml-[31.5rem] mt-[1.3rem] text-white font-medium bg-cyan-700 pb-[3rem] pt-[3rem] px-[5rem] rounded-md'>
      <div className='flex flex-col items-center text-3xl'>
        <div className='text-[3rem] bg-cyan-800 py-5 px-16 rounded-md border-[0.1rem] border-cyan-800'>
          Create a new Course
        </div>
        <form onSubmit={create} className='flex flex-col items-center mt-7'>
          <div className='mb-1'>
            Name:
          </div>
          <input type='text' name='name' value={course.name} onChange={handleChange} placeholder="Name" className='text-black p-1 mb-2' />
          <div className='mb-1'>
            Days:
          </div>
          <input type='number' name='days' value={course.days} onChange={handleChange} placeholder="Days" className='text-black p-1 mb-2' />
          <div className='mb-1'>
            Students:
          </div>
          <input type='number' name='students' value={course.students} onChange={handleChange} placeholder="Students" className='text-black p-1 mb-2' />
          <div className='mb-1'>
            Payment:
          </div>
          <input type='number' name='payment' value={course.payment} onChange={handleChange} placeholder="Payment" className='text-black p-1 mb-2' />
          <button className='bg-cyan-500 py-2 px-3 rounded-md mt-8 hover:bg-cyan-400 duration-100 border-[0.1rem] border-cyan-600'>Crear</button>
        </form>
      </div>
    </div>
  )
}

export default CreateCourse