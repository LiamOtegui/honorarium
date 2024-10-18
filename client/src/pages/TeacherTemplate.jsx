import React, { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import html2pdf from 'html2pdf.js'

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

  const [feriados, setFeriados] = useState("")

  const [adicionales, setAdicionales] = useState([]);
  const [adTotal, setAdTotal] = useState(0)
  const [adAdded, setAdAdded] = useState(false)

  const contentRef = useRef(null)

  const handleInputChangeCourses = (event, index, field) => {
    const { value } = event.target

    const newCourses = [...courses]

    newCourses[index] = {
      ...newCourses[index],
      [field]: value === "" ? "" : Number(value)
    }

    setCourses(newCourses)
  }

  const handleInputChangeCoordinations = (event, index, field) => {
    const { value } = event.target

    const newCoordinations = [...coordinations]

    newCoordinations[index] = {
      ...newCoordinations[index],
      [field]: value === "" ? "" : Number(value)
    }

    setCoordinations(newCoordinations);
  }

  const handleInputChangeFotocopias = (event, index, field) => {
    const updatedCourses = [...courses];
    updatedCourses[index].fotocopias[field] = event.target.value === "" ? "" : Number(event.target.value);

    const { precio, copias } = updatedCourses[index].fotocopias;
    updatedCourses[index].fotocopias.total = precio * copias;

    setCourses(updatedCourses);
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
          copias: 2,
          total: 0
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
    const totalDays = course.days - feriados
    const total = totalDays > 0 ? course.fotocopias.total * totalDays : 0
    return total
  }

  ///////////////////////////////

  const handleAddAdicional = () => {
    setAdicionales([...adicionales, { nombre: '', valor: 0 }])
  }

  const handleRemoveAdicional = (index) => {
    const updatedAdicionales = adicionales.filter((_, i) => i !== index)
    setAdicionales(updatedAdicionales)
    calculateTotal(updatedAdicionales)
  }

  const handleAdicionalChange = (index, field, value) => {
    const updatedAdicionales = [...adicionales]
    updatedAdicionales[index][field] = value
    setAdicionales(updatedAdicionales)
    calculateTotal(updatedAdicionales)
  }

  const calculateTotal = (adicionalesList) => {
    let sum = 0;
    adicionalesList.forEach(adicional => {
      sum += Number(adicional.valor) || 0
    })
    setAdTotal(sum)
  }


  ///////////////////////////////

  const subTotalCoordinaciones = calcularSubTotalCoordinaciones()
  const subTotalCursos = calcularSubTotalCursos()
  const subTotalViaticos = calcularViaticos()
  const subTotalTitle = pagoTitle === "" ? 0 : pagoTitle
  const subTotalPremio = premio === "" ? 0 : premio
  const subTotalFotocopias = courses.reduce((acc, _, index) => acc + calcularFotocopias(index), 0)
  const total = subTotalCoordinaciones + subTotalCursos + subTotalViaticos + subTotalTitle + subTotalPremio + subTotalFotocopias + adTotal

  const downloadPDF = () => {
    const content = contentRef.current
    const opt = {
      margin: 0,
      filename: `Liquidación ${teacherTemplate.name}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1.5 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    }
    html2pdf().from(content).set(opt).save()
  }

  return (
    <div className='ml-[20rem] p-6 bg-gray-50'>
      {/* Contenedor Principal */}
      <div ref={contentRef} className='bg-white p-6 rounded-lg border border-black shadow-md'>
        {/* Encabezado del Profesor */}
        <div className='flex justify-between items-center mb-4'>
          <div className='flex space-x-4'>
            <div className='font-semibold'>Profesor/a:</div>
            <div>{teacherTemplate.name}</div>
          </div>
          <div className='flex space-x-4 items-center'>
            <div className='font-semibold'>Mes:</div>
            <select className='border border-black p-1 rounded-md'>
              {meses.map((mes, index) => (
                <option key={index} value={mes}>
                  {mes}
                </option>
              ))}
            </select>
          </div>
          <div className='flex space-x-4'>
            <div className='font-semibold'>Título:</div>
            <div>{teacherTemplate.title ? 'Sí' : 'No'}</div>
          </div>
        </div>

        {/* Viáticos */}
        <div className='flex items-center border-b border-gray-300 pb-4 mb-4'>
          <div className='font-semibold'>Viáticos:</div>
          <div className='flex items-center space-x-2'>
            <span>$</span>
            <input
              type='number'
              className='border border-black p-1 w-16 text-right'
              value={viaticos.travel}
              onChange={(e) => setViaticos({ ...viaticos, travel: e.target.value })}
            />
            <span>x</span>
            <input
              type='number'
              className='border border-black p-1 w-16 text-right'
              value={viaticos.days}
              onChange={(e) => setViaticos({ ...viaticos, days: e.target.value })}
            />
            <span>=</span>
            <span className='font-semibold'>${subTotalViaticos}</span>
          </div>
        </div>

        {/* Coordinaciones */}
        <div className='mb-6'>
          {coordinations.map((coordination, index) => (
            <div key={index} className='border border-black p-4 rounded-md mb-3'>
              <div className='flex justify-between items-center'>
                <div className='font-semibold'>{coordination.name}</div>
                <div className='flex items-center space-x-2'>
                  <div>Día:</div>
                  <select
                    defaultValue={coordination.day}
                    className='border border-black p-1 rounded-md'>
                    {dias.map((dia) => (
                      <option key={dia} value={dia}>
                        {dia}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex items-center'>
                  <span>Días: </span>
                  <input
                    type='number'
                    className='border border-black p-1 w-16 text-right'
                    value={coordination.days}
                    onChange={(e) => handleInputChangeCoordinations(e, index, 'days')}
                  />
                </div>
                <div className='flex items-center'>
                  <span>Horas en clase: </span>
                  <input
                    type='number'
                    className='border border-black p-1 w-16 text-right'
                    value={coordination.hours}
                    onChange={(e) => handleInputChangeCoordinations(e, index, 'hours')}
                  />
                </div>
                <div className='flex items-center'>
                  <span>Pago por hora: $</span>
                  <input
                    type='number'
                    className='border border-black p-1 w-16 text-right'
                    value={coordination.hourlyPay}
                    onChange={(e) => handleInputChangeCoordinations(e, index, 'hourlyPay')}
                  />
                </div>
                <div className='font-semibold'>
                  Subtotal Coordinación: ${coordination.days * coordination.hours * coordination.hourlyPay}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cursos */}
        <div className='mb-6'>
          {courses.map((course, index) => (
            <div key={index} className='border border-black p-4 rounded-md mb-3'>
              <div className='flex justify-between items-center'>
                <div className='font-semibold'>{course.name}</div>
                <div className='flex items-center space-x-2'>
                  <div>Día:</div>
                  <select
                    defaultValue={course.day}
                    className='border border-black p-1 rounded-md'>
                    {dias.map((dia) => (
                      <option key={dia} value={dia}>
                        {dia}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex items-center'>
                  <span>Estudiantes: </span>
                  <input
                    type='number'
                    className='border border-black p-1 w-16 text-right'
                    value={course.students}
                    onChange={(e) => handleInputChangeCourses(e, index, 'students')}
                  />
                </div>
                <div className='flex items-center'>
                  <span>Clases por mes: </span>
                  <input
                    type='number'
                    className='border border-black p-1 w-16 text-right'
                    value={course.days}
                    onChange={(e) => handleInputChangeCourses(e, index, 'days')}
                  />
                </div>
                <div className='flex items-center'>
                  <span>Pago por clase: $</span>
                  <input
                    type='number'
                    className='border border-black p-1 w-16 text-right'
                    value={course.payment}
                    onChange={(e) => handleInputChangeCourses(e, index, 'payment')}
                  />
                </div>
                <div className='font-semibold'>
                  Subtotal Curso: ${(course.days * course.payment) + (course.fotocopias.copias * course.fotocopias.precio)}
                </div>
              </div>
              <div className='flex items-center mt-3'>
                <span>Fotocopias: $</span>
                <input
                  type='number'
                  className='border border-black p-1 w-16 text-right'
                  value={course.fotocopias.precio}
                  onChange={(e) => handleInputChangeFotocopias(e, index, 'precio')}
                />
                <span>x</span>
                <input
                  type='number'
                  className='border border-black p-1 w-16 text-right'
                  value={course.fotocopias.copias}
                  onChange={(e) => handleInputChangeFotocopias(e, index, 'copias')}
                />
                <span>= $</span>
                <span className='font-semibold'>
                  {(course.fotocopias.copias * course.fotocopias.precio).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Totales y Adicionales */}
        <div className='grid grid-cols-2 gap-6'>
          <div className='bg-white p-4 border border-black rounded-lg'>
            <h2 className='text-lg font-semibold mb-3'>Adicionales</h2>
            {adicionales.map((adicional, index) => (
              <div key={index} className='flex items-center space-x-2 mb-2'>
                <input
                  type='text'
                  className='border border-black p-1 rounded-md w-1/2'
                  placeholder='Nombre'
                  value={adicional.nombre}
                  onChange={(e) => handleAdicionalChange(index, 'nombre', e.target.value)}
                />
                <input
                  type='number'
                  className='border border-black p-1 rounded-md w-1/3'
                  placeholder='Valor'
                  value={adicional.valor}
                  onChange={(e) => handleAdicionalChange(index, 'valor', e.target.value)}
                />
                <button
                  className='bg-red-500 text-white p-1 rounded-md'
                  onClick={() => handleRemoveAdicional(index)}
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button
              className='bg-green-500 text-white p-2 rounded-md'
              onClick={handleAddAdicional}
            >
              Agregar Adicional
            </button>
            <div className='mt-4'>
              <div className='font-semibold'>Total Adicionales: ${adTotal}</div>
            </div>
          </div>

          <div className='bg-white p-4 border border-black rounded-lg'>
            <h2 className='text-lg font-semibold mb-3'>Totales</h2>
            <div className='space-y-2'>
              <div className='flex space-x-1'>
                <span>Total Coordinación:</span>
                <span className='font-semibold'>${subTotalCoordinaciones}</span>
              </div>
              <div className='flex space-x-1'>
                <span>Total Cursos:</span>
                <span className='font-semibold'>${subTotalCursos}</span>
              </div>
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

              <div className='flex items-center'>
                <div className='mr-1'>Feriados:</div>
                <input
                  className='text-black border px-1 border-black rounded-lg w-16 font-semibold'
                  type='number'
                  value={feriados}
                  onChange={(event) => setFeriados(Number(event.target.value))}
                />
              </div>
              <div className='flex justify-between'>
                <span>Total a Pagar:</span>
                <span className='font-bold text-xl'>${total}</span>
              </div>
            </div>
          </div>
        </div>
        <button
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'
          onClick={downloadPDF}
        >
          Descargar PDF
        </button>
      </div>
    </div>
  )
}

export default TeacherTemplate