import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from '../components/Header/Footer'
import { Helmet } from "react-helmet"
import { getCurrentPageTitle, persistor, useAppSelector } from "../store"
import { motion } from 'framer-motion'
import { useEffect } from "react"

const HomeLayout = () => {
    const pageTitle = useAppSelector(getCurrentPageTitle)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pageTitle])

    return (
        <>
            <motion.div
                transition={{ ease: 'backInOut', duration: 0.4, delay: 0 }}
                className='min-h-screen'
                initial={{ x: '-30%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '30%', opacity: 0 }}>
                <Outlet />
            </motion.div>
        </>
    )
}

export default HomeLayout