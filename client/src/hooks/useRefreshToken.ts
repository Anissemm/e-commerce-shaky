import { useDispatch } from "react-redux"
import { setToken, setUser, useLazyRefreshTokenQuery } from "../store"

type useRefreshTokenReturn = [
    () => Promise<void>,
    { isLoading: boolean }
]

const useRefreshToken = (): useRefreshTokenReturn => {
    const dispatch = useDispatch()
    const [refreshHandler, { isLoading }] = useLazyRefreshTokenQuery()

    const refresh = async () => {
        const payload = await refreshHandler().unwrap()
        dispatch(setToken(payload?.accessToken))
        dispatch(setUser(payload?.accessToken))
    }

    return [refresh, { isLoading }]
}

export default useRefreshToken