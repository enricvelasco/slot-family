import React, {useEffect, useReducer} from 'react'
import socketClient  from "socket.io-client";
import Wrapper from "../../components/wrapper";
import css from '../../styles/basic-race/basic-race.module.scss'
import clsx from "clsx";
import BasicRaceForm from "../../forms/basic-race";
import {startTrafficLights,} from "../../arduino/trafficLights";

const SERVER = "http://localhost:8000";

const BasicRace = () => {
  export const formInitialState = {
    player1Laps: '0',
    player2Laps: '0',
  }

  export const reducer = (state, action) => {
    const { type, payload } = action
    return {
      ...state,
      [type]: payload
    }
  }

  const [state, dispatch] = useReducer(reducer, formInitialState)
  const { player1Laps, player2Laps } = state

  useEffect(() => {

  }, []);

  const onInitRace = () => {
    console.log('ON_INIT_RACE')

    startTrafficLights()
      .then(res => {
        console.log('ON_START_SEMAFORO')
      })
  }

  const socket = socketClient(SERVER, {transports: ['websocket', 'polling', 'flashsocket']});
  socket.on('Sensor1', (res) => {
    dispatch({ type: 'player1Laps', payload: parseInt(player1Laps) + 1})
  });
  socket.on('Sensor2', (res) => {
    dispatch({ type: 'player2Laps', payload: parseInt(player2Laps) + 1})
  });

  return (
    <Wrapper>
      <div className={css.basicRaceContainer}>
        <div className={clsx(css.halfPart, css.centeredContent)}>
          CREAR NUEVA CARRERA RÁPIDA
          <BasicRaceForm onSubmit={onInitRace} />
          <div>{player1Laps}</div>
          <div>{player2Laps}</div>
        </div>
        <div className={css.halfPart}>
          PART 2
        </div>
      </div>
    </Wrapper>
  )
}

export default BasicRace
