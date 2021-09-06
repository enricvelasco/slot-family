import React, { useEffect, useState } from 'react'
import {getCars} from "../../firebase/data/cars";
import ListView from "../../components/list-view";
import Wrapper from "../../components/wrapper";
import {sortArrayByParam} from "../../services/array";
import TableListView from "../../components/table-list-view";

const Cars = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState(null)

  useEffect(() => {
    getCars()
      .then(listRes => {
        setList(listRes.map(item => ({...item, carouselName: `${item.constructor.name} - ${item.model} (${item.manufacturer.name})`})))
      })
      .catch(err => {
        console.log('ERROR_ON_GET_CARS', err)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <Wrapper>
      {isLoading && <div>Loading list...</div>}
      {!isLoading && list && <ListView data={sortArrayByParam(list, 'carouselName')} viewParams={['imageUrl', 'carouselName', 'year']} />}
      {/* !isLoading &&
        <TableListView
          list={sortArrayByParam(list, 'carouselName')}
          params={['imageUrl', 'carouselName', 'year']}
        /> */}
    </Wrapper>
  )
}

export default Cars
