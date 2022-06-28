import { motion } from 'framer-motion'
import React, { PropsWithChildren } from 'react'
import IsoProtein from '../../assets/tempImg/iso_prot.png'

interface ProductCard {
    type?: 'card' | 'list'
    title?: string
    promotion?: string
    price?: string
    unit?: string
}

const defaultProps: ProductCard = {
    type: 'card',
    title: 'Tilte',
    promotion: 'Your promotion here...',
    price: '9.99',
    unit: '$'
}

const ProductCard: React.FC<PropsWithChildren<ProductCard>> = (
    {
        type = 'card',
        title = 'Tilte',
        promotion = 'Your promotion here...',
        price = '9.99',
        unit = '$'
    }
) => {

    return (
        <motion.article className='flex items-center justify-center'>
            <motion.div className={`flex ${type === 'card' ? 'flex-col' : 'flex-row'} justify-center 
                items-center w-[152px] h-[213px] bg-melony-clay rounded-xl`}>
                <motion.div className='aspect-1 w-[105px] h-[105px]'>
                    <motion.img src={IsoProtein} alt={`${title} image object-cover object-center`} />
                </motion.div>
                <motion.div className='text-center font-[Oswald] pt-2'>
                    <motion.p className='uppercase text-[14px]' >{title}</motion.p>
                    <motion.p className='uppercase text-[8px] font-light text-sandy-brown' >{promotion}</motion.p>
                    <motion.p className='uppercase text-[12px]' >{`${unit}${price}`}</motion.p>
                </motion.div>
            </motion.div>
        </motion.article>
    )
}

export default ProductCard