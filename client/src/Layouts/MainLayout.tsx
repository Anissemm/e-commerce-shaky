import { Outlet } from "react-router-dom"
import React from 'react'
import Header from "../components/Header"
import Footer from '../components/Footer'
import { Helmet } from "react-helmet"
import { getCurrentPageTitle, useAppSelector } from "../store"

const Layout = () => {
    const pageTitle = useAppSelector(getCurrentPageTitle)
    return (
        <>
            <Helmet>
                <title>{pageTitle.value}</title>
            </Helmet>
            <div id='main-container' className="mainContainer flex flex-col" lang="en">
                <Header />
                <Outlet />
                <Footer className='mt-auto' />
            </div>
        </>
    )
}

export default Layout