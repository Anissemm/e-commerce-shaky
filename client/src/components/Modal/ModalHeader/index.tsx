import { motion, Variants } from 'framer-motion'
import React, { PropsWithChildren } from 'react'
import { useAppDispatch, toggleModal } from '../../../store'
import style from './ModalHeader.module.css'

interface ModalHeaderProps extends PropsWithChildren {
    title: string
}

const HeaderVariants: Variants = {
    hidden: {
        x: '-100%',
        transition: {
            ease: 'linear',
            duration: 0.4,
        }
    },
    visible: {
        x: 0,
        transition: {
            ease: 'linear',
            duration: 0.4,
            delay: 0.5
        }
    },
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title }) => {
    const dispatch = useAppDispatch()
    return (
        <motion.header className='relative flex items-center justify-between'>
            <motion.h3
                variants={HeaderVariants}
                className='font-[Oswald] py-6'
                initial='hidden'
                animate='visible'
                exit='hidden'
            >
                <span className='px-3 py-2 uppercase bg-sandy-brown text-ebony-clay font-medium text-xl'>{title}</span>
            </motion.h3>
            <button className={`w-[20px] h-[20px] mr-8 ${style.closeBtn}`} aria-label='close' onClick={() => dispatch(toggleModal(false))} />
        </motion.header >
    )
}

export default ModalHeader