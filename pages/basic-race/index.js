import React, {useEffect, useState} from 'react'
import socketClient  from "socket.io-client";
import Wrapper from "../../components/wrapper";
import css from '../../styles/basic-race/basic-race.module.scss'
import clsx from "clsx";
import BasicRaceForm from "../../forms/basic-race";
import {startYellowLight,} from "../../arduino/trafficLights";
import {getBasicRaces, saveBasicRace} from "../../firebase/data/basic-race";
import {serverUrl} from "../../env/env";
import {getSponsors} from "../../firebase/data/sponsors";
import ListView from "../../components/list-view";
import {sortArrayByParam} from "../../services/array";
import TableListView from "../../components/table-list-view";
import {useRouter} from "next/router";
import BasicRaceController from "../../components/basic-race";

const SERVER = "http://localhost:8000";

const BasicRace = () => {
  const router = useRouter()
  const { pathname } = router

  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState(null)
  /* const formInitialState = {
    player1Laps: '0',
    player2Laps: '0',
  }

  const reducer = (state, action) => {
    const { type, payload } = action
    return {
      ...state,
      [type]: payload
    }
  } */

  // const [state, dispatch] = useReducer(reducer, formInitialState)
  // const { player1Laps, player2Laps } = state
  const getRaces = () => {
    getBasicRaces()
      .then(res => {
        setList(res.map(item => ({
          ...item,
          players: `${item.player1.name} vs ${item.player2.name}`,
          date: new Date(item.onCreateData).toLocaleString()
        })))
      })
      .catch(err => console.log('ERROR_ON_GET_CARS', err))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getRaces();
  }, []);

  const onInitRace = (data) => {
    console.log('ON_INIT_RACE', data)
    saveBasicRace(data)
      .then(() => {
        getRaces();
        startYellowLight().then()
      })
  }

  /*console.log('SERVER::', SERVER)
  console.log('SERVER::', serverUrl, '+++')
  const socket = socketClient(SERVER, {transports: ['websocket', 'polling', 'flashsocket']});
  socket.on('Sensor1', (res) => {
    dispatch({ type: 'player1Laps', payload: parseInt(player1Laps) + 1})
  });
  socket.on('Sensor2', (res) => {
    dispatch({ type: 'player2Laps', payload: parseInt(player2Laps) + 1})
  });*/

  const goToRaceData = index => {
    const id = list[index].id
    // router.push(`${pathname}/${id}`)
    const url = `${window.location.origin}${pathname}/${id}`
    window.open(url, '_blank').focus();
  }

  return (
    <Wrapper>
      <BasicRaceController />
      {/*<div className={css.basicRaceContainer}>
        <div className={clsx(css.halfPart, css.centeredContent)}>
          CREAR NUEVA CARRERA RÁPIDA
          <BasicRaceForm
            lastRace={!!list?.length ? sortArrayByParam(list, 'onCreateData').reverse()[0] : false}
            onSubmit={onInitRace}
          />
        </div>
        <div className={css.halfPart}>
          {!isLoading && list &&
          <TableListView
            list={sortArrayByParam(list, 'onCreateData').reverse()}
            params={['', 'players', 'date']}
            onSelect={goToRaceData}
          />}
        </div>
      </div>*/}
    </Wrapper>
  )
}

export default BasicRace
