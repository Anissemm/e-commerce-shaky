import { motion } from 'framer-motion'
import React, { PropsWithChildren } from 'react'

interface ModalBodyProps extends PropsWithChildren {
    maxWidth?: 'full' | number
    scroll?: boolean
    className?: string
}

const ModalBody: React.FC<ModalBodyProps> = ({ children, maxWidth = 670, scroll = false, className = '' }) => {
    return <motion.div
        style={{ maxWidth }}
        className={`mx-auto relative max-h-[calc(100%-124px)] scrollbar-thin                            
                scrollbar-thum-raven hover:scrollbar-thumb-fiorid ${scroll ? 'overflow-y-auto' : ''} ${className}`}
    >
        {children}
    </motion.div>
}

export default ModalBody