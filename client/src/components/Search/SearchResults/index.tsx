import React, { useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { ReactComponent as SortIcon } from '../../../assets/svg/icons/sort_arrow_icon.svg'
import ProductCard from '../../ProductCard'
import style from './SearchResults.module.css'
import { getSearchResultHeight, useAppSelector } from '../../../store'

const searchResultsVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}

const SearchResults = () => {
    const resultsHeight = useAppSelector(getSearchResultHeight)
    const [gridView, setGridView] = useState<'grid' | 'list'>('grid')
    return (
        <AnimatePresence>
            <motion.section
                className='px-[28px] mt-3 font-[Oswald] relative'
                variants={searchResultsVariants}
                initial='hidden'
                animate='visible'
                exit='hidden'
            >
                <motion.header>
                    <motion.h4 className='sr-only'>
                        Search Results:
                    </motion.h4>
                    <motion.div className='flex justify-between items-center'>
                        <motion.button
                            aria-label='View'
                            className={`w-[25px] h-[25px] ${style.viewIcon} 
                            ${gridView === 'list' ? style.viewIconList : style.viewIconGrid}`}
                            onClick={() => setGridView(prev => prev === 'grid' ? 'list' : 'grid')}
                        />
                        <motion.button aria-label='Sort By' className={`w-auto h-[25px] text-sandy-brown font-normal text-md 
                            uppercase ${style.sortIcon}`}>
                            Sort by<SortIcon className='pl-1 inline' />
                        </motion.button>
                    </motion.div>
                </motion.header>
                <motion.section style={{ height: resultsHeight }} className='overflow-y-auto py-3 pt-7 scrollbar-thin relative'>
                    <motion.div className='grid grid-flow-row grid-cols-2 gap-[10px]'>
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </motion.div>
                </motion.section>
            </motion.section>
        </AnimatePresence>
    )
}

export default SearchResults