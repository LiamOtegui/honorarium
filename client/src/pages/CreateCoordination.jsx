import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const CreateCoordination = () => {

  const [coordination, setCoordination] = useState({
    name: "",
    day: "Lunes",
    days: "",
    hourlyPay: "",
    hours: "",
    teacherName: ""
  })

  const [teachers, setTeachers] = useState([])

  const getTeachers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/teacher`)
      const sortedTeachers = response.data.sort((a, b) => a.name.localeCompare(b.name))
      setTeachers(sortedTeachers)

      if (sortedTeachers.length > 0) {
        setCoordination(prev => ({
          ...prev,
          teacherName: sortedTeachers[0].name
        }))
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const create = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`http://localhost:5000/coordination`, coordination)
      toast.success('Coordinación creada!')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleChange = async (event) => {
    const { name, value } = event.target
    setCoordination({
      ...coordination,
      [name]: value
    })
  }

  useEffect(() => {
    getTeachers()
  }, [])

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves"]

  return (
    <div className='grid grid-rows-1 mb-[1rem] ml-[33.5rem] mt-[1.3rem] text-white font-medium border-[0.5rem] border-fuchsia-900 bg-fuchsia-800 pb-[3rem] pt-[3rem] px-[5rem] rounded-md'>
      <div className='flex flex-col items-center text-xl'>
        <div className='text-[2rem] bg-fuchsia-600 py-5 rounded-lg px-16'>
          Crear Nueva Coordinación
        </div>
        <form onSubmit={create} className='flex flex-col items-center mt-7'>
          <div className='mb-1'>
            Nombre:
          </div>
          <input type='text' name='name' value={coordination.name} onChange={handleChange} placeholder="Nombre" className='text-black p-1 mb-2' />
          <div className='mb-1'>
            Día:
          </div>
          <select name='day' value={coordination.day} onChange={handleChange} className='w-full py-1 pr-1 text-black'>
            {
              dias.map((dia, index) => (
                <option
                  key={index}
                  value={dia}>
                  {dia}
                </option>
              ))
            }
          </select>
          <div className='mb-1'>
            Cantidad de días:
          </div>
          <input type='number' name='days' value={coordination.days} onChange={handleChange} placeholder="Cantidad de días" className='text-black p-1 mb-2' />
          <div className='mb-1'>
            Pago por hora:
          </div>
          <input type='number' name='hourlyPay' value={coordination.hourlyPay} onChange={handleChange} placeholder="$$$" className='text-black p-1 mb-2' />
          <div className='mb-1'>
            Horas trabajando:
          </div>
          <input type='number' name='hours' value={coordination.hours} onChange={handleChange} placeholder="Horas" className='text-black p-1 mb-2' />
          <div className='mb-1'>
            Teacher:
          </div>
          <select
            name='teacherName'
            value={coordination.teacherName}
            onChange={handleChange}
            className='w-full text-black border-gray-300 py-1 pr-1 shadow-sm overflow-y-auto'
            size={1}
          >
            {teachers.map((teacher, index) => (
              <option
                key={index}
                value={teacher.name}
                className='text-gray-700'
              >
                {teacher.name}
              </option>
            ))}
          </select>
          {/* <input type='text' name='teacherName' value={coordination.teacherName} onChange={handleChange} placeholder="Teacher's name" className='text-black p-1 mb-2' /> */}
          <button className='bg-fuchsia-600 py-2 px-3 rounded-md mt-8 hover:bg-fuchsia-500 duration-200'>Crear</button>
        </form>
      </div>
    </div>
  )
}

export default CreateCoordination