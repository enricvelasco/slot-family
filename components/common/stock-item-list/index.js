import React from 'react'
import css from "../../../styles/components/common/stock-item-list.module.scss";
import ImageContainer from "../image-container";

const StockItemList = ({item, onClickItem, objectFit}) => (
  <div key={item.id} className={css.gridItem} onClick={() => onClickItem(item)}>
    <ImageContainer objectFit={objectFit} className={css.gridItemImage} src={item.imageUrlSmall} alt={item.name} />
    <h3 className={css.itemTitle}>{item.name}</h3>
  </div>
)

export default StockItemList
