import { Input } from '@material-tailwind/react'
import { motion } from 'framer-motion'
import { forwardRef, PropsWithChildren } from 'react'

interface InputProps extends PropsWithChildren {
    label: string,

}

const MInput = forwardRef<HTMLInputElement, InputProps>(({ label }, ref) => {
    return (
        <motion.div>
            <Input variant='outlined' ref={ref} label={label} />
        </motion.div>
    )
})

export default  MInput