import { motion } from 'framer-motion'
import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { deleteToken, getAccessToken, setRemembered, signOut, useAppDispatch, useAppSelector } from '../store'
import { ReactComponent as Loader } from '../assets/svg/loader.svg'

interface IsAuthProps extends PropsWithChildren {
    noOutlet?: boolean
}

const IsAuthenticated: React.FC<IsAuthProps> = ({ children, noOutlet = false }): ReactElement | null => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const accessToken = useAppSelector(getAccessToken)
    const [tokenTimeout, setTokenTimeout] = useState(false)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setTokenTimeout(true)
        }, 5000)

        return () => clearTimeout(timeoutId)
    }, [])

    useEffect(() => {
        if (!accessToken && tokenTimeout) {
            dispatch(deleteToken(true))
            dispatch(signOut(true))
            navigate('/account', { replace: true })
        }
    }, [accessToken, tokenTimeout])

    return !accessToken ?
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed z-[100] top-0 left-0 w-screen h-screen transition duration-300 backdrop:blur-sm bg-raven flex items-center justify-center'>
            <Loader className='w-48' />
        </motion.div>
        : noOutlet ? <>{children}</> : <Outlet />

}

export default IsAuthenticated