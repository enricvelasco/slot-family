import React, {useEffect, useState} from "react";
import '../styles/globals.css'
import {onAuthStateChange} from "../firebase/auth";
import {raceListener} from "../firebase/data/basic-race";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChange(setUser)
  })

  useEffect(() => {
    user && user.uid === 'juqTGsDFH6OkzbtnqnR9AjSngYs1' && raceListener()
  }, [user])

  return <Component user={user} {...pageProps} />

}

export default MyApp
