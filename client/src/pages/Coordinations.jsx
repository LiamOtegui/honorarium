import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import CoordinationDetails from '../components/CoordinationDetails'

const Coordinations = () => {

    const [coordinations, setCoordinations] = useState([])

    const [searchedCoordination, setSearchedCoordination] = useState('')
    const [filteredCoordinations, setFilteredCoordinations] = useState([])

    const getCoordinations = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/coordination`)
            const sortedCoordinations = response.data.sort((a, b) => a.name.localeCompare(b.name))
            setCoordinations(sortedCoordinations)
            setFilteredCoordinations(sortedCoordinations)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getCoordinations()
    }, [])

    useEffect(() => {
        setFilteredCoordinations(
            coordinations.filter(coordination => coordination.name.toLowerCase().includes(searchedCoordination.toLowerCase()))
        )
    }, [searchedCoordination, coordinations])

    return (
        <div className='h-full'>

            <nav className='flex fixed w-full ml-[13.1rem] bg-fuchsia-900 py-[0.63rem] text-white'>
                <div className='flex justify-center ml-[0.5rem]'>
                    <input
                        type='text'
                        placeholder='Buscar coordinación...'
                        className='py-2 pl-3 pr-10 rounded-md text-black focus:outline-none'
                        value={searchedCoordination}
                        onChange={(event) => setSearchedCoordination(event.target.value)}
                    />
                </div>
            </nav>

            <div className='mt-20'>
                {
                    filteredCoordinations.map((coordination, index) => (
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