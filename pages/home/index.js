import React from 'react'
import Link from 'next/link'

const Home = () => (
  <div>
    <div>HOME</div>
    <ul>
      <li><Link href='/cars'>GO_TO_CARS_LIST</Link></li>
      <li><Link href='/sponsors'>GO_TO_SPONSORS_LIST</Link></li>
    </ul>
  </div>
)

export default Home
