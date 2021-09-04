import React from 'react'
import Wrapper from "../../components/wrapper";
import {onSignOut, setLoginWithEmailAndPassword} from "../../firebase/auth";
import {useRouter} from "next/router";

const UserProfile = () => {
  const router = useRouter()

  const onSubmitLogin = (e) => {
    setLoginWithEmailAndPassword('hola', 'sdasd')
      .then(data => data && router.push('/home'))
      .catch(err =>  console.log('ERR:', err))
  }

  return (
    <Wrapper>
      User PROFILE
      <button onClick={onSignOut}>LOGOUUT</button>
    </Wrapper>
  )
}

export default UserProfile
