import React from 'react'
import {saveCar} from "../../../firebase/data/cars";

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
    <form onSubmit={onSubmitCar}>
      <div>ID: <input type='text' id='car_id' value='001' /></div>
      <div>FABRICANTE: <input type='text' id='manufacturer' value='Carrera' /></div>
      <div>MARCA: <input type='text' id='make' value='Subaru' /></div>
      <div>MODELO: <input type='text' id='model' value='Impreza WRX' /></div>
      <div>AÑO: <input type='text' id='year' value='1999' /></div>
      <div>IMAGEN: <input type='text' id='img_car' value='https://m.media-amazon.com/images/I/81Nr+AbZaZL._AC_SY355_.jpg' /></div>
      <div>PROPIETARIO: <input type='text' id='owner' value='Enric' /></div>
      <div>PATROCINADORES: <input type='text' id='sponsors' value={['Pirelli', 'Subaru']} /></div>
      <div>DESCRIPCIÓN: <input type='text' id='description' value='Coche rally' /></div>
      <div>GRUPO: <input type='text' id='group' value='Rally Lento' /></div>
      <div><input type='submit' value='Guardar'/></div>
    </form>
  )
}

export default NewCar
