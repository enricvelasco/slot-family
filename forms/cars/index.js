import React, { useReducer } from 'react'
import Link from 'next/link'
import {formInitialState, reducer} from "./resources";
import {sponsorsList} from "../../mock/sponsors";

const CarsForm = ({ onSubmit, data = null }) => {
  const [state, dispatch] = useReducer(reducer, data || formInitialState)
  const { id, manufacturer, make, model, year, group, imgUrl, owner, sponsors, description } = state

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(state)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ID:</label>
        <input type='text' id='car_id' value={id} disabled />
      </div>
      <div>
        <label>FABRICANTE:</label>
        <input
          type='text'
          id='manufacturer'
          value={manufacturer}
          onChange={e => dispatch({ type: 'manufacturer', payload: e.target.value})}
        />
      </div>
      <div>
        <label>MARCA:</label>
        <input
          type='text'
          id='make'
          value={make}
          onChange={e => dispatch({ type: 'make', payload: e.target.value})}
        />
      </div>
      <div>
        <label>MODELO:</label>
        <input
          type='text'
          id='model'
          value={model}
          onChange={e => dispatch({ type: 'model', payload: e.target.value})}
        />
      </div>
      <div>
        <label>AÑO:</label>
        <input
          type='text'
          id='year'
          value={year}
          onChange={e => dispatch({ type: 'year', payload: e.target.value})}
        />
      </div>
      <div>
        <label>GRUPO:</label>
        <input
          type='text'
          id='group'
          value={group}
          onChange={e => dispatch({ type: 'group', payload: e.target.value})}
        />
      </div>
      <div>
        <label>IMAGEN:</label>
        <input type="file" id="files" name="files" />
      </div>
      <div>
        <label>PROPIETARIO:</label>
        <input
          type='text'
          id='owner'
          value={owner}
          onChange={e => dispatch({ type: 'owner', payload: e.target.value})}
        />
      </div>
      <div>
        <label>PATROCINADORES:</label>
        {sponsorsList.map((item, key) => (
          <div key={key}>
            <input
              type="checkbox"
              id={item.name}
              name={item.name}
              defaultChecked={sponsors && sponsors.find(sponsor => sponsor.name === item.name)}
              onChange={e => {
                const isChecked = e.target.checked
                const data = isChecked ? [...sponsors, item] : sponsors.filter(sponsor => sponsor.name !== item.name)
                dispatch({
                  type: 'sponsors',
                  payload: data
                })
              }}
            />
            <label>{item.name}</label>
          </div>
        ))}
      </div>
      <div>
        <label>DESCRIPCIÓN:</label>
        {/* <input
          type='text'
          id='description'
          value={description}
          onChange={e => dispatch({type: 'description', payload: e.target.value})}
        /> */}
        <textarea
          id="description"
          rows="4"
          cols="50"
          value={description}
          onChange={e => dispatch({type: 'description', payload: e.target.value})}
        />
      </div>
      <div><input type='submit' value='Guardar'/><Link href='/cars'><button>Cancelar</button></Link></div>
    </form>
  )
}

export default CarsForm
