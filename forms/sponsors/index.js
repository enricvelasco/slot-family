import React, { useReducer, useState } from 'react'
import {formInitialState, reducer} from "./resources";
import Link from "next/link";
import {isURL} from "../../services/url";
import {imgDomains} from "../../utils";
import {getFileExtension, resizeImage} from "../../services/file_management";
import {setImage} from "../../firebase/data/cars";
import {generateRandomId} from "../../services/random";

const SponsorsForm = ({ onSubmit, data }) => {
  const [useUrlImage, setUseUrlImage] = useState(true)
  const [isUpdatingImage, setIsUpdatingImage] = useState(false)
  const [state, dispatch] = useReducer(reducer, data || formInitialState)
  const { id, name, imageUrl, description } = state

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
      resizeImage({ file, maxWidth: 500 })
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>NOMBRE:</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={e => dispatch({ type: 'name', payload: e.target.value})}
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
              id='imageUrl'
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
        <input type='submit' disabled={!state.name} value='Guardar' />
        <Link href='/sponsors'><button>Cancelar</button></Link>
      </div>
    </form>
  )
}

export default SponsorsForm
