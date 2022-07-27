import { motion } from 'framer-motion'
import React from 'react'
import { ReactComponent as Star } from '../../assets/svg/icons/star_icon.svg'

interface RateProps {
    rate: number
    size?: 'base' | 'large'

}

const Rate: React.FC<RateProps> = ({ rate, size = 'base' }) => {
    return (
        <motion.div className={`font-[Oswald] font-bold flex items-center justify-center 
                                absolute top-3 right-2 py-[4.5px]  
                                bg-sandy-brown text-ebony-clay ${size === 'large' ? 'text-[20px] rounded-3xl pl-2 pr-3' : 'text-xs pr-2 pl-2 rounded-xl'}`}>
            <Star className='mr-1 h-[18px] w-[17px]' />
            <motion.span>{rate ? rate : 5.0}</motion.span>
        </motion.div>
    )
}

export default Rate