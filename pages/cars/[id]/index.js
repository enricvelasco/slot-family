import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CarsForm from "../../../forms/cars";
import {getCarById, updateCar} from "../../../firebase/data/cars";

const CarProfile = () => {
  const router = useRouter()
  const { id } = router.query

  const [isLoadingData, setIsLoadingData] = useState(true)
  const [carData, setCarData] = useState(null)

  useEffect(() => {
    id && getCarById(id)
      .then(data => {
        setIsLoadingData(false)
        setCarData(data)
      })
      .catch(err => {
        setIsLoadingData(false)
        console.log('ERROR_ON_GET_CAR:', err)
      })
  }, [id])

  const onSubmit = (data) => {
    updateCar(data)
      .then(() => router.push('/cars'))
      .catch(err => console.log('ERROR_ON_UPDATE_CAR', err))
  }

  return (
    <>
      {isLoadingData && <div>Loading...</div>}
      {!isLoadingData && carData && <CarsForm onSubmit={onSubmit} data={carData} />}
    </>
  )
}

export default CarProfile
