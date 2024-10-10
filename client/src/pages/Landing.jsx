import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import tecLogo from '../../public/tec-logo.svg'

const Landing = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const USUARIO1 = import.meta.env.VITE_USUARIO1
  const USUARIO2 = import.meta.env.VITE_USUARIO2
  const USUARIO3 = import.meta.env.VITE_USUARIO3
  const PASSWORD = import.meta.env.VITE_PASSWORD

  const handleLogin = (event) => {
    event.preventDefault()
    if (
      (username === USUARIO1 || username === USUARIO2 || username === USUARIO3) &&
      password === PASSWORD
    ) {
      sessionStorage.setItem('isAuthenticated', 'true')
      navigate('/home')
    } else {
      toast.error('Usuario y/o contraseña incorrectos')
    }
  }

  return (
    <div className='bg-fuchsia-900 h-screen flex justify-center items-center'>
      <form onSubmit={handleLogin} className='bg-white px-14 py-10 rounded shadow-md'>
        <img src={tecLogo} className='ml-5' />
        <div className='mb-4'>
          <label className='flex text-xl font-semibold mt-2 justify-center text-gray-600'>Username:</label>
          <input
            type='text'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className='w-full p-2 border border-gray-300 rounded mt-1 text-lg'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='flex text-xl font-semibold justify-center text-gray-600'>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className='w-full p-2 border border-gray-300 rounded mt-1'
            required
          />
        </div>
        <div className='flex justify-center'>
          <button type='submit' className='flex justify-center bg-green-500 text-xl text-white px-4 py-[0.6rem] rounded mt-2 hover:bg-green-600'>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Landing
