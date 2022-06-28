import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useAppDispatch, toggleSideNav, getSidenavShow, useAppSelector, getModalShow } from '../../../store'
import { menuMotionVariants } from './menuMotionVariants'
import BackgroundOverlay from '../../BackgroundOverlay'

const SidenavMenu = () => {
    const dispatch = useAppDispatch()
    const isSidenavShown: boolean = useAppSelector(getSidenavShow)

    const handleOutsideClick = (e: any) => {
        const sidenavToggle = e.target?.dataset?.sidenavToggle

        if (sidenavToggle === 'true' && e.key !== 'Escape') return
        dispatch(toggleSideNav(false))
    }

    const sidenavRef = useDetectClickOutside({
        onTriggered: handleOutsideClick,
        triggerKeys: ['Escape']
    })

    return (
        <>
            <AnimatePresence>
                {isSidenavShown && <BackgroundOverlay motionKey='sidenav' zIndex={-1} >
                    <motion.div
                        ref={sidenavRef}
                        className='!h-[calc(100vh-52px)] bg-ebony-clay z-[45] top-[52px] text-white w-full max-w-[320px] fixed overflow-hidden shadow-xl'
                        variants={menuMotionVariants}
                        custom='sidenav'
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                    >
                        Sidenav
                    </motion.div>
                </BackgroundOverlay>}
            </AnimatePresence>
        </>
    )
}

export default SidenavMenu