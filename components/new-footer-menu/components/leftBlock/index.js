import React from 'react'
import css from "../../../../styles/footer-menu/left-block.module.scss";
import clsx from "clsx";
import TrafficConeIcon from "../../../common/ui/icons/traffic-cone-icon";

const LeftBlock = ({onLeftBlockClick}) => (
  <div className={clsx(css.leftBlock)}>
    <TrafficConeIcon className={css.icon} size={70} onClick={onLeftBlockClick} />
  </div>
)

export default LeftBlock
