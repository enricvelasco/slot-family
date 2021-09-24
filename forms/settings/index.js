import React, {useReducer} from 'react'
import {formInitialState, reducer} from "./resources";
import Link from "next/link";

const SettingsForm = ({ onSubmit, data }) => {
  const [state, dispatch] = useReducer(reducer, data || formInitialState)
  const { serverUrl, serverSocketUrl } = state

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(state)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>URL SERVIDOR:</label>
        <input
          type='text'
          id='serverUrl'
          value={serverUrl}
          onChange={e => dispatch({ type: 'serverUrl', payload: e.target.value})}
        />
      </div>
      <div>
        <label>URL SOCKET:</label>
        <input
          type='text'
          id='serverSocketUrl'
          value={serverSocketUrl}
          onChange={e => dispatch({ type: 'serverSocketUrl', payload: e.target.value})}
        />
      </div>
      <div>
        <input type='submit' value='Guardar' />
      </div>
    </form>
  )
}

export default SettingsForm
