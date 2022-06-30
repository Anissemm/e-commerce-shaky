import React from 'react'
import { Helmet } from 'react-helmet'
import { Navigate, Outlet, useMatch } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'

const User = () => {
    return (
        <>
        <Helmet>
            <body className='bg-melony-clay' /> 
        </Helmet>
        <main className='py-8'>
            <Breadcrumbs />
            <Outlet />
        </main>
        </>
    )
}

export default User