import React from 'react'
import { Helmet } from 'react-helmet'
import { Navigate, Outlet, useMatch } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import { motion } from 'framer-motion'
const User = () => {
    return (
        <>
            <main className='py-8'>
                <Breadcrumbs />
                <Outlet />
            </main>
        </>
    )
}

export default User