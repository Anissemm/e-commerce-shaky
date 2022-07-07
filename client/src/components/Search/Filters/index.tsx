import React, { forwardRef, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, Variants } from 'framer-motion'
import { getFilter, getFilters, getSearchResultHeight, removeFilter, resetFilters, setFilter, useAppDispatch, toggleSearchFilters, useAppSelector, getSearchFiltersShow } from '../../../store'
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

const returnButtonVariants: Variants = {
    hidden: {
        x: '-100%',
        transition: {
            duration: 0.2,
        }
    },
    visible: {
        x: 0,
        transition: {
            duration: 0.3,
        }
    }
}

const filterFromServer: Filters = [
    { filterName: 'Product Type', values: ['Powder', 'Tablets', 'Liquid'] },
    { filterName: 'Category', values: ['Accessories', 'Supplement', 'Other'] },
    { filterName: 'Brand', values: ['AmSport', 'BulkForce', 'Extrive', 'HardTrain'] },
    { filterName: 'Flavour', values: ['Strawberry', 'Chocolat', 'Vanilla', 'Coffee', 'Banana'] },
    { filterName: 'PriceRange', values: { min: 0, max: 300, unit: '$' } },
]

const SearchFilters = forwardRef<HTMLDivElement, PropsWithChildren>((props, ref) => {
    const dispatch = useAppDispatch()
    const searchResultHeight = useAppSelector(getSearchResultHeight)
    const filters = useAppSelector(getFilters)
    const isShown = useAppSelector(getSearchFiltersShow)

    const shadowTransparence = useMotionValue(0)
    const boxShadow = useMotionTemplate`0 0 5px rgba(0, 0, 0, ${shadowTransparence})`

    const height = typeof searchResultHeight === 'number' ? searchResultHeight - 200 : undefined
    const filterValuesHeight = height ? height - 92 : undefined
    const [shownFilter, setShownFilter] = useState('')

    const getPickedFilters = (filterName: string): string | null => {
        if (filters.hasOwnProperty(filterName)) {
            return filters[filterName].join(', ')
        }
        return null
    }

    const getFilterBtnTitleAttr = (filterName: string): string => {
        let titleAttr = ''
        if (filterName) {
            const pickedFilters = getPickedFilters(filterName)
            titleAttr = `${filterName}${!pickedFilters ? '' : `: ${pickedFilters}`}`
        }
        return titleAttr
    }

    return (
        <AnimatePresence>
            {isShown && <>
                <motion.div
                    initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
                    animate={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
                    transition={{ duration: 0.3 }}
                    onClick={() => dispatch(toggleSearchFilters(false))}
                    className={`fixed z-[48] top-0 left-0 w-screen h-screen
                            ${isShown ? style.visible : style.hidden}`} />
                <motion.aside ref={ref} tabIndex={-1}>
                    <motion.div
                        variants={filtersVariants}
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        style={{ boxShadow, height }}
                        className={`absolute font-[Oswald] right-0 bottom-0 max-h-[640px] px-5 h-full w-[287px] 
                    bg-ebony-clay z-[49] bg-opacity-80 ${style.backdropBlur} shadow-[0_0_5px_#000]`}>
                        <motion.header layout className='flex items-center justify-between pt-5 pb-10' >
                            <motion.button
                                className='pr-2'
                                title="Go back"
                                onClick={() => {
                                    if (shownFilter !== '') {
                                        setShownFilter('')
                                    } else {
                                        dispatch(toggleSearchFilters(false))
                                    }
                                }}
                                aria-label='Go back'
                            >
                                <Arrow height={16} className='!stroke-gray-500' />
                            </motion.button>
                            <motion.div layout transition={{ duration: 0.2 }} className='flex justify-between items-center w-full'>
                                <motion.h4 className='text-gray-500 uppercase text-[18px]'>Refine by</motion.h4>
                                <motion.button
                                    onClick={() => { dispatch(resetFilters()) }}
                                    className='text-sandy-brown uppercase text-[18px] hover:text-opacity-80 transition duration-150'>
                                    Clear
                                </motion.button>
                            </motion.div>
                        </motion.header>
                        {shownFilter === '' && <motion.div
                            style={{ maxHeight: filterValuesHeight }}
                            className=' overflow-y-auto hover:scrollbar-thumb-raven scrollbar-thin scrollbar-thumb-fiorid'
                        >
                            {filterFromServer.map(filter => {
                                return (
                                    <motion.div
                                        key={filter.filterName} >
                                        <motion.button
                                            type='button'
                                            title={getFilterBtnTitleAttr(filter.filterName)}
                                            onClick={() => setShownFilter(filter.filterName)}
                                            className='w-full flex justify-between items-center hover:text-sandy-brown transition duration-200'>
                                            <motion.span
                                                className='grow text-left'
                                            >{filter.filterName}</motion.span>
                                            <motion.span className='flex items-center justify-between'>
                                                <AnimatePresence>
                                                    {getPickedFilters(filter.filterName) && <motion.span
                                                        transition={{ duration: 0.2 }}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className='leading-none max-w-[90px] truncate inline-block text-gray-400 text-xs'
                                                    >
                                                        {getPickedFilters(filter.filterName)}
                                                    </motion.span>}
                                                </AnimatePresence>
                                                <Arrow className='rotate-180 h-[12px]' />
                                            </motion.span>
                                        </motion.button>
                                    </motion.div>
                                )
                            })}
                        </motion.div>}

                        <AnimatePresence>
                            <motion.div
                                style={{ maxHeight: filterValuesHeight }}
                                className=' overflow-y-auto hover:scrollbar-thumb-raven scrollbar-thin scrollbar-thumb-fiorid px-1'
                            ></motion.div>
                            {filterFromServer.map(filter => {
                                return (shownFilter === filter.filterName &&
                                    <motion.div
                                        key={filter.filterName}
                                        style={{ maxHeight: filterValuesHeight }}
                                        className='relative'
                                    >
                                        <motion.div
                                            variants={FilterElementVariants}
                                            initial='hidden'
                                            animate='visible'
                                            exit='hidden'
                                            style={{ height: filterValuesHeight }}
                                            className={`px-1 overflow-y-auto hover:scrollbar-thumb-raven scrollbar-thin scrollbar-thumb-fiorid
                                     bg-opacity-0 absolute top-0 left-0 h-full w-full`}
                                        >
                                            {Array.isArray(filter.values) ? filter.values.map(value => {
                                                return <FilterElement filterName={filter.filterName} key={value} value={value} />
                                            }) : <motion.div />}
                                        </motion.div>
                                    </motion.div>)
                            })}
                        </AnimatePresence>
                    </motion.div>
                </motion.aside>
            </>}
        </AnimatePresence>
    )
})

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
                hover:text-opacity-80 transition duration-150 cursor-pointer`}
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
                        className='absolute top-1/2 left-1/2 z-[4] w-4 h-4 transition duration-150'
                        style={{ opacity: checked ? 1 : 0 }}  />
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default SearchFilters