import React, { useState, useEffect } from 'react'
import CarsForm from "../../../forms/cars";
import {useRouter} from "next/router";
import {getSponsorById, updateSponsor} from "../../../firebase/data/sponsors";
import SponsorsForm from "../../../forms/sponsors";

const SponsorsProfile = () => {
  const router = useRouter()
  const { id } = router.query

  const [isLoadingData, setIsLoadingData] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    id && getSponsorById(id)
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
    updateSponsor(data)
      .then(() => router.push('/sponsors'))
      .catch(err => console.log('ERROR_ON_UPDATE_SPONSOR', err))
  }

  return (
    <div>
      Sponsor Profile {id}
      {isLoadingData && <div>Loading...</div>}
      {!isLoadingData && data && <SponsorsForm onSubmit={onSubmit} data={data} />}
    </div>
  )
}

export default SponsorsProfile
