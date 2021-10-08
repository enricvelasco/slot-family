import React from 'react'
import css from "../../styles/components/championship-types.module.scss";
import GridList from "../common/grid-list";
import SponsorsCore from "./core";

const Sponsors = () => {
  const [list, isLoading, getData, onSelectItem] = SponsorsCore();

  return (
    <div className={css.wrapper}>
      {isLoading && <div>loading...</div>}
      {!isLoading && <GridList objectFit={'scale-down'} list={list} onClickItem={item => onSelectItem(item.id)} />}
    </div>
  )
}

export default Sponsors
