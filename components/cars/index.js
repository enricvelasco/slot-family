import React from 'react'
import css from '../../styles/components/cars.module.scss';
import CarsCore from "./core";
import GridList from "../common/grid-list";

const CarsController = () => {
  const [list, isLoading, getCars, onSelectItem] = CarsCore();

  return (
    <div className={css.wrapper}>
      {isLoading && <div>loading...</div>}
      {!isLoading && <GridList list={list} onClickItem={item => onSelectItem(item.id)} />}
    </div>
  )
}

export default CarsController
