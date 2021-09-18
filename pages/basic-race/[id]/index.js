import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {getBasicRaceId} from "../../../firebase/data/basic-race";

const BasicRaceDetail = () => {
  const router = useRouter()
  const { id } = router.query

  const [isLoadingData, setIsLoadingData] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    id && getBasicRaceId(id)
      .then(res => {
        console.log('RES::', res)
        setData(res)
        setData({
          ...res,
          player1ShowCarData: `${res.player1Car.constructor.name} ${res.player1Car.model}`,
          player2ShowCarData: `${res.player2Car.constructor.name} ${res.player2Car.model}`,
        })
      })
      .catch(err => {
        console.log('ERROR_ON_GET_CAR:', err)
      })
      .finally(() => setIsLoadingData(false))
  }, [id])

  return (
    <div>
      {isLoadingData && <div>Loading...</div>}
      {!isLoadingData && data &&
        <>
          <div>RACE READY</div>
          <div>Total Laps: {data.laps}</div>
          <div>Car 1: {data.player1ShowCarData}</div>
          <div>Car 2: {data.player2ShowCarData}</div>
        </>
      }
    </div>
  )
}

export default BasicRaceDetail
