import React from 'react'
import { motion, Variants } from 'framer-motion'
import ProductCard from '../../ProductCard'

const toggleVariants: Variants = {
    hidden: {
        opacity: 0,
        transition: { duration: 0.5 }
    },
    visible: {
        opacity: 1,
        transition: { duration: 0.5 }
    }
}

const ListView = ({ products }: { products: any }) => {
    return (
        <motion.div
            variants={toggleVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
        >
            <motion.div
                variants={toggleVariants}
                initial='hidden'
                animate='visible'
                exit='hidden'
                className=''
            >
                {/*Hard coded */}
                {products?.map((product: any) => {
                    return (
                            <ProductCard key={product._id} type='searchList' product={product} />
                    )
                })}
                {/*Hard coded */}
            </motion.div>
        </motion.div>
    )
}

export default ListView