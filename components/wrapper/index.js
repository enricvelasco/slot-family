import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import css from '../../styles/components/wrapper.module.scss'
import FooterMenu from "../new-footer-menu";
import {onAuthStateChange} from "../../firebase/auth";

const Wrapper = ({ children }) => {
  const router = useRouter()
  const [userData, setUserData] = useState({user: null, firstTime: true})

  useEffect(() => {

    onAuthStateChange(user => setUserData({user, firstTime: false}))
  },[])

  useEffect(() => {
    if (!userData.user && !userData.firstTime) {
      router.push('/login')
    }
  }, [userData])

  return (
    <div className={css.container}>
      {children}
      {!!userData && <FooterMenu/>}
    </div>
  )
}

export default Wrapper
