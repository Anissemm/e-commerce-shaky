import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { useResizeObserver } from '../../hooks/useResizeObserver'
import { getScreenBreakpoint, useAppDispatch, useAppSelector } from '../../store'
import Button from '../Button'


interface CardGridProps extends PropsWithChildren {
    items?: { [key: string]: string }[]
}

const CardGrid: React.FC<CardGridProps> = ({ items }) => {
    const [setResizeRef, gridCardWrapperDimensions] = useResizeObserver()
    const screenBreakpoint = useAppSelector(getScreenBreakpoint)
    const [wrapperDimensions, setWrapperDimensions] = useState<any>(null)
    const target = useRef<HTMLLIElement | null>(null)

    useEffect(() => {
        if (gridCardWrapperDimensions?.borderBoxSize) {
            setWrapperDimensions(gridCardWrapperDimensions.borderBoxSize[0])
        }
    }, [gridCardWrapperDimensions])

    return (
        <div className='pt-6'>
            <ul>
                {items?.map((item: any, i) => {
                    const align = i === 0 || i % 2 === 0 ? 'even' : 'odd'

                    return (

                        <li
                            ref={ref => {
                                target.current = ref
                                if (typeof setResizeRef === 'function') {
                                    setResizeRef(ref)
                                }
                            }}
                            data-key={item.heading}
                            key={item.heading}>
                            <div className={`flex items-center justify-center min-h-[150px] max-h-[500px] md:max-h-[390px] overflow-hidden ${align === 'odd' ? 'flex-row-reverse bg-ebony-clay' : 'bg-sandy-brown'}`}>
                                <div
                                    style={{ height: wrapperDimensions?.inlineSize < 600 ? wrapperDimensions?.blockSize : 'auto' }}
                                    className={`flex-grow-1 relative max-w-[240px] sxs:max-w-[280px] sm:!max-w-[500px] md:max-h-[390px]`}>
                                    <img src={item.image} className='w-full h-full object-cover' />
                                    <div className={`absolute !bottom-3 sm:!bottom-8 flex items-center justify-${align === 'odd' ? 'end' : 'start'} w-full`}>
                                        {item.btnText &&
                                            <Button
                                                as='Link'
                                                to='/placeholder'
                                                inline={true}
                                                className='!text-[16px] xs:!text-[18px] md:!text-[25px] mx-1.5 sxs:mx-2 xs:ms-3 md:mx-4 py-2 px-5' color={align === 'odd' ? 'blue' : 'yellow'}>{item.btnText}</Button>}                                    </div>
                                </div>
                                <div className={`flex-grow-1 w-full h-full font-[Oswald] px-2 xs:px-6 ${align === 'odd' ? 'text-sandy-brown' : 'text-ebony-clay'}`}>
                                    <h3 className='text-[28px] xs:text-[32px] md:text-[42px] leading-7 pb-1'>{item.heading}</h3>
                                    <p className='text-[16px] xs:text-[20px] md:text-[24px] '>{item.content}</p>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default CardGrid