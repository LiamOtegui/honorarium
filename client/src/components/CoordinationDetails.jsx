import React, { useState } from 'react'
import EditCoordination from './EditCoordination'
import axios from 'axios'
import { toast } from 'react-toastify'

const CoordinationDetails = ({ coordination }) => {

    const [openForEdit, setOpenForEdit] = useState(false)
    const [choosenForEdit, setChoosenForEdit] = useState(null)

    const deleteCoordination = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/coordination/${id}`)
            toast.success(`${coordination.name} eliminada!`)
            setTimeout(() => {
                window.location = '/home/coordinaciones'
            }, 2000)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='w-[90rem]'>
            <div
                className='grid grid-cols-[3.3fr_1.5fr_1.5fr_1.5fr_1.5fr] ml-72 items-center text-md gap-x-4 mt-8 mb-8 bg-purple-950 rounded-xl text-white border-[0.2rem] border-fuchsia-600'>
                <div className='flex items-center bg-fuchsia-700 border-[0.1rem] border-fuchsia-500 rounded-lg m-3 justify-between'>
                    <div className='flex flex-col my-2 mx-1 p-2 items-center'>
                        <div className='flex items-center'>
                            {coordination.name}
                        </div>
                    </div>
                    <div className='flex gap-x-3 items-start justify-center p-3'>
                        <div className='flex flex-row gap-x-3'>
                            <button
                                onClick={() => {
                                    setOpenForEdit(true)
                                    setChoosenForEdit(coordination)
                                }
                                }
                                className='bg-fuchsia-600 px-3 py-1 rounded-md border-[0.1rem] border-white shadow-md hover:bg-fuchsia-400 hover:rounded-md hover:border-[0.1rem] hover:border-fuchsia-400 hover:duration-200'>
                                Editar
                            </button>
                            <button
                                onClick={() => deleteCoordination(coordination.id)}
                                className='bg-fuchsia-800 px-3 py-1 rounded-md border-[0.1rem] border-white shadow-md duration-200 hover:bg-fuchsia-950 hover:rounded-md hover:border-[0.1rem] hover:border-white hover:duration-200'>
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center bg-fuchsia-700 border-[0.1rem] border-fuchsia-500 rounded-lg p-1 mt-10'>
                    Día: {coordination.day}
                </div>
                <div className='flex flex-col items-center justify-center bg-fuchsia-700 border-[0.1rem] border-fuchsia-500 rounded-lg p-1 mt-10'>
                    Cantidad de días: {coordination.days}
                </div>
                <div className='flex flex-col items-center justify-center bg-fuchsia-700 border-[0.1rem] border-fuchsia-500 rounded-lg p-1 mt-10'>
                    Pago por hora: ${coordination.hourlyPay}
                </div>
                <div className='flex flex-col items-center justify-center bg-fuchsia-700 border-[0.1rem] border-fuchsia-500 rounded-lg p-1 mt-10 mr-3'>
                    Horas trabajando: {coordination.hours}
                </div>
                <div className='flex flex-col items-center justify-center bg-fuchsia-700 border-[0.1rem] border-fuchsia-500 rounded-lg p-1 mr-3 mb-3 ml-3'>
                    Teacher asociado: {coordination.teacherName ? coordination.teacherName : "No tiene"}
                </div>
            </div>
            <EditCoordination open={openForEdit} choosen={choosenForEdit} onClose={() => setOpenForEdit(false)}>
                Editar Coordinación:
            </EditCoordination>
        </div>
    )
}

export default CoordinationDetails