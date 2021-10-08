import React from 'react'
import css from '../../styles/components/menu-screen.module.scss';
import clsx from "clsx";
import RacingHelmetIcon from "../common/ui/icons/racing-helmet-icon";
import GlovesIcon from "../common/ui/icons/gloves-icon";
import {useRouter} from "next/router";

const UserMenu = () => {
  const router = useRouter()

  return (
    <div className={clsx(css.container, css.gridHalf)}>
      <div
        className={css.gridItem}
        style={{backgroundColor: '#afe6ff'}}
        onClick={() => router.push('/user-profile')}
      >
        <RacingHelmetIcon size={100} />
      </div>
      <div
        className={css.gridItem}
        style={{backgroundColor: '#2896ff'}}
        onClick={() => router.push('/users-list')}
      >
        <GlovesIcon size={100} />
      </div>
    </div>
  )
}

export default UserMenu
