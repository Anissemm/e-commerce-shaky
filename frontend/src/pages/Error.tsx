import React from 'react'
import { usePageSetTitle } from '../hooks/usePageSet'

const Error = () => {
  usePageSetTitle('Error', false)

  return (
    <div>Error</div>
  )
}

export default Error