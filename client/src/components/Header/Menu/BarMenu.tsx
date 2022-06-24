import { motion } from 'framer-motion'
import { menuMotionVariants } from './menuMotionVariants'

const BarMenu = () => {
  return (
    <motion.div
    className='bg-ebony-clay text-white w-full'
    variants={menuMotionVariants}
    custom='sidenav'
    initial='hidden'
    animate='visible'
    exit='hidden'
>
    Bar
</motion.div>
  )
}

export default motion(BarMenu)