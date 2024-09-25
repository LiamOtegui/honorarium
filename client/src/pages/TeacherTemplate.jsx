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
  const [viaticos, setViaticos] = useState({
    travel: 0,
    days: 0
  })
  const [pagoTitle, setPagoTitle] = useState(0)
  const [premio, setPremio] = useState(0)

  const handleInputChange = (e, index, type, field) => {
    const newDetails = { ...details }
    newDetails[type][index][field] = e.target.value
    setDetails(newDetails)
  }

  const handleInputChangeFotocopias = (e, index, field) => {
    const updatedCourses = [...details.courses];
    updatedCourses[index].fotocopias[field] = Number(e.target.value);
    setDetails({
      ...details,
      courses: updatedCourses
    });
  };

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

      const coursesWithPhotocopies = coursesResponse.data.map((course) => ({
        ...course,
        fotocopias: {
          precio: 0,
          cantidad: 0
        }
      }))

      setDetails({
        courses: coursesWithPhotocopies,
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
  const fecha = new Date()
  const mesNumero = fecha.getMonth()
  const mesActual = meses[mesNumero]

  const calcularSubTotalCoordinaciones = () => {
    return details.coordinations.reduce((acc, curr) => acc + (curr.days * (curr.hourlyPay * curr.hours)), 0)
  }

  const calcularSubTotalCursos = () => {
    return details.courses.reduce((acc, curr) => acc + (curr.days * (curr.payment * curr.students)), 0)
  }

  const calcularViaticos = () => {
    const total = viaticos.travel * viaticos.days
    return total
  }

  const calcularFotocopias = (index) => {
    const course = details.courses[index]
    const total = course.fotocopias.precio * course.fotocopias.cantidad
    return total
  }


  const subTotalCoordinaciones = calcularSubTotalCoordinaciones()
  const subTotalCursos = calcularSubTotalCursos()
  const subTotalViaticos = calcularViaticos()
  const subTotalTitle = pagoTitle
  const subTotalPremio = premio
  const subTotalFotocopias = details.courses.reduce((acc, _, index) => acc + calcularFotocopias(index), 0)
  const total = subTotalCoordinaciones + subTotalCursos + subTotalViaticos + subTotalTitle + subTotalPremio + subTotalFotocopias

  return (
    <div className=''>

      <div className='grid grid-rows ml-[18rem] mt-[1rem] bg-cyan-600 p-3 rounded-lg border-[0.3rem] border-cyan-800 text-sm space-y-[1rem]'>

        <div className='flex justify-between space-x-[10rem]'>
          <div className='flex space-x-2'>
            <div>Profesor/a:</div>
            <div className='font-semibold'>{teacherTemplate.name}</div>
          </div>
          <div className='flex space-x-2'>
            <div>Mes:</div>
            <div className='font-semibold'>{mesActual}</div>
          </div>
          <div className='flex space-x-1'>
            <div>Título:</div>
            <div>
              {
                teacherTemplate.title
                  ? "✅"
                  : "❌"
              }
            </div>
          </div>
          <div className='flex'>
            Viáticos:
            <div className='flex flex-col text-sm space-y-1'>
              Costo de viaje:
              <input
                className='border w-1/3'
                type='number'
                value={viaticos.travel}
                onChange={(event) => setViaticos({ ...viaticos, travel: Number(event.target.value) })}
              />
              Cantidad de viajes:
              <input
                className='border w-1/3'
                type='number'
                value={viaticos.days}
                onChange={(event) => setViaticos({ ...viaticos, days: Number(event.target.value) })}
              />
              <div className='flex'>
                Total:
                <div className='font-semibold'>
                  ${subTotalViaticos}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {details.coordinations.map((coordination, index) => (
            <div key={index} className='flex justify-between'>
              <div className='font-semibold'>{coordination.name}</div>
              <div className='flex gap-1'>
                <div>Días:</div>
                <input
                  className='border w-1/5'
                  type="number"
                  value={coordination.days}
                  onChange={(e) => handleInputChange(e, index, 'coordinations', 'days')}
                />
              </div>
              <div className='flex gap-1'>
                <div>Pago por hora:</div>
                $<input
                  className='border w-1/5'
                  type="number"
                  value={coordination.hourlyPay}
                  onChange={(e) => handleInputChange(e, index, 'coordinations', 'hourlyPay')}
                />
              </div>
              <div className='flex gap-1'>
                <div>Horas:</div>
                <input
                  className='border w-1/5'
                  type="number"
                  value={coordination.hours}
                  onChange={(e) => handleInputChange(e, index, 'coordinations', 'hours')}
                />
              </div>
              <div className='font-semibold'>
                Subtotal: ${coordination.days * (coordination.hourlyPay * coordination.hours)}
              </div>
            </div>
          ))}
        </div>

        <div>
          {details.courses.map((course, index) => (
            <div key={index} className='flex justify-between items-center py-12'>
              <div className='flex gap-1'>
                <div>Curso:</div>
                <div className='font-semibold'>{course.name}</div>
              </div>
              <div className='flex gap-1'>
                <div>
                  Fotocopias
                </div>
                <div>
                  Precio:
                  $<input
                    className='border w-14'
                    type="number"
                    value={course.fotocopias.precio}
                    onChange={(e) => handleInputChangeFotocopias(e, index, 'precio')}

                  />
                  Cantidad:
                  <input
                    className='border w-14'
                    type="number"
                    value={course.fotocopias.cantidad}
                    onChange={(e) => handleInputChangeFotocopias(e, index, 'cantidad')}

                  />
                </div>
              </div>
              <div className='flex gap-1'>
                <div>Días:</div>
                <input
                  className='border w-10'
                  type="number"
                  value={course.days}
                  onChange={(e) => handleInputChange(e, index, 'courses', 'days')}
                />
              </div>
              <div className='flex gap-1'>
                <div>Estudiantes:</div>
                <input
                  className='border w-12'
                  type="number"
                  value={course.students}
                  onChange={(e) => handleInputChange(e, index, 'courses', 'students')}
                />
              </div>
              <div className='flex gap-1'>
                <div>Clase:</div>
                $<input
                  className='border w-16'
                  type="number"
                  value={course.payment}
                  onChange={(e) => handleInputChange(e, index, 'courses', 'payment')}
                />
              </div>
              <div className='font-semibold'>
                Subtotal: ${course.days * (course.payment * course.students)}
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className='flex-col ml-[65rem] mt-3 inline-block border-[0.3rem] rounded-lg border-cyan-800 bg-cyan-600 py-3 px-5 text-white'>
        Total Coordinación: ${subTotalCoordinaciones}
        <br />
        Total Cursos: ${subTotalCursos}
        <br />
        <br />

        Viáticos: ${subTotalViaticos}
        <br />
        {
          teacherTemplate.title
            ? <div>
              Título: $
              <input
                className='border w-1/6 text-black'
                type='number'
                value={pagoTitle}
                onChange={(event) => setPagoTitle(Number(event.target.value))}
              />
            </div>
            : ""
        }
        <div>
          Premio por asistencia: ${
            <input
              className='border w-1/6 text-black'
              type='number'
              value={premio}
              onChange={(event) => setPremio(Number(event.target.value))}
            />
          }
        </div>
        <br />
        Total a percibir: ${total}
      </div>

    </div>
  )
}

export default TeacherTemplate