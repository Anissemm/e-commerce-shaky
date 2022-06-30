import ProductCard from '../../ProductCard'
import { motion, Variants } from 'framer-motion'

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

const GridView = () => {

    return (
        <motion.div className="xs:flex xs:justify-center">
            <motion.div
                variants={toggleVariants}
                initial='hidden'
                animate='visible'
                exit='hidden'
                className='grid grid-flow-row grid-cols-1 xs:w-[470px] sm:w-[625px] sxs:grid-cols-2 xs:flex xs:justify-start xs:flex-wrap gap-[5px]'
            >
                <ProductCard type='searchGrid' />
                <ProductCard type='searchGrid' />
                <ProductCard type='searchGrid' />
                <ProductCard type='searchGrid' />
                <ProductCard type='searchGrid' />
            </motion.div>
        </motion.div>
    )
}

export default GridView