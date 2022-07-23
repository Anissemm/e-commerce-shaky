import React, { PropsWithChildren } from 'react'
import usePersistAuth from './usePersistAuth'

const PersistAuth: React.FC<PropsWithChildren> = ({ children }) => {
    usePersistAuth()
    return <>{children}</>
}

export default PersistAuth