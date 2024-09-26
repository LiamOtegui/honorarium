import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const EditCoordination = ({ open, choosen, onClose, children }) => {

  const [coordination, setCoordination] = useState({
    name: '',
    days: 0,
    hourlyPay: 0,
    hours: 0,
    teacherId: 0
  })

  useEffect(() => {
    if (choosen !== null) {
      setCoordination({
        name: choosen.name,
        days: choosen.days,
        hourlyPay: choosen.hourlyPay,
        hours: choosen.hours,
        teacherId: choosen.teacherId
      })
    }
  }, [choosen])

  const updateCoordination = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.put(`http://localhost:5000/coordination/${choosen.id}`, coordination)
      onClose()
      toast.success(`Coordinación: ${coordination.name} actualizada!`)
      setTimeout(() => {
        window.location = '/home/coordinaciones'
      }, 2000)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setCoordination({
      ...coordination,
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
          onSubmit={updateCoordination}
          className='flex flex-col space-y-1 items-center'>
          Nombre: <input type='text' name='name' value={coordination.name} onChange={handleChange} placeholder={coordination.name} className='border border-black rounded-md' />
          Días: <input type='number' name='days' value={coordination.days} onChange={handleChange} placeholder={coordination.days} className='border border-black rounded-md' />
          Pago por hora: <input type='number' name='hourlyPay' value={coordination.hourlyPay} onChange={handleChange} placeholder={coordination.hourlyPay} className='border border-black rounded-md' />
          Horas: <input type='number' name='hours' value={coordination.hours} onChange={handleChange} placeholder={coordination.hours} className='border border-black rounded-md' />
          ID de Teacher asociado: <input type='number' name='teacherId' value={coordination.teacherId} onChange={handleChange} placeholder={coordination.teacherId} className='border border-black rounded-md' />
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

export default EditCoordination