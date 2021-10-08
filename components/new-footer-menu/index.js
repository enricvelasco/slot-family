import React from 'react'
import css from '../../styles/footer-menu/footer-menu.module.scss'
import HelmetProfileIcon from "../common/ui/icons/helmet-profile-icon";
import CenterBlock from "./components/centerBlock";
import LeftBlock from "./components/leftBlock";
import {useRouter} from "next/router";
import RightBlock from "./components/rightBlock";

const FooterMenu = () => {
  const router = useRouter()

  const onLeftBlockClick = () => {
    router.push('/data-menu')
  };

  const onRightBlockClick = () => {
    router.push('/user-menu')
  }

  return (
    <div className={css.footerBlock}>
      <div className={css.container}>
        <LeftBlock onLeftBlockClick={onLeftBlockClick} />
        <div className={css.overlay}>
        </div>
        <RightBlock onRightBlockClick={onRightBlockClick} />
        <CenterBlock />
        <div className={css.bottomContent} />
      </div>
    </div>
  )
}

export default FooterMenu
