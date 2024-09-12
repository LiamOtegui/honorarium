import React from 'react'

const EditTeacher = ({ open, teacher, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`flex fixed inset-0 justify-center items-center transition-colors ${open ? "visible bg-black/50" : "invisible"}`}>
      <div className='bg-white px-5 py-5 rounded-md shadow-lg'>
        {children}
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default EditTeacher