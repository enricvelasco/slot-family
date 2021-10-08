import React from 'react'
import ChampionshipTypesCore from "./core";
import css from '../../styles/components/championship-types.module.scss';
import GridList from "../common/grid-list";

const ChampionshipTypes = () => {
  const [list, isLoading, getChampionshipTypes, onSelectItem] = ChampionshipTypesCore();

  return (
    <div className={css.wrapper}>
      {isLoading && <div>loading...</div>}
      {!isLoading && <GridList list={list} onClickItem={item => onSelectItem(item.id)} />}
    </div>
  )
}

export default ChampionshipTypes
