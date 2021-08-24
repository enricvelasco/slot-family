import React, {useEffect, useState} from 'react'
import Link from "next/link";
import Image from "next/image";
import {getChampionshipTypes} from "../../firebase/data/championship-types";

const ChampionshipTypes = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState(null)

  useEffect(() => {
    getChampionshipTypes()
      .then(res => {
        setList(res)
      })
      .catch(err => console.log('ERROR_ON_GET_CHAMPIONSHIP_TYPES', err))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div>
      <h2>Tipos de Campeonato LIST</h2>
      <Link href='/championship-types/new'><button>NEW</button></Link>
      {isLoading && <div>Loading list...</div>}
      {!isLoading &&
      <>
        {list && list.map(( item, key ) => {
          return (
            <div key={key}>
              <Link href={`/championship-types/${item.id}`}>{item.name}</Link>
              {item.imageUrl && <Image src={item.imageUrl} alt={item.name} width={100} height={75} />}
              {/* <img src={item.imageUrl} width={100} height={75}/> */}
            </div>
          )
        })}
      </>}
      <Link href='/home'><button>Go Home</button></Link>
    </div>
  )
}

export default ChampionshipTypes
