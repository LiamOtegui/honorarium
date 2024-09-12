import React, { useEffect, useState } from 'react'
import EditTeacher from './EditTeacher'

const TeacherDetails = ({ teacher, getTeacherDetails }) => {

    const [details, setDetails] = useState({
        courses: [],
        coordinations: []
    })
    const [openForEdit, setOpenForEdit] = useState(false)
    const [choosenForEdit, setChoosenForEdit] = useState(null)

    useEffect(() => {
        const fetchDetails = async () => {
            const details = await getTeacherDetails(teacher.id)
            setDetails(details)
        }
        fetchDetails()
    }, [teacher.id, getTeacherDetails])

    return (
        <div>
            <div
                className='ml-64 items-center text-lg grid grid-cols-3 md:gap-x-0 lg:gap-x-0 xl:gap-x-0 2xl:gap-x-4 mt-10 bg-cyan-600 rounded-xl text-white border-[0.2rem] border-cyan-700'>
                <div className='flex items-center space-x-3 bg-cyan-700 rounded-lg m-3'>
                    <div className='p-3 justify-center items-center hover:bg-cyan-500 m-3 hover:rounded-lg duration-200'>
                        <div className='text-sm'>
                            ID: {teacher.id}
                        </div>
                        <div>
                            {teacher.name}
                        </div>
                    </div>
                    <div className='flex gap-x-10 items-start justify-center p-3'>
                        {teacher.title === true ? "Title ✅" : "Title ❌"}
                        <button
                            onClick={() => {
                                setOpenForEdit(true)
                                setChoosenForEdit(teacher)
                            }
                            }
                            className='bg-cyan-500 px-3 p [choosenForEdit, setChoosenForEdit]y-1 rounded-md border-[0.1rem] border-cyan-300 shadow-md'>
                            Edit
                        </button>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center bg-cyan-700 rounded-lg py-1'>
                    {details.courses.length > 0 ? (
                        details.courses.map((course) => (
                            <div key={course.id} className='flex items-center gap-2 text-center'>
                                <div className='text-sm'>
                                    ID: {course.id}
                                </div>
                                <div>
                                    {course.name}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-red-500'>No courses</div>
                    )}
                </div>
                <div className='flex flex-col items-center justify-center bg-cyan-700 rounded-lg py-1 mr-3'>
                    {details.coordinations.length > 0 ? (
                        details.coordinations.map((coordination) => (
                            <div key={coordination.id} className='text-center'>{coordination.name}</div>
                        ))
                    ) : (
                        <div className='text-red-500'>No coordinations</div>
                    )}
                </div>
            </div>
            <EditTeacher open={openForEdit} teacher={choosenForEdit} onClose={() => setOpenForEdit(false)}>
                Edit Name or Title:
            </EditTeacher>
        </div>
    )
}

export default TeacherDetails
