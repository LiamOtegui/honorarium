import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const EditCoordination = ({ open, choosen, onClose, children }) => {

  const [coordination, setCoordination] = useState({
    name: '',
    day: '',
    days: 0,
    hourlyPay: 0,
    hours: 0,
    teacherName: ''
  })
  const [teachers, setTeachers] = useState([])

  const getTeachers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/teacher`)
      const sortedTeachers = response.data.sort((a, b) => a.name.localeCompare(b.name))
      setTeachers(sortedTeachers)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (choosen !== null) {
      setCoordination({
        name: choosen.name,
        day: choosen.day,
        days: choosen.days,
        hourlyPay: choosen.hourlyPay,
        hours: choosen.hours,
        teacherName: choosen.teacherName
      })
    }
    getTeachers()
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

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves"]

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
          onSubmit={updateCoordination}
          className='flex flex-col items-center'>
          <div className='flex flex-col items-center mt-2'>
            <div className='mb-1 font-semibold'>
              Nombre:
            </div>
            <div>
              <input type='text' name='name' value={coordination.name} onChange={handleChange} placeholder={coordination.name} className='flex p-1 border border-black rounded-md' />
            </div>
          </div>
          <div className='flex flex-col items-center mt-1'>
            <div className='mb-1 font-semibold'>
              Día:
            </div>
            <div>
              <select name='day' value={coordination.day} onChange={handleChange} className='flex py-1 px-[3.1rem] border border-black rounded-md'>
                {
                  dias.map((dia) => (
                    <option value={dia}>{dia}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className='flex flex-col items-center mt-1'>
            <div className='mb-1 font-semibold'>
              Cantidad de días:
            </div>
            <div>
              <input type='number' name='days' value={coordination.days} onChange={handleChange} placeholder={coordination.days} className='flex p-1 border border-black rounded-md' />
            </div>
          </div>
          <div className='flex flex-col items-center mt-1'>
            <div className='mb-1 font-semibold'>
              Pago por hora:
            </div>
            <div>
              <input type='number' name='hourlyPay' value={coordination.hourlyPay} onChange={handleChange} placeholder={coordination.hourlyPay} className='flex p-1 border border-black rounded-md' />
            </div>
          </div>
          <div className='flex flex-col items-center mt-1'>
            <div className='mb-1 font-semibold'>
              Horas:
            </div>
            <div>
              <input type='number' name='hours' value={coordination.hours} onChange={handleChange} placeholder={coordination.hours} className='flex p-1 border border-black rounded-md' />
            </div>
          </div>
          <div className='flex flex-col items-center mt-1'>
            <div className='mb-1 font-semibold'>
              Teacher asociado:
            </div>
            <div>
              <select
                name='teacherName'
                value={coordination.teacherName}
                onChange={handleChange} className='px-[1.5rem] py-2 border rounded-md border-black overflow-y-auto'>
                {
                  teachers.map((teacher, index) => (
                    <option key={index} value={teacher.name}>
                      {teacher.name}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
          <button className='mt-4 bg-green-700 text-white px-3 py-1 rounded-md border-[0.1rem] border-green-900 duration-200 hover:bg-green-800 hover:border-[0.1rem] hover:border-green-900 hover:duration-200'>
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