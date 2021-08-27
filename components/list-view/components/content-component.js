import React from 'react'
import ImageContainer from "../../image-container";
import css from '../../../styles/components/list-view.module.scss'

const ListViewContentComponent = ({ item }) => (
  <ImageContainer className={css.carouselItem} src={item.imageUrl}/>
)

export default ListViewContentComponent
