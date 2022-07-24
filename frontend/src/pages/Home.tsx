import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HomeHeadBanner from '../components/HomeHeadBanner'
import { usePageSetTitle } from '../hooks/usePageSet'

const Home = () => {
  usePageSetTitle('Home', false)
  const location = useLocation()
  
  useEffect(() => {
    console.log(location)
  }, [location])

  return (
    <HomeHeadBanner />
  )
}

export default Home