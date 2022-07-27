import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import bannerFullHd from '../../assets/tempImg/Banner-image.png'
import bannerRetina from '../../assets/tempImg/Banner-image@2x.png'
import BannerSm from '../../assets/tempImg/Banner-image@sm.png'
import '@splidejs/react-splide/css'
import { Link } from 'react-router-dom'
import './HomeHeaderBanner.css'
import Chevron from '../../assets/svg/icons/arrow_cross_animated';
import { getScreenBreakpoint, useAppSelector } from '../../store'

interface BannerItem {
  url?: string
  title?: {
    value: string,
    level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  },
  content: {
    value: string
  }
}

interface BannerData {
  type: 'static' | 'video' | 'carousel',
  items: BannerItem[]
}

const data: BannerData = {
  type: 'static',
  items: [
    {
      url: 'https://www.google.com',
      title: {
        value: 'Hello Shaky',
        level: 'h2'
      },
      content: {
        value: '<p>This is a banner</p>'
      }
    }
  ]
}

const bannerOpts = {
  type: 'loop',
  rewind: true,
  role: undefined,
  autoplay: true,
  interval: 7000,
  pauseOnHover: true,
  autoHeight: true,
  autoWidth: true
}

const HomeHeadBanner = () => {
  const type = data?.type
  const items = data?.items
  const screenBreakpoint = useAppSelector(getScreenBreakpoint)

  const bannerData = ['banner1', 'banner2', 'banner3', 'banner4']

  return (
    <>
      {type === 'static' &&
        <section
          role='banner'
          className='headerBanner relative'>
          <Splide hasTrack={false} options={bannerOpts} aria-label='Carousel banner'>
            <SplideTrack>
              {bannerData?.map((banner: any) => {
                return <SplideSlide key={banner}>
                  <Link to={`/products/${banner}`}>
                    <div 
                      className={`relative w-screen max-h-[650px] md:max-h-[510px] [@supports_not_((object-fit:cover)_or_(aspect-ratio:1))]:before:absolute 
                      before:block before:left-0 before:top-0 before:w-full before:h-0 aspect-[384/325] md:aspect-[64/17] [@supports_not_((object-fit:cover)_or_(aspect-ratio:1))]:before:pb-[calc(100%*325/384)]
                      [@supports_not_((object-fit:cover)_or_(aspect-ratio:1))]:md:before:pb-[calc(100%*17/64)]`}>
                      <picture>
                        <source srcSet={bannerRetina} media="(min-width: 1920px)" />
                        <source srcSet={bannerFullHd} media="(min-width: 768px)" />
                        <img className='object-cover h-auto w-full' src={BannerSm} alt='banner' />
                      </picture>
                    </div>
                  </Link>
                </SplideSlide>
              })}
            </SplideTrack>
            <div className="splide__arrows">
              <button className="splide__arrow splide__arrow--prev flex items-center justify-center w-10 h-10 bg-transparent">
                <Chevron className='!scale-none !h-12 !w-12' />
                <span className='opacity-0 absolute'>Prev</span>
              </button>
              <button className="splide__arrow splide__arrow--next flex items-center justify-center w-10 h-10 bg-transparent ">
                <Chevron className='rotate-180 !h-12 !w-12' />
                <span className='opacity-0 absolute'>Next</span>
              </button>
            </div>
          </Splide>
        </section>
      }
    </>
  )
}

export default HomeHeadBanner