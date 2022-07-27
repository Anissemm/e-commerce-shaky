import React, { createElement, forwardRef, ForwardRefExoticComponent, PropsWithChildren, RefAttributes } from 'react'
import { motion } from 'framer-motion'
import { Link, LinkProps } from 'react-router-dom'

interface ButtonProps extends PropsWithChildren, RefAttributes<HTMLButtonElement | HTMLAnchorElement | LinkProps & HTMLAnchorElement> {
    [key: string]: any
    type: 'button' | 'submit'
    variant: 'outlined' | 'standart'
    color: 'blue' | 'yellow' | 'softBlue'
    inline?: boolean
    as?: 'button' | 'a' | 'Link'
}

const colorMatch: { [key: string]: string } = {
    yellow: 'sandy-brown',
    blue: 'ebony-clay',
    softBlue: 'melony-clay',
    softBlueHex: '#2C3540',
    yellowHex: '#F2AA4C',
    blueHex: '#222831',
}

type CustomButton = HTMLButtonElement | HTMLAnchorElement | ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>

const Button = forwardRef<CustomButton, ButtonProps>(({ as = 'button', inline = false, variant, className, color = 'yellow', children, ...props }, ref) => {
    
    const properties: any = {
        ref,
        style: {
            backgroundColor: variant === 'outlined' ? 'transparent' : colorMatch[`${color}Hex`],
            borderColor: colorMatch[`${color}Hex`],
            borderWidth: variant === 'outlined' ? '4px' : '0',
            color: variant === 'outlined' ? colorMatch[`${color}Hex`] :
                `${color === 'yellow' ? '#222831' : color === 'blue' || color === 'softBlue' ? '#F2AA4C' : ''}`
        },
        className: `rounded-full font-[Oswald] text-[18px] font-medium cursor-pointer
        py-3  hover:bg-opacity-80 hover:shadow-[0_0_5px_#000] transition duration-300 
        uppercase ${inline ? 'inline-block px-8' : 'w-full'} ${className}`,
        ...props
    }

    if (as === 'Link') {
        return <Link {...properties as LinkProps & RefAttributes<HTMLAnchorElement>}>
            {children}
        </Link>
    }

    return createElement(as, {...properties}, children)
})

export default Button