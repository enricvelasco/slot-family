import React, {useEffect, useState, useReducer} from 'react'
import {useRouter} from "next/router";
import {getBasicRaceId, updateBasicRace} from "../../../firebase/data/basic-race";
import {startTrafficLights} from "../../../arduino/trafficLights";
import socketClient  from "socket.io-client";
import {basicRaceInitialState, reducer} from "../../../forms/basic-race/resources";

const SERVER = "http://localhost:8000";

const BasicRaceDetail = () => {
  const router = useRouter()
  const { id } = router.query

  const [state, dispatch] = useReducer(reducer, basicRaceInitialState)
  const { player1Laps, player2Laps, finished } = state

  const [isLoadingData, setIsLoadingData] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    player1Laps === data?.laps && dispatch({ type: 'finished', payload: true});
    player2Laps === data?.laps && dispatch({ type: 'finished', payload: true});
    data && updateRace();
  }, [player1Laps, player2Laps])

  const updateRace = () => {
      updateBasicRace({ ...data, player1Laps, player2Laps, isFinished: finished })
      .then(() => console.log('BASIC_RACE_UPDATED'))
  }

  const updateP1 = () => {
    dispatch({ type: 'player1Laps', payload: parseInt(player1Laps) + 1});
  }

  const updateP2 = () => {
    dispatch({ type: 'player2Laps', payload: parseInt(player2Laps) + 1})
  }

  if (!finished) {
    try {
      const socket = socketClient(SERVER, {transports: ['websocket', 'polling', 'flashsocket']});
      console.log('SOKET____', socket)
      socket.on('Sensor1', (res) => {
        console.log('ON_SENSOR_1');
        dispatch({ type: 'player1Laps', payload: parseInt(player1Laps) + 1})
      });

      socket.on('Sensor2', (res) => {
        console.log('ON_SENSOR_2');
        dispatch({ type: 'player2Laps', payload: parseInt(player2Laps) + 1})
      });
    } catch (e) {
      console.log('ERROR_SOCKET', e)
    }
  }

  useEffect(() => {
    id && getBasicRaceId(id)
      .then(res => {
        console.log('RES::', res)
        // setData(res)
        setData({
          ...res,
          player1ShowCarData: `${res.player1Car.constructor.name} ${res.player1Car.model}`,
          player2ShowCarData: `${res.player2Car.constructor.name} ${res.player2Car.model}`,
        })
        dispatch({ type: 'player1Laps', payload: parseInt(res.player1Laps)});
        dispatch({ type: 'player2Laps', payload: parseInt(res.player2Laps)})
        dispatch({ type: 'finished', payload: res.isFinished});
      })
      .catch(err => {
        console.log('ERROR_ON_GET_CAR:', err)
      })
      .finally(() => setIsLoadingData(false))
  }, [id])

  const onStart = () => {
    startTrafficLights()
      .then(res => console.log('EMPIEZA_LA_CARRERA'))
    /* startLapSensors()
      .then(res => console.log('SENSORES_ACTIVOS'))*/
  }

  const forceFinish = () => {
    dispatch({ type: 'finished', payload: true});
    updateRace();
  }

  return (
    <div>
      {isLoadingData && <div>Loading...</div>}
      {!isLoadingData && data &&
        <>
          <button onClick={forceFinish}>Force finish</button>
          <div>RACE READY</div>
          <div>Total Laps: {data.laps}</div>
          <div>Car 1: {data.player1ShowCarData}</div>
          <div>Car 2: {data.player2ShowCarData}</div>
          <button onClick={onStart}>START_SEMAFORO</button>
          <button disabled={finished} onClick={updateP1}>UPDATE P1</button>
          <h2>LAP P1: {player1Laps < 0 ? 'WAIT' : player1Laps}</h2>
          <button disabled={finished} onClick={updateP2}>UPDATE P2</button>
          <h2>LAP P2: {player2Laps < 0 ? 'WAIT' : player2Laps}</h2>
          <br />
          {finished && <h2>FINISHED!!!!!</h2>}
        </>
      }
    </div>
  )
}

export default BasicRaceDetail
