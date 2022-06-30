import React from 'react'
import { usePageSetTitle } from '../hooks/usePageSet'

const Dashboard = () => {
  usePageSetTitle('Dashboard', false)
  
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard