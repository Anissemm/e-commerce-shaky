import { useParams } from 'react-router-dom'

const MockProtected = () => {
  const { params } = useParams()

  return (
    <div>MockProtected</div>
  )
}

export default MockProtected