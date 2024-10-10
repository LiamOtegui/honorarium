import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthenticateRoute = ({ children }) => {

  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true'

  return isAuthenticated ? children : <Navigate to='/' />

}

export default AuthenticateRoute