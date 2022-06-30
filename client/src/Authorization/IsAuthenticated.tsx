import React, { PropsWithChildren, ReactElement } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

const IsAuthenticated: React.FC<PropsWithChildren> = ({ children }): ReactElement | null => {
    const user = null

    if (!user) {
        return <Navigate to='/my-account' replace={true} />
    }

    return (
        <>{children}</>
    )
}

export default IsAuthenticated