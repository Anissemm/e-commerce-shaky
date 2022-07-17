import React, { PropsWithChildren } from 'react'
import {
    motion
} from 'framer-motion'

interface AlertProps extends PropsWithChildren {
    className?: string
}

const Alert: React.FC<AlertProps> = ({ children, className }) => {
    return (
        <motion.div
            initial={{ height: 0, opacity: 0}}
            animate={{ height: '100%', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`p-3 italic text-[14px] rounded-xlbg-red-200 border-2 border-red-500 shadoe-md 
          shadow-red-400 text-red-800 font-["Roboto_Condensed"] bg-red-200 rounded-xl leading-none ${className}`}>
            <motion.p>{children}</motion.p>
        </motion.div>
    )
}

export default Alert