import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from '../components/Header/Footer'
import { Helmet } from "react-helmet"
import { getCurrentPageTitle, persistor, useAppSelector } from "../store"
import { motion } from 'framer-motion'
import { useEffect } from "react"

const Layout = () => {
    const pageTitle = useAppSelector(getCurrentPageTitle)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pageTitle])

    return (
        <>
            <Helmet>
                <title>{pageTitle.value}</title>
            </Helmet>
            <div id='main-container' className="mainContainer bg-melony-clay flex flex-col" lang="en">
                <Header />
                <Outlet />
                <Footer className='mt-auto' />
            </div>
        </>
    )
}

export default Layout