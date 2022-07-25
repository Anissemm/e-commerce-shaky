import { motion } from 'framer-motion'
import React, { PropsWithChildren, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import IsoProtein from '../../assets/tempImg/iso_prot.png'
import { useResizeObserver } from '../../hooks/useResizeObserver'
import { product } from '../../mockData'
import Label from './Label'
import Rate from './Rate'

type CardType = 'card' | 'list' | 'searchGrid' | 'searchList'

interface ProductCard {
    type: 'list' | 'card' | 'searchGrid' | 'searchList'
    product: typeof product
}


const ProductCard: React.FC<PropsWithChildren<ProductCard>> = ({ product, type }) => {

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
        type === 'list' ? (
            <article
                title={`${product.brand}: ${product.title}`}
                ref={ref => {
                    listSearchRef.current = ref
                    if (typeof setResizeRef === 'function') setResizeRef(ref)
                }}
                className='flex items-center justify-center relative mb-3'>
                <div
                    className={`flex relative flex-row justify-center
                        items-center w-full bg-melony-clay rounded-xl transition duration-300`}>
                    <div className='relative flex items-center justify-between w-full px-2 pr-3 xs:px-6 xs:pr-8'>
                        <div className='aspect-1 w-[75px] h-[75px] sxs:w-[90px] sxs:h-[90px] xs:w-[105px] xs:h-[105px]'>
                            <img
                                src={product.imageUrl}
                                className='object-contain object-center w-full h-full'
                                alt={`${product.title} image`}
                            />
                        </div>
                        <div style={{ maxWidth: listCardTextWidth }}
                            className='text-center font-[Oswald] h-full pt-2 flex 
                                flex-col items-start justify-start grow'>
                            <p className='uppercase leading-none text-[12px] xs:text-[14px] text-left truncate w-full' >
                                {product.title}
                            </p>
                            <p className='text-[12px] leading-4 text-left truncate w-full' >
                                {product.productFeature.size}
                            </p>
                            <p className='text-[12px] text-left truncate w-full' >
                                {product.productFeature.flavour}
                            </p>
                        </div>
                        <div className='text-[12px] xs:text-[14px] xs:right-4'>
                            <p>Qty: {`${product.quantity}`}</p>
                            <p>{`${product.price.currency}${product.price.value}`}</p>
                        </div>
                    </div>
                </div>
            </article>) :
            type === 'searchGrid' ? (
                <>
                    <article
                        className='flex items-center justify-center 
                    sxs:odd:justify-end xs:odd:justify-center 
                    sxs:even:justify-start xs:even:justify-center'
                    >
                        <Link
                            to={`/products/${product._id}`}
                            aria-label={`Go to ${product.brand}: ${product.title}`}
                            title={`${product.brand}: ${product.title}`}
                        >
                            <div
                                className={`flex relative flex-col justify-center 
                            items-center w-[152px] h-[213px] bg-melony-clay rounded-xl hover:bg-opacity-60 
                            hover:shadow-[0_0_5px_#000] transition duration-300`}>
                                <Label feature={product.feature.type} />
                                <Rate rate={product.rate} />
                                <div className='aspect-1 w-[105px] h-[105px]'>
                                    <img
                                        src={product.imageUrl} alt={`${product.title}`}
                                        className='object-contain object-center w-full h-full' />
                                </div>
                                <div className='text-center font-[Oswald] pt-2'>
                                    <p className='uppercase text-[12px] font-semibold' >{product.brand}</p>
                                    <p className='uppercase text-[14px]' >{product.title}</p>
                                    <p className='uppercase text-[8px] font-light text-sandy-brown' >{product.feature.text}</p>
                                    <p className='uppercase text-[12px]' >{`${product.price.currency}${product.price.value}`}</p>
                                </div>
                            </div>
                        </Link>
                    </article>
                </>) :

                type === 'searchList' ? (
                    <article
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
                            <div
                                className={`flex relative flex-row justify-center
                            items-center w-full h-[100px] bg-melony-clay rounded-xl 
                            hover:bg-opacity-60 hover:shadow-[0_0_5px_#000] transition duration-300`}>
                                <Label feature={product.feature.type} />
                                <Rate rate={product.rate} />
                                <div className='relative flex items-center justify-between w-full px-6'>
                                    <div className='aspect-1 w-[105px] h-[105px]'>
                                        <img
                                            src={product.imageUrl}
                                            className='object-contain object-center w-full h-full'
                                            alt={`${product.title} image`}
                                        />
                                    </div>
                                    <div
                                        style={{ maxWidth: listCardTextWidth }}
                                        className='text-center font-[Oswald] h-full pt-2 flex 
                                    flex-col items-start justify-start grow'>
                                        <p
                                            className='uppercase text-[12px] xs:text-[14px] 
                                        text-left truncate w-full'
                                        >
                                            {product.brand}
                                        </p>
                                        <p
                                            className='uppercase text-[14px] xs:text-[16px] 
                                        text-left truncate w-full' >
                                            {product.title}
                                        </p>
                                        <p
                                            className='uppercase text-[10px] xs:text-[12px] 
                                        text-left font-light text-sandy-brown truncate w-full' >
                                            {product.feature.text}
                                        </p>
                                        <p
                                            className='uppercase text-[12px] xs:text-[14px] 
                                        absolute bottom-2 right-2 xs:right-4' >
                                            {`${product.price.currency}${product.price.value}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </article>) : null
    )
}

export default ProductCard