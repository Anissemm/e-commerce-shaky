import { motion } from 'framer-motion'
import React, { PropsWithChildren } from 'react'

interface ModalBodyProps extends PropsWithChildren {
    maxWidth?: 'full' | number
}

const ModalBody: React.FC<ModalBodyProps> = ({ children, maxWidth = 670 }) => {
    return <motion.div style={{ maxWidth }} className='mx-auto'>{children}</motion.div>
}

export default ModalBody