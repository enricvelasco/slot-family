import React from 'react'
import {saveCar} from "../../../firebase/data/cars";
import CarsForm from "../../../forms/cars";

const NewCar = () => {
  const onSubmitCar = (e) => {
    e.preventDefault()
    console.log('ON_SUBMIT_CAR')
    const carData = {
      id: document.getElementById('car_id').value,
      manufacturer: document.getElementById('manufacturer').value,
      make: document.getElementById('make').value,
      model: document.getElementById('model').value,
      year: document.getElementById('year').value,
      img: document.getElementById('img_car').value,
      owner: document.getElementById('owner').value,
      sponsors: document.getElementById('sponsors').value,
      description: document.getElementById('description').value,
    }
    saveCar(carData)
  }
  return (
    <CarsForm />
  )
}

export default NewCar
