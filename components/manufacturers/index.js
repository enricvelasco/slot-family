import React from 'react'
import ManufacturersCore from "./core";
import css from "../../styles/components/championship-types.module.scss";
import GridList from "../common/grid-list";

const Manufacturers = () => {
  const [list, isLoading, getChampionshipTypes, onSelectItem] = ManufacturersCore();

  return (
    <div className={css.wrapper}>
      {isLoading && <div>loading...</div>}
      {!isLoading && <GridList objectFit={'scale-down'} list={list} onClickItem={item => onSelectItem(item.id)} />}
    </div>
  )
}

export default Manufacturers
