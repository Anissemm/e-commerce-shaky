import React, { createElement, PropsWithChildren } from 'react'
import Heading, { HeadingLevels } from '../Heading'

interface HomeRowElement extends PropsWithChildren {
    role?: string
    heading?: {
        id?: string
        text: string
        srOnly?: boolean
        level: number
        style?: any
        extraBlock?: React.ReactNode
    },
}

const HomeRow: React.FC<HomeRowElement> = ({ role, heading, children }) => {
    return (
        <section role={role} className='py-14'>
            {heading?.text && heading?.level ?
                <header className={`flex justify-between items-center ${heading?.srOnly ? '!sr-only' : ''}`}>
                    <Heading id={heading?.id} style={heading?.style} level={heading.level as HeadingLevels}>{heading?.text}</Heading>
                    {heading?.extraBlock}
                </header>
                : null}
            <div>
                {children}
            </div>
        </section>
    )
}

export default HomeRow