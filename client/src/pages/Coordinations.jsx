import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import CoordinationDetails from '../components/CoordinationDetails'

const Coordinations = () => {

    const [coordination, setCoordination] = useState([])

    const getCoordinations = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/coordination`)
            const sortedCoordination = response.data.sort((a, b) => a.name.localeCompare(b.name))
            setCoordination(sortedCoordination)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getCoordinations()
    }, [])

    return (
        <div className='h-full'>
            <div>
                {
                    coordination.map((coordination, index) => (
                        <div key={index}>
                            <div>
                                <CoordinationDetails coordination={coordination} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Coordinations