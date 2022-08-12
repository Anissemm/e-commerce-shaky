import React, { Children, forwardRef, PropsWithChildren, RefAttributes, ReactElement, JSXElementConstructor, useState, cloneElement, useRef } from 'react'
import { ReactComponent as Chevron } from '../../assets/svg/icons/arrow_left_icon.svg'
import Anchor from '../Anchor'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'

interface TabsProps extends PropsWithChildren {
    type?: 'sliding'
    keepOpen?: boolean
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(({ children, keepOpen = false, type = 'sliding' }, ref) => {

    const [shown, setShown] = useState<string[]>([])
    const arrayChildren = Children.toArray(children)

    const handleTabClick = (e: any) => {
        const clicked = e.currentTarget?.dataset.tabKey

        if (shown.includes(clicked)) {
            setShown(prev => {
                return prev.filter(item => item !== clicked)
            })
        } else {
            setShown(prev => {
                if (keepOpen) {
                    return [...prev, clicked]
                }

                return [clicked]
            })
        }
    }

    return (
        <div ref={ref} >
            <ul role='tablist' className='relative'>
                {arrayChildren.map((item: any, i) => {
                    return (
                        <li key={`${item.props.text}-${i}`} className='relative'>
                            {cloneElement(item, {
                                tabKey: `${item.props.text}-${i}`,
                                show: shown.includes(`${item.props.text}-${i}`),
                                onClick: handleTabClick
                            })}
                        </li>
                    )
                })}
            </ul>
        </div >)
})

interface TabProps extends PropsWithChildren, RefAttributes<HTMLDivElement> {
    to?: string
    show?: boolean
    tabKey?: string
    text: string
    className?: string
    onClick?: (e: any) => void
}

const Tab: React.FC<TabProps> = ({ to, show = false, tabKey, text, onClick, children, className, ...props }) => {
    const tabPanelRef = useRef<null | HTMLDivElement>(null)

    return (
        <div className={`font-[Oswald] ${className}`} {...props}>
            {to ?
                <Anchor
                    data-tab-key={tabKey}
                    className='text-sandy-brown font-bold font-[18px] uppercase pr-2 flex items-center justify-between'
                    to='/help'
                    role='tab'
                    onClick={(e: any) => {
                        if (typeof onClick === 'function') {
                            onClick(e)
                        }
                        e.preventDefault()
                    }} >
                    <span>{text}</span>
                    <Chevron className={`transition-all duration-300 ${show ? 'rotate-90' : '-rotate-90'} h-[18px]`} />
                </Anchor> :
                <button
                    data-tab-key={tabKey}
                    onClick={onClick}
                    className='text-sandy-brown font-[18px] font-bold w-full uppercase pr-2 flex items-center justify-between'
                    role='tab'
                >
                    <span>{text}</span>
                    <Chevron className={`transition-all duration-300 ${show ? 'rotate-90' : '-rotate-90'} h-[18px]`} />
                </button>}

            <div
                style={{
                    height: show ? tabPanelRef.current?.scrollHeight : 0,
                    transitionProperty: 'height'
                }}
                className={`duration-[500ms] overflow-hidden`}
                role='tabpanel'>
                <div ref={tabPanelRef} >
                    {children}
                </div>
            </div>
        </div>
    )
}


// const TabPanel: React.FC<PropsWithChildren & RefAttributes<HTMLDivElement>> = ({ children, ...props }) => {
//     return (
//         <div role='tabpanel' {...props}>
//             {children}
//         </div>
//     )
// }

export { Tab }

export default Tabs