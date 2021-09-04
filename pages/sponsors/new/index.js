import React from 'react'
import SponsorsForm from "../../../forms/sponsors";
import {useRouter} from "next/router";
import {saveSponsor} from "../../../firebase/data/sponsors";

const NewSponsor = () => {
  const router = useRouter()

  const onSubmit = (state) => {
    saveSponsor(state)
      .then(() => router.push('/sponsors'))
      .catch(err => console.log('ERROR_ON_SAVE_SPONSOR', err))
  }

  return (
    <SponsorsForm onSubmit={onSubmit} />
  )
}

export default NewSponsor
