import React, { HTMLAttributes, PropsWithChildren } from 'react'
import SocialLinks from './SocialLinks'
import FooterMenu from './FooterMenu'

import NewsLetter from './NewsLetter'
import PaymentMethods from './PaymentMethods'
import Copyright from './Copyright'
import AdditionalInfo from './AdditionalInfo'
import FooterEmail from './FooterEmail'

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
    className: string
}


const Footer: React.FC<PropsWithChildren<FooterProps>> = ({ className, ...props }) => {

    return (
        <footer className={`mt-auto ${className}`} {...props} >
            <div className='bg-ebony-clay'>
                <div className='pt-14 bg-ebony-clay px-6 max-w-[1440px] mx-auto' >
                    <div className='flex items-start justify-start md:justify-between flex-wrap flex-col md:flex-row'>
                        <div className='md:order-3 mb-11'><NewsLetter /></div>
                        <div className='md:order-1 md:mr-10 md:flex-grow mb-4'><FooterMenu /></div>
                        <div className='md:order-2 md:ml-0 md:mr-10 pb-5'><SocialLinks /></div>
                    </div>
                    <FooterEmail />
                </div>
                <PaymentMethods />
                <Copyright />
                <AdditionalInfo />
            </div>
        </footer>
    )
}

export default Footer