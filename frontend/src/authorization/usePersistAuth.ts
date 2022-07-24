import React, { useEffect, useState } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import { getAccessToken, getRemembered, signOut, useAppDispatch, useAppSelector } from '../store'

const usePersistAuth = () => {
    const accessToken = useAppSelector(getAccessToken)
    const remembered = useAppSelector(getRemembered)
    const dispatch = useAppDispatch()
    const [refresh] = useRefreshToken()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const handleRefresh = async () => {
            try {
                setLoading(true)
                await refresh()
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        if (!remembered && !accessToken) {
            dispatch(signOut())
        }

        if (remembered && !accessToken) {
            handleRefresh()
        }
    }, [])

    return [accessToken, loading]
}

export default usePersistAuth