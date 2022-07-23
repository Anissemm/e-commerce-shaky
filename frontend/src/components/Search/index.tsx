import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Modal from '../Modal'
import ModalBody from '../Modal/ModalBody'
import ModalHeader from '../Modal/ModalHeader'
import { AnimatePresence, motion } from 'framer-motion'
import style from './Search.module.css'
import LatestResults from './LatestResults'
import Recommended from './Recommended'
import SearchResults from './SearchResults/index'
import { useResizeObserver } from '../../hooks/useResizeObserver'
import {
  getCurrentShownModalId,
  getMenuType,
  getModalShow,
  setSearchResultheight,
  toggleModal,
  useAppDispatch,
  toggleSearchFilters,
  useAppSelector,
  getSearchFiltersShow
} from '../../store'
import { ReactComponent as InputIcon } from '../../assets/svg/icons/search_input_icon.svg'
import SearchFilters from './Filters'

const Search = () => {
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState<string>('')
  const [showResetBtn, setShowResetBtn] = useState<boolean>(false)
  const [inputFocused, setInputFocused] = useState<boolean>(false)
  const showSearchFilter = useAppSelector(getSearchFiltersShow)
  const [setResizeRef, entry] = useResizeObserver()
  const [modalWidth, setModalWidth] = useState(0)

  const isModalShown = useAppSelector(getModalShow)
  const currentId = useAppSelector(getCurrentShownModalId)
  const menuType = useAppSelector(getMenuType)
  const modalInputRef = useRef<HTMLInputElement | null>(null)
  const searchFiltersRef = useRef<HTMLDivElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)

  const results = false /* Hard code */

  useEffect(() => {
    if (entry?.borderBoxSize) {
      const { blockSize, inlineSize } = entry.borderBoxSize[0]
      console.log(inlineSize)
      setModalWidth(inlineSize)
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

  useEffect(() => {
    if (showSearchFilter) {
      searchFiltersRef.current?.focus()
    } else {
      modalRef.current?.focus()
    }
  }, [showSearchFilter])

  useEffect(() => {
    const escapeHandler = (e: any) => {
      if (e.key === 'Escape') {
        dispatch(toggleSearchFilters(false))
      }
    }

    document.addEventListener('keydown', escapeHandler)

    return () => document.removeEventListener('keydown', escapeHandler)

  }, [])

  return (
    <>
      <AnimatePresence>
        {currentId !== 'search-modal' && !isModalShown && menuType === 'bar' &&
          <motion.div
            key='searchInput-toolbar'
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
                dispatch(toggleModal({ modalId: 'search-modal' }))
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
        top={modalWidth > 1000 ? 30 : 'auto'}
        bottom={modalWidth > 1000 ? 30 : 'auto'}
        ref={ref => {
          modalRef.current = ref
          if (typeof setResizeRef === 'function') {
            setResizeRef(ref)
          }
        }}
      >
        <ModalHeader title='Modal Title' />
        <SearchFilters ref={searchFiltersRef} />
        <ModalBody>

          <motion.section
            className='font-[Oswald] rounded-xl flex items-center justify-center max-w-[670px] mx-[28px] mt-12 gap-3'>
            <AnimatePresence>
              {showResetBtn &&
                <motion.button
                  transition={{ ease: 'linear' }}
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
              <motion.div
                key='searchInput-modal'
                transition={{ ease: 'linear' }}
                layoutId='searchInput'
                className='relative w-full rounded-xl bg-melony-clay 
                focus-within:shadow-[0_0_5px_#000] hover:shadow-[0_0_5px_#000] transition 
                duration-300'
              >
                <motion.input
                  transition={{ ease: 'linear' }}
                  className={`pl-8 font-["Roboto_Condensed"] relative z-[1] bg-transparent border-none text-gray-400 
                  text-left sm:text-center placeholder:text-center placeholder:text-sandy-brown
                  placeholder:text-opacity-50 h-[52px] text-[15px] w-full focus:!outline-none focus:!shadow-none 
                  focus:!border-none [::-webkit-search-cancel-button]:none ${style.hideClear}`}
                  type='search'
                  value={searchValue}
                  onChange={handleChange}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  ref={modalInputRef}
                  placeholder={inputFocused ? '' : 'Search Something'} />
                <InputIcon
                  aria-label=''
                  className={`z-[0] ${inputFocused || searchValue.length > 0 ? '!left-3' : ''} 
                  ${style.inputIcon} transition-all duration-500`} />
              </motion.div>
            </AnimatePresence>
            <motion.button
              data-search-filters-toggle
              aria-label='Search Filters'
              className={`${style.searchFilter} w-5 h-6`}
              onClick={() => dispatch(toggleSearchFilters())}
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