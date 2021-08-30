import React from 'react'
import css from '../../styles/components/carousel.module.scss'
import clsx from "clsx";

const Carousel = ({ list, viewParam, onSelect, keySelected, ContentComponent, imageClassName }) => {
  return (
    <div className={css.container}>
      {list.map((item, key) => {
        const isSelected = key === keySelected
        return (
          <div
            className={clsx(css.item, isSelected && css.itemSelected, imageClassName )}
            key={key}
            onClick={() => onSelect(key)}
          >
            {/* item[viewParam] */}
            <ContentComponent item={item} />
          </div>)
      })}
    </div>
  );
}

export default Carousel
