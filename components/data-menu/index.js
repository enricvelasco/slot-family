import React from 'react'
import css from '../../styles/components/menu-screen.module.scss';
import clsx from "clsx";
import RaceCarIcon from "../common/ui/icons/rece-car-icon";
import RaceTrackIcon from "../common/ui/icons/race-track-icon";
import RacingGameIcon from "../common/ui/icons/racing-game-icon";
import ToolsIcon from "../common/ui/icons/tools-icon";
import HandShakeIcon from "../common/ui/icons/hand-shake-icon";
import PistonIcon from "../common/ui/icons/piston-icon";
import {useRouter} from "next/router";

const DataMenu = () => {
  const router = useRouter();

  return (
    <div className={clsx(css.container, css.gridContainer)}>
      <div
        className={css.gridItem}
        style={{backgroundColor: '#a0a0a5'}}
        onClick={() => router.push('/cars')}
      >
        <RaceCarIcon size={100} />
      </div>
      <div
        className={css.gridItem}
        style={{backgroundColor: '#aad540'}}
        onClick={() => router.push('/championship-types')}
      >
        <RaceTrackIcon size={100} />
      </div>
      <div
        className={css.gridItem}
        style={{backgroundColor: '#ffdc64'}}
        onClick={() => router.push('/constructors')}
      >
        <PistonIcon size={100} />
      </div>
      <div
        className={css.gridItem}
        style={{backgroundColor: '#2896ff'}}
        onClick={() => router.push('/settings')}
      >
        <ToolsIcon size={100} />
      </div>
      <div
        className={css.gridItem}
        style={{backgroundColor: '#aad540'}}
        onClick={() => router.push('/manufacturers')}
      >
        <RacingGameIcon size={100} />
      </div>
      <div
        className={css.gridItem}
        style={{backgroundColor: '#827ddc'}}
        onClick={() => router.push('/sponsors')}
      >
        <HandShakeIcon size={100} />
      </div>
    </div>
  )
}

export default DataMenu
