import React from 'react'
import css from '../../../../styles/basic-race/basic-race.module.scss'

const RacesListItem = ({item}) => (
  <div className={css.itemList}>
    <div>{item.players}</div>
    <div>{item.date}</div>
  </div>
)

export default RacesListItem
