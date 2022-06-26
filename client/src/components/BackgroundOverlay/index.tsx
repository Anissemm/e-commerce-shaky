import React, { PropsWithChildren, PropsWithRef } from 'react'
import { motion } from 'framer-motion'
import style from './BackgroundOverlay.module.css'

interface BackgroundOverlayProps {
    zIndex?: number,
    position?: 'absolute' | 'fixed',
    size?: [number, number] | 'screen' | 'full',
    opacity?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1 
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
    ({ children, zIndex = -1, position = 'fixed', size = 'screen', opacity = 0.8 }) => {
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
                    style={{ zIndex, opacity }}
                    className={`${position} ${dimensions} top-0 left-0 bg-ebony-clay ${style.backdropBlur}`} />
                {children}
            </div>
        )
    }

export default BackgroundOverlay