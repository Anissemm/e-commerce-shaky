import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteToken, getUserTokenOrigin, setToken, setUser, signOut, useAppSelector, useLazyRefreshTokenQuery, User } from "../store"

type useRefreshTokenReturn = [
    () => Promise<void>,
    { isLoading: boolean }
]

const useRefreshToken = (): useRefreshTokenReturn => {
    const dispatch = useDispatch()
    const [refreshHandler] = useLazyRefreshTokenQuery()
    const [isLoading, setIsLoading] = useState(false)
    const tokenOrigin = useAppSelector(getUserTokenOrigin)

    const refresh = async () => {
        try {
            const payload = await refreshHandler(tokenOrigin).unwrap()
            dispatch(setToken(payload?.accessToken))
            if (tokenOrigin !== 'yandex-oAuth') {
                dispatch(setUser(payload?.accessToken))
            } else {
                dispatch(setUser({ ...payload.userInfo as User, remembered: true }))
            }
        } catch (error: any) {
            if (error.data.message === 'invalid-refresh-token') {
                dispatch(deleteToken())
                dispatch(signOut(true))
            }
        }
    }

    return [refresh, { isLoading }]
}

export default useRefreshToken