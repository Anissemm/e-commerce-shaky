import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { signOut, setUser, deleteToken, setToken, type User, setTokenOrigin } from '..'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).accessToken.token
        const tokenOrigin = (getState() as RootState).user.tokenOrigin

        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`)
            headers.set('Token-Type', tokenOrigin ? tokenOrigin : 'credentials')
        }
        return headers
    }
})

type CustomResponseError = {
    status: number;
    data: {
        message: string;
        status: string;
        statusCode: number;
        success: boolean;
    }
}

type RefreshResponse = {
    success: boolean
    message: string
    accessToken: string
    userInfo?: User
}

const baseQueryReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)
    const error = result?.error as CustomResponseError

    if (error?.data && error?.data.statusCode === 403 && error?.data.message === 'invalid-access-token') {
        const refreshed = await baseQuery('/v1/refresh', api, extraOptions)
        const data = refreshed?.data as RefreshResponse

        if (data?.accessToken) {
            const tokenOrigin = (api.getState() as RootState).user.tokenOrigin

            api.dispatch(setToken(data?.accessToken))
            if (tokenOrigin !== 'yandex-oAuth') {
                api.dispatch(setUser(data?.accessToken))
            } else {
                api.dispatch(setUser({...data?.userInfo as User, remembered: true}))
            }
        } else {
            api.dispatch(deleteToken())
            api.dispatch(signOut(true))
            api.dispatch(setTokenOrigin(null))
        }
    }
    return result
}

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryReauth,
    endpoints: builder => ({
    })
})

export default apiSlice