import { useState } from 'react'
import Modal from '../Modal'
import ModalBody from '../Modal/ModalBody'
import ModalHeader from '../Modal/ModalHeader'
import { AnimatePresence, motion } from 'framer-motion'
import style from './Search.module.css'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css/core'
import '@splidejs/react-splide/css'
import creatine from '../../assets/tempImg/Creatine_no-back.png'
import LatestResults from './LatestResults'
import Recommended from './Recommended'
import SearchResults from './SearchResults'



const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [showResetBtn, setShowResetBtn] = useState<boolean>(false)
  const [showSearchFilter, setShowSearchFilter] = useState<boolean>(false)

  const results = true /* Hard code */

  return (
    <Modal>
      <ModalHeader title='Modal Title' />
      <ModalBody>
        <motion.section
          layout
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
          <motion.div layout className='w-full rounded-xl bg-melony-clay'>
            <motion.input
              className='bg-transparent border-none text-center placeholder:text-sandy-brown placeholder:text-opacity-50 
            h-[52px] text-[15px] w-full'
              type='search'
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value)
                if (e.target.value.length > 0) {
                  setShowResetBtn(true)
                } else {
                  setShowResetBtn(false)
                }
              }}
              placeholder='Search Something' />
          </motion.div>
          <motion.button
            aria-label='Search Filters'
            className={`${style.searchFilter} w-5 h-6`}
            onClick={() => setShowSearchFilter(prev => !prev)}
          />
        </motion.section>
        {results ? <SearchResults /> :
          <motion.section>
            <LatestResults />
            <Recommended />
          </motion.section>}
      </ModalBody>
    </Modal >
  )
}

export default Search