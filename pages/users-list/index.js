import React, {useEffect, useState} from 'react'
import Wrapper from "../../components/wrapper";
import GridList from "../../components/grid-list";
import {getUsers} from "../../firebase/data/users";

const UsersList = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState(null)

  useEffect(() => {
    getUsers()
      .then(listRes => {
        setList(listRes)
      })
      .catch(err => {
        console.log('ERROR_ON_GET_CARS', err)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <Wrapper>
      {isLoading && <div>Loading list...</div>}
      {!isLoading && <GridList list={list}/>}
    </Wrapper>
  )
}

export default UsersList
