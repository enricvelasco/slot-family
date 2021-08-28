import React, {useState, useRef} from 'react'
import { useRouter } from 'next/router'
import PistonIcon from "../ui/icons/piston-icon";
import css from '../../styles/components/footer-menu.module.scss'
import RacingGameIcon from "../ui/icons/racing-game-icon";
import clsx from "clsx";
import useOutsideClick from "../../services/hooks/click-outside";
import HandShakeIcon from "../ui/icons/hand-shake-icon";
import RaceCarIcon from "../ui/icons/rece-car-icon";
import SparkPlugIcon from "../ui/icons/spark-plug-icon";
import SpeedIcon from "../ui/icons/speed-icon";
import RaceIcon from "../ui/icons/race-icon";

const FooterMenu = () => {
  const ref = useRef()
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)

  useOutsideClick(ref, () => {
    setShowContent(false)
  })

  return (
    <nav className={css.container}>
      <div className={css.buttonContainer} ref={ref}>
        <div className={css.select} onClick={() => setShowContent(!showContent)}>
          <PistonIcon size={'40'} />
        </div>
        <div className={clsx(css.optionsContainer, showContent && css.show)}>
          <button className={css.option} onClick={() => router.push('/cars')}><RaceCarIcon size={'40'} /></button>
          <button className={css.option} onClick={() => router.push('/championship-types')}><RaceIcon size={'40'} /></button>
          <button className={css.option} onClick={() => router.push('/sponsors')}><HandShakeIcon size={'40'} /></button>
          <button className={css.option} onClick={() => router.push('/constructors')}><SparkPlugIcon size={'40'} /></button>
          <button className={css.option} onClick={() => router.push('/manufacturers')}><RacingGameIcon className={css.icon} size={'40'} /></button>
        </div>
      </div>
    </nav>
  )
}

export default FooterMenu
