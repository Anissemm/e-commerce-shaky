import React, { PropsWithChildren } from 'react'
import { motion} from 'framer-motion'
import { getModalShow, useAppSelector} from '../../store'
import style from './BackgroundOverlay.module.css'

interface BackgroundOverlayProps {
    zIndex?: number,
    position?: 'absolute' | 'fixed',
    size?: [number, number] | 'screen' | 'full',
    opacityValue?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1
    duration?: number,
    delay?: number,
}

const backgroundOverlayVariants = {
    hidden: {
        backgroundColor: 'rgba(0,0,0,0)'
    },
    visible: {
        backgroundColor: 'rgba(0,0,0,0.7)'
    }
}

const BackgroundOverlay: React.FC<PropsWithChildren<BackgroundOverlayProps>> =
    ({ children, zIndex = -1, position = 'fixed', size = 'screen', duration = 1, delay = 0 }) => {

        const isShown = useAppSelector(getModalShow)
        const dimensions = size === 'screen' ? '!w-screen !h-screen' :
            size === 'full' ? '!w-full !h-full' :
                `w-${size[0] + ' h-' + size[1]}`

        return (
            <>
                {<motion.div
                    variants={backgroundOverlayVariants}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    transition={{ duration, delay }}
                    style={{ zIndex }}
                    className={`${position} ${dimensions} top-0 left-0 ${isShown ? style.visible : style.hidden }`} />}
                {children}
            </>
        )
    }

export default BackgroundOverlay