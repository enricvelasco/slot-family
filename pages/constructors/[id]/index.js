import React, {useState, useEffect} from 'react'
import {useRouter} from "next/router";
import {getConstructorById, updateConstructor} from "../../../firebase/data/constructors";
import ConstructorsForm from "../../../forms/constructors";

const ConstructorsProfile = () => {
  const router = useRouter()
  const { id } = router.query

  const [isLoadingData, setIsLoadingData] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    id && getConstructorById(id)
      .then(res => {
        setIsLoadingData(false)
        setData(res)
      })
      .catch(err => {
        setIsLoadingData(false)
        console.log('ERROR_ON_GET_SPONSOR:', err)
      })
  })

  const onSubmit = (data) => {
    updateConstructor(data)
      .then(() => router.push('/constructors'))
      .catch(err => console.log('ERROR_ON_UPDATE_SPONSOR', err))
  }

  return (
    <div>
      Constructor Profile {id}
      {isLoadingData && <div>Loading...</div>}
      {!isLoadingData && data && <ConstructorsForm onSubmit={onSubmit} data={data} />}
    </div>
  )
}

export default ConstructorsProfile
