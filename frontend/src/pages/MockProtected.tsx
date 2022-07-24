import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

const MockProtected = () => {
  const { params } = useParams()
  console.log(params)
  return (
    <div>MockProtected</div>
  )
}

export default MockProtected