import { AnimatePresence, MotionConfig } from "framer-motion"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useLocation, useNavigate } from "react-router-dom"
import { setToken, setUser, useAppDispatch, useSignInWithYandexMutation } from "../../store"
import { motion } from 'framer-motion'
import { ReactComponent as Loader } from '../../assets/svg/loader.svg'

const YandexSignIn = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [signInWithYandex] = useSignInWithYandexMutation()
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)

    const handleYandexSign = async (code: string | null) => {
        try {
            if (code) {
                const response = await signInWithYandex(code).unwrap()
                console.log(response)
                dispatch(setToken({accessToken: response?.data?.token, tokenOrigin: 'yandex'}))
                dispatch(setUser({
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    avatarUrl: response.data.avatarUrl,
                    remembered: true,
                }))
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

const FullScreenLoader = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed z-[100] top-0 left-0 w-screen h-screen transition duration-300 backdrop:blur-sm bg-raven flex items-center justify-center'>
            <Loader />
        </motion.div>
    )
}

export default YandexSignIn