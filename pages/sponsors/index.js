import React, { useState, useEffect } from 'react'
import Link from "next/link";
import {getSponsors} from "../../firebase/data/sponsors";
import Image from "next/image";

const Sponsors = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState(null)

  useEffect(() => {
    getSponsors()
      .then(res => {
        setList(res)
      })
      .catch(err => console.log('ERROR_ON_GET_CARS', err))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div>
      <h2>SPONSORS_LIST</h2>
      <Link href='/sponsors/new'><button>NEW</button></Link>
      {isLoading && <div>Loading list...</div>}
      {!isLoading &&
        <>
          {list && list.map(( item, key ) => {
            return (
              <div key={key}>
                <Link href={`/sponsors/${item.id}`}>{item.name}</Link>
                {item.imageUrl && <Image src={item.imageUrl} alt={item.name} width={100} height={75} />}
                {/* <img src={item.imageUrl} width={100} height={75}/> */}
              </div>
            )
          })}
        </>
      }
      <Link href='/home'><button>Go Home</button></Link>
    </div>
  )
}

export default Sponsors
