import React from 'react'
import css from "../../../../styles/footer-menu/right-block.module.scss";
import HelmetIcon from "../../../common/ui/icons/helmet-icon";

const RightBlock = ({onRightBlockClick}) => (
  <div className={css.rightBlock}>
    <HelmetIcon size={70} className={css.icon} onClick={onRightBlockClick} />
  </div>
)

export default RightBlock
