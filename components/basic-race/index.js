import React from 'react'
import css from '../../styles/basic-race/basic-race.module.scss'
import RacesList from "./components/races-list";
import BasicRaceCore from "./core";
import BasicRaceForm from "../../forms/basic-race";

const BasicRace = () => {
  const [isLoading, list, getData, setBasicRace, goToRaceData] = BasicRaceCore()

  return (
    <div className={css.wrapper}>
      <div className={css.halfPart}>
        <BasicRaceForm onSubmit={setBasicRace} />
      </div>
      <div className={css.halfPart}>
        {isLoading && <div>Loading...</div>}
        {!isLoading && <RacesList list={list} />}
      </div>
    </div>
  )
}

export default BasicRace
