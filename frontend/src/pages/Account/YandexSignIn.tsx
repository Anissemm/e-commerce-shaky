import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useLocation, useNavigate } from "react-router-dom"
import { setToken, setTokenOrigin, setUser, useAppDispatch, useSignInWithYandexMutation } from "../../store"
import { motion } from 'framer-motion'
import { ReactComponent as Loader } from '../../assets/svg/loader.svg'
import { usePageSetTitle } from "../../hooks/usePageSet"
import FullScreenLoader from "../../components/FullScreenLoader"

const YandexSignIn = () => {
    usePageSetTitle('Please Wait...', false, false)
    const location = useLocation()
    const navigate = useNavigate()
    const [signInWithYandex] = useSignInWithYandexMutation()
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    
    const handleYandexSign = async (code: string | null) => {
        try {
            if (code) {
                const response = await signInWithYandex(code).unwrap()
                dispatch(setToken(response?.data?.token))
                dispatch(setUser({
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    avatarUrl: response.data.avatarUrl,
                    remembered: true,
                }))
                dispatch(setTokenOrigin('yandex-oAuth'))
                navigate('/', { state: {response, from: location.pathname} })
            }
        } catch (error) {
            navigate('/error', { state: {error, from: location.pathname} })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        if (location.search) {
            const extracted = /(?<=code=)(\d+)/.exec(location.search)
            if (Array.isArray(extracted)) {
                handleYandexSign(extracted[0])
            }
        } else {
            navigate('/error', { replace: true, state: new Error('missing-token') })
        }
    }, [])

    return (
            createPortal(<FullScreenLoader />, document.getElementById('root')!)
    )
}

export default YandexSignIn