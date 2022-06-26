import { motion } from 'framer-motion'
import React, { PropsWithChildren } from 'react'

interface ModalHeaderProps extends PropsWithChildren {
    title: string
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title }) => {
    return (
        <motion.header>
            <motion.h3
                className='px-14 py-7 font-[Oswald] bg-sandy-brown text-ebony-clay'
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                exit={{ x: -100 }}
            >{title}</motion.h3>
            <button className={`w-20 h-20`} aria-label='close' />
        </motion.header >
    )
}

export default ModalHeader