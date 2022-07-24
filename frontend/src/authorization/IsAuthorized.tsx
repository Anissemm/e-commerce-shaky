import { AnimatePresence } from 'framer-motion'
import { access } from 'fs/promises'
import React, { PropsWithChildren, ReactElement, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getAccessToken, useAppSelector } from '../store'
import usePersistAuth from './usePersistAuth'

interface IsAuthProps extends PropsWithChildren {
    noOutlet?: boolean
}

const IsAuthenticated: React.FC<IsAuthProps> = ({ children, noOutlet = false }): ReactElement | null => {
    const accessToken = useAppSelector(getAccessToken)

    if (!accessToken) {
        return <Navigate to='/account' replace={true} />
    }

    return noOutlet ? <>{children}</> : <Outlet />
}

export default IsAuthenticated