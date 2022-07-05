import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
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

const baseQueryReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions ) => {
    const result = await baseQuery(args, api, extraOptions)
    console.log(result)
    return result
}

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryReauth,
    endpoints: builder => ({
        
    })
})

export default apiSlice