import React, {useEffect, useState} from 'react'
import Link from "next/link";
import Image from "next/image";
import {getManufacturers} from "../../firebase/data/manufacturers";

const Manufacturers = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState(null)

  useEffect(() => {
    getManufacturers()
      .then(res => {
        setList(res)
      })
      .catch(err => console.log('ERROR_ON_GET_MANUFACTURERS', err))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div>
      <h2>Fabricantes LIST</h2>
      <Link href={'/manufacturers/new'}><button>NEW</button></Link>
      {isLoading && <div>Loading list...</div>}
      {!isLoading &&
      <>
        {list && list.map(( item, key ) => {
          return (
            <div key={key}>
              <Link href={`/manufacturers/${item.id}`}>{item.name}</Link>
              {item.imageUrl && <Image src={item.imageUrl} alt={item.name} width={100} height={75} />}
            </div>
          )
        })}
      </>}
      <Link href={'/home'}><button>Go Home</button></Link>
    </div>
  )
}

export default Manufacturers
