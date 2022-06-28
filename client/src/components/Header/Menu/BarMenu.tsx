import { motion } from 'framer-motion'
import { forwardRef, PropsWithChildren } from 'react'
import { menuMotionVariants } from './menuMotionVariants'


const BarMenu = forwardRef<HTMLDivElement, PropsWithChildren>((props, ref) => {
  return (
    <motion.div
      ref={ref}
      className='bg-ebony-clay text-white w-full'
      variants={menuMotionVariants}
      custom='sidenav'
      initial='hidden'
      animate='visible'
      exit='hidden'
      {...props}
    >
      Bar
    </motion.div>
  )
})

export default motion(BarMenu)