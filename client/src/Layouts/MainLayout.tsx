import { Outlet } from "react-router-dom"
import React from 'react'
import Header from "../components/Header"
import Footer from '../components/Footer'
import { Helmet } from "react-helmet"
import { getCurrentPageTitle, useAppSelector } from "../store"
import { motion } from 'framer-motion'
const Layout = () => {
    const pageTitle = useAppSelector(getCurrentPageTitle)
    return (
        <>
            <Helmet>
                <title>{pageTitle.value}</title>
            </Helmet>
            <div id='main-container' className="mainContainer flex flex-col" lang="en">
                <Header />
                <motion.div
                    transition={{ ease: 'backInOut', duration: 0.4, delay: 0 }}
                    className='bg-melony-clay min-h-screen'
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '100%', opacity: 0 }}>
                    <Outlet />
                </motion.div>
                <Footer className='mt-auto' />
            </div>
        </>
    )
}

export default Layout