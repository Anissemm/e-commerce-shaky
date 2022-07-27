import { Splide, SplideSlide } from '@splidejs/react-splide'
import React from 'react'
import ProductCard from '../ProductCard'
import './productCarousel.css'

interface ProductCarousel {
    products: any[] | null | undefined
    withPagination?: boolean
}

const ProductCarousel: React.FC<ProductCarousel> = ({ products, withPagination = false }) => {
    return (
        <div className={`productCarousel`}> 
            <Splide options={{
                type: 'loop',
                autoplay: true,
                interval: 4000,
                perMove: 1,
                pagination: withPagination,
                arrows: false,
                snap: true,
                focus: 'center',
                gap: 15,
                autoWidth: true,
                padding: {
                    top: 10,
                    bottom: 10
                },
                autoHeight: true
            }}>
                {products?.map(product => {
                    return (
                        <SplideSlide key={product?._id}>
                            <ProductCard type='card' product={product} />
                        </SplideSlide>
                    )
                })}
            </Splide>
        </div>
    )
}

export default ProductCarousel