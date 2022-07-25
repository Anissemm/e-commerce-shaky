import React, { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

interface TextHeaderBanner extends PropsWithChildren {
    textSize?: number
    bgColor?: string
    link?: string
    external?: boolean
    target?: '_blank'
}

const TextHeaderBanner: React.FC<TextHeaderBanner> = ({ children, textSize = 18, bgColor = 'bg-fiorid', link, external, target }) => {

    const content = link && !external ? <Link className='hover:text-sandy-brown transition-all duration-300' to={link}>{children}</Link> : 
    link && external ? <a target={target} rel={target ? 'noreferrer noopener nofollow' : ''} className='hover:text-sandy-brown transition-all duration-300' href={link as string}>{children}</a> : children 

    return (
        <div role='banner' className={`${bgColor} font-[Roboto] py-4 w-full shadow-[0_0_5px_#000]`}>
            <div className={`max-w-[1440px] w-full mx-auto text-[${textSize}px] leading-5 text-center text-white`}>
                {content}
            </div>
        </div>
    )
}

export default TextHeaderBanner