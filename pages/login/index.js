import React from 'react'
import { useRouter } from 'next/router'
import {setLoginWithEmailAndPassword} from "../../firebase/auth";

const emailId = 'slot-email'
const passwordId = 'slot-password'

const Login = () => {
  const router = useRouter()

  const onSubmitLogin = (e) => {
    e.preventDefault()
    setLoginWithEmailAndPassword(document.getElementById(emailId).value, document.getElementById(passwordId).value)
      .then(data => data && router.push('/home'))
      .catch(err =>  console.log('ERR:', err))
  }

  return (
    <form onSubmit={e => onSubmitLogin(e)}>
      <input id={emailId} type='email' name='user email' required />
      <input id={passwordId} type='password' name='user password' required />
      <input type="submit" value="Enviar datos" />
    </form>
  )
}

export default Login
