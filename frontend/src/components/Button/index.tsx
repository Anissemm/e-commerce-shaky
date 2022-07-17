import React, { Children, forwardRef, PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends PropsWithChildren {
    [key: string]: any
    type: 'button' | 'submit'
    variant: 'outlined' | 'standart'
    color: 'blue' | 'yellow' | 'softBlue'
}
const colorMatch: { [key: string]: string } = {
    yellow: 'sandy-brown',
    blue: 'ebony-clay',
    softBlue: 'melony-clay',
    softBlueHex: '#2C3540',
    yellowHex: '#F2AA4C',
    blueHex: '#222831',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ type, variant, className, color = 'yellow', children, ...props }, ref) => {
    return (
        <motion.button
            type={type}
            style={{
                backgroundColor: variant === 'outlined' ? 'transparent' : colorMatch[`${color}Hex`],
                borderColor: colorMatch[`${color}Hex`],
                borderWidth: variant === 'outlined' ? '4px' : '0',
                color: variant === 'outlined' ? colorMatch[`${color}Hex`] :  
                `${color === 'yellow' ?  '#222831' : color === 'blue' || color === 'softBlue' ? '#F2AA4C' : ''}`
            }}
            ref={ref}
            className={`rounded-full font-[Oswald] text-[18px] font-medium
        py-3  hover:bg-opacity-80 hover:shadow-[0_0_5px_#000] transition duration-300 w-full 
        first-letter:flex items-center justify-center uppercase ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    )
})

export default Button