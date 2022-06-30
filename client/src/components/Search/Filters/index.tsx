import React, { PropsWithChildren, useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, Variants } from 'framer-motion'
import { getFilter, getFilters, getSearchResultHeight, removeFilter, resetFilters, setFilter, useAppDispatch, useAppSelector } from '../../../store'
import style from './Filters.module.css'
import { ReactComponent as Arrow } from '../../../assets/svg/icons/arrow_left_icon.svg'
import { ReactComponent as Tick } from '../../../assets/svg/icons/tick_icon.svg'

type PriceRange = {
    min: number,
    max: number,
    unit: string
}

type Filter = {
    filterName: string,
    values: string[] | PriceRange
}

type Filters = Array<Filter> | []

const filtersVariants: Variants = {
    hidden: {
        x: '100%',
        boxShadow: `0 0 5px rgba(0, 0, 0, 0)`,
        transition: {
            ease: 'linear',
            x: {
                duration: 0.7
            },
            boxShadow: {
                duration: 1
            }

        }
    },
    visible: {
        x: 0,
        boxShadow: `0 0 5px rgba(0, 0, 0, 1)`,
        transition: {
            ease: 'linear'
        }
    }
}

const FilterElementVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}

const SearchFilters = () => {
    const dispatch = useAppDispatch()
    const searchResultHeight = useAppSelector(getSearchResultHeight)
    const filters = useAppSelector(getFilters)

    const shadowTransparence = useMotionValue(0)
    const boxShadow = useMotionTemplate`0 0 5px rgba(0, 0, 0, ${shadowTransparence})`

    const filterFromServer: Filters = [
        { filterName: 'Product Type', values: ['Powder', 'Tablets', 'Liquid'] },
        { filterName: 'Category', values: ['Accessories', 'Supplement', 'Other'] },
        { filterName: 'Brand', values: ['AmSport', 'BulkForce', 'Extrive', 'HardTrain'] },
        { filterName: 'Flavour', values: ['Strawberry', 'Chocolat', 'Vanilla', 'Coffee', 'Banana'] },
        { filterName: 'PriceRange', values: { min: 0, max: 300, unit: '$' } },
    ]

    const height = typeof searchResultHeight === 'number' ? searchResultHeight - 200 : undefined
    const filterValuesHeight = height ? height - 87 : undefined
    const [shownFilter, setShownFilter] = useState('')

    return (
        <motion.aside>
            <motion.div
                variants={filtersVariants}
                initial='hidden'
                animate='visible'
                exit='hidden'
                style={{ boxShadow, height }}
                className={`absolute font-[Oswald] right-0 bottom-0 max-h-[640px] px-5 h-full w-[287px] 
                    bg-ebony-clay z-[48] bg-opacity-80 ${style.backdropBlur} shadow-[0_0_5px_#000]`}>
                <motion.header className='flex justify-between items-center w-full pt-5 pb-10'>
                    <motion.h4 className='text-gray-500 uppercase text-[18px]'>Refine by</motion.h4>
                    <motion.button
                        onClick={() => { dispatch(resetFilters()) }}
                        className='text-sandy-brown uppercase text-[18px] hover:text-opacity-80 transition duration-300'>
                        Clear
                    </motion.button>
                </motion.header>
                <motion.div className='relative'>
                    <button className='relative -top-6' onClick={() => setShownFilter('')}>back</button>
                    <form onSubmit={(e: any) => {
                        e.preventDefault()
                    }}>
                        {shownFilter === '' && filterFromServer.map(filter => {
                            return (
                                <motion.div key={filter.filterName}>
                                    <motion.button
                                        type='button'
                                        onClick={() => setShownFilter(filter.filterName)}
                                        className='w-full flex justify-between items-center'>
                                        <motion.span>{filter.filterName}</motion.span>
                                        <motion.span>
                                            <motion.span></motion.span>
                                            <Arrow className='rotate-180' />
                                        </motion.span>
                                    </motion.button>
                                </motion.div>
                            )
                        })}
                        <AnimatePresence>
                            {filterFromServer.map(filter => {
                                return (shownFilter === filter.filterName &&
                                    <motion.div
                                        variants={FilterElementVariants}
                                        initial='hidden'
                                        animate='visible'
                                        exit='hidden'
                                        // style={{ height: filterValuesHeight }}
                                        className={`${style.backdropBlur} bg-opacity-90 absolute top-0 left-0 h-full w-full`}
                                    >
                                        {Array.isArray(filter.values) ? filter.values.map(value => {
                                            return <FilterElement filterName={filter.filterName} key={value} value={value} />
                                        }) : <motion.div />}
                                    </motion.div> )})}
                        </AnimatePresence>
                    </form>
                </motion.div>
            </motion.div>
        </motion.aside>
    )
}

interface FilterElementProps extends PropsWithChildren {
    value: string
    filterName: string
}

const FilterElement: React.FC<FilterElementProps> = ({ value, filterName }) => {
    const dispatch = useAppDispatch()
    const filter = useAppSelector(state => getFilter(state, filterName))
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(_prev => {
            if (filter) {
                return filter.includes(value)
            }
            return false
        })
    }, [filter])

    return (
        <motion.div
            className='flex items-center justify-between mb-1'>
            <motion.label
                className={`${checked ? 'text-sandy-brown' : ''} hover:text-sandy-brown 
                hover:text-opacity-80 transition duration-200 cursor-pointer`}
                htmlFor={`${filterName}-${value}`}
            >
                {value}
            </motion.label>
            <motion.div className='relative h-6 w-6'>
                <motion.input
                    id={`${filterName}-${value}`}
                    type='checkbox'
                    className={`${style.checkboxHover} opacity-0 h-6 w-6 absolute z-[6] cursor-pointer`}
                    name={value}
                    checked={checked}
                    onChange={(e: any) => {
                        if (e.target.checked) {
                            dispatch(setFilter({ filterName, value }))
                        } else {
                            dispatch(removeFilter({ filterName, value }))
                        }
                    }} />
                <motion.div className='absolute flex items-center justify-center z-[3] top-0 left-0 w-full h-full bg-raven p-[1px]'>
                    <motion.div className='relative z-[2] w-full h-full border-fiorid border-4 border-solid' />
                    <Tick
                        className='absolute top-1/2 left-1/2 z-[4] w-4 h-4'
                        style={{ opacity: checked ? 1 : 0 }} />
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default SearchFilters