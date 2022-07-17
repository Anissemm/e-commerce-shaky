import React, { PropsWithChildren, useEffect } from 'react'
import { getAccessToken, setToken, useAppDispatch, useAppSelector } from '../store'
import useRefreshToken from '../hooks/useRefreshToken'

const PersistAuth: React.FC<PropsWithChildren> = ({ children }) => {
    const accessToken = useAppSelector(getAccessToken)
    const [refresh] = useRefreshToken()

    useEffect(() => {
        const handleRefresh = async () => {
            try {
                await refresh()
            } catch (error) {
                console.log(error)
            }
        }

        if (!accessToken) {
            handleRefresh()
        }
    }, [])

    return (
        <>{children}</>
    )
}

export default PersistAuth