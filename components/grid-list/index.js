import React from 'react'
import css from '../../styles/components/grid-list.module.scss'

const GridList = ({ list }) => (
  <div>
    {list.map((item, key) => {
      return (
        <div className={css.gridContainer} key={key}>
          <div className={css.item}>{item.name}</div>
          <div className={css.item}>{item.email}</div>
          <div className={css.item}>{item.email}</div>
        </div>
      )
    })}
  </div>
)

export default GridList
