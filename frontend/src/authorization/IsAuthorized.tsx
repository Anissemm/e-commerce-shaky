import { AnimatePresence } from 'framer-motion'
import React, { PropsWithChildren, ReactElement, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import PersistAuth from './PersistAuth'
import useIsAuthorized from './useIsAuthorized'

interface IsAuthProps extends PropsWithChildren {
    noOutlet?: boolean
}

const IsAuthenticated: React.FC<IsAuthProps> = ({ children, noOutlet = false }): ReactElement | null => {
    const IsAuthorized = useIsAuthorized()

    if (!IsAuthorized) {
        return <Navigate to='/account' replace={true} />
    }

    return noOutlet ? <>{children}</> : <Outlet />
        // <PersistAuth>

        // </PersistAuth>

}

export default IsAuthenticated