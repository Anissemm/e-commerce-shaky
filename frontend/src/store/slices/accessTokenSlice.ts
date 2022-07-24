import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import apiSlice from "../api/apiSlice"
import { RootState } from "../store"
import { User } from "./userSlice"

const refreshTokenApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        refreshToken: builder.query<{ accessToken: string, userInfo?: User }, string | void>({
            query: (tokenOrigin = '') => `v1/refresh/?tokenOrigin=${tokenOrigin}`
        })
    })
})

interface AccessTokenSlice {
    token: null | string
    tokenOrigin: string
}

const initialState: AccessTokenSlice = {
    token: null,
    tokenOrigin: ''
}

const AccessTokenSlice = createSlice({
    name: 'accessToken',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<{ accessToken: string, tokenOrigin: string } | string>) => {
            if (typeof action.payload === 'string') {
                state.token = action.payload
            } else {
                state.token = action.payload.accessToken
                if (action.payload.tokenOrigin) {
                    state.tokenOrigin = action.payload.tokenOrigin
                }
            }

        },
        deleteToken: (state, action: PayloadAction<boolean | undefined>) => {
            state.token = null
            if (action.payload) {
                state.tokenOrigin = ''
            }
        }
    }
})

export default AccessTokenSlice.reducer
export const { setToken, deleteToken } = AccessTokenSlice.actions
export const { useLazyRefreshTokenQuery } = refreshTokenApi
export const getAccessToken = (state: RootState) => state.accessToken.token
export const getAccessTokenOrigin = (state: RootState) => state.accessToken.tokenOrigin