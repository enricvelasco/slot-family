import React from 'react'
import {useRouter} from "next/router";
import {saveChampionshipType} from "../../../firebase/data/championship-types";
import ChampionshipTypesForm from "../../../forms/campionship-types";

const NewChampionshipType = () => {
  const router = useRouter()

  const onSubmit = (state) => {
    saveChampionshipType(state)
      .then(() => router.push('/championship-types'))
      .catch(err => console.log('ERROR_ON_SAVE_SPONSOR', err))
  }

  return (
    <ChampionshipTypesForm onSubmit={onSubmit} />
  )
}

export default NewChampionshipType
