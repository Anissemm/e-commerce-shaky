import React, { PropsWithChildren } from 'react'

interface FooterProps {
    className: string
}

const Footer: React.FC<PropsWithChildren<FooterProps>> = ({ className, ...props }) => {
    return (
        <footer className={`${className}`} {...props}>

        </footer>
    )
}

export default Footer