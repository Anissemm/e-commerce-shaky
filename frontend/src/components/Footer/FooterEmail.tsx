import {ReactComponent as AtIcon } from '../../assets/svg/icons/at_icon.svg'
 
const FooterEmail = () => {
    return (
        <div className='uppercase font-[Oswald] leading-5 font-[14px] text-sandy-brown'>
            <a className='flex md:mx-auto items-center justify-start lg:justify-center' href='mailto:info@dadagency.net'><AtIcon className='w-4 h-4 fill-sandy-brown mr-1'/> info@dadagency.net</a>
        </div>
    )
}

export default FooterEmail