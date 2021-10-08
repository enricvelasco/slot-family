import React from 'react'
import clsx from "clsx";
import css from "../../../styles/components/common/grid-list.module.scss";
import StockItemList from "../stock-item-list";

const GridList = ({list, onClickItem, objectFit}) => (
  <div className={clsx(css.container, css.gridContainer)}>
    {list.map((item, key) => {
      return (<StockItemList objectFit={objectFit} key={key} item={item} onClickItem={onClickItem} />)
    })}
  </div>
)

export default GridList
