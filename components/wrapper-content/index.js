import React from 'react'
import css from '../../styles/components/wrapper.module.scss'

const WrapperContent = ({children}) => (
  <div className={css.wrapperContent}>
    {children}
  </div>
)

export default WrapperContent
