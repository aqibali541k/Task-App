import React from 'react'
import { useAuthContext } from '../config/AuthContext'
import { Navigate } from 'react-router-dom'

const privateRoute = ({ children }) => {
    const { token } = useAuthContext();
    if (!token) {
        return <Navigate to="/login" />
    }
    return children;
}

export default privateRoute