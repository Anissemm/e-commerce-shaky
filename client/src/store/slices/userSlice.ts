import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import apiSlice from '../api/apiSlice'
import { StringLiteralLike } from "typescript"

interface userSliceType {
    token: null | string
    id: null | string
}

const initialState: userSliceType = {
    token: null,
    id: null
}

type SignInCredentials = {
    email: string,
    password: string
}

type SignUpCredentials = {
    email: string,
    password: String,
    name: string
}

const userAuthSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signIn: builder.mutation({
            query: (credentials: SignInCredentials) => ({
                url: 'v1/signin',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        signUp: builder.mutation({
            query: (credentials: SignUpCredentials) => ({
                url: 'v1/signup',
                method: 'POST',
                body: { ...credentials }
            })
        })
})
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<{ id: string, token: string }>) {
            state.id = action.payload.id
            state.token = action.payload.token
        },
        signOut(state) {
            state.id = null
            state.token = null
        }
    }
})

export default userSlice.reducer

export const { setCredentials, signOut } = userSlice.actions

export const getUserId = (state: RootState) => state.user.id
export const getUserToken = (state: RootState) => state.user.token
export const { useSignInMutation, useSignUpMutation } = userAuthSlice