import React, { ForwardedRef, forwardRef, MouseEvent, PropsWithChildren, PropsWithRef, SyntheticEvent, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import BackgroundOverlay from '../BackgroundOverlay'
import { motion, useInstantTransition } from 'framer-motion'
import { getModalShow, useAppSelector, useAppDispatch, toggleModal } from '../../store'

interface ModalProps extends PropsWithChildren {

}

const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
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

    console.log(document.activeElement)

    const content = <BackgroundOverlay zIndex={47}>
        <motion.section tabIndex={-1} className='fixed flex items-center justify-center top-0 left-0 w-screen h-screen z-[48]' ref={ref}>
            <motion.div data-modal-close ref={modalWrapperRef} className='w-full h-full p-10' onClick={handleClose}>
                <motion.div className='w-full h-full max-w-[1050px] bg-ebony-clay text-white'>
                    modal
                </motion.div>
            </motion.div>
        </motion.section>
    </BackgroundOverlay >

    return (
        <>
            {isShown && createPortal(content, document.getElementById('main-container')!)}
        </>
    )
})

export default Modal