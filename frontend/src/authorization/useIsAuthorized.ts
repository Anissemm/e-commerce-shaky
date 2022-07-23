import React, { useEffect } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import { getAccessToken, getRemembered, signOut, useAppDispatch, useAppSelector } from '../store'
import accessTokenSlice from '../store/slices/accessTokenSlice'

const useIsAuthorized = () => {
    const accessToken = useAppSelector(getAccessToken)
    const rememberd = useAppSelector(getRemembered)
    const dispatch = useAppDispatch()
    const [refresh] = useRefreshToken()

    useEffect(() => {
        const handleRefresh = async () => {
            try {
                await refresh()
            } catch (error) {
                console.log(error)
            }
        }

        if (!rememberd && !accessToken) {
            dispatch(signOut())
        }

        if (rememberd && !accessTokenSlice) {
            console.log(true)
            handleRefresh()
        }
    }, [])

    return accessToken
}

export default useIsAuthorized