import React, {useEffect, useState} from "react";
import '../styles/globals.css'
import {onAuthStateChange} from "../firebase/auth";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('REFRESH_APP')
    onAuthStateChange(setUser)
  })

  return <Component user={user} {...pageProps} />
}

export default MyApp
