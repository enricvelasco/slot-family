import React from 'react'
import RacesListItem from "../races-list-item";
import css from '../../../../styles/basic-race/basic-race.module.scss'

const RacesList = ({list}) => (
  <div className={css.list}>
    {list.map((item, key) => <RacesListItem key={key} item={item} />)}
  </div>
)

export default RacesList
