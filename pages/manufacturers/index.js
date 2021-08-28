import React, {useEffect, useState} from 'react'
import {getManufacturers} from "../../firebase/data/manufacturers";
import ListView from "../../components/list-view";
import Wrapper from "../../components/wrapper";

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
      {!isLoading && list && <ListView data={list} />}
    </Wrapper>
  )
}

export default Manufacturers
