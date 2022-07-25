import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import bannerFullHd from '../../assets/tempImg/Banner-image.png'
import bannerRetina from '../../assets/tempImg/Banner-image@2x.png'
import BannerSm from '../../assets/tempImg/Banner-image@sm.png'
import '@splidejs/react-splide/css'
import { Link } from 'react-router-dom'
import './HomeHeaderBanner.css'
import Chevron from '../../assets/svg/icons/arrow_cross_animated';

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
  pauseOnHover: true
}

const HomeHeadBanner = () => {
  const type = data?.type
  const items = data?.items

  const bannerData = ['banner1', 'banner2', 'banner3', 'banner4']

  return (
    <>
      {type === 'static' &&
        <section role='banner' style={{ maxHeight: 510 }} className='headerBanner relative w-full'>
          <Splide hasTrack={false} options={bannerOpts} aria-label='Carousel banner'>
            <SplideTrack>
              {bannerData?.map((banner: any) => {
                return <SplideSlide key={banner}>
                  <Link to={`/products/${banner}`}>
                    <picture>
                      <source srcSet={bannerRetina} media="(min-width: 1920px)" />
                      <source srcSet={bannerFullHd} media="(min-width: 768px)" />
                      <img src={BannerSm} alt='banner' />
                    </picture>
                  </Link>
                </SplideSlide>
              })}
            </SplideTrack>
            <div className="splide__arrows">
              <button className="splide__arrow splide__arrow--prev flex items-center justify-center w-10 h-10 bg-transparent">
                <Chevron className='!scale-none !h-12 !w-12'/>
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