import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react'
import { signOut, setCredentials } from '..'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).user.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
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
}

const baseQueryReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)
    const error = result?.error as CustomResponseError

    if (error?.data && error?.data.statusCode === 403 && error?.data.message === 'invalid-access-token') {
        console.log(error)
        const refreshed = await baseQuery('/v1/refresh', api, extraOptions)
        const data = refreshed?.data as RefreshResponse
        if (data?.accessToken) {
            api.dispatch(setCredentials(data?.accessToken))
        } else {
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