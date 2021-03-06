import React, { useReducer, useState } from 'react'
import {formInitialState, reducer} from "./resources";
import Link from "next/link";
import {isURL} from "../../services/url";
import {imgDomains} from "../../utils";
import {getFileExtension, resizeImage} from "../../services/file_management";
import {generateRandomId} from "../../services/random";
import {setChampionshipTypeImage} from "../../firebase/data/championship-types";

const ChampionshipTypesForm = ({ onSubmit, data }) => {
  const [useUrlImage, setUseUrlImage] = useState(true)
  const [isUpdatingImage, setIsUpdatingImage] = useState(false)
  const [state, dispatch] = useReducer(reducer, data || formInitialState)
  const { id, name, imageUrl, description, order } = state

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(state)
  }

  const onChangeImage = e => {
    const value = e.target.value
    dispatch({ type: 'imageUrl', payload: value})
    if (isURL(value)) {
      const url = new URL(value)
      const isInAcceptedHosts = imgDomains.some(item => item === url.host)
      !isInAcceptedHosts && alert(`Los hosts aceptados son: ${imgDomains.join(', ')}`)
    }
  }

  const onImageSelected = (file) => {
    if (file) {
      setIsUpdatingImage(true)
      const extension = getFileExtension(file.name)
      resizeImage({ file, maxWidth: 1080 })
        .then(resizedImage => {
          setChampionshipTypeImage({
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>NOMBRE:</label>
        <input
          type='text'
          id='championship-name'
          value={name}
          onChange={e => dispatch({ type: 'name', payload: e.target.value})}
        />
      </div>
      <div>
        <label>ORDEN:</label>
        <input
          type='number'
          id='championship-order'
          value={order}
          onChange={e => dispatch({ type: 'order', payload: e.target.value})}
        />
      </div>
      <div>
        <button type='button' onClick={() => setUseUrlImage(true)}>URL</button>
        <button type='button' onClick={() => setUseUrlImage(false)}>Manual</button>
        <br />
        {useUrlImage &&
        <>
          <label>URL IMAGEN:</label>
          <input
            type='text'
            id='championship-imageUrl'
            value={imageUrl}
            // onChange={e => dispatch({ type: 'imageUrl', payload: e.target.value})}
            onChange={onChangeImage}
          />
        </>}
        {!useUrlImage &&
        <div>
          <label>IMAGEN:</label>
          <input type="file" id="files" name="files" onChange={event => onImageSelected(event.target.files[0] || null)} />
          {isUpdatingImage && <span>Updating image...</span>}
        </div>}
      </div>
      <div>
        <label>DESCRIPCI??N:</label>
        <textarea
          id="championship-description"
          rows="4"
          cols="50"
          value={description}
          onChange={e => dispatch({type: 'description', payload: e.target.value})}
        />
      </div>
      <div>
        <input type='submit' disabled={!state.name} value='Guardar' />
        <Link href='/championship-types'><button>Cancelar</button></Link>
      </div>
    </form>
  )
}

export default ChampionshipTypesForm
