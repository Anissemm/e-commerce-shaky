import { useEffect, useState } from 'react'
import Modal from '../Modal'
import ModalBody from '../Modal/ModalBody'
import ModalHeader from '../Modal/ModalHeader'
import { AnimatePresence, motion } from 'framer-motion'
import style from './Search.module.css'
import LatestResults from './LatestResults'
import Recommended from './Recommended'
import SearchResults from './SearchResults/index'
import { useResizeObserver } from '../../hooks/useResizeObserver'
import { getCurrentShownModalId, getMenuType, getModalShow, setSearchResultheight, toggleModal, useAppDispatch, useAppSelector } from '../../store'
import { ReactComponent as InputIcon } from '../../assets/svg/icons/search_input_icon.svg'
import SearchFilters from './Filters'

const Search = () => {
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState<string>('')
  const [showResetBtn, setShowResetBtn] = useState<boolean>(false)
  const [inputFocused, setInputFocused] = useState<boolean>(false)
  const [showSearchFilter, setShowSearchFilter] = useState<boolean>(false)
  const [setResizeRef, entry] = useResizeObserver()

  const isModalShown = useAppSelector(getModalShow)
  const currentId = useAppSelector(getCurrentShownModalId)
  const menuType = useAppSelector(getMenuType)

  const results = true /* Hard code */

  useEffect(() => {
    if (entry?.borderBoxSize) {
      const { blockSize } = entry.borderBoxSize[0]
      dispatch(setSearchResultheight(blockSize))
    }
  }, [entry])

  const handleChange = (e: any) => {
    setSearchValue(e.target.value)
    if (e.target.value.length > 0) {
      setShowResetBtn(true)
    } else {
      setShowResetBtn(false)
    }
  }

  return (
    <>
      <AnimatePresence>

        {
          currentId !== 'search-modal' && !isModalShown && menuType === 'bar' &&
          <motion.div
            layoutId='searchInput'
            transition={{ duration: 0.05 }}
            className='relative mx-auto max-w-[670px] w-full rounded-xl bg-melony-clay 
                      focus-within:shadow-[0_0_5px_#000] hover:shadow-[0_0_5px_#000] transition 
                      duration-300'>
            <motion.input
              className={`pl-8 font-["Roboto_Condensed"] relative z-[1] bg-transparent border-none text-gray-400 
                        text-left sm:text-center placeholder:text-center placeholder:text-sandy-brown
                        placeholder:text-opacity-50 h-[38px] text-[15px] w-full focus:!outline-none focus:!shadow-none 
                        focus:!border-none [::-webkit-search-cancel-button]:none ${style.hideClear}`}
              type='search'
              value={searchValue}
              onChange={handleChange}
              onFocus={() => {
                setInputFocused(true)
                dispatch(toggleModal())
              }}
              onBlur={() => setInputFocused(false)}
              placeholder={inputFocused ? '' : 'Search Something'} />
            <InputIcon
              aria-label=''
              className={`z-[0] ${inputFocused || searchValue.length > 0 ? '!left-3' : ''} ${style.inputIcon} 
                        transition-all duration-500`}
            />
          </motion.div>
        }
      </AnimatePresence>

      <Modal
        modalId='search-modal'
        ref={ref => {
          if (typeof setResizeRef === 'function') {
            setResizeRef(ref)
          }
        }}
      >
        <ModalHeader title='Modal Title' />
        <AnimatePresence>
          {showSearchFilter && <SearchFilters />}
        </AnimatePresence>
        <ModalBody>

          <motion.section
            className='font-[Oswald] rounded-xl flex items-center justify-center max-w-[670px] mx-[28px] mt-12 gap-3'>
            <AnimatePresence>
              {showResetBtn &&
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`${style.resetBtn} w-5 h-6`}
                  aria-label='Reset search field'
                  onClick={() => {
                    setSearchValue('')
                    setShowResetBtn(false)
                  }}
                />}
            </AnimatePresence>
            <motion.div
              layoutId='searchInput'
              transition={{ duration: 0.05 }}
              className='relative w-full rounded-xl bg-melony-clay 
              focus-within:shadow-[0_0_5px_#000] hover:shadow-[0_0_5px_#000] transition 
              duration-300'>
              <motion.input
                className={`pl-8 font-["Roboto_Condensed"] relative z-[1] bg-transparent border-none text-gray-400 
              text-left sm:text-center placeholder:text-center placeholder:text-sandy-brown
              placeholder:text-opacity-50 h-[52px] text-[15px] w-full focus:!outline-none focus:!shadow-none 
              focus:!border-none [::-webkit-search-cancel-button]:none ${style.hideClear}`}
                type='search'
                value={searchValue}
                onChange={handleChange}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder={inputFocused ? '' : 'Search Something'} />
              <InputIcon className={`z-[0] ${inputFocused || searchValue.length > 0 ? '!left-3' : ''} ${style.inputIcon} transition-all duration-500`} />
            </motion.div>
            <motion.button
              aria-label='Search Filters'
              className={`${style.searchFilter} w-5 h-6`}
              onClick={() => setShowSearchFilter(prev => !prev)}
            />
          </motion.section>

          {results ?
            <SearchResults /> :
            <motion.section>
              <LatestResults />
              <Recommended />
            </motion.section>}

        </ModalBody>
      </Modal >
    </>
  )
}

export default Search