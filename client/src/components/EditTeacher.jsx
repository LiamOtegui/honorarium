import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const EditTeacher = ({ open, choosen, onClose, children }) => {

  const [teacher, setTeacher] = useState({
    name: '',
    title: null
  })

  useEffect(() => {
    if (choosen !== null) {
      setTeacher({
        name: choosen.name,
        title: choosen.title
      })
    }
  }, [choosen])

  const updateTeacher = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.put(`http://localhost:5000/teacher/${choosen.id}`, teacher)
      onClose()
      toast.success(`Teacher: ${teacher.name} actualizado!`)
      setTimeout(() => {
        window.location = '/home'
      }, 2000)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setTeacher({
      ...teacher,
      [name]: value
    })
  }

  const handleTitle = (event) => {
    const newTitle = event.target.value === 'yes'
    setTeacher({
      ...teacher,
      title: newTitle
    })
  }

  return (
    <div
      onClick={onClose}
      className={`flex fixed inset-0 justify-center items-center transition-colors ${open ? 'visible bg-black/50' : 'invisible'}`}>
      <div
        onClick={(event) => event.stopPropagation()}
        className={`flex flex-col justify-center items-center bg-white px-5 pb-5 py-4 rounded-md shadow-lg transition-all ${open ? 'scale-125 opacity-100' : 'scale-100 opacity-0'}`}>
        <div className='text-xl font-semibold'>
          {children}
        </div>
        <button onClick={onClose} className='absolute right-2 top-0'>x</button>
        <form
          onSubmit={updateTeacher}
          className='flex flex-col items-center'>
          <div className='flex flex-col items-center mt-3'>
            <div className='mb-1 font-semibold'>
              Nombre:
            </div>
            <div>
              <input type='text' name='name' value={teacher.name} onChange={handleChange} placeholder={teacher.name} className='flex p-1 border border-black rounded-md' />
            </div>
          </div>
          <div className='flex flex-col items-center mt-2'>
            <div className='mb-1 font-semibold'>
              Título:
            </div>
            <div>
              <select value={teacher.title ? 'yes' : 'no'} onChange={handleTitle} className='flex p-1 border border-black rounded-md'>
                <option value={'yes'}>Tiene título</option>
                <option value={'no'}>No tiene título</option>
              </select>
            </div>
          </div>
          <button className='mt-4 bg-fuchsia-700 text-white px-3 py-1 rounded-md border-[0.1rem] border-fuchsia-900 duration-200 hover:bg-fuchsia-800 hover:border-[0.1rem] hover:border-fuchsia-900 hover:duration-200'>
            Editar
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditTeacher