import React from 'react'
import css from '../../styles/components/wrapper.module.scss'
import FooterMenu from "../footer-menu";

const Wrapper = ({ children }) => (
  <div className={css.container}>
    {children}
    <FooterMenu />
  </div>
)

export default Wrapper
