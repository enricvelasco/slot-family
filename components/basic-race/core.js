import React, {useState, useCallback, useEffect} from 'react'
import {useRouter} from "next/router";
import {getBasicRaces, saveBasicRace} from "../../firebase/data/basic-race";
import {startYellowLight} from "../../arduino/trafficLights";
import {sortArrayByParam} from "../../services/array";

const BasicRaceCore = () => {
  const router = useRouter()
  const { pathname } = router
  const [isLoading, setIsLoading] = useState(false)
  const [list, setList] = useState([])

  const getData = useCallback(() => {
    setIsLoading(true);
    getBasicRaces()
      .then(res => {
        const arr = res.map(item => ({
          ...item,
          players: `${item.player1.name} vs ${item.player2.name}`,
          date: new Date(item.onCreateData).toLocaleString()
        }))
        setList(sortArrayByParam(arr, 'onCreateData').reverse())
      })
      .catch(err => console.log('ERROR_ON_GET_BASIC_RACE', err))
      .finally(() => setIsLoading(false))
  }, [])

  const setBasicRace = useCallback((data) => {
    saveBasicRace(data)
      .then(() => {
        getData()
        startYellowLight().then()
      })
  }, [])

  const goToRaceData = index => {
    const id = list[index].id
    const url = `${window.location.origin}${pathname}/${id}`
    window.open(url, '_blank').focus();
  }

  useEffect(() => {
    getData()
  }, [])

  return [isLoading, list, getData, setBasicRace, goToRaceData]
}

export default BasicRaceCore
