import { AnimatePresence } from 'framer-motion'
import React, { PropsWithChildren, ReactElement, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { getUser, useAppSelector } from '../store'
import PersistAuth from './PersistAuth'

const IsAuthenticated: React.FC<PropsWithChildren> = ({ children }): ReactElement | null => {
    const user = useAppSelector(getUser)

    if (!user) {
        return <Navigate to='/account' replace={true} />
    }

    return (
        <PersistAuth>
            {children}
        </PersistAuth>
    )
}

export default IsAuthenticated