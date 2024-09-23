import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const TeacherTemplate = () => {

  const location = useLocation()
  const teacherId = location.state?.teacherId

  const [teacherTemplate, setTeacherTemplate] = useState({
    name: "",
    title: null
  })

  const [details, setDetails] = useState({
    courses: [],
    coordinations: []
  })

  const getTeacherById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/teacher/${id}`)
      return {
        name: response.data.name,
        title: response.data.title
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getTeacherDetails = async (teacherId) => {
    try {
      const coursesResponse = await axios.get(`http://localhost:5000/teacher/${teacherId}/courses`)
      const coordinationsResponse = await axios.get(`http://localhost:5000/teacher/${teacherId}/coordinations`)

      setDetails({
        courses: coursesResponse.data,
        coordinations: coordinationsResponse.data
      })

    } catch (error) {
      toast.error(`Error fetching details for teacher ${teacherId}: ${error.message}`)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (teacherId) {
        const details = await getTeacherById(teacherId)
        setTeacherTemplate(details)
      }
    }
    fetchData()

    getTeacherDetails(teacherId)
  }, [teacherId])

  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  const fecha = new Date
  const mesNumero = fecha.getMonth()
  const mesActual = meses[mesNumero]


  return (
    <div className='grid grid-rows ml-[16rem] mt-[2rem] mr-[2.5rem] space-y-12 font-mono'>

      <div className='flex justify-between space-x-[11rem]'>
        <div className='flex space-x-2'>
          <div>
            Profesor/a:
          </div>
          <div className='font-semibold'>
            {teacherTemplate.name}
          </div>
        </div>
        <div className='flex space-x-2'>
          <div>
            Mes:
          </div>
          <div className='font-semibold'>
            {mesActual}
          </div>
        </div>
        <div className='flex space-x-1'>
          <div>
            Título:
          </div>
          <div>
            {teacherTemplate.title ? "✅" : "❌"}
          </div>
        </div>
        <div className='flex space-x-2'>
          <div>
            Viaticos:
          </div>
          <div className='font-semibold'>
            "Funcion que multiplique el precio del viaje por la cantidad de viajes y muestre el total"
          </div>
          <div>
            "Sub-Total aca"
          </div>
        </div>
      </div>

      <div>
        {details.coordinations.map((coordination, index) => (
          <div key={index} className='flex justify-between'>
            <div className='font-semibold'>
              {coordination.name}
            </div>
            <div className='flex gap-1'>
              <div>
                Dias:
              </div>
              <div className='font-semibold'>
                {coordination.days}
              </div>
            </div>
            <div className='flex gap-1'>
              <div className=''>
                Hora:
              </div>
              <div className='font-semibold'>
                ${coordination.hourlyPay}
              </div>
            </div>
            <div className='flex gap-1'>
              <div>
                Horas:
              </div>
              <div className='font-semibold'>
                {coordination.hours}
              </div>
            </div>
            <div>
              "Sub-Total aca"
            </div>
          </div>
        ))}
      </div>

      <div>
        {details.courses.map((course, index) => (
          <div key={index} className='flex justify-between items-center py-12'>
            <div className='flex gap-1'>
              <div>
                Curso:
              </div>
              <div className='font-semibold'>
                {course.name}
              </div>
            </div>
            <div className='flex gap-1'>
              <div>
                Dias:
              </div>
              <div className='font-semibold'>
                {course.days}
              </div>
            </div>
            <div className='flex gap-1'>
              <div>
                Estudiantes:
              </div>
              <div className='font-semibold'>
                {course.students}
              </div>
            </div>
            <div className='flex gap-1'>
              <div>
                Clase:
              </div>
              <div className='font-semibold'>
                ${course.payment}
              </div>
            </div>
            <div>
              "Sub-Total aca"
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default TeacherTemplate