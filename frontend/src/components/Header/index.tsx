import { useEffect, useState } from 'react'
import { useMenuResponsive } from '../../hooks/useMenuResponsive'
import { getHeaderZIndex, useAppSelector } from '../../store'
import { getCurrentPageTitle } from '../../store/slices/pageSlice'
import Heading from '../Heading'
import TextHeaderBanner from '../TextBanner'
import HeaderToolbar from './HeaderToolbar'
import Menu from './Menu'

const Header = () => {
    const [setTargetRef] = useMenuResponsive()
    const pageTitle = useAppSelector(getCurrentPageTitle)
    const [textBannerPlacement, setTextBannerPlacement] = useState('')
    const textBanner = <TextHeaderBanner link='https://www.google.com' target='_blank' external>Buy More Save More - Save 10% On Orders Over $50, 15% On Orders Over $75 and 25% On Orders Over $100  With Code SHAKY *Not valid in combination with other promotion or Bundles</TextHeaderBanner>

    return (
        <header className={`sticky w-full z-[49] top-0`}
            ref={ref => {
                if (typeof setTargetRef === 'function') {
                    setTargetRef(ref)
                }
            }}
        >
            {pageTitle.mount && <Heading level={1} className={`${pageTitle.show ? '' : '!sr-only'}`}>{pageTitle.value}</Heading>}
            {textBannerPlacement === 'top' && textBanner}
            <HeaderToolbar />
            <Menu />
            {textBannerPlacement === 'bottom'|| true && textBanner}
        </header>
    )
}

export default Header
