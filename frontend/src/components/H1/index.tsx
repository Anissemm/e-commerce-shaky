import React, { PropsWithChildren } from 'react'

const H1: React.FC<PropsWithChildren> = ({ children }) => {
    return <h1 className='inline-block my-6 relative text-ebony-clay px-4 py-[10px] leading-none bg-sandy-brown uppercase font-[Oswald] text-[24px] 
  font-medium before:bg-sandy-brown before:absolute before:top-0 before:-left-[9999px] before:h-full before:bottom-0 before:right-full'>
        {children}
    </h1>
}

export default H1