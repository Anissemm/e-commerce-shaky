import React, { PropsWithChildren } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { useAppDispatch} from '../../store'

interface BackgroundOverlayProps {
    zIndex?: number,
    position?: 'absolute' | 'fixed',
    size?: [number, number] | 'screen' | 'full',
    opacityValue?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1
    duration?: number,
    delay?: number,
    motionKey: string
}

const backgroundOverlayVariants = {
    hidden: {
        backgroundColor: 'rgba(0,0,0,0)',
        backdropFilter: 'blur(0px)'
    },
    visible: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(2px)'
    }
}

const BackgroundOverlay: React.FC<PropsWithChildren<BackgroundOverlayProps>> =
    ({ children, zIndex = -1, position = 'fixed', size = 'screen', opacityValue = 0.9, duration = 1.5, delay = 0, motionKey }) => {

        const dispatch = useAppDispatch()
        // const backgroundValue = useAppSelector(getBackgroundMotionValue)
        const dimensions = size === 'screen' ? '!w-screen !h-screen' :
            size === 'full' ? '!w-full !h-full' :
                `w-${size[0] + ' h-' + size[1]}`
        const motionBlurValue = useMotionValue(0)
        const blurTemplate = useMotionTemplate`blur(${motionBlurValue}px)`

        return (
            <>
                <motion.div
                    variants={backgroundOverlayVariants}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    transition={{ duration, delay }}
                    style={{ zIndex, backdropFilter: blurTemplate }}
                    className={`${position} ${dimensions} top-0 left-0 [@supports(backdrop-filter:blur(8px))]:backdrop-blur-sm`} />
                {children}
            </>
        )
    }

export default BackgroundOverlay