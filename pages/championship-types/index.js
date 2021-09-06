import React, {useEffect, useState} from 'react'
import Link from "next/link";
import Image from "next/image";
import {getChampionshipTypes} from "../../firebase/data/championship-types";
import ListView from "../../components/list-view";
import Wrapper from "../../components/wrapper";
import {sortArrayByParam} from "../../services/array";

const ChampionshipTypes = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState(null)

  useEffect(() => {
    setIsLoading(false)
    getChampionshipTypes()
      .then(res => {
        setList(res)
      })
      .catch(err => console.log('ERROR_ON_GET_CHAMPIONSHIP_TYPES', err))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <Wrapper>
      {/* <h2>Tipos de Campeonato LIST</h2>
        <Link href='/championship-types/new'><button>NEW</button></Link> */}
      {isLoading && <div>Loading list...</div>}
      {!isLoading && list && <ListView data={sortArrayByParam(list, 'order')} viewParams={['imageUrl', 'name', '']} />}

      {/*!isLoading &&
      <>
        {list && list.map(( item, key ) => {
          return (
            <div key={key}>
              <Link href={`/championship-types/${item.id}`}>{item.name}</Link>
              {item.imageUrl && <Image src={item.imageUrl} alt={item.name} width={100} height={75} />}
            </div>
          )
        })}
      </>*/}
      {/* <Link href='/home'>
        <button>Go Home</button>
      </Link> */}
    </Wrapper>
  )
}

export default ChampionshipTypes
