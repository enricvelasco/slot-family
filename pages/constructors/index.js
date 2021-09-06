import React, {useEffect, useState} from 'react'
import {getConstructors} from "../../firebase/data/constructors";
import {sortArrayByParam} from "../../services/array";
import Wrapper from "../../components/wrapper";
import ListView from "../../components/list-view";

const Constructors = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState(null)

  useEffect(() => {
    getConstructors()
      .then(res => {
        setList(sortArrayByParam(res, 'name'))
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

export default Constructors
