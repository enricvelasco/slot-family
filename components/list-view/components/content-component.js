import React from 'react'
import ImageContainer from "../../common/image-container";
import css from '../../../styles/components/list-view.module.scss'

const ListViewContentComponent = ({ item }) => {
  return (
    <ImageContainer className={css.carouselItem} src={item.imageUrl} alt={item.carouselName || item.name} />
  )
}

export default ListViewContentComponent
