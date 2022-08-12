import { getScreenBreakpoint, useAppSelector } from '../../store'
import Anchor from '../Anchor'
import Tabs, { Tab } from '../Tabs'

const FooterMenu = () => {
    const screenBreakpoint = useAppSelector(getScreenBreakpoint)

    return (
        <section role='menu'>
            <nav className='min-w-[280px] md:min-w-none md:w-full'>
                {['xl', '2xl'].includes(screenBreakpoint) ? <div>
                    <div className='flex items-center justify-start w-full'>
                        <ul className='font-[Oswald] flex items-center justify-start w-full [@supports_(gap:40px)]:gap-10'>
                            <li className='[@supports_not_(gap:40px)]:mr-10'>
                                <Anchor to='/placeholder' className='text-sandy-brown font-bold text-[18px] uppercase' >Need Help?</Anchor>
                                <div>
                                    <ul className='text-sandy-brown px-1 text-[18px]'>
                                        <li><Anchor to='/placeholder'>Contact us</Anchor></li>
                                        <li><Anchor to='/placeholder'>Help center</Anchor></li>
                                        <li><Anchor to='/placeholder'>Returns Policy</Anchor></li>
                                        <li><Anchor to='/placeholder'>Faq</Anchor></li>
                                    </ul>
                                </div>
                            </li>
                            <li className='[@supports_not_(gap:40px)]:mr-10'>
                                <Anchor to='/placeholder' className='text-sandy-brown font-bold text-[18px] uppercase' >Orders & shipping</Anchor>
                                <div>
                                    <ul className='text-sandy-brown px-1 text-[18px]'>
                                        <li><Anchor to='/placeholder'>Contact us</Anchor></li>
                                        <li><Anchor to='/placeholder'>Help center</Anchor></li>
                                        <li><Anchor to='/placeholder'>Returns Policy</Anchor></li>
                                        <li><Anchor to='/placeholder'>Faq</Anchor></li>
                                    </ul>
                                </div>
                            </li>
                            <li className='[@supports_not_(gap:40px)]:mr-10'>
                                <Anchor to='/placeholder' className='text-sandy-brown font-bold text-[18px] uppercase' >Explore</Anchor>
                                <div>
                                    <ul className='text-sandy-brown px-1 text-[18px]'>
                                        <li><Anchor to='/placeholder'>Contact us</Anchor></li>
                                        <li><Anchor to='/placeholder'>Help center</Anchor></li>
                                        <li><Anchor to='/placeholder'>Returns Policy</Anchor></li>
                                        <li><Anchor to='/placeholder'>Faq</Anchor></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div> : <Tabs>
                    <Tab text='Need Help?' to='/placeholder' className='py-2 border-b-[1px] border-b-sandy-brown' >
                        <ul className='text-sandy-brown px-1 text-[18px]'>
                            <li><Anchor to='/placeholder'>Contact us</Anchor></li>
                            <li><Anchor to='/placeholder'>Help center</Anchor></li>
                            <li><Anchor to='/placeholder'>Returns Policy</Anchor></li>
                            <li><Anchor to='/placeholder'>Faq</Anchor></li>
                        </ul>
                    </Tab>
                    <Tab text='Orders & shipping' to='/orders_shipping' className='py-2 border-b-[1px] border-b-sandy-brown' >
                        <ul className='text-sandy-brown px-1 text-[18px]'>
                            <li><Anchor to='/placeholder'>Contact us</Anchor></li>
                            <li><Anchor to='/placeholder'>Help center</Anchor></li>
                            <li><Anchor to='/placeholder'>Returns Policy</Anchor></li>
                            <li><Anchor to='/placeholder'>Faq</Anchor></li>
                        </ul>
                    </Tab>
                    <Tab text='Explore' to='/explore' className='py-2 border-b-[1px] border-b-sandy-brown' >
                        <ul className='text-sandy-brown px-1 text-[18px]'>
                            <li><Anchor to='/placeholder'>Contact us</Anchor></li>
                            <li><Anchor to='/placeholder'>Help center</Anchor></li>
                            <li><Anchor to='/placeholder'>Returns Policy</Anchor></li>
                            <li><Anchor to='/placeholder'>Faq</Anchor></li>
                        </ul>
                    </Tab>
                </Tabs>}
            </nav >
        </section >
    )
}

export default FooterMenu