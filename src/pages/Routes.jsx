import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Frontend from './Frontend'
import { Routes, Route } from 'react-router-dom'
import Auth from './Auth'

const Index = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Frontend />} />
                <Route path="/*" element={<Auth />} />
            </Routes>

        </>
    )
}

export default Index