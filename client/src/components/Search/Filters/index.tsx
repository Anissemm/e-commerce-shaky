import React from 'react'
import { motion } from 'framer-motion'
import { getSearchResultHeight, setSearchResultheight, useAppSelector } from '../../../store'
import style from './Filters.module.css'

const SearchFilters = () => {
    const filterHeight = useAppSelector(getSearchResultHeight)

    return (
        <motion.section>
            <motion.div
                style={{ height: filterHeight - 200 }}
                className={`absolute right-0 bottom-0 max-h-[640px] h-full w-[287px] 
                bg-ebony-clay shadow-xl z-[48] bg-opacity-80 ${style.backdropBlur}`}>

            </motion.div>
        </motion.section>
    )
}

export default SearchFilters