import { setToken, setUser, useAppDispatch, useSignInMutation } from "../store"

interface Credentials {
    email: string
    password: string
}

const useSignIn = () => {
    const dispatch = useAppDispatch()
    const [signUser, { isLoading }] = useSignInMutation()

    const signIn = async (values: Credentials) => {
            const payload: any = await signUser(values).unwrap()
            dispatch(setUser(payload?.accessToken))
            dispatch(setToken(payload?.accessToken))
    }

    return signIn
}

export default useSignIn