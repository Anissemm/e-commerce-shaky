import {motion} from 'framer-motion'
import {ReactComponent as Loader} from '../../assets/svg/loader.svg'

const FullScreenLoader = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed z-[100] top-0 left-0 w-screen h-screen transition duration-300 backdrop:blur-sm bg-raven flex items-center justify-center'>
            <Loader className='w-24' />
        </motion.div>
    )
}

export default FullScreenLoader