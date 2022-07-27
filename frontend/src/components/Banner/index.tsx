import React, { PropsWithChildren } from 'react'
import Button from '../Button'

interface BannerProps extends PropsWithChildren {
    alignBtn?: string
    backgroundImgSize?: 'cover' | 'contain'
    backgroundImgPosition?: 'top' | 'right' | 'left' | 'bottom' | 'center'
    backdropBlur?: boolean
}

const Banner: React.FC<BannerProps> = ({ alignBtn, backgroundImgSize = 'cover', backgroundImgPosition = 'center', backdropBlur = false }) => {
    return (
        <div
            style={{
                background: `url(./banner-placeholder.jpg)`,
                backgroundSize: backgroundImgSize,
                backgroundPosition: backgroundImgPosition
            }}
            className='w-full min-h-[430px] relative flex flex-col items-center justify-center'>
            {backdropBlur && <div className='absolute w-full h-full left-0 top-0 z-[0] [@supports_(backdrop-filter:blur(1px))]:backdrop-blur-md'></div>}
            <header className='self-start relative z-[1]'>
                <h3
                    style={{
                        textShadow: '2px 2px 0 #757C86'
                    }}
                    className='font-[Oswald] text-ebony-clay text-[36px] md:text-[48px] font-bold xl:text-[52px] py-4 px-6  md:py-5 md:px-8 xl:py-6 xl:px-10 italic uppercase
                    bg-sandy-brown inline-block'>Members get More.</h3>
            </header>
            <p
                style={{
                    textShadow: '0 0 5px #000'
                }}
                className='mb-auto mt-10 px-16 font-[Oswald] w-full relative z-[1] text-[24px] sm:text-[28px] lg:text-[32px] flex items-center justify-center text-center text-sandy-brown'>
                Shop now and pay later, collect points on every purchase and
                enjoy exclusive discounts, rewards and events. Join now and get 10% off your next purchase!
            </p>
            <div className={`flex relative z-[1] items-center mt-6 justify-${alignBtn ? alignBtn : 'end'} w-full pb-10 px-16`}>
                <Button inline={true} className='px-11 py-3 text-[24px] xs:[28px] lg:text-[32px] xl:text-[38px]'>Join Now!</Button>
            </div>
        </div >
    )
}

export default Banner