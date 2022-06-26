import { Outlet } from "react-router-dom"
import React from 'react'
import Header from "./Header"
import Footer from './Footer'

const Layout = () => {
    return (
        <div id='main-container' className="mainContainer flex flex-col" lang="en">
            <Header />
            <Outlet />
            <Footer className='mt-auto' />
        </div>
    )
}

export default Layout