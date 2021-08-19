import React, { useReducer, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {formInitialState, reducer} from "./resources";
import {sponsorsList} from "../../mock/sponsors";
import {setImage} from "../../firebase/data/cars";
import {
  getFileExtension,
  resizeImage,
} from "../../services/file_management";
import {generateRandomId} from "../../services/random";
import {manufacturersList} from "../../mock/manufacturers";
import {groupsList} from "../../mock/group";

const CarsForm = ({ onSubmit, data = null }) => {
  const [state, dispatch] = useReducer(reducer, data || formInitialState)
  const [isUpdatingImage, setIsUpdatingImage] = useState(false)
  const { id, manufacturer, make, model, year, group, imgUrl, owner, sponsors, description } = state

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(state)
  }

  const onChange = async (file) => {
    if (file) {
      setIsUpdatingImage(true)
      const extension = getFileExtension(file.name)
      resizeImage({ file, maxWidth: 500 })
        .then(resizedImage => {
          setImage({
            filename: `${generateRandomId()}.${extension}`,
            payload: resizedImage
          })
            .then(url => {
              console.log('IMAGE_UPDATED', url)
              setIsUpdatingImage(false)
              dispatch({ type: 'imgUrl', payload: url})
            })
        })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ID:</label>
        <input type='text' id='car_id' value={id} disabled />
      </div>
      <div>
        <label htmlFor="manufacturer">FABRICANTE:</label>
        <select
          id="manufacturer"
          name="manufacturer"
          onSelect={e => console.log('SELECTED::', e.target)}
          onChange={e => dispatch({ type: 'manufacturer', payload: JSON.parse(e.target.value) })}
        >
          {
            manufacturersList.map((item, key) => {
              const isSelected = manufacturer && item.name === manufacturer.name
              return (
                <option
                  key={key}
                  value={JSON.stringify(item)}
                  selected={isSelected}
                >
                  {item.name}
                </option>
              )
            })
          }
        </select>
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
        <label htmlFor="cars_group">CATEGORIAS:</label>
        <select
          id="group"
          name="group"
          size="5"
          multiple
          onChange={e => {
            const options = Array.from(e.target.selectedOptions, option => JSON.parse(option.value));
            dispatch({ type: 'group', payload: options })
          }}
        >
          {
            groupsList.map((item, key) => {
              const isSelected = group && group.find(g => g.name === item.name)
              return (
                <option
                  key={key}
                  value={JSON.stringify(item)}
                  selected={isSelected}
                >
                  {item.name}
                </option>
              )
            })
          }
        </select>
        {/* <label>GRUPO:</label>
          <input
          type='text'
          id='group'
          value={group}
          onChange={e => dispatch({type: 'group', payload: e.target.value})}
          /> */}
      </div>
      <div>
        <label>IMAGEN:</label>
        <input type="file" id="files" name="files" onChange={event => onChange(event.target.files[0] || null)} />
        {imgUrl && <Image id='car_img' src={imgUrl} width={100} height={75} alt="Image preview..."/>}
        {isUpdatingImage && <span>Updating image...</span>}
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
        <textarea
          id="description"
          rows="4"
          cols="50"
          value={description}
          onChange={e => dispatch({type: 'description', payload: e.target.value})}
        />
      </div>
      <div>
        <input type='submit' value='Guardar' disabled={isUpdatingImage} />
        <Link href='/cars'><button>Cancelar</button></Link>
      </div>
    </form>
  )
}

export default CarsForm
