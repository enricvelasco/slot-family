import React, {useEffect, useState} from 'react'
import Link from "next/link";
import Image from "next/image";
import {getConstructors} from "../../firebase/data/constructors";

const Constructors = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState(null)

  useEffect(() => {
    getConstructors()
      .then(res => {
        setList(res)
      })
      .catch(err => console.log('ERROR_ON_GET_CARS', err))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div>
      <h2>Constructors LIST</h2>
      <Link href='/constructors/new'><button>NEW</button></Link>
      {isLoading && <div>Loading list...</div>}
      {!isLoading &&
      <>
        {list && list.map(( item, key ) => {
          return (
            <div key={key}>
              <Link href={`/constructors/${item.id}`}>{item.name}</Link>
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

export default Constructors
