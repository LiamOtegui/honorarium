import React, { useState } from 'react'
import EditTeacher from '../components/EditTeacher'

const Home = () => {

    const [teachers, setTeachers] = useState([])

    return (
        <div>
            <div>
                Home Page + Shows all the Teachers + Redirects to the teacher template
            </div>

            <EditTeacher />
        </div>
    )
}

export default Home