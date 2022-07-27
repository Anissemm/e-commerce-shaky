import React, { createElement, HTMLAttributes, PropsWithChildren } from 'react'

export type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6

interface HeadingProps extends PropsWithChildren, HTMLAttributes<HTMLHeadingElement> {
    level?: HeadingLevels
    className?: string
}
const Heading: React.FC<HeadingProps> = ({ children, className, level = 1, ...props }) => {
        return createElement(`h${level}`, {
            ...props,
            className: `inline-block my-6 relative text-ebony-clay px-4 py-[10px] leading-none bg-sandy-brown uppercase font-[Oswald] text-[24px] 
              font-medium before:bg-sandy-brown before:absolute before:top-0 before:-left-[9999px] before:h-full before:bottom-0 before:right-full ${className}`
            }, children) 
}

export default Heading