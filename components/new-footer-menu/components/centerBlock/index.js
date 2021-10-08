import React, {useState} from 'react'
import clsx from "clsx";
import css from "../../../../styles/footer-menu/footer-menu.module.scss";
import RaceIcon from "../../../common/ui/icons/race-icon";
import BasicRaceIcon from "../../../common/ui/icons/basic-race-icon";
import FinishFlagIcon from "../../../common/ui/icons/finish-flag-icon";
import CupIcon from "../../../common/ui/icons/cup-icon";
import {useRouter} from "next/router";

const CenterBlock = () => {
  const router = useRouter()
  const [showOptionsCenterButton, setShowOptionsCenterButton] = useState(false)

  const onOpenCenterOptions = () => {
    setShowOptionsCenterButton(!showOptionsCenterButton);
  }

  return (
    <>
      <div className={clsx(css.centerButton)} onClick={onOpenCenterOptions}>
        <BasicRaceIcon className={clsx(css.centerIcon)} />
      </div>
      {showOptionsCenterButton &&
      <>
        <div className={clsx(css.centerItemMenu, css.firstItem)}><RaceIcon size={50}/></div>
        <div
          className={clsx(css.centerItemMenu, css.secondItem)}
          onClick={() => router.push('/basic-race')}
        >
          <FinishFlagIcon size={50}/>
        </div>
        <div className={clsx(css.centerItemMenu, css.thirdItem)}><CupIcon size={50}/></div>
      </>}
    </>
  )
}

export default CenterBlock
