import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from "../../config/AuthContext"
import Register from './Register'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'

const Auth = () => {
    const { isAuth } = useAuthContext();

    if (isAuth) {
        return <Navigate to="/" replace />
    }

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
    )
}

export default Auth