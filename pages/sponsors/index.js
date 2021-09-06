import React, { useState, useEffect } from 'react'
import {getSponsors} from "../../firebase/data/sponsors";
import ListView from "../../components/list-view";
import Wrapper from "../../components/wrapper";
import {sortArrayByParam} from "../../services/array";

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
    <Wrapper>
      {isLoading && <div>Loading list...</div>}
      {!isLoading && list && <ListView data={sortArrayByParam(list, 'order')} viewParams={['imageUrl', 'name', '']} />}
    </Wrapper>
  )
}

export default Sponsors
