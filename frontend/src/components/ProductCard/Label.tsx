import React from 'react'
import { motion } from 'framer-motion'
import { ReactComponent as LabelBack } from '../../assets/svg/icons/label_back_icon.svg'

interface LabelProps {
    feature?: string
    size?: 'base' | 'large'
}

const Label: React.FC<LabelProps> = ({ feature = 'Promo', size = 'base' }) => {
    const fillColorSwatch = feature === 'Promo' ? 'fill-sandy-brown' :
                        feature === 'Hot' ? 'fill-red-500' :
                        feature === 'New' ? 'fill-blue-900' : ''   

    const textColorSwatch = feature === 'Promo' ? 'text-ebony-clay' :
                        feature === 'Hot' ? 'text-white' :
                        feature === 'New' ? 'text-white' : ''
    return (
        <motion.div
            className={`${textColorSwatch} font-[Oswald] z-[2] flex items-center uppercase  
                        absolute top-3 left-0  ${size === 'large' ? 'text-[18px] pr-4 pl-2 h-10' : 'text-[11px] h-6 pr-4 pl-2'}`}>
            <LabelBack className={`${fillColorSwatch} absolute -z-[1] top-0 left-0 right-0 
                                bottom-0 h-full w-full`} />
            {feature}
        </motion.div>
    )
}

export default Label