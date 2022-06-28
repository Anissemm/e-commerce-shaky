import { forwardRef, memo, PropsWithChildren, SyntheticEvent, useEffect, useRef } from 'react'
import BackgroundOverlay from '../BackgroundOverlay'
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useTransform, Variants } from 'framer-motion'
import { getModalShow, useAppSelector, useAppDispatch, toggleModal } from '../../store'
import { createPortal } from 'react-dom'

type AlignType = 'start' | 'center' | 'end'

interface ModalProps extends PropsWithChildren {
    width?: number,
    align?: AlignType
}

const modalVariants: Variants = {
    hidden: {
        opacity: 0,
        y: -100,
        transition: {
            duration: 0.6,
            ease: "backIn",
        }
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "backOut"
        }
    }
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

const Modal = forwardRef<HTMLDivElement, ModalProps>(({ width = 1050, align = 'center', children }, ref) => {
    const isShown = useAppSelector(getModalShow)
    const dispatch = useAppDispatch()
    const modalWrapperRef = useRef<HTMLDivElement | null>(null)

    const handleClose = (e: SyntheticEvent<EventTarget>) => {
        if (e.target instanceof HTMLDivElement && e.target.dataset?.modalClose === 'true') {
            dispatch(toggleModal(false))
        }
    }

    useEffect(() => {
        if (isShown) {
            modalWrapperRef?.current?.parentElement?.focus()
        }
        modalWrapperRef?.current?.parentElement?.blur()
    }, [isShown])

    useEffect(() => {
        const handleClose = (e: any) => {
            e.preventDefault()
            if (e.key === 'Escape') {
                dispatch(toggleModal(false))
            }
        }

        document.addEventListener('keydown', handleClose)

        return () => {
            document.removeEventListener('keydown', handleClose)
        }
    }, [])

    return (
        <>
            {createPortal(
                <AnimatePresence>
                    {isShown &&
                        <BackgroundOverlay motionKey='modal' zIndex={47}>
                            <motion.section
                                tabIndex={-1}
                                className='fixed flex items-center justify-center top-0 left-0 w-screen h-screen z-[48]'
                                ref={ref}
                                variants={modalVariants}
                                initial='hidden'
                                animate='visible'
                                exit='hidden'
                            >
                                <motion.div
                                    data-modal-close
                                    style={{ justifyContent: align }}
                                    ref={modalWrapperRef}
                                    className={`w-full h-full p-[10px] flex items-center`}
                                    onClick={handleClose}
                                >
                                    <motion.div
                                        style={{ maxWidth: width }}
                                        className={`w-full h-full bg-ebony-clay overflow-hidden
                                                  text-white shadow-[0_0_10px_5px_rgba(0,0,0,.5)] 
                                                  [@supports(backdrop-filter:blur(16px))]:backdrop-blur-lg
                                                  [@supports(backdrop-filter:blur(16px))]:bg-opacity-50`}
                                    >
                                        {children}
                                    </motion.div>
                                </motion.div>
                            </motion.section>
                        </BackgroundOverlay >}
                </AnimatePresence >, document.getElementById('root')!)}
        </>
    )
})

export default memo(Modal)