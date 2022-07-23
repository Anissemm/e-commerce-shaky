import React, { HTMLAttributes, PropsWithChildren } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import style from './checkbox.module.css'
import { ReactComponent as Tick } from '../../assets/svg/icons/tick_icon.svg'

const variants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}

interface Checkbox extends HTMLAttributes<HTMLInputElement> {
    checked?: boolean
    alignLabelTo?: 'left' | 'right'
    justify?: 'start' | 'center' | 'end' | 'between'
    label?: string
    id: string
    name: string
    className?: string
    onChange?: (e: any) => void
}

const Checkbox: React.FC<Checkbox> = ({ checked = false, justify = 'start', className = '', alignLabelTo = 'right', id = '', label, name = '', onChange, ...props }) => {
    const labelElem = <label
        className={`${checked ? 'text-sandy-brown' : ''} hover:text-sandy-brown 
                        hover:text-opacity-80 transition duration-150 cursor-pointer`}
        htmlFor={id}
    >
        {label}
    </label>

    return (
        <AnimatePresence>
            <motion.div
                variants={variants}
                initial='hidden'
                animate='visible'
                exit='hidden'
                className={`flex items-center justify-${justify} mb-1 ${className}`}>
                {alignLabelTo === 'left' && labelElem}
                <div className={`relative h-6 w-6 hover:shadow-xl ${alignLabelTo === 'left' ? 'ml-2' : 'mr-2'}`}>
                    <input
                        id={id}
                        type='checkbox'
                        className={`${style.checkboxHover} opacity-0 h-6 w-6 absolute z-[6] cursor-pointer`}
                        name={name}
                        checked={checked}
                        onChange={(e: any) => {
                            if (typeof onChange === 'function') {
                                onChange(e)
                            }
                        }}
                        {...props} />
                    <div className='absolute flex items-center justify-center z-[3] top-0 left-0 w-full h-full bg-raven p-[1px]'>
                        <div className='relative z-[2] w-full h-full border-fiorid border-4 border-solid' />
                        <Tick
                            className='absolute top-1/2 left-1/2 z-[4] w-4 h-4 transition duration-150'
                            style={{ opacity: checked ? 1 : 0 }} />
                    </div>
                </div>
                {alignLabelTo === 'right' && labelElem}
            </motion.div>
        </AnimatePresence>
    )
}

export default Checkbox