import React from 'react'
import HomeHeadBanner from '../components/HomeHeadBanner'
import { usePageSetTitle } from '../hooks/usePageSet'

const Home = () => {
  usePageSetTitle('Home', false)

  return (
    <HomeHeadBanner />
  )
}

export default Home