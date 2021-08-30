import React, { useReducer, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {formInitialState, reducer, formInitialOptions} from "./resources";
import {setImage} from "../../firebase/data/cars";
import {
  getFileExtension,
  resizeImage,
} from "../../services/file_management";
import {generateRandomId} from "../../services/random";
import {groupsList} from "../../mock/group";
import {enginePositionList} from "../../mock/enginePosition";
import Wrapper from "../../components/wrapper";
import css from '../../styles/components/form.module.scss'
import {getManufacturers} from "../../firebase/data/manufacturers";
import {getConstructors} from "../../firebase/data/constructors";
import {getSponsors} from "../../firebase/data/sponsors";
import {getChampionshipTypes} from "../../firebase/data/championship-types";

const CarsForm = ({ onSubmit, data = null }) => {
  const [state, dispatch] = useReducer(reducer, data || formInitialState)
  const [isUpdatingImage, setIsUpdatingImage] = useState(false)
  const { id, manufacturer, constructor, model, year, group, imageUrl, owner, sponsors, description, enginePosition } = state

  const [optionsState, optionsDispatch] = useReducer(reducer, formInitialOptions)
  const {manufacturerList, constructorList, sponsorsList, championshipTypesList} = optionsState

  useEffect(() => {
    getManufacturers()
      .then(res => optionsDispatch({ type: 'manufacturerList', payload: res }))
    getConstructors()
      .then(res => optionsDispatch({ type: 'constructorList', payload: res }))
    getSponsors()
      .then(res => optionsDispatch({ type: 'sponsorsList', payload: res }))
    getChampionshipTypes()
      .then(res => optionsDispatch({ type: 'championshipTypesList', payload: res }))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(state)
  }

  const onChange = (file) => {
    if (file) {
      setIsUpdatingImage(true)
      const extension = getFileExtension(file.name)
      resizeImage({ file, maxWidth: 1080 })
        .then(resizedImage => {
          setImage({
            filename: `${generateRandomId()}.${extension}`,
            payload: resizedImage
          })
            .then(url => {
              console.log('IMAGE_UPDATED', url)
              setIsUpdatingImage(false)
              dispatch({ type: 'imageUrl', payload: url})
            })
        })
    }
  }

  return (
    <Wrapper>
    <form className={css.container} onSubmit={handleSubmit}>
      <h2>{id ? 'Edición' : 'Nuevo'}</h2>
      <div>
        <label>ID:</label>
        <input type='text' id='car_id' value={id} disabled />
      </div>
      <div>
        <label htmlFor="manufacturer">FABRICANTE:</label>
        <select
          id="manufacturer"
          name="manufacturer"
          onChange={e => dispatch({ type: 'manufacturer', payload: JSON.parse(e.target.value) })}
        >
          {
            manufacturerList.map((item, key) => {
              const isSelected = manufacturer && item.id === manufacturer.id
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
        <label htmlFor="constructor">CONSTRUCTOR:</label>
        <select
          id="constructor"
          name="constructor"
          onChange={e => dispatch({ type: 'constructor', payload: JSON.parse(e.target.value) })}
        >
          {
            constructorList.map((item, key) => {
              const isSelected = constructor && item.id === constructor.id
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
        <label>IMAGEN:</label>
        <input type="file" id="files" name="files" onChange={event => onChange(event.target.files[0] || null)} />
        {imageUrl && <Image id='car_img' src={imageUrl} width={100} height={75} alt="Image preview..."/>}
        {isUpdatingImage && <span>Updating image...</span>}
      </div>
      <div>
        <label>POSICIÓN DEL MOTOR:</label>
        {enginePositionList.map((item, key) => {
          const isSelected = enginePosition && enginePosition.name === item.name
          return (
            <span key={key}>
              <input
                onChange={e => dispatch({ type: 'enginePosition', payload: JSON.parse(e.target.value) })}
                type="radio"
                id={item.name}
                name="fav_language"
                value={JSON.stringify(item)}
                checked={isSelected}
              />
              <label htmlFor={item.name}>{item.name}</label>
            </span>
          )
        })}
      </div>
      <div>
        <label>PATROCINADORES:</label>
        {sponsorsList.map((item, key) => (
          <div key={key}>
            <input
              type="checkbox"
              id={item.name}
              name={item.name}
              defaultChecked={sponsors && sponsors.find(sponsor => sponsor.id === item.id)}
              onChange={e => {
                const isChecked = e.target.checked
                console.log('SPONSORS', sponsors)
                const data = isChecked ? [...sponsors, item] : sponsors.filter(sponsor => sponsor.id !== item.id)
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
            championshipTypesList.map((item, key) => {
              const isSelected = group && group.find(g => g.id === item.id)
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
        <label>PROPIETARIO:</label>
        <input
          type='text'
          id='owner'
          value={owner}
          onChange={e => dispatch({ type: 'owner', payload: e.target.value})}
        />
      </div>
      <div>
        <input type='submit' value='Guardar' disabled={isUpdatingImage} />
        <Link href='/cars'><button>Cancelar</button></Link>
      </div>
    </form>
    </Wrapper>
  )
}

export default CarsForm
