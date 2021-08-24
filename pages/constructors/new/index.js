import React from 'react'
import {useRouter} from "next/router";
import {saveConstructor} from "../../../firebase/data/constructors";
import ConstructorsForm from "../../../forms/constructors";

const NewConstructor = () => {
  const router = useRouter()

  const onSubmit = (state) => {
    saveConstructor(state)
      .then(() => router.push('/constructors'))
      .catch(err => console.log('ERROR_ON_SAVE_SPONSOR', err))
  }

  return (
    <ConstructorsForm onSubmit={onSubmit} />
  )
}

export default NewConstructor
