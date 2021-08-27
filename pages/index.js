import React, { useState } from "react";
import {onAuthStateChange} from "../firebase/auth";
import Login from "./login";

export default function Home() {
  // setLogin()
  const [isAuth, setIsAuth] = useState(onAuthStateChange(user => !!user))
  return (
    <>
      holaaa
      {isAuth && <Home />}
      {!isAuth && <Login />}
    </>
  )
}
