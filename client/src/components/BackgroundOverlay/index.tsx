import React, { PropsWithChildren, PropsWithRef } from 'react'
import { motion } from 'framer-motion'
import style from './BackgroundOverlay.module.css'

interface BackgroundOverlayProps {
    zIndex?: number,
    position?: 'absolute' | 'fixed',
    size?: [number, number] | 'screen' | 'full',
    opacity?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1
    duration?: number,
    delay?: number
}

const backgroundOverlayVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 0.8
    }
}

const BackgroundOverlay: React.FC<PropsWithChildren<BackgroundOverlayProps>> =
    ({ children, zIndex = -1, position = 'fixed', size = 'screen', opacity = 0.9, duration = 0.9, delay = 0 }) => {
        const dimensions = size === 'screen' ? '!w-screen !h-screen' :
            size === 'full' ? '!w-full !h-full' :
                `w-${size[0] + ' h-' + size[1]}`
        return (
            <div>
                <motion.div
                    variants={backgroundOverlayVariants}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    transition={{ duration, delay }}
                    style={{ zIndex, opacity }}
                    className={`${position} ${dimensions} top-0 left-0 bg-black [@supports(backdrop-filter:blur(8px))]:backdrop-blur-lg`} />
                {children}
            </div>
        )
    }

export default BackgroundOverlay