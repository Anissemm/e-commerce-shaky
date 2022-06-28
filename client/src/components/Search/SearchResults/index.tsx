import React, { useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import style from './SearchResults.module.css'

const searchResultsVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}

const SearchResults = () => {
    const [gridView, setGridView] = useState<'grid' | 'list'>('grid')
    return (
        <AnimatePresence>
            <motion.section
                className='px-[28px] mt-3'
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
                        <motion.button aria-label='Sort By' />
                    </motion.div>
                </motion.header>
            </motion.section>
        </AnimatePresence>
    )
}

export default SearchResults