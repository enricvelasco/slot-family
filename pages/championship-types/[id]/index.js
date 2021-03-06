import React, {useState, useEffect} from 'react'
import {useRouter} from "next/router";
import ChampionshipTypesForm from "../../../forms/campionship-types";
import {getChampionshipTypeById, updateChampionshipType} from "../../../firebase/data/championship-types";

const ChampionshipTypeProfile = () => {
  const router = useRouter()
  const { id } = router.query

  const [isLoadingData, setIsLoadingData] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    id && getChampionshipTypeById(id)
      .then(res => {
        setIsLoadingData(false)
        setData(res)
      })
      .catch(err => {
        setIsLoadingData(false)
        console.log('ERROR_ON_GET_CHAMPIONSHIP:', err)
      })
  })

  const onSubmit = (data) => {
    updateChampionshipType(data)
      .then(() => router.push('/championship-types'))
      .catch(err => console.log('ERROR_ON_UPDATE_CHAMPIONSHIP', err))
  }

  return (
    <div>
      Championship type Profile {id}
      {isLoadingData && <div>Loading...</div>}
      {!isLoadingData && data && <ChampionshipTypesForm onSubmit={onSubmit} data={data} />}
    </div>
  )
}

export default ChampionshipTypeProfile
