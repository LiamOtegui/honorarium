import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const CreateTeacher = () => {

  const [teacher, setTeacher] = useState({
    name: "",
    title: false
  })

  const create = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`http://localhost:5000/teacher`, teacher)
      toast.success('Teacher creado!')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleChange = async (event) => {
    const { name, value } = event.target
    setTeacher({
      ...teacher,
      [name]: value
    })
  }

  const handleChangeTitle = async (event) => {
    const newTitle = event.target.value = "yes"
    setTeacher({
      ...teacher,
      title: newTitle
    })
  }

  return (
    <div className='flex ml-[31rem] mt-[7rem] text-white font-medium bg-green-800 pb-[3rem] pt-[3rem] px-[5rem] rounded-md'>
      <div className='flex flex-col items-center text-3xl'>
        <div className='text-[3rem] bg-green-600 py-5 px-16 rounded-lg'>
          Crear Nuevo Teacher
        </div>
        <form onSubmit={create} className='flex flex-col items-center mt-7'>
          <div className='mb-1'>
            Nombre:
          </div>
          <input type='text' name='name' value={teacher.name} onChange={handleChange} placeholder="Nombre" className='text-black p-1 mb-2' />
          <div className='mb-1'>
            Título:
          </div>
          <select value={teacher.title ? "yes" : "no"} onChange={handleChangeTitle} className='text-black p-1'>
            <option value={"yes"}>Con título</option>
            <option value={"no"}>Sin título</option>
          </select>
          <button className='bg-green-600 py-2 px-3 rounded-md mt-8 hover:bg-green-500 duration-200'>Crear</button>
        </form>
      </div>
    </div>
  )
}

export default CreateTeacher