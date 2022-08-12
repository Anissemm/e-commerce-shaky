import { AnimatePresence, motion } from 'framer-motion'
import React, { PropsWithChildren, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import slugify from 'slugify'
import { ReactComponent as AddToCartIcon } from '../../assets/svg/icons/add_to_cart_icon.svg'
import { useResizeObserver } from '../../hooks/useResizeObserver'
import { product } from '../../mockData'
import Label from './Label'
import './productCard.css'
import Rate from './Rate'

type CardType = 'card' | 'list' | 'searchGrid' | 'searchList' | 'cartList'

interface ProductCard {
    type: 'list' | 'card' | 'searchGrid' | 'searchList' | 'cartList'
    product: typeof product
    porductCount?: number
    // onPorductCountChange?(e: any) => {}
    onClickAddToCart?: (e: any) => {}
}


const ProductCard: React.FC<PropsWithChildren<ProductCard>> = ({ product, type, onClickAddToCart }) => {

    const listSearchRef = useRef<HTMLElement | null>(null)

    const [listCardTextWidth, setListCardTextWidth] = useState<number>(0)
    const [setResizeRef, entry] = useResizeObserver()

    const [showAddToCartBtnText, setShowAddToCartBtnText] = useState(false)

    useLayoutEffect(() => {
        if (entry?.borderBoxSize) {
            const { inlineSize } = Array.isArray(entry.borderBoxSize) ? entry.borderBoxSize[0] : entry.borderBoxSize
            const width = inlineSize - 160
            setListCardTextWidth(width)
        }
    }, [entry])

    return (
        type === 'card' ? (
            <>
                <article
                    className={`flex my-4 items-center justify-center 
                    sxs:odd:justify-end xs:odd:justify-center 
                    sxs:even:justify-start xs:even:justify-center card transition-all duration-300`}
                >
                    <Link
                        to={`/products/${product._id}`}
                        aria-label={`Go to ${product.brand}: ${product.title}`}
                        title={`${product.brand}: ${product.title}`}
                    >
                        <div
                            className={`flex relative flex-col justify-start overflow-hidden
                            items-center w-[230px] h-[360px] md:w-[272px] md:h-[410px] bg-ebony-clay rounded-xl hover:bg-opacity-60 
                            shadow-[0_0_5px_#000] transition duration-300`}>
                            <Label size='large' feature={product.feature.type} />
                            <Rate size='large' rate={product.rate} />
                            <div className='aspect-1 w-[140px] h-[140px] md:w-[150px] md:h-[150px] mt-[50px] md:mt-[70px]'>
                                <img
                                    src={product.imageUrl} alt={`${product.title}`}
                                    className='object-contain object-center w-full h-full' />
                            </div>
                            <div className='text-center font-[Oswald] text-white pt-2 px-2'>
                                <p className='uppercase text-[20px] leading-5 md:text-[24px] md:leading-6 line-clamp-2 [@supports_not_(-webkit-line-clamp:1)]:truncate w-full' >{product.title}</p>
                                <p className='uppercase text-[12px] leading-3 md:text-[15px] font-semibold md:leading-4 truncate w-full' >{product.brand}</p>
                                <p className='font-["Roboto_Condensed"] text-[13px] md:text-[15px] font-light leading-[13px] md:leading-4 pt-1 md:pt-2 text-sandy-brown w-full line-clamp-2 [@supports_not_(-webkit-line-clamp:1)]:truncate' >{product.feature.text}</p>
                            </div>
                            <div className='uppercase flex items-center justify-between w-full absolute bottom-0' >
                                <button
                                    onClick={(e: any) => {
                                        if (typeof onClickAddToCart === 'function') {
                                            onClickAddToCart(e)
                                        }
                                    }}
                                    className={`overflow-hidden bg-sandy-brown max-h-12 md:max-h-16 px-2 md:px-3 pb-1 md:pb-2 
                                    md:pt-1 rounded-[18px] md:rounded-[23px] rounded-bl-none flex items-center justify-start 
                                    transition-all duration-300 w-[50px] h-[46px] hover:w-[100px] md:w-[68px] md:h-[62px]  md:hover:w-[128px]`}>
                                    <AddToCartIcon className='fill-ebony-clay w-[32px] h-[32px] md:w-[40px] md:h-[40px] flex-shrink-0 mr-2 md:mr-3.5' />
                                    <span className='font-[Oswald] pl-0.5 md:pl-0 w-11 flex-shrink-0 leading-4 text-ebony-clay'>Add To Cart</span>
                                </button>
                                <span className='font-[Oswald] text-[18px] md:text-xl text-sandy-brown pr-3'>{`From ${product.price.currency}${product.price.value}`}</span>
                            </div>
                        </div>
                    </Link>
                </article>
            </>) :
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
                type === 'cartList' ? (
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
                                    <p>Qty:
                                        <input
                                            type='number'
                                            name={`${slugify(product?.title, { lower: true, replacement: '_' })}`}
                                            step={1}
                                            // value={porductCount}
                                            onChange={(e: any) => {
                                                // if(typeof onPorductCountChange === 'function') {
                                                //     const value = parseInt(e.target.value)

                                                //     if (value <= 0) {
                                                //         onPorductCountChange(1)
                                                //     }

                                                //     onPorductCountChange(value)
                                                // }
                                            }}
                                        />
                                    </p>
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
                                        <div className='text-center font-[Oswald] pt-2 px-2'>
                                            <p className='uppercase text-[14px] line-clamp-2 leading-none [@supports_not_(-webkit-line-clamp:1)]:truncate w-full' >{product.title}</p>
                                            <p className='uppercase text-[12px] font-semibold truncate w-full' >{product.brand}</p>
                                            <p className='uppercase text-[10px] font-light text-sandy-brown leading-none line-clamp-2 [@supports_not_(-webkit-line-clamp:1)]:truncate w-full' >{product.feature.text}</p>
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
                                                    className='uppercase text-[14px] xs:text-[16px] 
                                        text-left truncate w-full' >
                                                    {product.title}
                                                </p>
                                                <p
                                                    className='uppercase text-[12px] xs:text-[14px] 
                                        text-left truncate w-full'
                                                >
                                                    {product.brand}
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