import React, { RefAttributes, PropsWithChildren } from 'react'
import { Link, LinkProps } from 'react-router-dom'

type LinkPropsType = LinkProps & RefAttributes<HTMLAnchorElement>

interface AnchorProps extends PropsWithChildren, LinkPropsType {
    to: string
}

const Anchor: React.FC<AnchorProps> = ({ to, children, ...props }) => {

    if (to.startsWith('http://') || to.startsWith('https://')) {
        return <a href={to} {...props as RefAttributes<HTMLAnchorElement>}>{children}</a>
    }

    return <Link to={to} {...props}>{children}</Link>
}

export default Anchor