import React from 'react'
import { Link } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { ReactComponent as Arrow } from '../../assets/svg/icons/arrow_left_icon.svg'

const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs()
    return (
        <ul role='navigation' aria-label='breadcrumbs' className='flex items-center justify-start px-6'>
            {breadcrumbs.map((item, ind) => {
                const last = ind === breadcrumbs.length - 1
                return (
                    <li key={item.key} className='flex items-center justify-center'>
                        <Link
                            className={`font-[Oswald] mr-2 text-raven font-medium text-base uppercase 
                        ${last ? 'underline decoration-sandy-brown' : ''}`}
                            to={item.match.pathname}
                            style={{ pointerEvents: last ? 'none' : undefined }}
                            aria-disabled={last}
                            aria-current={last ? 'page' : false}
                        >
                            {item.breadcrumb}
                        </Link>
                        {!last ? <Arrow className='h-3 rotate-180 mr-2' /> : null}
                    </li>
                )
            })}
        </ul>
    )
}

export default Breadcrumbs