import { motion } from 'framer-motion'
import React from 'react'
import { useLocation } from 'react-router-dom'

const Recommended = () => {
    const location = useLocation()
    const recomendedList: any[] = ['Whey Protein', 'Creatine', 'ZMA', 'L-Carnitine', 'Vitamine Complex', 'Gainer', 'Shaker']
    if (!recomendedList || recomendedList.length === 0) return null

    return (
        <motion.section className='px-[28px] max-w-[670px]'>
            <motion.header className='font-[Oswald] mt-3 mb-1 flex items-center justify-between font-normal uppercase text-[14px]'>
                <motion.h4 className='text-raven text-opacity-70'>Recommended</motion.h4>
            </motion.header>
            <motion.div className='flex gap-2 flex-wrap'>
                {recomendedList.map(item => {
                    return (
                        <motion.button
                            key={item}
                            type="button"
                            className='py-1 px-3 font-["Roboto_Condensed"] hover:bg-opacity-50 focus:bg-opacity-50 transition
                            duration-300ms text-xs bg-melony-clay rounded-md text-sandy-brown'>
                            {item}
                        </motion.button>
                    )
                })}
            </motion.div>
        </motion.section>
    )
}

export default Recommended