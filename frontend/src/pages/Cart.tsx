import React from 'react'
import Heading from '../components/Heading'
import ProductCard from '../components/ProductCard'
import { usePageSetTitle } from '../hooks/usePageSet'
import { product } from '../mockData'

const Cart = () => {
    usePageSetTitle('Cart', false, false)
  return (
    <div className='font-[Oswald]'>
      {/* <Heading>My Cart</Heading> */}
      <main>
        <div>
            <ul>
                <li>
                    {/* <ProductCard type='cartList' product={product} /> */}
                </li>
            </ul>
        </div>
      </main>
      </div>
  )
}

export default Cart