import React from 'react'
import {useRouter} from "next/router";
import {saveManufacturer} from "../../../firebase/data/manufacturers";
import ManufacturersForm from "../../../forms/manufacturers";

const NewManufacturer = () => {
  const router = useRouter()

  const onSubmit = (state) => {
    saveManufacturer(state)
      .then(() => router.push('/manufacturers'))
      .catch(err => console.log('ERROR_ON_SAVE_SPONSOR', err))
  }

  return (
    <ManufacturersForm onSubmit={onSubmit} />
  )
}

export default NewManufacturer
