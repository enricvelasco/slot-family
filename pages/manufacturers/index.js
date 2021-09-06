import React, {useEffect, useState} from 'react'
import {getManufacturers} from "../../firebase/data/manufacturers";
import ListView from "../../components/list-view";
import Wrapper from "../../components/wrapper";
import {sortArrayByParam} from "../../services/array";

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
    <Wrapper>
      {isLoading && <div>Loading list...</div>}
      {!isLoading && list && <ListView data={sortArrayByParam(list, 'order')} viewParams={['imageUrl', 'name', '']} />}
    </Wrapper>
  )
}

export default Manufacturers
