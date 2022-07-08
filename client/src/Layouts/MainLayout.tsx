import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import Header from "../components/Header"
import Footer from '../components/Footer'
import { Helmet } from "react-helmet"
import { getCurrentPageTitle, getUser, useAppSelector, useLazyMockProtectedQuery } from "../store"
import { motion } from 'framer-motion'
import Button from "../components/Button"

const Layout = () => {
    const pageTitle = useAppSelector(getCurrentPageTitle)
    const [getProtected] = useLazyMockProtectedQuery()

    return (
        <>
            <Helmet>
                <title>{pageTitle.value}</title>
            </Helmet>
            <div id='main-container' className="mainContainer bg-melony-clay flex flex-col" lang="en">
                <Header />
                <div className='w-full max-w-[1440px] mx-auto'>
                    <Button onClick={async () => {
                        try {
                            const response = await getProtected().unwrap()
                            console.log(response)
                        } catch (error) {
                            console.log(error)
                        }
                    }}>Mock Protected</Button>
                    <motion.div
                        transition={{ ease: 'backInOut', duration: 0.4, delay: 0 }}
                        className='min-h-screen'
                        initial={{ x: '-30%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '30%', opacity: 0 }}>
                        <Outlet />
                    </motion.div>
                </div>
                <Footer className='mt-auto' />
            </div>
        </>
    )
}

export default Layout