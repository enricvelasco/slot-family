import React, { useState, useEffect } from 'react'
import {getSponsors} from "../../firebase/data/sponsors";
import ListView from "../../components/list-view";
import Wrapper from "../../components/wrapper";

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
      {!isLoading && list && <ListView data={list} />}
    </Wrapper>
  )
}

export default Sponsors
