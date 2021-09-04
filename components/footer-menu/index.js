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
import RaceIcon from "../ui/icons/race-icon";
import HelmetIcon from "../ui/icons/helmet-icon";
import RacingHelmetIcon from "../ui/icons/racing-helmet-icon";
import GlovesIcon from "../ui/icons/gloves-icon";
import FinishFlagIcon from "../ui/icons/finish-flag-icon";
import BasicRaceIcon from "../ui/icons/basic-race-icon";
import CupIcon from "../ui/icons/cup-icon";

const FooterMenu = () => {
  const ref = useRef()
  const profileRef = useRef()
  const raceRef = useRef()

  const router = useRouter()
  const [showContent, setShowContent] = useState(false)
  const [showUserContent, setShowUserContent] = useState(false)
  const [showRaceContent, setShowRaceContent] = useState(false)

  useOutsideClick(ref, () => {
    setShowContent(false)
  })

  useOutsideClick(profileRef, () => {
    setShowUserContent(false)
  })

  useOutsideClick(raceRef, () => {
    setShowRaceContent(false)
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
      <div className={css.buttonContainer} ref={profileRef}>
        <div className={css.select} onClick={() => setShowUserContent(!showUserContent)}>
          <RacingHelmetIcon size={'40'} />
        </div>
        <div className={clsx(css.optionsContainer, showUserContent && css.show)}>
          <button className={css.option} onClick={() => router.push('/user-profile')}><HelmetIcon size={'40'} /></button>
          <button className={css.option} onClick={() => router.push('/users-list')}><GlovesIcon size={'40'} /></button>
        </div>
      </div>
      <div className={css.buttonContainer} ref={raceRef}>
        <div className={css.select} onClick={() => setShowRaceContent(!showRaceContent)}>
          <FinishFlagIcon size={'40'} />
        </div>
        <div className={clsx(css.optionsContainer, showRaceContent && css.show)}>
          <button className={css.option} onClick={() => router.push('/championships')}><CupIcon size={'40'} /></button>
          <button className={css.option} onClick={() => router.push('/basic-race')}><BasicRaceIcon size={'40'} /></button>
        </div>
      </div>
    </nav>
  )
}

export default FooterMenu
