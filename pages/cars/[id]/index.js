import React from 'react'
import { useRouter } from 'next/router'

const CarProfile = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      CarProfile {id}
    </div>
  )
}

export default CarProfile
