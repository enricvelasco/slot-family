import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from "next/image";
import {getCars} from "../../firebase/data/cars";

const Cars = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [carsList, setCarsList] = useState(null)

  useEffect(() => {
    getCars()
      .then(list => {
        setCarsList(list)
      })
      .catch(err => {
        console.log('ERROR_ON_GET_CARS', err)
      })
      .finally(() => setIsLoading(false))
  })

  return (
    <div>
      <h2>CARS_LIST</h2>
      <Link href='/cars/new'>INSERTAR_COCHE</Link>
      {/* <button onClick={dataCarsGenerator}>Generar coches</button> */}
      <br />
      {isLoading && <div>Loading list...</div>}
      {!isLoading &&
      <>
        {carsList && carsList.map(item => {
          const carTitle = `${item.make} - ${item.model} - ${item.year}`
          return (
            <div key={item.id}>
              <div><Link href={`/cars/${item.id}`} key={item.id}>{carTitle}</Link></div>
              {item.imgUrl && <Image src={item.imgUrl} alt={item.model} width={100} height={75} />}
            </div>
          )
        })}
      </>}
      <Link href='/home'><button>Go Home</button></Link>
    </div>
  )
}

export default Cars
