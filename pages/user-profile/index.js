import React from 'react'
import Wrapper from "../../components/wrapper";
import {onSignOut, setLoginWithEmailAndPassword} from "../../firebase/auth";
import {useRouter} from "next/router";
import WrapperContent from "../../components/wrapper-content";

const UserProfile = ({ user }) => {
  const router = useRouter()

  const onSubmitLogin = (e) => {
    setLoginWithEmailAndPassword('hola', 'sdasd')
      .then(data => data && router.push('/home'))
      .catch(err =>  console.log('ERR:', err))
  }

  return (
    <Wrapper>
      <WrapperContent>
        User PROFILE
        <p>{user && user.email}</p>
        <button onClick={onSignOut}>LOGOUUT</button>
      </WrapperContent>
    </Wrapper>
  )
}

export default UserProfile
