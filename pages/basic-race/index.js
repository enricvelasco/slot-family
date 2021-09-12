import React from 'react'
import Wrapper from "../../components/wrapper";
import css from '../../styles/basic-race/basic-race.module.scss'
import clsx from "clsx";
import BasicRaceForm from "../../forms/basic-race";

const BasicRace = () => {
  return (
    <Wrapper>
      <div className={css.basicRaceContainer}>
        <div className={clsx(css.halfPart, css.centeredContent)}>
          CREAR NUEVA CARRERA RÁPIDA
          <BasicRaceForm onSubmit={(data) => console.log('Race data', data)} />
        </div>
        <div className={css.halfPart}>
          PART 2
        </div>
      </div>
    </Wrapper>
  )
}

export default BasicRace
