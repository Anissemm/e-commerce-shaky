import React from 'react'
import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'

const PageLayout = () => {
    return (
        <motion.div
            transition={{ ease: 'backInOut', duration: 0.4, delay: 0 }}
            className='min-h-screen'
            initial={{ x: '-30%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '30%', opacity: 0 }}>
            <div className='w-full max-w-[1440px] mx-auto'>
                <Outlet />
            </div>
        </motion.div>
    )
}

export default PageLayout