import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const TeacherTemplate = () => {
  const location = useLocation()
  const teacherId = location.state?.teacherId

  const [teacherTemplate, setTeacherTemplate] = useState({
    name: "",
    title: 0
  })

  const [courses, setCourses] = useState([])
  const [coordinations, setCoordinations] = useState([])

  const [viaticos, setViaticos] = useState({
    travel: "",
    days: ""
  })
  const [pagoTitle, setPagoTitle] = useState("")
  const [premio, setPremio] = useState("")

  const handleInputChangeCourses = (event, index, field) => {
    const { value } = event.target
  
    const newCourses = [...courses]
  
    newCourses[index] = {
      ...newCourses[index],
      [field]: value === "" ? "" : Number(value)
    };
  
    setCourses(newCourses)
  }
  
  const handleInputChangeCoordinations = (event, index, field) => {
    const { value } = event.target;
  
    // Crea una copia profunda del array de coordinations
    const newCoordinations = [...coordinations];
  
    // Actualiza el campo específico (days, hours, hourlyPay) en el índice correspondiente
    newCoordinations[index] = {
      ...newCoordinations[index],
      [field]: value === "" ? "" : Number(value)
    };
  
    // Actualiza el estado con el nuevo array de coordinations
    setCoordinations(newCoordinations);
  };  

  const handleInputChangeFotocopias = (event, index, field) => {
    const updatedCourses = [...courses];
    updatedCourses[index].fotocopias[field] = event.target.value === "" ? "" : Number(event.target.value);
    setCourses(updatedCourses)
  }

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

  const getTeacherCourses = async (teacherId) => {
    try {
      const response = await axios.get(`http://localhost:5000/teacher/${teacherId}/courses`)

      const coursesWithPhotocopies = response.data.map((course) => ({
        ...course,
        fotocopias: {
          precio: 0,
          cantidad: course.students * 2
        }
      }))

      setCourses(coursesWithPhotocopies)

    } catch (error) {
      toast.error(`Error fetching courses for teacher ${teacherId}: ${error.message}`)
    }
  }

  const getTeacherCoordinations = async (teacherName) => {
    try {
      const response = await axios.get(`http://localhost:5000/teacher/${teacherName}/coordinations`)

      setCoordinations(response.data)

    } catch (error) {
      toast.error(`Error fetching coordinations for teacher ${teacherName}: ${error.message}`)
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

    getTeacherCourses(teacherId)
  }, [teacherId])

  useEffect(() => {
    if (teacherTemplate.name) {
      getTeacherCoordinations(teacherTemplate.name)
    }
  }, [teacherTemplate.name])

  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  const fecha = new Date()
  const mesNumero = fecha.getMonth()
  const mesActual = meses[mesNumero]

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

  const calcularSubTotalCoordinaciones = () => {
    return coordinations.reduce((acc, curr) => acc + (curr.days * (curr.hourlyPay * curr.hours)), 0)
  }

  const calcularSubTotalCursos = () => {
    return courses.reduce((acc, curr) => acc + (curr.days * curr.payment), 0)
  }

  const calcularViaticos = () => {
    const total = viaticos.travel * viaticos.days
    return total
  }

  const calcularFotocopias = (index) => {
    const course = courses[index]
    const total = course.fotocopias.precio * course.fotocopias.cantidad
    return total
  }

  const subTotalCoordinaciones = calcularSubTotalCoordinaciones()
  const subTotalCursos = calcularSubTotalCursos()
  const subTotalViaticos = calcularViaticos()
  const subTotalTitle = pagoTitle
  const subTotalPremio = premio
  const subTotalFotocopias = courses.reduce((acc, _, index) => acc + calcularFotocopias(index), 0)
  const total = subTotalCoordinaciones + subTotalCursos + subTotalViaticos + subTotalFotocopias

  return (
    <div className=''>

      <div className='grid grid-rows ml-[15.5rem] mt-[1rem] bg-white p-3 rounded-lg border-[0.3rem] border-black text-sm space-y-[1rem]'>

        <div className='flex justify-between items-center p-3 space-x-[10rem] border-[0.1rem] rounded-lg border-black'>
          <div className='flex space-x-2'>
            <div className='font-semibold'>Profesor/a:</div>
            <div className=''>{teacherTemplate.name}</div>
          </div>
          <div className='flex space-x-2 items-center'>
            <div className='font-semibold'>Mes:</div>
            <select className='text-black p-1 leading-tight border border-black rounded-lg' defaultValue={mesActual}>
              {meses.map((mes, index) => (
                <option key={index} value={mes}>
                  {mes}
                </option>
              ))}
            </select>
          </div>
          <div className='flex space-x-1'>
            <div>Título:</div>
            <div>
              {
                teacherTemplate.title
                  ? <div className='font-bold'>Sí</div>
                  : <div className='font-bold'>No</div>
              }
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='font-semibold'>
              Viáticos:
            </div>
            <div className='flex flex-row text-sm items-center space-x-1'>
              <div>
                $
              </div>
              <input
                className='text-black border p-1 border-black rounded-lg w-16'
                type='number'
                value={viaticos.travel === "" ? "" : viaticos.travel}
                onChange={(event) => setViaticos({ ...viaticos, travel: event.target.value })}
              />
              <div>
                x
              </div>
              <input
                className='text-black border p-1 border-black rounded-lg w-16'
                type='number'
                value={viaticos.days === "" ? "" : viaticos.days}
                onChange={(event) => setViaticos({ ...viaticos, days: event.target.value })}
              />
              <div className='flex'>
                <div className='mr-1'>
                  Total:
                </div>
                <div className='font-semibold'>
                  ${subTotalViaticos}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {coordinations.map((coordination, index) => (
            <div key={index} className='border-[0.1rem] border-black rounded-lg p-3'>
              <div className='flex justify-between'>
                <div className='flex justify-center items-center font-semibold'>{coordination.name}</div>
                <div className='ml-3 flex gap-1'>
                  <div className='flex items-center'>
                    Día:
                  </div>
                  <select
                    defaultValue={coordination.day}
                    className='text-black border border-black rounded-lg p-1'>
                    {
                      dias.map((dia) => (
                        <option key={dia} value={dia}>
                          {dia}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <div className='flex gap-1 justify-center items-center'>
                  <div>Días:</div>
                  <input
                    className='text-black border p-1 border-black rounded-lg w-1/5'
                    type="number"
                    value={coordination.days}
                    onChange={(e) => handleInputChangeCoordinations(e, index, 'days')}
                  />
                </div>
                <div className='flex gap-1 justify-center items-center'>
                  <div>Horas en clase:</div>
                  <input
                    className='text-black border p-1 border-black rounded-lg w-1/5'
                    type="number"
                    value={coordination.hours}
                    onChange={(e) => handleInputChangeCoordinations(e, index, 'hours')}
                  />
                </div>
                <div className='flex gap-1 justify-center items-center'>
                  <div>Pago por hora:</div>
                  $<input
                    className='text-black border p-1 border-black rounded-lg w-1/5'
                    type="number"
                    value={coordination.hourlyPay}
                    onChange={(e) => handleInputChangeCoordinations(e, index, 'hourlyPay')}
                  />
                </div>
                <div className='font-semibold'>
                  Subtotal Coordinación: ${coordination.days * (coordination.hourlyPay * coordination.hours)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='space-y-3'>
          {courses.map((course, index) => (
            <div key={index} className='flex justify-between items-center space-x-3 py-12 border-[0.1rem] border-black p-3 rounded-lg'>
              <div className='flex flex-col space-y-1 mr-3'>
                <div>Curso:</div>
                <div className='font-semibold'>{course.name}</div>
              </div>
              <div className='ml-3 flex gap-1'>
                <div className='flex items-center'>
                  Día:
                </div>
                <div>
                  <select
                    defaultValue={course.day}
                    className='text-black border border-black rounded-lg p-1'>
                    {
                      dias.map((dia) => (
                        <option
                          key={dia}
                          value={dia}>
                          {dia}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className='flex'>
                <div className='flex'>
                  <div className='flex'>
                    <div className='flex items-center'>
                      Fotocopia: $
                    </div>
                    <input
                      className='text-black border p-1 border-black rounded-lg w-14'
                      type="number"
                      value={course.fotocopias.precio}
                      onChange={(e) => handleInputChangeFotocopias(e, index, 'precio')}

                    />
                  </div>
                  <div className='flex space-x-1'>
                    <div className='flex items-center ml-3'>
                      Cantidad fotocopias:
                    </div>
                    <input
                      className='border p-1 border-black rounded-lg w-14 text-black'
                      type="number"
                      value={course.fotocopias.cantidad}
                      onChange={(e) => handleInputChangeFotocopias(e, index, 'cantidad')}

                    />
                  </div>
                </div>
              </div>
              <div className='flex gap-1 items-center'>
                <div>Estudiantes:</div>
                <input
                  className='text-black border p-1 border-black rounded-lg w-12'
                  type="number"
                  value={course.students}
                  onChange={(e) => handleInputChangeCourses(e, index, 'students')}
                />
              </div>
              <div className='flex gap-1 items-center'>
                <div>Clases por mes:</div>
                <input
                  className='text-black border p-1 border-black rounded-lg w-10'
                  type="number"
                  value={course.days}
                  onChange={(e) => handleInputChangeCourses(e, index, 'days')}
                />
              </div>
              <div className='flex gap- items-center'>
                <div>Pago por clase: $</div>
                <input
                  className='text-black border p-1 border-black rounded-lg w-16'
                  type="number"
                  value={course.payment}
                  onChange={(e) => handleInputChangeCourses(e, index, 'payment')}
                />
              </div>
              <div className='font-semibold'>
                Subtotal Curso: ${(course.days * course.payment) + (course.fotocopias.cantidad * course.fotocopias.precio)}
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className='ml-[75rem] my-3 border-[0.3rem] rounded-lg border-black bg-white py-3 px-5'>
        <div className='flex flex-col'>
          <div className='flex space-x-1'>
            <div>
              Total Coordinación:
            </div>
            <div className='font-semibold'>
              ${subTotalCoordinaciones}
            </div>
          </div>
          <div className='flex space-x-1'>
            <div>
              Total Cursos:
            </div>
            <div className='font-semibold'>
              ${subTotalCursos}
            </div>
          </div>
        </div>
        <br />

        <div className='flex space-x-1'>
          <div>
            Viáticos:
          </div>
          <div className='font-semibold'>
            ${subTotalViaticos}
          </div>
        </div>
        <br />
        {
          teacherTemplate.title
            ?
            <div className='flex space-x-1'>
              <div>
                Título:
              </div>
              <div className='font-semibold'>
                $<input
                  className='border pl-1 border-black rounded-lg w-16 font-semibold'
                  type='number'
                  value={pagoTitle}
                  onChange={(event) => setPagoTitle(Number(event.target.value))}
                />
              </div>
            </div>
            : ""
        }
        <div className='flex space-x-1'>
          <div>
            Premio por asistencia:
          </div>
          <div className='font-semibold'>
            $<input
              className='border pl-1 border-black rounded-lg w-16 font-semibold'
              type='number'
              value={premio}
              onChange={(event) => setPremio(Number(event.target.value))}
            />
          </div>
        </div>

        <br />
        <div className='border p-3 border-black rounded-lg'>
          <div className='font-semibold'>
            Total a percibir:
          </div>
          <div className='font-bold'>
            ${total + subTotalTitle + subTotalPremio}
          </div>
        </div>
      </div>

    </div >
  )
}

export default TeacherTemplate