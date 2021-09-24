import React, {useEffect, useState, useReducer} from 'react'
import {useRouter} from "next/router";
import {getBasicRaceId} from "../../../firebase/data/basic-race";
import {startTrafficLights} from "../../../arduino/trafficLights";
import {startLapSensors} from "../../../arduino/lap-sensor";
import socketClient  from "socket.io-client";

const SERVER = "http://localhost:8000";

const BasicRaceDetail = () => {
  const router = useRouter()
  const { id } = router.query

  const [isLoadingData, setIsLoadingData] = useState(true)
  const [data, setData] = useState(null)

  const formInitialState = {
    player1Laps: '0',
    player2Laps: '0',
  }

  const reducer = (state, action) => {
    const { type, payload } = action
    return {
      ...state,
      [type]: payload
    }
  }

  const [state, dispatch] = useReducer(reducer, formInitialState)
  const { player1Laps, player2Laps } = state

  const socket = socketClient(SERVER, {transports: ['websocket', 'polling', 'flashsocket']});
  socket.on('Sensor1', (res) => {
    dispatch({ type: 'player1Laps', payload: parseInt(player1Laps) + 1})
  });
  socket.on('Sensor2', (res) => {
    dispatch({ type: 'player2Laps', payload: parseInt(player2Laps) + 1})
  });

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

  const onStart = () => {
    startTrafficLights()
      .then(res => console.log('EMPIEZA_LA_CARRERA'))
    startLapSensors()
      .then(res => console.log('SENSORES_ACTIVOS'))
  }

  return (
    <div>
      {isLoadingData && <div>Loading...</div>}
      {!isLoadingData && data &&
        <>
          <div>RACE READY</div>
          <div>Total Laps: {data.laps}</div>
          <div>Car 1: {data.player1ShowCarData}</div>
          <div>Car 2: {data.player2ShowCarData}</div>
          <button onClick={onStart}>START_SEMAFORO</button>
          <div>LAP P1: {player1Laps}</div>
          <div>LAP P2: {player2Laps}</div>
        </>
      }
    </div>
  )
}

export default BasicRaceDetail
