import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from '../components/Header/Footer'
import { Helmet } from "react-helmet"
import { getCurrentPageTitle, persistor, useAppSelector } from "../store"
import { motion } from 'framer-motion'
import { useLazyMockProtectedQuery } from "../store"
import Button from "../components/Button"

const Layout = () => {
    const pageTitle = useAppSelector(getCurrentPageTitle)
    const [trigger] = useLazyMockProtectedQuery()
    return (
        <>
            <Helmet>
                <title>{pageTitle.value}</title>
            </Helmet>
            <div id='main-container' className="mainContainer bg-melony-clay flex flex-col" lang="en">
                <Header />
                <div className='w-full max-w-[1440px] mx-auto'>                  
                    <button
                    className="text-xs p-2 h-7 fixed bottom-2 left-2 bg-white cursor-pointer z-[55]"
                    onClick={() => {
                       persistor.purge()
                    }}>Purge</button>
                    <motion.div
                        transition={{ ease: 'backInOut', duration: 0.4, delay: 0 }}
                        className='min-h-screen'
                        initial={{ x: '-30%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '30%', opacity: 0 }}>
                            <Button onClick={() => {trigger()}}>Mock route</Button>
                        <Outlet />
                    </motion.div>
                </div>
                <Footer className='mt-auto' />
            </div>
        </>
    )
}

export default Layout