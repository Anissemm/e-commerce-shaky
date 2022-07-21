import { motion, animate, AnimatePresence, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion'
import React, { PropsWithChildren, useEffect, useState } from 'react'

interface ChevronProps extends PropsWithChildren {
    cross?: boolean
    double?: boolean
    className?: string
}

const Chevron: React.FC<ChevronProps> = ({ className, cross = false, double = false }) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="22" viewBox="0 0 12.158 21.447" fill="none" stroke="#f2aa4c" className={className}>
            <motion.g
                transform='translate(16 20.5) rotate(180)'
            >
                <motion.path
                    d="M0,10.519,1.345,9.2,10.76,0"
                    transform="translate(0 9.515)"
                    stroke="inherit"
                    strokeWidth="2" />
                <motion.path
                    d="M0,10.457,1.342,9.15,10.734,0"
                    transform="translate(10.572 0) rotate(90)"
                    stroke='inherit'
                    stroke-width="2" />
            </motion.g>
            {double && !cross && <g
                transform='translate(9 20.5) rotate(180)'
            >
                <path
                    d="M0,10.519,1.345,9.2,10.76,0"
                    transform="translate(0 9.515)"
                    stroke="inherit"
                    strokeWidth="2" />
                <path
                    d="M0,10.457,1.342,9.15,10.734,0"
                    transform="translate(10.572 0) rotate(90)"
                    stroke='inherit'
                    stroke-width="2" />
            </g>}
            <g transform="translate(-4 0)">
                <AnimatePresence exitBeforeEnter initial={false}>
                    {cross &&
                        <>
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                exit={{ pathLength: 0 }}
                                transition={{ duration: 1 }}
                                d="M0,10.519,1.345,9.2,10.76,0"
                                transform="translate(0 9.515)"
                                stroke="inherit"
                                strokeWidth="2" />
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                exit={{ pathLength: 0 }}
                                transition={{ duration: 1 }}
                                d="M0,10.457,1.342,9.15,10.734,0"
                                transform="translate(10.572 0) rotate(90)"
                                stroke='inherit'
                                strokeWidth="2" />
                        </>
                    }
                </AnimatePresence>
            </g>
        </svg>
    )
}

export default Chevron