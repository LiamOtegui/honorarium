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
      toast.success(`Teacher ${teacher.name} updated`)
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

  return (
    <div
      onClick={onClose}
      className={`flex fixed inset-0 justify-center items-center transition-colors ${open ? 'visible bg-black/50' : 'invisible'}`}>
      <div
        onClick={(event) => event.stopPropagation()}
        className={`bg-white px-5 py-5 rounded-md shadow-lg transition-all ${open ? 'scale-125 opacity-100' : 'scale-100 opacity-0'}`}>
        {children}
        <button onClick={onClose} className='absolute right-2 top-0'>x</button>
        <form
          onSubmit={updateTeacher}
          className='flex flex-col space-y-1'>
          <input type='text' name='name' value={teacher.name} onChange={handleChange} placeholder={teacher.name} className='border border-black rounded-md' />
          <input type='text' name='title' value={teacher.title} onChange={handleChange} placeholder={teacher.title} className='border border-black rounded-md' />
          <button>Edit</button>
        </form>
        <div>

        </div>
      </div>
    </div>
  )
}

export default EditTeacher