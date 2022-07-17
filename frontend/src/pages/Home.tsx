import React from 'react'
import { usePageSetTitle } from '../hooks/usePageSet'

const Home = () => {
  usePageSetTitle('Home', false)

  return (
    <div>Home</div>
  )
}

export default Home