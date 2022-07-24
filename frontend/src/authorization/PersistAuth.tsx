import React, { PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'
import { getRemembered, useAppSelector } from '../store'
import usePersistAuth from './usePersistAuth'

const PersistAuth: React.FC<PropsWithChildren> = () => {
    const [accessToken, loading] = usePersistAuth()
    const remembered = useAppSelector(getRemembered)

    return !remembered && !accessToken ? <Outlet /> : loading ? null : <Outlet />
}

export default PersistAuth