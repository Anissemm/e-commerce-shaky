import React from 'react'
import { Outlet } from 'react-router-dom'
import { usePageSetTitle } from '../hooks/usePageSet'

const Dashboard = () => {
  return (
    <Outlet />
  )
}

export default Dashboard