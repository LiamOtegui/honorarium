import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const CreateCoordination = () => {

  const [coordination, setCoordination] = useState({
    name: "",
    days: 0,
    hourlyPay: 0,
    hours: 0
  })

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

  return (
    <div className='flex ml-[27.5rem] mt-[1.3rem] text-white font-medium bg-stone-500 pb-[3rem] pt-[3rem] px-[5rem] rounded-md'>
      <div className='flex flex-col items-center text-3xl'>
        <div className='text-[3rem] bg-stone-700 py-5 px-16'>
          Crear Nueva Coordinación
        </div>
        <form onSubmit={create} className='flex flex-col items-center mt-7'>
          <div className='mb-1'>
            Nombre:
          </div>
          <input type='text' name='name' value={coordination.name} onChange={handleChange} placeholder="Nombre" className='text-black p-1 mb-2' />
          <div className='mb-1'>
            Días:
          </div>
          <input type='number' name='days' value={coordination.days} onChange={handleChange} placeholder="Días" className='text-black p-1 mb-2' />
          <div className='mb-1'>
            Pago por hora:
          </div>
          <input type='number' name='students' value={coordination.hourlyPay} onChange={handleChange} placeholder="Pago por hora" className='text-black p-1 mb-2' />
          <div className='mb-1'>
            Horas trabajando:
          </div>
          <input type='number' name='payment' value={coordination.hours} onChange={handleChange} placeholder="Horas" className='text-black p-1 mb-2' />
          <button className='bg-stone-400 py-2 px-3 rounded-md mt-8 hover:bg-stone-600 duration-200'>Crear</button>
        </form>
      </div>
    </div>
  )
}

export default CreateCoordination