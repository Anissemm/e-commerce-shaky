import React, { PropsWithChildren, ReactElement } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { getUser, useAppSelector } from '../store'

const IsAuthenticated: React.FC<PropsWithChildren> = ({ children }): ReactElement | null => {
    const user = useAppSelector(getUser)

    if (!user) {
        return <Navigate to='/account' replace={true} />
    }

    return (
        <>{children}</>
    )
}

export default IsAuthenticated