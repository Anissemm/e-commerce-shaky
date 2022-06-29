import React, { useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { ReactComponent as SortIcon } from '../../../assets/svg/icons/sort_arrow_icon.svg'
import style from './SearchResults.module.css'
import GridView from './GridView'
import { getSearchResultHeight, useAppSelector } from '../../../store'
import ListView from './ListView'

const searchResultsVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}

const SearchResults = () => {
    const [view, setView] = useState<'grid' | 'list'>('grid')
    const resultsHeight = useAppSelector(getSearchResultHeight)

    return (
        <AnimatePresence>
            <motion.section
                className='mt-3 font-[Oswald] relative'
                variants={searchResultsVariants}
                initial='hidden'
                animate='visible'
                exit='hidden'
            >
                <motion.header>
                    <motion.h4 className='sr-only'>
                        Search Results:
                    </motion.h4>
                    <motion.div className='flex justify-between items-center px-[28px] '>
                        <motion.button
                            aria-label='View'
                            className={`w-[25px] h-[25px] ${style.viewIcon} 
                            ${view === 'list' ? style.viewIconGrid : style.viewIconList}`}
                            onClick={() => setView(prev => prev === 'grid' ? 'list' : 'grid')}
                        />
                        <motion.button aria-label='Sort By' className={`w-auto h-[25px] text-sandy-brown font-normal text-md 
                            uppercase ${style.sortIcon}`}>
                            Sort by<SortIcon className='pl-1 inline' />
                        </motion.button>
                    </motion.div>
                </motion.header>
                <motion.section style={{ height: resultsHeight - 260 }} className='px-[12px] overflow-y-auto py-3 mt-5 hover:scrollbar-thumb-raven scrollbar-thin scrollbar-thumb-fiorid relative'>
                    <AnimatePresence exitBeforeEnter>
                        {view === 'grid' ? <GridView /> : <ListView />}
                    </AnimatePresence>
                </motion.section>
            </motion.section>
        </AnimatePresence>
    )
}

export default SearchResults