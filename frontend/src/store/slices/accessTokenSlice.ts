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
}

const initialState: AccessTokenSlice = {
    token: null,
}

const AccessTokenSlice = createSlice({
    name: 'accessToken',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
                state.token = action.payload
        },
        deleteToken: (state, action: PayloadAction<boolean | undefined>) => {
            state.token = null
        }
    }
})

export default AccessTokenSlice.reducer
export const { setToken, deleteToken } = AccessTokenSlice.actions
export const { useLazyRefreshTokenQuery } = refreshTokenApi
export const getAccessToken = (state: RootState) => state.accessToken.token