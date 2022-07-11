import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, signOut as signOutClient, deleteToken, useSignOutMutation, useAppSelector, getUserId } from "../store"

type SignOutHookReturn = [
    () => Promise<void>,
    boolean
]

const useSignOut = (): SignOutHookReturn => {
    const [signOutServer] = useSignOutMutation()
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const userId = useAppSelector(getUserId)
    const navigate = useNavigate()

    const signOut = async () => {
        if (userId) {
            setLoading(true)
            try {
                await signOutServer(userId).unwrap()
                dispatch(signOutClient())
                dispatch(deleteToken())
                navigate('/')
            } catch (err) {
                console.error('Something went wrong while signing out from the server. Please, retry.')
            } finally {
                setLoading(false)
            }
        }
    }

    return [signOut, loading]
}

export default useSignOut