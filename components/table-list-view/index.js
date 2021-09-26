import React from 'react'
import css from '../../styles/components/table-list-view.module.scss'
import ImageContainer from "../image-container";

const TableListView = ({ list, params, onSelect }) => (
  <>
    {list.map((item, key) => {
      return (
        <div className={css.gridContainer} key={key} onClick={() => onSelect(key)}>
          <ImageContainer src={item[params[0]]} />
          <div className={css.item}>{item[params[1]]?.toString()}</div>
          <div className={css.item}>{item[params[2]]?.toString()}</div>
        </div>
      )
    })}
  </>
)

export default TableListView
