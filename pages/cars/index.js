import React, { useEffect, useState } from 'react'
import {getCars} from "../../firebase/data/cars";
import ListView from "../../components/list-view";
import Wrapper from "../../components/wrapper";

const Cars = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState(null)

  useEffect(() => {
    getCars()
      .then(listRes => {
        setList(listRes)
      })
      .catch(err => {
        console.log('ERROR_ON_GET_CARS', err)
      })
      .finally(() => setIsLoading(false))
  })

  return (
    <Wrapper>
      {isLoading && <div>Loading list...</div>}
      {!isLoading && list && <ListView data={list} />}
    </Wrapper>
  )
}

export default Cars
