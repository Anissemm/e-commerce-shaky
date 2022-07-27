import React, { HTMLAttributes, PropsWithChildren } from 'react'
import Button from '../Button'
import Input from '../Input'

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
    className: string
}

const Footer: React.FC<PropsWithChildren<FooterProps>> = ({ className, ...props }) => {
    return (
        <footer className={`mt-auto ${className}`} {...props} >
            <div className='pt-14 bg-ebony-clay'>

                <section>
                    <div>
                        <h4>Join Our Newsletter</h4>
                        <form className='w-full'>
                            <div className='relative max-w-[313px] mx-auto'>
                                <div className='w-full'>
                                    <Input type='email' id='newsletter-email' height={58} label='Email' bgColor='bg-[#14181D]' placeholder='Jhondoe@mail.com' />
                                </div>
                                <div className={`absolute h-full right-0.5 top-0 flex items-center justify-center`}>
                                    <Button inline={true} className='font-[Oswald] rounded-[12px] font-medium uppercase px-2 py-4 text-[18px] leading-[18px]' type='submit'>Send</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>

            </div>
        </footer>
    )
}

export default Footer