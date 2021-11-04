import React, {useEffect, useState, useReducer} from 'react'
import {useRouter} from "next/router";
import {getBasicRaceId, updateBasicRace} from "../../../firebase/data/basic-race";
import {startTrafficLights} from "../../../arduino/trafficLights";
import socketClient  from "socket.io-client";
import {basicRaceInitialState, reducer} from "../../../forms/basic-race/resources";
import {convertMillisToTime, getBestTime, getFormattedTime, getTotalTime} from "../../../services/time";
import css from '../../../styles/basic-race/basic-race.module.scss'
import {socketUrl} from "../../../env/env";

const SERVER = socketUrl;

const BasicRaceDetail = () => {
  const router = useRouter()
  const { id } = router.query

  const [timesListPlayer1, setTimesListPlayer1] = useState([])
  const [timesListPlayer2, setTimesListPlayer2] = useState([])

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
      updateBasicRace({
        ...data,
        player1Laps,
        player2Laps,
        isFinished: finished,
        timesListPlayer1,
        timesListPlayer2
      })
      .then(() => console.log('BASIC_RACE_UPDATED'))
  }

  const updateP1 = () => {
    parseInt(player1Laps) === -1 ?
      setTimesListPlayer1([...timesListPlayer1, ...[{init: Date.now(), end: Date.now()}]])
      : setTimesListPlayer1([...timesListPlayer1, ...[{init: timesListPlayer1[timesListPlayer1.length - 1].end, end: Date.now()}]])
    player1Laps !== data?.laps && dispatch({ type: 'player1Laps', payload: parseInt(player1Laps) + 1});
  }

  const updateP2 = () => {
    parseInt(player2Laps) === -1 ?
      setTimesListPlayer2([...timesListPlayer2, ...[{init: Date.now(), end: Date.now()}]])
      : setTimesListPlayer2([...timesListPlayer2, ...[{init: timesListPlayer2[timesListPlayer2.length - 1].end, end: Date.now()}]])
    player2Laps !== data?.laps && dispatch({ type: 'player2Laps', payload: parseInt(player2Laps) + 1})
  }

  if (!finished) {
    try {
      const socket = socketClient(SERVER, {transports: ['websocket', 'polling', 'flashsocket']});
      console.log('SOKET____', socket)
      socket.on('Sensor1', (res) => {
        console.log('ON_SENSOR_1');
        updateP1()
      });

      socket.on('Sensor2', (res) => {
        console.log('ON_SENSOR_2');
        updateP2()
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
          laps: parseInt(res.laps),
          player1ShowCarData: `${res.player1Car.constructor.name} ${res.player1Car.model}`,
          player2ShowCarData: `${res.player2Car.constructor.name} ${res.player2Car.model}`,
        })
        setTimesListPlayer1(res.timesListPlayer1 || []);
        setTimesListPlayer2(res.timesListPlayer2 || []);
        dispatch({ type: 'player1Laps', payload: parseInt(res.player1Laps)});
        dispatch({ type: 'player2Laps', payload: parseInt(res.player2Laps)})
        dispatch({ type: 'finished', payload: res.isFinished});
      })
      .catch(err => {
        console.log('ERROR_ON_GET_CAR:', err)
      })
      .finally(() => setIsLoadingData(false))
  }, [id])

  const forceFinish = () => {
    dispatch({ type: 'finished', payload: true});
    updateRace();
  }

  return (
    <div>
      {isLoadingData && <div>Loading...</div>}
      {!isLoadingData && data &&
      <>
        <div className={css.basicRaceActiveContainer}>
          <div>
            <h2>Car: {data.player1ShowCarData}</h2>
            <button disabled={finished} onClick={updateP1}>UPDATE P1</button>
            <h2>LAP P1: {player1Laps < 0 ? 'WAIT' : player1Laps}</h2>
            <h3>Total time: {getTotalTime(timesListPlayer1)?.totalTime}</h3>
            <h3>Best Lap: {getFormattedTime(timesListPlayer1).time}</h3>
            <div>
              LAPS TIMES:
              <ul>
                {timesListPlayer1.map((item, key) => {
                  const time = convertMillisToTime(Math.abs(item.init - item.end))
                  return <li key={key}>{time.minutes} : {time.seconds} : {time.millis}</li>
                })}
              </ul>
            </div>
          </div>
          <div>
            <h2>Car: {data.player2ShowCarData}</h2>
            <button disabled={finished} onClick={updateP2}>UPDATE P2</button>
            <h2>LAP P2: {player2Laps < 0 ? 'WAIT' : player2Laps}</h2>
            <h3>Total time: {getTotalTime(timesListPlayer2)?.totalTime}</h3>
            <h3>Best Lap: {getFormattedTime(timesListPlayer2).time}</h3>
            <div>
              LAPS TIMES:
              <ul>
                {timesListPlayer2.map((item, key) => {
                  const time = convertMillisToTime(Math.abs(item.init - item.end))
                  return <li key={key}>{time.minutes} : {time.seconds} : {time.millis}</li>
                })}
              </ul>
            </div>
          </div>
        </div>
        {finished && <h2>FINISHED!!!!!</h2>}
      </>
      }
    </div>
  )
}

export default BasicRaceDetail
