import { motion } from 'framer-motion'
import React, { PropsWithChildren, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import IsoProtein from '../../assets/tempImg/iso_prot.png'
import { useResizeObserver } from '../../hooks/useResizeObserver'
import Label from './Label'
import Rate from './Rate'
import Tooltip from '../Tooltip'

type CardType = 'card' | 'searchGrid' | 'searchList'

interface ProductCard {
    type?: CardType
    title?: string
    promotion?: string
    price?: string
    unit?: string
}

const ProductCard: React.FC<PropsWithChildren<ProductCard>> = (
    {
        type = 'card',
        title = 'Whey Protein',
        promotion = 'Your promotion here...',
        price = '9.99',
        unit = '$'
    }
) => {

    const product = {
        _id: 'f6s4a6f4as4fa545fd45f4sd8',
        rate: 4.7,
        feature: {
            type: 'Promo',
            text: '15% OFF EVERYTHING'
        },
        brand: 'Shaky',
        title: 'Whey Protein',
        price: {
            value: 29.99,
            currency: '$'
        },
        imageUrl: IsoProtein
    }

    const [showTooltip, setShowTooltip] = useState(false)

    const gridSearchRef = useRef<HTMLElement | null>(null)
    const listSearchRef = useRef<HTMLElement | null>(null)

    const [listCardTextWidth, setListCardTextWidth] = useState<number>(0)
    const [setResizeRef, entry] = useResizeObserver()

    useLayoutEffect(() => {
        if (entry?.borderBoxSize) {
            const { inlineSize } = Array.isArray(entry.borderBoxSize) ? entry.borderBoxSize[0] : entry.borderBoxSize
            const width = inlineSize - 160
            setListCardTextWidth(width)
        }
    }, [entry])

    return (

        type === 'searchGrid' ? (
            <>
                <motion.article className='flex items-center justify-center 
            sxs:odd:justify-end xs:odd:justify-center sxs:even:justify-start xs:even:justify-center'
                >
                    <Link
                        to={`/products/${product._id}`}
                        aria-label={`Go to ${product.brand}: ${product.title}`}
                        title={`${product.brand}: ${product.title}`}
                    >
                        <motion.div className={`flex relative flex-col justify-center 
                                    items-center w-[152px] h-[213px] bg-melony-clay rounded-xl hover:bg-opacity-60 
                                    hover:shadow-[0_0_5px_#000] transition duration-300`}>
                            <Label feature={product.feature.type} />
                            <Rate rate={product.rate} />
                            <motion.div className='aspect-1 w-[105px] h-[105px]'>
                                <motion.img src={product.imageUrl} alt={`${product.title} image object-cover object-center`} />
                            </motion.div>
                            <motion.div className='text-center font-[Oswald] pt-2'>
                                <motion.p className='uppercase text-[12px] font-semibold' >{product.brand}</motion.p>
                                <motion.p className='uppercase text-[14px]' >{product.title}</motion.p>
                                <motion.p className='uppercase text-[8px] font-light text-sandy-brown' >{product.feature.text}</motion.p>
                                <motion.p className='uppercase text-[12px]' >{`${product.price.currency}${product.price.value}`}</motion.p>
                            </motion.div>
                        </motion.div>
                    </Link>
                </motion.article>
            </>) :

            type === 'searchList' ? (
                <motion.article
                    ref={ref => {
                        listSearchRef.current = ref
                        if (typeof setResizeRef === 'function') setResizeRef(ref)
                    }}
                    className='flex items-center justify-center relative mb-3'>
                    <Link
                        className='block w-full'
                        to={`/products/${product._id}`}
                        aria-label={`Go to ${product.brand}: ${product.title}`}
                        title={`${product.brand}: ${product.title}`}
                    >
                        <motion.div className={`flex relative flex-row justify-center
            items-center w-full h-[100px] bg-melony-clay rounded-xl hover:bg-opacity-60 hover:shadow-[0_0_5px_#000] transition duration-300`}>
                            <Label feature={product.feature.type} />
                            <Rate rate={product.rate} />
                            <motion.div className='relative flex items-center justify-between w-full px-6'>
                                <motion.div className='aspect-1 w-[105px] h-[105px]'>
                                    <motion.img src={product.imageUrl} className='object-cover object-center w-full h-full' alt={`${product.title} image`} />
                                </motion.div>
                                <motion.div style={{ maxWidth: listCardTextWidth }} className='text-center font-[Oswald] h-full pt-2 flex flex-col items-start justify-start grow'>
                                    <motion.p
                                        className='uppercase text-[12px] xs:text-[14px] text-left truncate w-full' >
                                        {product.brand}
                                    </motion.p>
                                    <motion.p
                                        className='uppercase text-[14px] xs:text-[16px] text-left truncate w-full' >
                                        {product.title}
                                    </motion.p>
                                    <motion.p
                                        className='uppercase text-[10px] xs:text-[12px] text-left font-light text-sandy-brown truncate w-full' >
                                        {product.feature.text}
                                    </motion.p>
                                    <motion.p
                                        className='uppercase text-[12px] xs:text-[14px] absolute bottom-2 right-2 xs:right-4' >
                                        {`${product.price.currency}${product.price.value}`}
                                    </motion.p>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </Link>
                </motion.article>) : null
    )
}

export default ProductCard