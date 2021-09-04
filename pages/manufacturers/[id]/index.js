import React, {useState, useEffect} from 'react'
import {useRouter} from "next/router";
import ManufacturersForm from "../../../forms/manufacturers";
import {getManufacturerById, updateManufacturer} from "../../../firebase/data/manufacturers";

const ManufacturerProfile = () => {
  const router = useRouter()
  const { id } = router.query

  const [isLoadingData, setIsLoadingData] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    id && getManufacturerById(id)
      .then(res => {
        setIsLoadingData(false)
        setData(res)
      })
      .catch(err => {
        setIsLoadingData(false)
        console.log('ERROR_ON_GET_MANUFACTURER', err)
      })
  })

  const onSubmit = (data) => {
    updateManufacturer(data)
      .then(() => router.push('/manufacturers'))
      .catch(err => console.log('ERROR_ON_UPDATE_MANUFACTURER', err))
  }

  return (
    <div>
      Championship type Profile {id}
      {isLoadingData && <div>Loading...</div>}
      {!isLoadingData && data && <ManufacturersForm onSubmit={onSubmit} data={data} />}
    </div>
  )
}

export default ManufacturerProfile
