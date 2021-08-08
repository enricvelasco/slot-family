import React from 'react'
import { useRouter } from 'next/router'
import {saveCar} from "../../../firebase/data/cars";
import CarsForm from "../../../forms/cars";

const NewCar = () => {
  const router = useRouter()

  const onSubmit = (state) => {
    saveCar(state)
      .then(() => router.push('/cars'))
      .catch(err => console.log('ERROR_ON_SAVE_CAR', err))
  }

  return (
    <CarsForm onSubmit={onSubmit} />
  )
}

export default NewCar
