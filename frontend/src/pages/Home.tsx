import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import HomeHeadBanner from '../components/HomeHeadBanner'
import { usePageSetTitle } from '../hooks/usePageSet'
import HomeRow from '../components/HomeRowElement'
import { products } from '../mockData'
import { getScreenBreakpoint, useAppSelector } from '../store'
import ProductCarousel from '../components/ProductCarousel'
import Banner from '../components/Banner'
import CardGrid from '../components/CardGrid'

const Home = () => {
  usePageSetTitle('Home', false)
  const screenBreakpoint = useAppSelector(getScreenBreakpoint)
  const [itemsPerPage, setItemsPerPage] = useState(1.5)
  const location = useLocation()

  useEffect(() => {
    console.log(location)
  }, [location])

  useEffect(() => {
    if (screenBreakpoint) {
      setItemsPerPage((_prev: number) => {
        if (screenBreakpoint === 'xs') {
          return 4
        }
        return 1.5
      })
    }
    console.log(screenBreakpoint)
  }, [screenBreakpoint])

  return (
    <>
      <HomeHeadBanner />
      <main className='max-w-[1440px] mx-auto w-full'>
        <HomeRow heading={{
          level: 2,
          text: 'BEST SELLERS',
          extraBlock: <Link
            className={`relative inline-block overflow-hidden font-[Oswald] text-sandy-brown text-[24px] xs:text-[28px] text-opacity-75 mr-4
                        hover:text-opacity-100 transitionduration-300 after:bg-sandy-brown after:absolute after:block 7 after:right-full 
                        after:bottom-0 after:h-[4px] after:w-full hover:after:right-0 after:transition-all after:duration-300`}
            to='/placeholder'>
            See All
          </Link>
        }}>
          <ProductCarousel products={products} withPagination />
        </HomeRow>
        <HomeRow heading={{
          level: 2,
          text: 'New incomings',
          extraBlock: <Link
            className={`relative inline-block overflow-hidden font-[Oswald] text-sandy-brown text-[24px] xs:text-[28px] text-opacity-75 mr-4
                        hover:text-opacity-100 transitionduration-300 after:bg-sandy-brown after:absolute after:block 7 after:right-full 
                        after:bottom-0 after:h-[4px] after:w-full hover:after:right-0 after:transition-all after:duration-300`}
            to='/placeholder'>
            See All
          </Link>
        }}>
          <ProductCarousel products={products} withPagination />
        </HomeRow>
        <HomeRow role='banner'>
          <Banner backdropBlur />
        </HomeRow>
        <HomeRow
          heading={{
            text: 'Shop By Goal',
            level: 2
          }}
        >
          <CardGrid
            items={[
              {
                image: '/home-grid-placeholder-1.png',
                heading: 'IMPROVE WORKOUT',
                content: 'Increase your Endurance, Energy and Concentration',
                btnText: 'Shop Now'
              },
              {
                image: '/home-grid-placeholder-2.png',
                heading: 'WEIGHT GAIN',
                content: 'Muscle Building & Weight Gain Goals',
                btnText: 'Shop Now'
              },
              {
                image: '/home-grid-placeholder-3.png',
                heading: 'LOSE WEIGHT',
                content: 'Fat Burning and Weight Management',
                btnText: 'Shop Now'
              }
            ]} />
        </HomeRow>
      </main>
    </>
  )
}

export default Home