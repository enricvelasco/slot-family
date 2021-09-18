import React, {useEffect, useReducer, useState} from 'react'
import {getUsers} from "../../firebase/data/users";
import {formInitialState, reducer} from "./resources";
import {getCars} from "../../firebase/data/cars";

const BasicRaceForm = ({ onSubmit }) => {
  const [usersList, setUsersList] = useState([])
  const [carsList, setCarsList] = useState([])
  const [state, dispatch] = useReducer(reducer, formInitialState)
  const { player1, player1Car, player2, player2Car, laps } = state

  useEffect(() => {
    getUsers()
      .then(data => {
        // setSelectedUser(data[0])
        setUsersList(data)
      })
      .catch(err => console.log('ERROR_ON_GET_USERS', err))

    getCars()
      .then(data => setCarsList(data))
      .catch(err => console.log('ERROR_ON_GET_CARS', err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(state)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Player Green:
        <select
          id={'player1'}
          name={'player1'}
          onChange={e => dispatch({ type: 'player1', payload: JSON.parse(e.target.value)})}
        >
          {usersList.map((item, key) => {
            return (
              <option
                key={key}
                value={JSON.stringify(item)}
              >
                {item.name}
              </option>
            )
          })}
        </select>
      </div>
      <div>
        Player CAR Green:
        <select
          id={'player1Car'}
          name={'player1Car'}
          onChange={e => dispatch({ type: 'player1Car', payload: JSON.parse(e.target.value)})}
        >
          {carsList.map((item, key) => {
            return (
              <option
                key={key}
                value={JSON.stringify(item)}
              >
                {item.model}
              </option>
            )
          })}
        </select>
      </div>
      <div>
        Player Red:
        <select
          id={'player2'}
          name={'player2'}
          onChange={e => dispatch({ type: 'player2', payload: JSON.parse(e.target.value)})}
        >
          {usersList.map((item, key) => {
            return (
              <option
                key={key}
                value={JSON.stringify(item)}
              >
                {item.name}
              </option>
            )
          })}
        </select>
      </div>
      <div>
        Player CAR Red:
        <select
          id={'player2Car'}
          name={'player2Car'}
          onChange={e => dispatch({ type: 'player2Car', payload: JSON.parse(e.target.value)})}
        >
          {carsList.map((item, key) => {
            return (
              <option
                key={key}
                value={JSON.stringify(item)}
              >
                {item.model}
              </option>
            )
          })}
        </select>
      </div>
      Laps:
      <input
        type={'number'}
        name={'laps'}
        value={laps}
        onChange={e => dispatch({ type: 'laps', payload: e.target.value})}
      />
      <br />
      <input type='submit' value='Crear carrera' />
    </form>
  )
}

export default BasicRaceForm
