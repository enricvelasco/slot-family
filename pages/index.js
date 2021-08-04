import React, { useState } from "react";
import {onAuthStateChange, onSignOut, setLogin} from "../firebase/auth";
import Login from "./login";

export default function Home() {
  // setLogin()
  const [isAuth, setIsAuth] = useState(onAuthStateChange(user => !!user))
  return (
    <div>
      {isAuth && <Home />}
      {!isAuth && <Login />}
    </div>
  )
}
