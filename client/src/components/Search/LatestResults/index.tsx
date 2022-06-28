import React from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css/core'
import '@splidejs/react-splide/css'
import creatine from '../../../assets/tempImg/Creatine_no-back.png'
import './LatestResults.css'

const LatestResultsVariants: Variants =  {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    }
}

const LatestResults = () => {
    const latestResultsList: any[] = [11, 12, 'fsadlkhfasjklfjasdl;kjflkadsjlkfsdajlk', 14]
    if (latestResultsList.length === 0 || !latestResultsList) return null

    return (
        <motion.div variants={LatestResultsVariants} initial='hidden' animate='visible' exit='hidden' className='recentlyViewed max-w-[670px]'>
            <motion.header className='font-[Oswald] mx-[28px] mt-3 mb-1 flex items-center justify-between font-normal uppercase text-[14px]'>
                <motion.h4 className='text-raven text-opacity-70'>Recently viewed</motion.h4>
                <motion.button className='uppercase text-sandy-brown text-opacity-70 hover:text-opacity-100 focus:text-opacity-100 transition duration-300'>Clear</motion.button>
            </motion.header>
            <Splide className='mx-[28px]' options={{ autoWidth: true, rewind: true, autoplay: true, focus: 'center' }}>
                {latestResultsList.map(item => {
                    return (
                        <SplideSlide key={item}>
                            <div className='font-["Roboto_Condensed"] min-w-[170px] max-w-[210px] h-[53px] flex items-center 
                            bg-melony-clay p-2 mx-1 rounded-md hover:bg-opacity-50 focus:bg-opacity-50 transition 
                            duration-300 cursor-pointer hover:shadow-md focus:shadow-md'>
                                <div className='!w-[50px] !h-[50px] max-h-[50px] flex items-center'>
                                    <img src={creatine} className='object-contain object-center' alt='creatine' />
                                </div>
                                <div className='flex flex-col items-start justify-center gap-1'>
                                    <span className='text-[11px] text-sandy-brown max-w-[128px] truncate'>Creatine Monohydrate{item}</span>
                                    <span>$9.90</span>
                                </div>
                            </div>
                        </SplideSlide>
                    )
                })}
            </Splide>
        </motion.div>
    )
}

export default LatestResults