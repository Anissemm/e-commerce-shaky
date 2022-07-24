import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react'
import { signOut, setUser, deleteToken, setToken, type User } from '..'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).accessToken
        if (accessToken.token) {
            headers.set('authorization', `Bearer ${accessToken.token}`)
            headers.set('Token-Type', accessToken.tokenOrigin ? accessToken.tokenOrigin : 'credentials')
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

type ResponseError = FetchBaseQueryError | CustomResponseError

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
            const tokenOrigin = (api.getState() as RootState).accessToken.tokenOrigin

            api.dispatch(setToken(data?.accessToken))
            if (tokenOrigin !== 'yandex') {
                api.dispatch(setUser(data?.accessToken))
            }
            api.dispatch(setUser({...data?.userInfo as User, remembered: true}))
        } else {
            api.dispatch(deleteToken())
            api.dispatch(signOut())
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