import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createStringLiteralFromNode } from "typescript"
import apiSlice from "../api/apiSlice"
import { RootState } from "../store"

const refreshTokenApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        refreshToken: builder.query<{ accessToken: string }, void>({
            query: () => 'v1/refresh'
        })
    })
})

interface AccessTokenSlice {
    token: null | string
}

const initialState: AccessTokenSlice = {
    token: null
}

const AccessTokenSlice = createSlice({
    name: 'accessToken',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        deleteToken: (state) => {
            state.token = null
        }
    }
})

export default AccessTokenSlice.reducer
export const { setToken, deleteToken } = AccessTokenSlice.actions
export const { useLazyRefreshTokenQuery } = refreshTokenApi
export const getAccessToken = (state: RootState) => state.accessToken.token