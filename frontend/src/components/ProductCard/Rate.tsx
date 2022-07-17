import { motion } from 'framer-motion'
import React from 'react'
import { ReactComponent as Star } from '../../assets/svg/icons/star_icon.svg'

interface RateProps {
    rate: number
}

const Rate: React.FC<RateProps> = ({ rate }) => {
    return (
        <motion.div className='font-[Oswald] font-bold text-xs flex items-center justify-center 
                                absolute top-3 right-2 py-[4.5px] pr-2 pl-2 rounded-xl 
                                bg-sandy-brown text-ebony-clay'>
            <Star className='mr-1' />
            <motion.span>{rate ? rate : 5.0}</motion.span>
        </motion.div>
    )
}

export default Rate