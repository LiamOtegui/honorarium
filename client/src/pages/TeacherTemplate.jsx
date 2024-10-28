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

      const coursesWithDetails = response.data.map((course) => ({
        ...course,
        fotocopias: {
          precio: 0,
          copias: 2,
          total: 0,
          feriados: 0
        }
      }))

      setCourses(coursesWithDetails)

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

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves"]

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
    const totalStudents = course.students
    const total = totalStudents > 0 ? course.fotocopias.total * totalStudents : 0
    return total
  }

  const handleInputChangeFeriados = (event, index) => {
    const updatedCourses = [...courses]

    const feriadosInput = event.target.value === "" ? 0 : Number(event.target.value)
    updatedCourses[index].feriados = feriadosInput

    const totalFotocopias = updatedCourses[index].fotocopias.copias * updatedCourses[index].fotocopias.precio

    if (updatedCourses[index].days > 0) {
      const costoPorClase = totalFotocopias / updatedCourses[index].days
      const ajusteFeriados = feriadosInput * costoPorClase

      updatedCourses[index].fotocopias.total = totalFotocopias - ajusteFeriados
    } else {
      updatedCourses[index].fotocopias.total = totalFotocopias
    }

    setCourses(updatedCourses);
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

    content.classList.add('w-full', 'h-auto', 'p-4');

    const opt = {
      margin: 0,
      filename: `Liquidación de honorarios ${mesActual} ${teacherTemplate.name}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
        scale: 2,
        scrollX: 0,
        scrollY: 0,
        logging: true,
        useCORS: true
      },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css'] }
    }
    html2pdf().from(content).set(opt).save()
  }

  return (
    <div className='ml-[27.5rem] p-6 bg-gray-50'>

      <div ref={contentRef} className='h-auto bg-white p-6 border border-black shadow-md w-[49.7rem]'>

        <div className='flex justify-between items-center mb-4 text-sm'>
          <div className='flex space-x-4'>
            <div className='font-semibold'>Profesor/a:</div>
            <div>{teacherTemplate.name}</div>
          </div>
          <div className='flex space-x-4 items-center'>
            <div className='font-semibold'>Mes:</div>
            <select
              defaultValue={mesActual}
              className='border border-black px-1 rounded-md h-8 leading-8'>
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


        <div className='flex items-center border-b border-gray-300 pb-4 mb-4 text-sm'>
          <div className='font-semibold'>Viáticos:</div>
          <div className='flex items-center'>
            <span className='ml-2'>$</span>
            <input
              type='number'
              className='border border-black px-1 w-16 text-right h-8 leading-8 rounded-md'
              value={viaticos.travel}
              onChange={(e) => setViaticos({ ...viaticos, travel: e.target.value })}
              onWheel={(e) => e.target.blur()}
            />
            <span className='mx-2'>Cantidad de viajes:</span>
            <input
              type='number'
              className='border border-black px-1 w-16 text-right h-8 leading-8 rounded-md'
              value={viaticos.days}
              onChange={(e) => setViaticos({ ...viaticos, days: e.target.value })}
              onWheel={(e) => e.target.blur()}
            />
            <span className='mx-2'>=</span>
            <span className='font-semibold'>${subTotalViaticos}</span>
          </div>
        </div>


        <div className='mb-6 text-xs'>
          {coordinations.map((coordination, index) => (
            <div key={index} className='border border-black p-3 rounded-md'>
              <div className='flex items-center'>
                <div className='font-semibold mr-8'>{coordination.name}</div>
                <div className='flex flex-col'>
                  <div className='flex'>
                    <div className='flex items-center space-x-1'>
                      <div>Día:</div>
                      <select
                        defaultValue={coordination.day}
                        className='border border-black px-1 rounded-md h-8 leading-8'>
                        {dias.map((dia) => (
                          <option key={dia} value={dia}>
                            {dia}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='flex items-center space-x-1 ml-8'>
                      <span>Días: </span>
                      <input
                        type='number'
                        className='border border-black px-1 w-16 text-right h-8 leading-8 rounded-md'
                        value={coordination.days}
                        onChange={(e) => handleInputChangeCoordinations(e, index, 'days')}
                        onWheel={(e) => e.target.blur()}
                      />
                    </div>
                  </div>
                  <div className='flex space-x-5 mt-3'>
                    <div className='flex items-center space-x-1'>
                      <span>Horas en clase: </span>
                      <input
                        type='number'
                        className='border border-black px-1 w-16 text-right h-8 leading-8 rounded-md'
                        value={coordination.hours}
                        onChange={(e) => handleInputChangeCoordinations(e, index, 'hours')}
                        onWheel={(e) => e.target.blur()}
                      />
                    </div>
                    <div className='flex items-center'>
                      <span>Pago por hora: $</span>
                      <input
                        type='number'
                        className='border border-black px-1 w-16 text-right h-8 leading-8 rounded-md'
                        value={coordination.hourlyPay}
                        onChange={(e) => handleInputChangeCoordinations(e, index, 'hourlyPay')}
                        onWheel={(e) => e.target.blur()}
                      />
                    </div>
                  </div>
                </div>
                <div className='font-semibold flex pl-[6.5rem]'>
                  Subtotal Coordinación: ${coordination.days * coordination.hours * coordination.hourlyPay}
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className='mb-6 text-xs'>
          {courses.map((course, index) => (
            <div key={index} className='border border-black p-3 rounded-md mb-3 flex justify-between'>
              <div className='flex flex-col'>
                <div className='flex space-x-3 items-center'>
                  <div className='font-semibold'>{course.name}</div>
                  <div className='flex items-center space-x-1'>
                    <div>Día:</div>
                    <select
                      defaultValue={course.day}
                      className='border border-black px-1 rounded-md h-8 leading-8'>
                      {dias.map((dia) => (
                        <option key={dia} value={dia}>
                          {dia}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <span>Clases por mes: </span>
                    <input
                      type='number'
                      className='border border-black px-1 w-16 text-right h-8 leading-8 rounded-md'
                      value={course.days}
                      onChange={(e) => handleInputChangeCourses(e, index, 'days')}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                  <div className='flex items-center'>
                    <span>Pago por clase: $</span>
                    <input
                      type='number'
                      className='border border-black px-1 w-16 text-right h-8 leading-8 rounded-md'
                      value={course.payment}
                      onChange={(e) => handleInputChangeCourses(e, index, 'payment')}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                </div>
                <div className='flex items-center mt-3'>
                  <div>
                    <span>Fotoc. por clase: $</span>
                    <input
                      type='number'
                      className='border border-black px-1 w-14 text-right h-8 leading-8 rounded-md'
                      value={course.fotocopias.precio}
                      onChange={(e) => handleInputChangeFotocopias(e, index, 'precio')}
                      onWheel={(e) => e.target.blur()}
                    />
                    <span>x</span>
                    <input
                      type='number'
                      className='border border-black px-1 w-14 text-right h-8 leading-8 rounded-md'
                      value={course.fotocopias.copias}
                      onChange={(e) => handleInputChangeFotocopias(e, index, 'copias')}
                      onWheel={(e) => e.target.blur()}
                    />
                    <span className='ml-1'>= $</span>
                    <span className='font-semibold h-8 leading-8'>
                      {(course.fotocopias.copias * course.fotocopias.precio).toFixed(2)}
                    </span>
                  </div>
                  <span className='ml-1'>x</span>
                  <div className='flex ml-1 space-x-3'>
                    <div className='flex items-center space-x-1'>
                      <span>Estudiantes: </span>
                      <input
                        type='number'
                        className='border border-black px-1 w-14 text-right h-8 leading-8 rounded-md'
                        value={course.students}
                        onChange={(e) => handleInputChangeCourses(e, index, 'students')}
                        onWheel={(e) => e.target.blur()}
                      />
                    </div>
                    <div className='flex items-center space-x-1'>
                      <div className=''>Feriados:</div>
                      <input
                        className='text-black border px-1 border-black rounded-lg w-14 font-semibold h-8 leading-8'
                        type='number'
                        value={courses.feriados}
                        onChange={(e) => handleInputChangeFeriados(e, index)}
                        onWheel={(e) => e.target.blur()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='font-semibold flex'>
                Subtotal Curso: ${(course.days * course.payment) + (course.fotocopias.total * course.students)}
              </div>
            </div>
          ))}
        </div>


        <div className='flex gap-3 text-sm'>
          <div className='bg-white p-4 border border-black rounded-lg'>
            <h2 className='text-base font-semibold mb-3'>Adicionales</h2>
            {adicionales.map((adicional, index) => (
              <div key={index} className='flex items-center space-x-2 mb-2'>
                <input
                  type='text'
                  className='border border-black px-1 rounded-md w-1/2 h-8 leading-8'
                  placeholder='Nombre'
                  value={adicional.nombre}
                  onChange={(e) => handleAdicionalChange(index, 'nombre', e.target.value)}
                />
                <input
                  type='number'
                  className='border border-black px-1 rounded-md w-1/3 h-8 leading-8'
                  placeholder='Valor'
                  value={adicional.valor}
                  onChange={(e) => handleAdicionalChange(index, 'valor', e.target.value)}
                  onWheel={(e) => e.target.blur()}
                />
                <button
                  className='bg-red-500 text-white px-1 rounded-md h-8 leading-8'
                  onClick={() => handleRemoveAdicional(index)}
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button
              className='bg-green-500 text-white px-2 py-1 rounded-md'
              onClick={handleAddAdicional}
            >
              Agregar Adicional
            </button>
            <div className='mt-4'>
              <div className='font-semibold'>Total Adicionales: ${adTotal}</div>
            </div>
          </div>

          <div className='bg-white py-4 pr-10 pl-4 border border-black rounded-lg'>
            <h2 className='font-semibold mb-3 text-base'>
              Totales
            </h2>
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
                  <div className='flex items-center space-x-1'>
                    <div className=''>
                      Título:
                    </div>
                    <div className='font-semibold'>
                      <span>$</span>
                      <input
                        className='border pl-1 border-black rounded-lg w-16 font-semibold h-8 leading-8'
                        type='number'
                        value={pagoTitle}
                        onChange={(event) => setPagoTitle(Number(event.target.value))}
                        onWheel={(e) => e.target.blur()}
                      />
                    </div>
                  </div>
                  : ""
              }
              <div className='flex items-center space-x-1'>
                <div>
                  Asistencia 100%:
                </div>
                <div className='font-semibold'>
                  <span>$</span>
                  <input
                    className='border pl-1 border-black rounded-lg w-16 font-semibold h-8 leading-8'
                    type='number'
                    value={premio}
                    onChange={(event) => setPremio(Number(event.target.value))}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>
              </div>

              <div className='flex justify-between text-lg'>
                <span className='font-semibold'>Total a percibir:</span>
                <span className='font-bold text-lg'>${total}</span>
              </div>
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
  )
}

export default TeacherTemplate